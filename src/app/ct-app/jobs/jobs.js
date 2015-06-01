angular.module('ctApp.jobs', [
    'ui.router',
    'ui.select2',

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.jobs', {
            url: '/jobs',
            views: {
                "appNested": {
                    controller: 'JobsCtrl',
                    templateUrl: 'ct-app/jobs/jobs.tpl.html'
                }
            },
            data: {
                pageTitle: 'Jobs',
                access: access.jobs
            }
        })
        .state('ctApp.addUpdateJob', {
            url: '/job/:jobId',
            views: {
                "appNested": {
                    controller: 'AddUpdateJobCtrl',
                    templateUrl: 'ct-app/jobs/add-update-job.tpl.html'
                }
            },
            data: {
                pageTitle: 'Add/Edit Job',
                access: access.jobs
            }
        }) 
        .state('ctApp.dashboardJob', {
            url: '/job/dashboard/:jobCode',
            views: {
                "appNested": {
                    controller: 'DashboardJobCtrl',
                    templateUrl: 'ct-app/jobs/job-dashboard.tpl.html'
                }
            },
            data: {
                pageTitle: 'Dashboard Job',
                access: access.jobs
            }
        });

}])

.controller("JobsCtrl", ["$scope", "Services", "$state", "$modal", "HelperService", "$http", "$localStorage",
    function($scope, Services, $state, $modal, HelperService, $http, $localStorage) {
        $scope.empCountry = $localStorage.user_info.country;

        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_jobs_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "job_name";
        $scope.sortType = "asc";
        $scope.jobDetailList = [];
        $scope.statusSearchOption = [{
            id: "all",
            name: "All"
        }, {
            id: "1",
            name: "Active"
        }, {
            id: "0",
            name: "Inactive"
        }];
        $scope.config.general.filterDBField = '';
        $scope.config.general.filterStatus = '';
        $scope.config.general.searchtxt = '';
        $scope.config.general.zone = null;
        if ($localStorage.user_info.iszone_code) {
            Services.getEmpZoneDetail().then(function(res) {

                $scope.config.general.zone = [{
                    "text": res.data.record[0]["zone_name"],
                    "id": res.data.record[0]["id"],
                    "code": res.data.record[0]["zone_code"]
                }];

            });


        }

        /* $scope.jobSearchOptionUnsorted = [];
         $scope.getjobFilters = function() {
             Services.getjobFilter().then(function(resp) {
                 angular.forEach(resp.data.field, function(item, index) {
                     $scope.jobSearchOptionUnsorted.push({
                         id: item.name,
                         name: item.label
                     });
                 });

                 if ($scope.jobSearchOptionUnsorted.length > 0) {
                     $scope.jobSearchOption = HelperService.arr.multisort($scope.jobSearchOptionUnsorted, ['name'], ['ASC']);
                 }
             });
         };
         $scope.getjobFilters();
         */
        $scope.jobSearchOption = [{
            id: "job_code",
            name: "Job Code"
        }, {
            id: "job_name",
            name: "Job Name"
        }, {
            id: "work_phone_format",
            name: "Authorized Phone Format"
        }];
        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_jobs_loader = true;
            $scope.filterObj = {
                fields: "job_name,job_code,job_zone_detail,last_clocked_in_date,last_scheduled_date,status,id,work_phone_format,country,authorized_phone_format",
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.jobDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()

            };

            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '' && $scope.config.general.filterDBField.id) {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and (' + $scope.config.general.filterDBField.id + ' like "%' + $scope.config.general.searchtxt + '%")';
            } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and (job_name like "%' + $scope.config.general.searchtxt + '%" or job_code like "%' + $scope.config.general.searchtxt + '%" or job_notes like "%' + $scope.config.general.searchtxt + '%" or contact_name like "%' + $scope.config.general.searchtxt + '%" or job_zone_detail like "%' + $scope.config.general.searchtxt + '%")';
            }
            if (($scope.config.general.filterStatus.id === 0) || ($scope.config.general.filterStatus.id == '1')) {
                $scope.filterObj.filter = $scope.filterObj.filter + " and status = " + $scope.config.general.filterStatus.id;

            }
            /* if($localStorage.user_info.iszone_code)
                {
                    $scope.filterObj.filter  =$scope.filterObj.filter  +' and job_zone='+$localStorage.user_info.zone_code;
                }*/
            if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && ($scope.config.general.zone[0].id !== "all")) {
                $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
                $scope.filterObj.filter += ' and job_zone in(' + $scope.zone_id + ')';

            }

            Services.jobService.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.jobDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_jobs_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.jobDetailList = [];
            $scope.config.show_jobs_loader = true;
            $scope.filterObj = {
                fields: "job_name,job_code,job_zone_detail,last_clocked_in_date,last_scheduled_date,status,id,work_phone_format,country,authorized_phone_format",
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };

            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '' && $scope.config.general.filterDBField.id) {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and (' + $scope.config.general.filterDBField.id + ' like "%' + $scope.config.general.searchtxt + '%")';
            } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and (job_name like "%' + $scope.config.general.searchtxt + '%" or job_code like "%' + $scope.config.general.searchtxt + '%" or job_notes like "%' + $scope.config.general.searchtxt + '%" or contact_name like "%' + $scope.config.general.searchtxt + '%" or job_zone_detail like "%' + $scope.config.general.searchtxt + '%")';
            }
            if (!angular.isUndefined($scope.config.general.filterStatus.id) && ($scope.config.general.filterStatus.id != 'all')) {
                $scope.filterObj.filter = $scope.filterObj.filter + " and status = " + $scope.config.general.filterStatus.id;

            }
            if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && ($scope.config.general.zone[0].id !== "all")) {
                $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
                $scope.filterObj.filter += ' and job_zone in(' + $scope.zone_id + ')';

            }
            /*
             if($localStorage.user_info.iszone_code)
                {
                    $scope.filterObj.filter  =$scope.filterObj.filter  +' and job_zone='+$localStorage.user_info.zone_code;
                }
            */
            Services.jobService.get($scope.filterObj, function(data) {
                $scope.jobDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_jobs_loader = false;
            });

        };

        $scope.applyProgramSort = function() {
            $scope.updateTableData();
        };

        $scope.clearSearch = function() {
            $scope.config.general.filterDBField = '';
            $scope.config.general.filterStatus = '';
            $scope.config.general.searchtxt = '';
            if ($localStorage.user_info.iszone_code) {
                Services.getEmpZoneDetail().then(function(res) {

                    $scope.config.general.zone = [{
                        "text": res.data.record[0]["zone_name"],
                        "id": res.data.record[0]["id"],
                        "code": res.data.record[0]["zone_code"]
                    }];
                    $scope.updateTableData();

                });


            } else {
                $scope.config.general.zone = null;
                $scope.updateTableData();

            }
        };


        $scope.enableEditView = function(id) {
            $state.go("ctApp.addUpdateJob", {
                jobId: id
            });
        };

        $scope.enableView = function(id) {
            Services.setModelTempVar(id);
            $scope.modalInstance = $modal.open({
                templateUrl: 'ct-app/jobs/view-job.tpl.html',
                controller: "viewJobCtrl",
                size: 'lg'


            });

            $scope.modalInstance.result.then(function(selectedItem) {
                $scope.enableEditView(selectedItem);
            }, function() {

            });


        };
         $scope.enableDashboard = function(id) {
                $state.go("ctApp.dashboardJob", {
                    jobCode: id
                });
            };
        $scope.selectzone = {
            multiple: true,
            query: function(query) {
                var data = {
                    results: []
                };
                var getZone = true;

                if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && $scope.config.general.zone[0].code === "") {
                    getZone = false;
                    data = {
                        results: []
                    };

                } else if ($scope.config.general.zone === null || angular.isUndefined($scope.config.general.zone[0])) {
                    data.results.push({
                        text: 'All',
                        id: 'all',
                        code: ''
                    });
                }

                if (getZone === true) {


                    $scope.zoneObj = {
                        fields: "id,zone_name,zone_code",
                        filter: "status > 0 and agency_id=" + Services.getAgencyID(),
                        order: 'zone_name asc',
                        limit: 20
                    };
                    if (query.term) {
                        $scope.zoneObj.filter += " and zone_name like '%" + query.term + "%'";
                    }

                    Services.employeeZones.get($scope.zoneObj, function(remoteData) {

                        items = remoteData.record;
                        if (items.length < 1) {
                            query.callback(data);
                        }
                        angular.forEach(items, function(item, key) {
                            data.results.push({
                                "text": item.zone_name,
                                "id": item.id,
                                "code": item.zone_code,
                            });
                            query.callback(data);

                        });

                    });
                } else {
                    query.callback(data);
                }
            },
            initSelection: function(element, callback) {}


        };


    }
])

/*
 * Add Update
 * Job Controller....
 * **/

.controller("AddUpdateJobCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage", "$modal", "$sce", "$http", "$window",
        function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage, $modal, $sce, $http, $window) {
            $scope.job_id = $stateParams.jobId;
            $scope.job = {};
            $scope.pageTitle = "Add New";
            $scope.jobDBField = {};
            $scope.jobSteps = {};
            $scope.job.visitonly = 0;
            $scope.job.employee_chart = 1;
            $scope.job.status = 1;
            $scope.job.long_lat = {};
            $scope.code_exist = 0;
            $scope.job.service_item = {};
            $scope.job.pay_type = {};
            $scope.job.workphones = {};
            $scope.job.workphonesMax = 3;
            $scope.job.customPrompt = {};
            $scope.job.customPromptMax = 10;
            //  $scope.authorizations = [];
            $scope.job.logtype = 2;
            $scope.job.late_notify = 1;
            $scope.savedisable = 0;
            $scope.generateJobcode_count = 0;
            //$scope.jobnamecnt = 0;
            // $scope.job.country="United States";
            //$scope.timezonedata = 0;
            $scope.job.activity = 0;
            $scope.job.activityDetail='';
            $scope.jobcode_length = $localStorage.configCode.job;
            if ($localStorage.user_info.iszone_code) {
                Services.getEmpZoneDetail().then(function(res) {
                    $scope.job.job_zone = {
                        "text": res.data.record[0]["zone_name"],
                        "id": res.data.record[0]["zone_code"]
                    };
                });
            }

            $scope.getJobDetail = function() {
                $scope.job.workphones = [{
                    "phone": ""
                }];
                $scope.job.workphones.addshow = -1;
                $scope.job.customPrompt = [{
                    "prompt": ""
                }];
                $scope.job.customPrompt.addshow = -1;


                if (!angular.isUndefined($scope.job_id) && $scope.job_id) {
                    $scope.pageTitle = "Update";
                    Services.jobService.get({
                        "filter": "id='" + $scope.job_id + "'"
                    }, function(resp) {
                        $scope.jobDBField = resp.record[0];
                        angular.extend($scope.job, {
                            job_name: $scope.jobDBField.job_name,
                            job_code: $scope.jobDBField.job_code,
                            job_zone: ($scope.jobDBField.job_zone_detail) ? JSON.parse($scope.jobDBField.job_zone_detail) : "",
                            timezone: $scope.jobDBField.timezone,
                            main_phone: $scope.jobDBField.main_phone,
                            fax: $scope.jobDBField.fax,
                            contact_name: $scope.jobDBField.contact_name,
                            other_phone: ($scope.jobDBField.other_phone) ? JSON.parse($scope.jobDBField.other_phone) : "",
                            external_code: ($scope.jobDBField.external_code) ? JSON.parse($scope.jobDBField.external_code) : "",
                            job_address1: $scope.jobDBField.job_address1,
                            job_address2: $scope.jobDBField.job_address2,
                            city: $scope.jobDBField.job_city,
                            state: $scope.jobDBField.job_state,
                            zip: $scope.jobDBField.job_zip,
                            county: $scope.jobDBField.job_county,
                            country: ($scope.jobDBField.country) ? $scope.jobDBField.country : "United States",
                            //budgeted_hours: $scope.jobDBField.budgeted_hours,
                            status: $scope.jobDBField.status,
                            service_item: ($scope.jobDBField.service_item_detail) ? JSON.parse($scope.jobDBField.service_item_detail) : "",
                            pay_type: ($scope.jobDBField.pay_type_detail) ? JSON.parse($scope.jobDBField.pay_type_detail) : "",
                            job_notes: $scope.jobDBField.job_notes,
                            employee_chart: ($scope.jobDBField.employee_chart == '0' || $scope.jobDBField.employee_chart == '1') ? $scope.jobDBField.employee_chart : "1",
                            visitonly: ($scope.jobDBField.visitonly) ? JSON.parse($scope.jobDBField.visitonly) : "",
                            url: $scope.jobDBField.map_url,
                            budgeted_type: $scope.jobDBField.budgeted_type,
                            long_lat: ($scope.jobDBField.long_lat) ? JSON.parse($scope.jobDBField.long_lat) : "",
                            late_notify: $scope.jobDBField.late_notify,
                            created_on: HelperService.converttimeZone($scope.jobDBField.created_on),
                            created_by: $scope.jobDBField.created_by,
                            editedOn: HelperService.convertUTCtoMytimeZone($scope.jobDBField.edited_on),
                            edited_by: $scope.jobDBField.edited_by,
                            last_scheduled: HelperService.converttimeZone($scope.jobDBField.last_scheduled_date),
                            last_clockedin: HelperService.converttimeZone($scope.jobDBField.last_clocked_in_date),
                            jobgroup: $scope.jobDBField.jobgroup,
                            activity  : ($scope.jobDBField.activity_type?$scope.jobDBField.activity_type:"0"),
                            activityDetail : ($scope.jobDBField.activity_detail?JSON.parse($scope.jobDBField.activity_detail):""),
                            budgetedHours: $scope.jobDBField.budgeted_hours


                        });
                        if ($scope.jobDBField.prompt_logtype) {
                            $scope.job.logtype = $scope.jobDBField.prompt_logtype;
                        }

                        //$scope.getTimezone($scope.job.timezone);

                        if ($scope.jobDBField.work_phone !== "") {

                            $scope.job.workphones = ($scope.jobDBField.work_phone) ? JSON.parse($scope.jobDBField.work_phone) : "";
                            $scope.job.workphones.addshow = $scope.job.workphones.length - 2;


                        }
                        if ($scope.jobDBField.prompt_details) {
                            $scope.job.customPrompt = ($scope.jobDBField.prompt_details) ? JSON.parse($scope.jobDBField.prompt_details) : "";
                            $scope.job.customPrompt.addshow = $scope.job.customPrompt.length - 2;


                        }
                        Services.jobauthorizationService.get({
                            fields: "id,payor_detail,skill_detail,acitivity_detail,authorization_start_date,authorization_end_date,total_hours,status",
                            filter: "job='" + $scope.job.job_code + "' and agency_id = " + Services.getAgencyID()
                        }, function(data) {

                            if ((data.record) && (data.record.length > 0)) {
                                $scope.authorizations = data.record;
                            }
                        });

                        if ($scope.job.jobgroup) {
                            $scope.getJobDetailByID($scope.job.jobgroup);
                        }

                    });
                }
            };

            $scope.getJobDetailByID = function(jobId) {

                Services.jobService.get({
                    "fields": "job_name",
                    "filter": "job_code='" + jobId + "' and agency_id = " + Services.getAgencyID(),
                    limit: 1
                }, function(resp) {
                    $scope.job.jobDes_Name = resp.record[0].job_name;


                });

            };

            $scope.jobManage = function(step, submit) {
                $scope.savedisable = 1;
                $scope.showerrorMsg = false;
                if (step == "basic") {

                    if (angular.isUndefined($scope.job.job_name) || angular.isUndefined($scope.job.job_zone) || !($scope.job.job_name) || !($scope.job.job_zone)) {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Required field is missing !!!";
                        jQuery(".basic .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    }
                    if (submit === false) {
                        $scope.savedisable = 1;
                        $scope.savejobDetail();
                    } else {
                        $scope.savedisable = 0;
                        $scope.jobSteps.location = true;
                    }
                    

                }
                if (step == "location") {
                    $scope.savedisable = 1;
                    if (submit === false) {
                        $scope.savedisable = 1;
                        $scope.savejobDetail();
                    } else {
                        $scope.savedisable = 0;
                        $scope.jobSteps.advanced = true;
                    }



                }
                if (step == "advanced") {
                    $scope.savedisable = 1;
                    if (submit === false) {
                        $scope.savedisable = 1;
                        $scope.savejobDetail();
                    } else {
                        $scope.savedisable = 0;
                        $scope.jobSteps.notes = true;
                    }


                }

                if (step == "notes") {
                    if (submit === false) {
                        $scope.savedisable = 1;
                        $scope.savejobDetail();
                    } else {
                        $scope.savedisable = 0;
                        $scope.jobSteps.activityCode = true;
                    }
                }

                if (step == "activityCode") {
                    if (submit === false) {
                        $scope.savedisable = 1;
                        $scope.savejobDetail();
                    } else {
                        $scope.savedisable = 0;
                        $scope.jobSteps.customPrompt = true;
                    }



                }
                if (step == "customPrompt") {

                    $scope.savedisable = 1;
                    $scope.savejobDetail();

                }

            };
            $scope.addAuthorizedPhone = function(index) {
                if ($scope.job.workphonesMax != index) {
                    $scope.job.workphones.addshow = index;
                }
                $scope.job.workphones.push({
                    "phone": ""
                });
            };
            $scope.removeAuthorizedPhone = function(index) {
                if ($scope.job.workphones.length === 1) {
                    $scope.job.workphones = [{
                        "phone": ""
                    }];
                    $scope.job.workphones.addshow = -1;

                } else {
                    $scope.job.workphones.addshow = $scope.job.workphones.addshow - 1;
                    $scope.job.workphones.splice(index, 1);
                }
            };
            $scope.addprompt = function(index) {
                if ($scope.job.customPromptMax != index) {
                    $scope.job.customPrompt.addshow = index;
                }
                $scope.job.customPrompt.push({
                    "prompt": ""
                });
            };
            $scope.removeprompt = function(index2) {
                // console.log($scope.job.workphones.length);

                if ($scope.job.customPrompt.length === 1) {
                    $scope.job.customPrompt = [{
                        "prompt": ""
                    }];
                    $scope.job.customPrompt.addshow = -1;

                } else {
                    $scope.job.customPrompt.addshow = $scope.job.customPrompt.addshow - 1;
                    $scope.job.customPrompt.splice(index2, 1);
                }
            };


            $scope.savejobDetail = function() {

                $scope.savedisable = 1;
                if (!($scope.job.timezone)) {
                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Timezone is required !!!";
                    jQuery(".personal .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }
                 if (($scope.job.activity==1) && ($scope.job.activityDetail===null || $scope.job.activityDetail==='') ) {
                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Default Activity is required !!!";
                    jQuery(".personal .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }
                //console.log($scope.job.activity);

               //console.log($scope.job.activityDetail);

                $scope.prompt_id = [];
                angular.forEach($scope.job.customPrompt, function(item, key) {
                    if (item.prompt) {
                        $scope.prompt_id.push(item.prompt.id);
                    }
                });
                $scope.sorted_arr = $scope.prompt_id.sort(); // You can define the comparing function here. 
                var results = 0;
                for (var i = 0; i < $scope.prompt_id.length - 1; i++) {
                    if ($scope.sorted_arr[i + 1] == $scope.sorted_arr[i]) {
                        results = 1;
                        break;
                    }
                }
                if (results !== 0) {

                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Please select different Prompt!!!";
                    jQuery(".basic .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);

                    return false;
                } else {

                    $scope.jobDBField.job_name = $scope.job.job_name;
                    $scope.jobDBField.agency_id = Services.getAgencyID();
                    $scope.jobDBField.prompt_id = ($scope.prompt_id)?JSON.stringify($scope.prompt_id):"";
                    $scope.jobDBField.prompt_details = ($scope.job.customPrompt)?JSON.stringify($scope.job.customPrompt):"";
                    $scope.jobDBField.prompt_logtype = $scope.job.logtype;
                    $scope.jobDBField.job_zone_detail = JSON.stringify($scope.job.job_zone);
                    $scope.jobDBField.job_zone = $scope.job.job_zone.id;
                    $scope.jobDBField.visitonly = ($scope.job.visitonly)?JSON.stringify($scope.job.visitonly):"";
                    $scope.jobDBField.employee_chart = $scope.job.employee_chart;
                    $scope.jobDBField.job_address1 = $scope.job.job_address1;
                    $scope.jobDBField.job_address2 = $scope.job.job_address2;
                    $scope.jobDBField.job_city = $scope.job.city;
                    $scope.jobDBField.job_state = $scope.job.state;
                    $scope.jobDBField.job_zip = $scope.job.zip;
                    $scope.jobDBField.job_county = $scope.job.county;
                    $scope.jobDBField.country = $scope.job.country;
                    $scope.jobDBField.timezone = $scope.job.timezone;
                    $scope.jobDBField.work_phone = angular.toJson($scope.job.workphones);
                    $scope.jobDBField.fax = $scope.job.fax;
                    $scope.jobDBField.contact_name = $scope.job.contact_name;
                    $scope.jobDBField.other_phone = JSON.stringify($scope.job.other_phone);
                    //$scope.jobDBField.budgeted_hours = $scope.job.budgeted_hours;

                    $scope.jobDBField.status = $scope.job.status;
                    $scope.jobDBField.service_item_detail = ($scope.job.service_item)?JSON.stringify($scope.job.service_item):"";
                    $scope.jobDBField.service_item = ($scope.job.service_item)?$scope.job.service_item.id:"";
                    $scope.jobDBField.pay_type_detail = ($scope.job.pay_type)?JSON.stringify($scope.job.pay_type):"";
                    $scope.jobDBField.pay_type =($scope.job.pay_type)?$scope.job.pay_type.id:"";
                    $scope.jobDBField.map_url = $scope.job.url;
                    $scope.jobDBField.long_lat = ($scope.job.long_lat)?JSON.stringify($scope.job.long_lat):"";

                    $scope.jobDBField.external_code = ($scope.job.external_code)?JSON.stringify($scope.job.external_code):"";
                    $scope.jobDBField.late_notify = $scope.job.late_notify;
                    $scope.jobDBField.budgeted_type = $scope.job.budgeted_type;
                    $scope.jobDBField.budgeted_hours = $scope.job.budgetedHours;
                    $scope.workphoneformat = [];
                    $scope.authphoneformat = [];

                    angular.forEach($scope.job.workphones, function(item, key) {
                        $scope.workphoneformat.push(item.phone);
                        var phonenum = item.phone;
                        var phoneformat = phonenum.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                        $scope.authphoneformat.push(phoneformat);

                    });

                    $scope.jobDBField.work_phone_format = $scope.workphoneformat.join(", ");
                    $scope.jobDBField.authorized_phone_format = $scope.authphoneformat.join(", ");
                    $scope.jobDBField.job_notes = $scope.job.job_notes;
                    $scope.jobDBField.jobgroup = $scope.job.jobgroup;
                    $scope.jobDBField.long = ($scope.job.long_lat?$scope.job.long_lat.long:"");
                    $scope.jobDBField.lat = ($scope.job.long_lat?$scope.job.long_lat.lat:"");
                    $scope.jobDBField.activity_type = $scope.job.activity;
                    if($scope.jobDBField.activity_type==1)
                    {
                        $scope.jobDBField.activity_detail = ($scope.job.activityDetail?JSON.stringify($scope.job.activityDetail):"");
                        $scope.jobDBField.activity_id = ($scope.job.activityDetail?$scope.job.activityDetail.id:"");
                    }
                    else
                    {
                        $scope.jobDBField.activity_detail = "";
                        $scope.jobDBField.activity_id = "";
                    
                    }
                          
                    $scope.saveUpdateJob();
                     
                    




                }
               

            };
            $scope.deleteJob = function(jobCode) {
                Services.shiftService.get({
                    filter: "job_id='" + jobCode + "'",
                    fields: "id",
                    include_count: true,
                }, function(remoteData) {
                    if (remoteData.meta.count <= 0) {
                        Services.employeeActivitiesService.get({
                            filter: "job_code='" + jobCode + "'",
                            fields: "id",
                            include_count: true,
                        }, function(remoteData) {
                            if (remoteData.meta.count <= 0)
                            {
                                Services.setModelTempVar(jobCode);
                                $scope.modalInstance = $modal.open({
                                    template: '<div class="modal-header"> <h3 class="modal-title">Delete Job</h3></div><div class="modal-body"><b> Please confirm by clicking Yes to Delete the job </b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">No</button><button class="btn btn-primary" ng-click="all()">Yes</button> </div>',
                                    controller: "deleteJobCtrl"

                                });
                                $scope.modalInstance.result.then(function(id) {
                                    $scope.savedisable = 1;
                                  
                                    Services.jobService.delete({
                                        filter: "job_code='" + id + "'"
                                    }, function(remoteData) {
                                        //agency_jobs

                                    
                                    $scope.logger = {};
                                    $scope.logger.userid = $localStorage.user_info.user_id;
                                    $scope.logger.user_detail = JSON.stringify({
                                        "username": $localStorage.user_info.username,
                                        "firstname": $localStorage.user_info.first_name,
                                        "lastname": $localStorage.user_info.last_name,
                                    });
                                    $scope.logger.action ="Delete";
                                    $scope.logger.agency_id = Services.getAgencyID();
                                    $scope.logger.action_id =  remoteData.record[0].id;
                                    $scope.logger.action_table ="agency_jobs";
                                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                    Services.userLog.save({
                                    }, $scope.logger, function(data) {

                                    });
                                     $scope.showerrorMsg = true;
                                    $scope.ErrorClass = "success";
                                    $scope.ErrorMsg = "Job deleted successfully !!!";
                                     $timeout(function() {
                                        $scope.showerrorMsg = false;
                                        $state.go("ctApp.jobs");
                                    }, 3000);

                                    });
                                    
                                }, function() {});
                               
                            } else {
                                 $scope.modalInstance = $modal.open({
                                    template: '<div class="modal-header"> <h3 class="modal-title">Delete Job</h3></div><div class="modal-body"><b> This job has a schedule and/or activity associated, please change Status to Inactive </b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                                    controller: "deleteJobCtrl"

                                });
                                
                                

                            }
                        });
                    } else {
                        $scope.modalInstance = $modal.open({
                            template: '<div class="modal-header"> <h3 class="modal-title">Delete Job</h3></div><div class="modal-body"><b> This job has a schedule and/or activity associated, please change Status to Inactive </b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                            controller: "deleteJobCtrl"

                        });
                    }


                });

            };
            $scope.checkJobName = function() {
                if($scope.job.job_name)
                {
                    $scope.savedisable = 1;
                    filterObj={
                        field: "id",
                        filter: 'job_name="' + $scope.job.job_name + '" and agency_id = ' + Services.getAgencyID()
            
                    };
                    if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {
                        filterObj.filter+=" and id <>"+$stateParams.jobId;
                    }
                    Services.jobService.get(filterObj, function(data) {
                        if (data.record.length > 0) {
                               
                                
                                $scope.modalInstance = $modal.open({
                                template: '<div class="modal-body"><div class="alert alert-warning"> A job exists with the name '+$scope.job.job_name +'. Please make sure you are not creating a duplicate job.<br>Do you want to still continue creating new job '+$scope.job.job_name+'?</div></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">No</button><button class="btn btn-primary" ng-click="all()">Yes</button> </div>',
                                controller: "JobNameCtrl"

                            });
                                
                            $scope.modalInstance.result.then(function(id) {
                                if(id=='yes')
                                {
                                    $scope.savedisable = 0;
                                }
                                else
                                {
                                    $state.go("ctApp.jobs");
                                }
                            }, function() {
                                 $scope.savedisable = 0;

                            });
                            
                            return false;
                        }
                        else
                        {
                            $scope.savedisable = 0;
                        }
                       
                    });
                }
               
            };
            $scope.checkJobAddress = function() {
                if($scope.job.job_address1)
                {
                    //Job Address1,Job Address2,Job State,Job City,Job Zip,Job County,Country
                    $scope.savedisable = 1;
                    filterObj={
                        field: "id",
                        filter: 'job_address1="'+ $scope.job.job_address1 +'" and job_address2 ="'+ $scope.job.job_address2+'" and job_zip="' + $scope.job.zip + '" and job_county="' + $scope.job.county+'" and job_state="' + $scope.job.state + '" and job_city="' + $scope.job.city+'" and country="' + $scope.job.country +'"'                           
                    };
                    if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {
                        filterObj.filter+=" and id <>"+$stateParams.jobId;
                    }
                    Services.jobService.get(filterObj, function(data) {
                        if (data.record.length > 0) {
                               
                                
                                $scope.modalInstance = $modal.open({
                                template: '<div class="modal-body"><div class="alert alert-warning"> A job exists with the address '+$scope.job.job_address1  +'. Please make sure you are not creating a duplicate address.<br>Do you want to still continue ?</div></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">No</button><button class="btn btn-primary" ng-click="all()">Yes</button> </div>',
                                controller: "JobNameCtrl"

                            });
                                
                            $scope.modalInstance.result.then(function(id) {
                                if(id=='yes')
                                {
                                    $scope.savedisable = 0;
                                }
                                else
                                {

                                    $scope.savedisable = 0;
                                    $scope.job.job_address1 = "";
                                    $scope.job.job_address2 = "";
                                    $scope.job.city = "";
                                    $scope.job.state ="";
                                    $scope.job.zip = "";
                                    $scope.job.county = "";
                                    $scope.job.country = "";
                                    $scope.job.timezone="";
                                    //$state.go("ctApp.jobs");
                                }
                            }, function() {
                                 $scope.savedisable = 0;

                            });
                            
                            return false;
                        }
                        else
                        {
                            $scope.savedisable = 0;
                        }
                       
                    });
                }
               
            };
            $scope.saveUpdateJob = function() {
                $scope.savedisable = 1;
                if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) { // means it is in edit state 
                    $scope.jobDBField.edited_on = moment().utc();
                    $scope.jobDBField.edited_by = JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                        "user_id": $localStorage.user_info.user_id
                    });

                    $scope.jobDBField.job_code = $scope.job.job_code;

                    $scope.savedisable = 0;
                    if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {
                        if ($scope.job.status == "0") {
                            Services.setModelTempVar($scope.deleteCode);
                            $scope.modalInstance = $modal.open({
                                template: '<div class="modal-header"> <h3 class="modal-title">Inactive Job</h3></div><div class="modal-body"><b> Changing Status to Inactive will DELETE all upcoming shifts for this Job. Please confirm by clicking Yes</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">No</button><button class="btn btn-primary" ng-click="all()">Yes</button> </div>',
                                controller: "changeStatusCtrl"

                            });



                            $scope.modalInstance.result.then(function(id) {
                                $scope.savedisable = 1;
                                Services.jobService.update({
                                    id: $stateParams.jobId
                                }, $scope.jobDBField, function(data) {
                                    $scope.logger = {};
                                    $scope.logger.userid = $localStorage.user_info.user_id;
                                    $scope.logger.user_detail = JSON.stringify({
                                        "username": $localStorage.user_info.username,
                                        "firstname": $localStorage.user_info.first_name,
                                        "lastname": $localStorage.user_info.last_name,
                                    });
                                    $scope.logger.action ="Update";
                                    $scope.logger.agency_id = Services.getAgencyID();
                                    $scope.logger.action_id =  data.id;
                                    $scope.logger.action_table ="agency_jobs";
                                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                    Services.userLog.save({
                                    }, $scope.logger, function(data) {

                                    });
                                    $scope.insertJobAuthorizedPhones();
                                    $scope.showerrorMsg = true;
                                    $scope.ErrorClass = "success";
                                    $scope.ErrorMsg = "Job detail edited successfully !!!";
                                    $scope.job.edited_on = data.edited_on;
                                    var timePeriod = moment().utc().format('YYYY-MM-DD HH:mm');
                                    Services.shiftRecurService.delete({
                                        filter: "job_id='" + $scope.job.job_code + "' and ref_in_at >='" + timePeriod + "'"
                                    }, function(remoteData) {



                                    });


                                    $timeout(function() {
                                        $scope.showerrorMsg = false;
                                        $state.go("ctApp.jobs");
                                    }, 3000);


                                });
                            }, function() {



                            });
                            return false;

                        }


                        $scope.savedisable = 1;
                        Services.jobService.update({
                            id: $stateParams.jobId
                        }, $scope.jobDBField, function(data) {
                            $scope.logger = {};
                            $scope.logger.userid = $localStorage.user_info.user_id;
                            $scope.logger.user_detail = JSON.stringify({
                                "username": $localStorage.user_info.username,
                                "firstname": $localStorage.user_info.first_name,
                                "lastname": $localStorage.user_info.last_name,
                            });
                            $scope.logger.action ="Update";
                            $scope.logger.agency_id = Services.getAgencyID();
                            $scope.logger.action_id =  data.id;
                            $scope.logger.action_table ="agency_jobs";
                            $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                            Services.userLog.save({
                            }, $scope.logger, function(data) {

                            });

                            $scope.insertJobAuthorizedPhones();

                            $scope.showerrorMsg = true;
                            $scope.ErrorClass = "success";
                            $scope.ErrorMsg = "Job detail edited successfully !!!";
                            $scope.job.edited_on = data.edited_on;

                            $timeout(function() {
                                $scope.showerrorMsg = false;
                                $state.go("ctApp.jobs");
                            }, 3000);

                        });

                        return false;
                    }

                } else {

                    $scope.jobDBField.created_on = moment().utc().format('YYYY-MM-DD HH:mm');
                    $scope.jobDBField.created_by = JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                        "user_id": $localStorage.user_info.user_id
                    });

                    $scope.getJobcode();

                    Services.jobService.get({
                        field: "id",
                        filter: "job_code='" + $scope.jobDBField.job_code + "'"
                    }, function(data) {

                        if (data.record.length < 1) {
                            Services.jobService.save($scope.jobDBField, function(data) {

                                $scope.insertJobAuthorizedPhones();
                                $scope.logger = {};
                                    $scope.logger.userid = $localStorage.user_info.user_id;
                                    $scope.logger.user_detail = JSON.stringify({
                                        "username": $localStorage.user_info.username,
                                        "firstname": $localStorage.user_info.first_name,
                                        "lastname": $localStorage.user_info.last_name,
                                    });
                                    $scope.logger.action ="Add";
                                    $scope.logger.agency_id = Services.getAgencyID();
                                    $scope.logger.action_id =  data.id;
                                    $scope.logger.action_table ="agency_jobs";
                                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                    Services.userLog.save({
                                    }, $scope.logger, function(data) {

                                    });


                                $scope.savedisable = 1;
                                $scope.showerrorMsg = true;
                                $scope.ErrorClass = "success";
                                $scope.ErrorMsg = "Job successfully added !!!";
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $state.go("ctApp.jobs");
                                }, 3000);




                            });


                        } else {
                            $scope.generateJobcode_count++;
                            if ($scope.generateJobcode_count < 5) {
                                $scope.getJobcode();
                                $scope.saveUpdateJob();
                            } else {
                                $scope.savedisable = 0;
                                $scope.showerrorMsg = true;
                                $scope.ErrorClass = "danger";
                                $scope.ErrorMsg = "Conflict occur in job code,try again if the problem persists please contact Administrator !!!";
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    //$state.go("ctApp.jobs");
                                }, 3000);
                                return false;
                            }


                        }

                    });
                }
            };
            $scope.insertJobAuthorizedPhones = function() {

                if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {

                    $scope.deleteJobphones = function() {

                        Services.jobAuthorizedPhones.delete({
                            filter: "job_id='" + $scope.job.job_code + "' and agency_id = " + Services.getAgencyID()
                        }, function(data) {});
                    };
                    $scope.deleteJobphones();




                }

                //insert job authorizd phone
                $scope.authorized_phone_DbField = [];
                angular.forEach($scope.job.workphones, function(item, key) {
                    $scope.authorized_phone_DbField[key] = {};
                    $scope.authorized_phone_DbField[key].agency_id = Services.getAgencyID();
                    $scope.authorized_phone_DbField[key].job_id = $scope.job.job_code;
                    $scope.authorized_phone_DbField[key].phone = item.phone;
                    $scope.authorized_phone_DbField[key].created_on = new Date();
                    $scope.authorized_phone_DbField[key].edited_on = $scope.jobDBField.edited_on;
                    $scope.authorized_phone_DbField[key].status = $scope.job.status;
                });

                Services.jobAuthorizedPhones.save($scope.authorized_phone_DbField, function(data) {
                    $timeout(function() {}, 3000);
                });
            };


            

            // coded by Revathy to get  Job code 
            $scope.getJobcode = function() {
                var characters = 0;
                if ($localStorage.configCode.job) {
                    // characters =(Math.pow(10, $localStorage.configCode.job))/10;
                    getminimum = Math.pow(10, ($localStorage.configCode.job - 1));
                    characters = (Math.pow(10, ($localStorage.configCode.job))) - getminimum;
                }
                $scope.jobDBField.job_code = $window.Math.floor($window.Math.random() * characters) + getminimum;
            };

            $scope.checkjobgroup = function() {
                if (angular.isUndefined($scope.job.jobgroup)) {
                    $scope.job.jobDes_Name = "";
                } else if ($localStorage.configCode.job <= ($scope.job.jobgroup).length) {
                    $scope.savedisable = 1;
                    Services.jobService.get({
                        fields: "job_name",
                        filter: "job_code='" + $scope.job.jobgroup + "' and agency_id = " + Services.getAgencyID()
                    }, function(data) {

                        if (data.record.length < 1) {
                            $scope.savedisable = 0;
                            $scope.job.jobgroup = "";
                            $scope.job.jobDes_Name = "";
                            $scope.showerrorMsg = true;
                            $scope.ErrorClass = "danger";
                            $scope.ErrorMsg = "Invalid Job Group";
                            $timeout(function() {
                                $scope.showerrorMsg = false;

                            }, 3000);
                            return false;

                        } else {
                            $scope.savedisable = 0;
                            $scope.job.jobDes_Name = data.record[0].job_name;
                        }

                    });
                }
            };


            $scope.getmyTimezone = function(lat, lng) {
                $scope.checkJobAddress();

                if (lat && lng) {
                    var tz = new TimeZoneDB();
                    tz.getJSON({
                        key: Services.timezoneKey,
                        lat: lat,
                        lng: lng
                    }, function(data) {
                        $scope.$apply(function() {
                            $scope.job.timezone = data.zoneName;
                        });
                    });

                }
            };

            $scope.$on('place_changed', function(event, newValue) {
                $scope.street_number = "";
                $scope.street = "";
                $scope.city = "";
                $scope.state = "";
                $scope.zip = "";
                $scope.county = "";
                $scope.country = "";

                $scope.mymapVariable = newValue;
                if (newValue) {
                    $scope.job.timezone = "";
                    if ($scope.mymapVariable.address_components) {

                        for (var i = 0; i < $scope.mymapVariable.address_components.length; i++) {
                            $scope.addressType = $scope.mymapVariable.address_components[i].types[0];

                            if ($scope.addressType == "street_number") {
                                $scope.street_number = $scope.mymapVariable.address_components[i]["short_name"];

                            }
                            if ($scope.addressType == "route") {
                                $scope.street = $scope.mymapVariable.address_components[i]["short_name"];

                            }
                            if ($scope.addressType == "locality") {
                                $scope.city = $scope.mymapVariable.address_components[i]["short_name"];

                            }
                            if ($scope.addressType == "administrative_area_level_1") {
                                $scope.state = $scope.mymapVariable.address_components[i]["short_name"];

                            }
                            if ($scope.addressType == "administrative_area_level_2") {
                                $scope.county = $scope.mymapVariable.address_components[i]["short_name"];

                            }
                            if ($scope.addressType == "postal_code") {
                                $scope.zip = $scope.mymapVariable.address_components[i]["short_name"];

                            }
                            if ($scope.addressType == "country") {
                                $scope.country = $scope.mymapVariable.address_components[i]["long_name"];

                            }

                        }

                        $scope.job.job_address1 = $scope.street_number + ' ' + $scope.street;
                        //jQuery("#Autocomplete2").val($scope.job.job_address1);
                        $scope.job.job_address2 = "";
                        $scope.job.city = $scope.city;
                        $scope.job.state = $scope.state;
                        $scope.job.zip = $scope.zip;
                        $scope.job.county = $scope.county;
                        $scope.job.country = $scope.country;
                        if ($scope.mymapVariable.url) {
                            $scope.job.url = $scope.mymapVariable.url;

                        }

                        if ($scope.mymapVariable.geometry) {

                           /* $scope.job.long_lat.long = $scope.mymapVariable.geometry.location['D'];
                            $scope.job.long_lat.lat = $scope.mymapVariable.geometry.location['k'];
                            */
                            //$scope.mymapVariable.geometry.location.lat()
                            $scope.job.long_lat.long = $scope.mymapVariable.geometry.location.lng();
                            $scope.job.long_lat.lat = $scope.mymapVariable.geometry.location.lat();

                            $scope.getmyTimezone($scope.job.long_lat.lat, $scope.job.long_lat.long);
                        }


                    }

                }

            });



            $scope.mapView = function(mapurl) {
                Services.setModelTempVar(mapurl);
                $scope.modalInstance = $modal.open({
                    templateUrl: 'ct-app/jobs/mapDetailView.tpl.html',
                    controller: "MapBoxJobCtrl"
                });




            };

            $scope.previous_state = function() {
                var prev = $rootScope.$previousState.name;
                if (prev !== "") {
                    $state.go(prev);
                }

            };

            $scope.selectZone = {

                query: function(query) {

                    $scope.zoneObj = {
                        fields: "zone_name,zone_code",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'zone_name asc',
                        limit: 20
                    };
                    if (query.term) {
                        $scope.zoneObj.filter += " and zone_name like '%" + query.term + "%'";
                    }

                    Services.employeeZones.get($scope.zoneObj, function(remoteData) {
                        $scope.zoneData = {
                            results: []
                        };
                        items = remoteData.record;
                        if (items.length == '0') {
                            query.callback($scope.zoneData);
                        } else {
                            angular.forEach(items, function(item, key) {
                                $scope.zoneData.results.push({
                                    "text": item.zone_name,
                                    "id": item.zone_code
                                });
                                query.callback($scope.zoneData);
                            });
                        }

                        return false;
                    });

                },
                initSelection: function(element, callback) {
                    if (!angular.isUndefined($scope.job.job_zone.id) && $scope.job.job_zone.id) {
                        return callback({
                            "text": $scope.job.job_zone.text,
                            "id": $scope.job.job_zone.id
                        });
                    }
                }

            };


            $scope.selectServiceItem = {
                query: function(query) {
                    var serviceItemData = {
                        results: []
                    };
                    $scope.serviceObj = {
                        fields: "name,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'name asc',
                        limit: 5
                    };
                    if (query.term) {
                        $scope.serviceObj.filter += " and name like '%" + query.term + "%'";
                    }
                    Services.service_item.get($scope.serviceObj, function(remoteData) {
                        items = remoteData.record;
                        if (items.length < 1) {
                            query.callback(serviceItemData);
                        }
                        angular.forEach(items, function(item, key) {
                            serviceItemData.results.push({
                                "text": item.name,
                                "id": item.id
                            });
                            query.callback(serviceItemData);
                        });

                    });
                },
                initSelection: function(element, callback) {
                    if (!angular.isUndefined($scope.job.service_item.id) && $scope.job.service_item.id) {
                        callback({
                            "text": $scope.job.service_item.text,
                            "id": $scope.job.service_item.id
                        });
                    }

                }
            };

            $scope.selectPayType = {
                query: function(query) {
                    var data = {
                        results: []
                    };
                    $scope.payObj = {
                        fields: "name,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'name asc',
                        limit: 5
                    };
                    if (query.term) {
                        $scope.payObj.filter += " and name like '%" + query.term + "%'";
                    }
                    Services.pay_type.get($scope.payObj, function(remoteData) {
                        items = remoteData.record;
                        if (items.length < 1) {
                            query.callback(data);
                        }
                        angular.forEach(items, function(item, key) {
                            data.results.push({
                                "text": item.name,
                                "id": item.id
                            });
                            query.callback(data);

                        });

                    });
                },
                initSelection: function(element, callback) {
                    if (!angular.isUndefined($scope.job.pay_type.id) && $scope.job.pay_type.id) {
                        callback({
                            "text": $scope.job.pay_type.text,
                            "id": $scope.job.pay_type.id
                        });
                    }

                }
            };
            $scope.selectActivity = {

                query: function(query) {

                    $scope.activityObj = {
                        fields: "name,code",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'name asc',
                        limit: 20
                    };
                    if (query.term) {
                        $scope.activityObj.filter += " and name like '%" + query.term + "%'";
                    }

                    Services.activity_code.get($scope.activityObj, function(remoteData) {
                        $scope.activityData = {
                            results: []
                        };
                        items = remoteData.record;
                        if (items.length == '0') {
                            query.callback($scope.activityData);
                        } else {
                            angular.forEach(items, function(item, key) {
                                $scope.activityData.results.push({
                                    "text": item.name+'('+item.code+')',
                                    "id": item.code
                                });
                                query.callback($scope.activityData);
                            });
                        }

                        return false;
                    });

                },
                initSelection: function(element, callback) {
                    if ($scope.job.activityDetail!=null && !angular.isUndefined($scope.job.activityDetail.id) && $scope.job.activityDetail.id) {
                        return callback({
                            "text": $scope.job.activityDetail.text,
                            "id": $scope.job.activityDetail.id
                        });
                    }
                }

            };
            $scope.refreshSelectPrompt = function(name) {
                $scope.promptObj = {
                    fields: "prompt_name,id,prompt_text,prompt_answers",
                    filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                    'order': 'id asc',
                    limit: 5
                };
                if (name) {
                    $scope.promptObj.filter += " and prompt_name  like '%" + name + "%'";
                }
                Services.customPromptService.get($scope.promptObj, function(remoteData) {
                    $scope.prompts = [];


                    angular.forEach(remoteData.record, function(item, key) {
                        $scope.prompts.push({
                            "text": item.prompt_name,
                            "id": item.id,
                            "prompt_text": item.prompt_text,
                            "prompt_answers": item.prompt_answers
                        });

                    });

                });

            };


            $scope.preventNext = function(keyEvent) {
                if (keyEvent.which === 13) {
                    keyEvent.preventDefault();
                }

            };

            $scope.jobManagePrev = function(step) {
                if (step == "location") {
                    $scope.jobSteps.schedule = false;
                    $scope.jobSteps.location = false;
                    $scope.jobSteps.basic = true;
                    $scope.jobSteps.advanced = false;
                    $scope.jobSteps.activityCode = false;
                    $scope.jobSteps.customPrompt = false;
                }

                if (step == "advanced") {
                    $scope.jobSteps.schedule = false;
                    $scope.jobSteps.location = true;
                    $scope.jobSteps.basic = false;
                    $scope.jobSteps.advanced = false;
                    $scope.jobSteps.activityCode = false;
                    $scope.jobSteps.customPrompt = false;
                }
                if (step == "schedule") {
                    $scope.jobSteps.location = false;
                    $scope.jobSteps.schedule = false;
                    $scope.jobSteps.advanced = true;
                    $scope.jobSteps.basic = false;
                    $scope.jobSteps.activityCode = false;
                    $scope.jobSteps.customPrompt = false;
                }
                if (step == "notes") {
                    $scope.jobSteps.location = false;
                    $scope.jobSteps.schedule = false;
                    $scope.jobSteps.advanced = true;
                    $scope.jobSteps.notes = false;
                    $scope.jobSteps.activityCode = false;
                    $scope.jobSteps.customPrompt = false;
                }

                if (step == "activityCode") {
                    $scope.jobSteps.location = false;
                    $scope.jobSteps.schedule = false;
                    $scope.jobSteps.advanced = false;
                    $scope.jobSteps.notes = true;
                    $scope.jobSteps.activityCode = false;
                    $scope.jobSteps.customPrompt = false;
                }

                if (step == "customPrompt") {
                    $scope.jobSteps.location = false;
                    $scope.jobSteps.schedule = false;
                    $scope.jobSteps.advanced = false;
                    $scope.jobSteps.notes = false;
                    $scope.jobSteps.activityCode = true;
                    $scope.jobSteps.customPrompt = false;
                }
            };

            
            $scope.cancelJob = function() {
                $state.go("ctApp.jobs");
            };

            $scope.getJobDetail();

        }
    ])
    .controller("MapBoxJobCtrl", ["$scope", "Services", "$modalInstance", "$sce", function($scope, Services, $modalInstance, $sce) {
            var itemDetail = Services.getModelTempVar();
            var split_url;
            Services.setModelTempVar('');
            $scope.mapurl = itemDetail.url;
            $scope.title = itemDetail.job_address1;
            $scope.county = itemDetail.county;
            $scope.long = itemDetail.long_lat.long;
            $scope.lat = itemDetail.long_lat.lat;
            $scope.job_state = itemDetail.state;
            if ($scope.mapurl) {
                split_url = ($scope.mapurl).split("?");


                $scope.fullMapUrl = "https://maps.google.com/maps?q=" + split_url[1] + "&output=embed";

                $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.fullMapUrl);
            }
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
                document.getElementById('jobMapId').src = $scope.fullMapUrl;

            };

        }


    ])

.controller("viewJobCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
            $scope.job_id = '';
            $scope.job = '';
            $scope.job_code = Services.getModelTempVar();
            Services.setModelTempVar();
            Services.jobService.get({
                "filter": "job_code ='" + $scope.job_code + "' and agency_id = " + Services.getAgencyID(),
                "limit": 1
            }, function(response) {

                $scope.job = response.record[0];
                $scope.job_id = $scope.job.id;


            });


            Services.jobauthorizationService.get({
                fields: "id,payor_detail,skill_detail,acitivity_detail,authorization_start_date,authorization_end_date,total_hours,status",
                filter: "job='" + $scope.job_code + "'"
            }, function(data) {

                if (data.record) {
                    $scope.job_authorization = data.record;
                }
            });



            $scope.ok = function() {
                if ($scope.job_id) {
                    $modalInstance.close($scope.job_id);

                }
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }

    ])
    .controller("changeStatusCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {

            var id = Services.getModelTempVar();
            Services.setModelTempVar();
            $scope.all = function() {
                $modalInstance.close(id);
            };

            $scope.cancel = function() {

                $modalInstance.dismiss('cancel');

            };
        }

    ])
    .controller("deleteJobCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {

            var id = Services.getModelTempVar();
            Services.setModelTempVar();
            $scope.all = function() {
                $modalInstance.close(id);
            };

            $scope.cancel = function() {

                $modalInstance.dismiss('cancel');

            };
        }

    ])
    .controller("JobNameCtrl", ["$scope", "$modalInstance","$state", function($scope, $modalInstance,$state) {

          
            $scope.all = function() {
                $modalInstance.close('yes');
                //$modalInstance.dismiss('yes');
                
            };

            $scope.cancel = function() {
                $modalInstance.close('no');
              /* $modalInstance.dismiss('no');
              $state.go("ctApp.jobs");
              */

            };
        }


    ])
   .controller('DashboardJobCtrl', ['$scope', 'Services', '$localStorage', 'HelperService',"$timeout","$stateParams", function($scope, Services, $localStorage, HelperService,$timeout,$stateParams) {
    $scope.jobCode = $stateParams.jobCode;

    $scope.empCountry=$localStorage.user_info.country;
    $scope.timeout_every = 15;
    $scope.getJobShiftDetails = function(startDateTime, ldate) {
        
        var ShiftObj={
            fields: "job_id,ref_in_at,ref_out_at,clock_in_time,clock_in_status",
            filter: 'ref_in_at >="' + startDateTime + '" and ref_out_at <="' + ldate + '" and agency_id = ' + Services.getAgencyID() +' and job_id ="'+$scope.jobCode+'"',
            include_count: true
        };
        
        Services.shiftService.get(ShiftObj, function(remoteData) {
            $scope.jobShiftCount = remoteData.meta.count;

            angular.forEach(remoteData.record, function(value, key) {
                        if (value.clock_in_status=='1') {
                            if((moment(value.clock_in_time).unix())>(moment(value.ref_in_at).unix()) )
                            {
                                $scope.totalLateClockin++;
                            }
                            else
                            {
                                $scope.totalOnClockin++;
                            }

                            
                        }
                        else
                        {
                            $scope.totalNotClockin++;
                        }
                    });
        });


        

        
    };

    $scope.getTimecardDetails = function(fdate, ldate, offset) {
        var filterObj;
        filterObj = {
            'fields':"id,employee_code,job_code,timestamp,log_type,call_duriation,call_status",
            'limit': $scope.call_limit,
            'offset': offset,
            'include_count': true,
            'order': 'timestamp desc',
            'filter': "employee_code <>'' and job_code<>'' and  timestamp >='" + fdate + "' and timestamp <='" + ldate + "' and agency_id = " + Services.getAgencyID() +' and job_code ="'+$scope.jobCode+'"',
        };
       

        Services.timeLog.get(filterObj, function(data) {
            if (data.record.length !== 0) {
                $scope.empNameList = {};
                $scope.jobNameList = {};
                $scope.empCode = HelperService.getAsArray(data.record, "employee_code");
                //$scope.jobCode = HelperService.getAsArray(data.record, "job_code");
                $scope.empFilterObj = {
                    'include_count': true,
                    'fields': 'first_name,last_name,access_code',
                    
                    'filter': 'access_code  IN (' + $scope.empCode + ') and agency_id = '+ Services.getAgencyID()
                };
                Services.employeeService.get($scope.empFilterObj, function(employeenameresult) {

                    angular.forEach(employeenameresult.record, function(value, key) {
                        if (value.access_code) {
                            $scope.empNameList[value.access_code] = value.last_name + ', ' + value.first_name + ' (' + value.access_code + ')';
                        }
                    });
                   /* $scope.jobFilterObj = {
                        'include_count': true,
                        'fields': 'job_name ,job_code',
                        'filter': 'job_code   IN (' + $scope.jobCode + ') and agency_id = '+ Services.getAgencyID()
                    };
                    Services.jobService.get($scope.jobFilterObj, function(jobnameresult) {

                        angular.forEach(jobnameresult.record, function(value, key) {
                            if (value.job_code) {
                                $scope.jobNameList[value.job_code] = value.job_name + ' (' + value.job_code + ')';
                            }
                        });*/
                        angular.forEach(data.record, function(item, key) {
                            time = HelperService.getOnlyHour(item.timestamp);

                            if (item.log_type == '1') {
                                $scope.totalClockin++;
                                $Clockin_Chart[time] = $Clockin_Chart[time] + 1;

                            } else {
                                $scope.totalClockout++;
                                $Clockout_Chart[time] = $Clockout_Chart[time] + 1;

                            }
                            $scope.calllogList.push({
                                    "id": item.id,
                                    "employee_code": $scope.empNameList[item.employee_code],
                                    //"job_code": $scope.jobNameList[item.job_code],
                                    "job_code": $scope.jobName+ ' (' + item.job_code + ')',
                                    "log_type": HelperService.logType(item.log_type),
                                    "call_duriation": item.call_duriation,
                                    "timestamp": HelperService.formatingDate(item.timestamp,$localStorage.user_info.country),
                                    "call_status": item.call_status

                                }

                            );


                        });
                        if (data.meta.count > (offset + $scope.call_limit)) {

                            var nextOffset = offset + $scope.call_limit + 1;
                            $scope.getTimecardDetails(fdate, ldate, nextOffset);
                        } else {
                            for (i = 0; i < 24; i++) {
                                $scope.Chartdetails.push({
                                    "date_time": i,
                                    "clockout": $Clockout_Chart[i],
                                    "clockin": $Clockin_Chart[i]

                                });

                            }
                            $scope.show_activities_loader = false;

                            $scope.noRecord = 0;
                            $scope.ctx = {
                                flexGrid: null,
                                data: $scope.calllogList,
                                includeColumnHeader: true
                            };
                            $scope.calllogListDetail = new wijmo.collections.CollectionView($scope.calllogList);
                            $scope.calllogListDetail.pageSize = 10;
                            $scope.showRecord = 1;
                            $timeout(function() {
                                $scope.updateDetails();
                            }, ($scope.timeout_every  * 60 * 1000));
                        }

                   //});

                });
            } else {
                $scope.show_activities_loader = false;
                $scope.noRecord = 1;
                $scope.norecord = HelperService.errorMsg('alert-danger', 'No clockin/clockout  Found');
            }

        });

    };
    $scope.updateDetails = function() {
        
        $scope.showRecord = 0;
        $scope.show_activities_loader = true;
        $scope.calllogList = [];
        $scope.totalClockout = 0;
        $scope.totalClockin = 0;
        $scope.totalLateClockin = 0;
        $scope.totalOnClockin = 0;
        $scope.totalNotClockin = 0;
        $scope.Chartdetails = [];
        $Clockin_Chart = {};
        $Clockout_Chart = {};
        for (i = 0; i < 24; i++) {

            $Clockin_Chart[i] = 0;
            $Clockout_Chart[i] = 0;
        }
        var CurrentDateTime = moment().utc().format('YYYY-MM-DD HH:mm');
        currentdate= moment().format('YYYY-MM-DD');
        var weekday = moment(currentdate).day();
        startdate = moment(currentdate).subtract(weekday, 'days');  
        $scope.new_date = moment(startdate).utc().format('YYYY-MM-DD HH:mm');
        lastdate= moment(startdate).add(6, 'days');
        var a = moment(lastdate);
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        $scope.end_date = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
        
        if($scope.empCountry  && $scope.empCountry!='United States')
        {
            $scope.startDateonly = moment(startdate).format('DD/MM/YYYY');
            $scope.lastDateonly = moment(lastdate).format('DD/MM/YYYY');
        }
        else
        {
            $scope.startDateonly = moment(startdate).format('MM/DD/YYYY');
            $scope.lastDateonly = moment(lastdate).format('MM/DD/YYYY');
        }
        /*
         if($scope.empCountry && $scope.empCountry!='United States')
        {
            $scope.currentDateonly = moment().format('DD/MM/YYYY');

        }
        else
        {
            $scope.currentDateonly = moment().format('MM/DD/YYYY');
        }
        */

        $scope.currentTime = moment().format('hh:mm A');
        if($scope.jobCode)
        {
             Services.jobService.get({
                "filter": "job_code ='" + $scope.jobCode + "' and agency_id = " + Services.getAgencyID(),
                "limit": 1
            }, function(response) {

                $scope.job = response.record[0];
                $scope.jobName = $scope.job.job_name;
                $scope.getJobShiftDetails($scope.new_date, $scope.end_date);
                $scope.getTimecardDetails($scope.new_date, CurrentDateTime, 0);

            });
        }
       
    };

    $scope.getdetails = function(days) {
        $scope.showRecord = 0;
        $scope.show_activities_loader = true;
        $scope.calllogList = [];
        $scope.totalClockout = 0;
        $scope.totalClockin = 0;
        $scope.totalLateClockin = 0;
        $scope.totalOnClockin = 0;
        $scope.totalNotClockin = 0;
        $scope.Chartdetails = [];
        $Clockin_Chart = {};
        $Clockout_Chart = {};
        for (i = 0; i < 24; i++) {

            $Clockin_Chart[i] = 0;
            $Clockout_Chart[i] = 0;
        }
        if((days==1) || (days==2))
        {           

            CurrentDateTime = moment().subtract(days, 'weeks').format('YYYY-MM-DD');
            weekday =moment(CurrentDateTime).day();           
            startdate = moment(CurrentDateTime).subtract(weekday, 'days');  
            $scope.new_date = moment(startdate).utc().format('YYYY-MM-DD HH:mm');
            lastdate = moment(startdate).add(6, 'days');
             a = moment(lastdate);
             addObj = a.add('24', 'hours');
             ldatehrs = addObj.toDate();
            $scope.end_date = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');

        }
        else
        {
            
            startdate=moment().startOf('month').format('YYYY-MM-DD');
            lastdate=moment().endOf('month').format('YYYY-MM-DD');
            $scope.new_date = moment(startdate).utc().format('YYYY-MM-DD HH:mm');
             a = moment(lastdate);
             addObj = a.add('24', 'hours');
             ldatehrs = addObj.toDate();
            $scope.end_date = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');

        }      
         CurrentDateTime = moment().utc().format('YYYY-MM-DD HH:mm');

        if($scope.empCountry  && $scope.empCountry!='United States')
        {
            $scope.startDateonly = moment(startdate).format('DD/MM/YYYY');
            $scope.lastDateonly = moment(lastdate).format('DD/MM/YYYY');
        }
        else
        {
            $scope.startDateonly = moment(startdate).format('MM/DD/YYYY');
            $scope.lastDateonly = moment(lastdate).format('MM/DD/YYYY');


        }
        $scope.currentTime = "";
        $scope.getJobShiftDetails($scope.new_date, $scope.end_date);
        $scope.getTimecardDetails($scope.new_date, $scope.end_date, 0);
    };
    

    $scope.updateDetails();
}]);