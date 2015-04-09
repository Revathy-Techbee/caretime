angular.module('ctApp.timecardExport', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.timecardExport', {
        url: '/timecardExport',
        views: {
            "appNested": {
                controller: 'TimecardExportCtrl',
                templateUrl: 'ct-app/reports/timecardExport/timecardExport.tpl.html'
            }
        },
        data: {
            pageTitle: 'Timecard Export Report',
            access: access.timecardsExport
        }
    });

}])

.controller("TimecardExportCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage",
    function($scope, Services, HelperService, $timeout,$localStorage) {

        $scope.reportFilters = {};
        $scope.field = {};
        $scope.reportFilters.employee = '';
        $scope.employeeField = false;
        $scope.jobField = false;
        $scope.reportFilters.zone = null;
         if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
}

        $scope.showerrorMsg = false;
        $scope.show_activities_loader = false;
        $scope.show_download_loader = false;
        $scope.groupBy = "employee_code";
        $scope.call_limit = 500;
        $scope.showRecord = 0;
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");

        $scope.loadData = function(fdate, ldate, zone, employee, offset) {
            $scope.empData = [];
            $scope.jobData = [];
            var filterObj = {
                'fields': "employee_code,Job_code,employee_name,job_name,clockin,clockout,work_duration,work_duration_non_rounded_number,work_duration_rounded,work_duration_rounded_number",
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'employee_code desc',
                'filter': "employee_code <>'' and job_code<>'' and clockin >='" + fdate + "' and clockout <='" + ldate + "' and agency_id = " + Services.getAgencyID()
            };

            if (employee && !angular.isUndefined(employee.code) && employee.code) {
                filterObj.filter = filterObj.filter + ' and  employee_code = "' + employee.code + '"';
               
            } else if ($scope.zone_id) {
                filterObj.filter = filterObj.filter + ' and empzone_code in (' + $scope.zone_id + ')';

            }

            Services.employeeActivitiesService.get(filterObj, function(data) {
                if (data.record.length !== 0) {

                    $scope.employeecode = HelperService.getAsArray(data.record, "employee_code");
                    $scope.jobcode = HelperService.getAsArray(data.record, "Job_code");


                    empfilterObj = {
                        'fields': "zone_detail,external_code,is_supervisor,skill_detail,status,agency_id,access_code,primary_address1,primary_address2,primary_city,primary_state,primary_zip",
                        'filter': 'access_code in (' + $scope.employeecode + ') and agency_id = ' + Services.getAgencyID()
                    };
                    Services.employeeService.get(empfilterObj, function(emp_data) {
                        angular.forEach(emp_data.record, function(item, key) {
                            empzone = (item.zone_detail ? JSON.parse(item.zone_detail) : "");
                            empext = (item.external_code ? JSON.parse(item.external_code) : "");
                            $scope.empData[item.access_code] = {
                                "empZone": empzone.text + ' (' + empzone.id + ')',
                                "empLevel": HelperService.checklevel(item.is_supervisor),
                                "empskill": (item.skill_detail ? (JSON.parse(item.skill_detail)).text : ""),
                                "empStatus": HelperService.checkstatus(item.status),
                                "empagencyid": item.agency_id,
                                "empext1": empext.code1,
                                "empext2": empext.code2,
                                "empext3": empext.code3,
                                "primary_address1":item.primary_address1,
                                "primary_address2":item.primary_address2,
                                "primary_city":item.primary_city,
                                "primary_state":item.primary_state,
                                "primary_zip":item.primary_zip,

                            };
                        });
                        jobfilterObj = {
                            'fields': "job_zone_detail,external_code,contact_name,pay_type_detail,status,service_item_detail,job_code,jobgroup",
                            'filter': 'job_code in (' + $scope.jobcode + ') and agency_id = ' + Services.getAgencyID()
                        };
                        Services.jobService.get(jobfilterObj, function(job_data) {
                            angular.forEach(job_data.record, function(item, key) {
                                jobzone = (item.job_zone_detail ? JSON.parse(item.job_zone_detail) : "");
                                jobext = (item.external_code ? JSON.parse(item.external_code) : "");
                                $scope.jobData[item.job_code] = {
                                    "jobZone": jobzone.text + ' (' + jobzone.id + ')',
                                    "jobContact": item.contact_name,
                                    "jobStatus": HelperService.checkstatus(item.status),
                                    "jobPaytype": (item.pay_type_detail ? (JSON.parse(item.pay_type_detail)).text : ""),
                                    "jobServiceitem": (item.service_item_detail ? (JSON.parse(item.service_item_detail)).text : ""),
                                    "jobGroup": item.jobgroup,
                                    "jobext1": jobext.code1,
                                    "jobext2": jobext.code2,
                                    "jobext3": jobext.code3

                                };
                            });


                            angular.forEach(data.record, function(item, key) {
                                $scope.resultData.push({
                                    "employee_code": item.employee_code,
                                    "employee_name": item.employee_name,
                                    "Job_code": item.Job_code,
                                    "job_name": item.job_name,
                                    "clockin": HelperService.formatingDate(item.clockin,$localStorage.user_info.country),
                                    "clockout": HelperService.formatingDate(item.clockout,$localStorage.user_info.country),
                                    "work_duration": item.work_duration,
                                    "work_duration_non_rounded_number": (item.work_duration_non_rounded_number) ? Number(parseFloat(item.work_duration_non_rounded_number.replace(',', ''))) : Number(0),
                                    "work_duration_formated": (item.work_duration_non_rounded_number) ? HelperService.formating_hours(HelperService.floatToTime(parseFloat(item.work_duration_non_rounded_number.replace(',', '')))) : "(0h 0m)",
                                    "work_duration_rounded": item.work_duration_rounded,
                                    "work_duration_rounded_number": (item.work_duration_rounded_number) ? Number(parseFloat(item.work_duration_rounded_number.replace(',', ''))) : Number(0),
                                    "work_duration_rounded_formated": (item.work_duration_rounded_number) ? HelperService.formating_hours(HelperService.floatToTime(parseFloat(item.work_duration_rounded_number.replace(',', '')))) : "(0h 0m)",
                                    "empZone": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empZone: "",
                                    "empLevel": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empLevel : "",
                                    "empskill": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empskill : "",
                                    "empStatus": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empStatus : "",
                                    "empagencyid": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empagencyid : "",
                                    "empext1": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empext1 : "",
                                    "empext2": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empext2 : "",
                                    "empext3": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].empext3 : "",
                                    "primary_address1": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].primary_address1 : "",
                                    "primary_address2": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].primary_address2 : "",
                                    "primary_city": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].primary_city : "",
                                    "primary_state": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].primary_state : "",
                                    "primary_zip": ($scope.empData[item.employee_code]) ? $scope.empData[item.employee_code].primary_zip : "",
                                    "jobZone": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobZone : "",
                                    "jobContact": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobContact : "",
                                    "jobStatus": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobStatus : "",
                                    "jobPaytype": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobPaytype : "",
                                    "jobServiceitem": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobServiceitem : "",
                                    "jobGroup": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobGroup : "",
                                    "jobext1": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobext1 : "",
                                    "jobext2": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobext2 : "",
                                    "jobext3": ($scope.jobData[item.Job_code]) ? $scope.jobData[item.Job_code].jobext3 : ""
                                    

                                });
                            });
                            if (data.meta.count > (offset + $scope.call_limit)) {

                                var nextOffset = offset + $scope.call_limit + 1;
                                $scope.loadData(fdate, ldate, zone, employee, nextOffset);
                            } else {
                                $scope.show_activities_loader = false;
                                if ($scope.resultData.length !== 0) {
                                    $scope.noRecord = 0;
                                    $scope.showRecord = 1;
                                    $scope.ctx = {
                                        flexGrid: null,
                                        data: $scope.resultData,
                                        includeColumnHeader: true
                                    };
                                    $scope.TimecardDetails = new wijmo.collections.CollectionView($scope.resultData);
                                    $scope.TimecardDetails.pageSize = 10;
                                    //$scope.groupBy = 'employee_code';
                                    $scope.TimecardDetails.groupDescriptions.clear(); // clear current groups
                                    if ($scope.groupBy) {
                                        var groupDesc = new wijmo.collections.PropertyGroupDescription($scope.groupBy);
                                        $scope.TimecardDetails.groupDescriptions.push(groupDesc);


                                    }

                                } else {
                                    $scope.noRecord = 1;
                                    $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                                }

                            }

                        });


                    });
                } else {

                   $scope.show_activities_loader = false;
                                if ($scope.resultData.length !== 0) {
                                    $scope.noRecord = 0;
                                    $scope.showRecord = 1;
                                    $scope.ctx = {
                                        flexGrid: null,
                                        data: $scope.resultData,
                                        includeColumnHeader: true
                                    };
                                    $scope.TimecardDetails = new wijmo.collections.CollectionView($scope.resultData);
                                    $scope.TimecardDetails.pageSize = 10;
                                    //$scope.groupBy = 'employee_code';
                                    $scope.TimecardDetails.groupDescriptions.clear(); // clear current groups
                                    if ($scope.groupBy) {
                                        var groupDesc = new wijmo.collections.PropertyGroupDescription($scope.groupBy);
                                        $scope.TimecardDetails.groupDescriptions.push(groupDesc);


                                    }

                                } else {
                                    $scope.noRecord = 1;
                                    $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                                }
                }


            });

        };

        $scope.$watch('groupBy', function() {
            if ($scope.TimecardDetails) {
                var cv = $scope.TimecardDetails;
                cv.groupDescriptions.clear(); // clear current groups 
                if ($scope.groupBy) {
                    var groupName = $scope.groupBy;
                    var groupDesc = new wijmo.collections.PropertyGroupDescription(groupName);
                    cv.groupDescriptions.push(groupDesc);

                }
            }
        });

        $scope.exportExcel = function() {
            if ($scope.noRecord === 0) {
                var pageSize = $scope.ctx.flexGrid.collectionView.pageSize;
                $scope.ctx.flexGrid.collectionView.pageSize = 0;
                var result = wijmo.grid.ExcelConverter.export($scope.ctx.flexGrid, {
                    includeColumnHeader: $scope.ctx.includeColumnHeader
                });
                $scope.ctx.flexGrid.collectionView.pageSize = pageSize;
                if (navigator.msSaveBlob) {
                    var blob = new Blob([result.base64Array]);

                    navigator.msSaveBlob(blob, $('#export').attr("download"));
                } else {
                    $('#export')[0].href = result.href();
                }
            }
        };
        $scope.updateTableData = function() { // on limit change

            if ($scope.reportFilters.startDate && $scope.reportFilters.endDate) {

                if (Date.parse($scope.reportFilters.startDate) > Date.parse($scope.reportFilters.endDate)) {
                    $scope.showerrorMsg = true;
                    $scope.error_msg = "Invalid Date";
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }
            } else {
                $scope.showerrorMsg = true;
                $scope.error_msg = "Please Select Date";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

            //console.log($scope.reportFilters.zone);
            //console.log($scope.reportFilters.employee);
            if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || (($scope.reportFilters.employee === "") && ($scope.reportFilters.zone[0].id !== "all" && $scope.reportFilters.employee.id !== "all")))

            {

                $scope.showerrorMsg = true;
                $scope.error_msg = "Please use the required filters";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);

                return false;

            }


            $scope.showRecord = 0;
            $scope.resultData = [];
            $scope.noRecord = 0;
            $scope.show_activities_loader = true;
            var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
            var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
            var addObj = a.add('24', 'hours');
            var ldatehrs = addObj.toDate();
            var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
            $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
            $scope.zone_id = $scope.zone_nameid.Code;
            $scope.zone_name = $scope.zone_nameid.Code_Name;

            mixpanelObj = {
                "Zone": ($scope.zone_name ? $scope.zone_name : "All"),
                "Start Date": '"' + moment($scope.reportFilters.startDate).format('MM/DD/YYYY') + '"',
                "End Date": '"' + moment($scope.reportFilters.endDate).format('MM/DD/YYYY') + '"',
                "Agency": Services.serviceName
            };

            if ($scope.reportFilters.employee && !angular.isUndefined($scope.reportFilters.employee.code)) {
                var temp_empcode = "All";
                if ($scope.reportFilters.employee.code) {
                    temp_empcode = $scope.reportFilters.employee.text + ' (' + $scope.reportFilters.employee.code + ')';
                }
                mixpanelObj.Employee = temp_empcode;

            }
            mixpanel.track("Timecard Export Report", mixpanelObj);



            $scope.loadData(fdate, ldate, $scope.reportFilters.zone, $scope.reportFilters.employee, 0);


        };
        $scope.noRecord = 1;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Timecard Export');




        $scope.clearSearch = function() {
            $scope.field = {};
            $scope.groupBy = "employee_code";
            $scope.reportFilters.employee = '';
            $scope.reportFilters.zone = null;
             if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
}
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
            $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
            $scope.noRecord = 1;
            $scope.showRecord = 0;
            $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Timecard Export');
            //$scope.updateTableData();

        };

        $scope.$watch('reportFilters.zone', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.reportFilters.employee = '';
            }


        });
        $scope.selectZone = {
            multiple: true,
            query: function(query) {
                var data = {
                    results: []
                };
                $scope.reportFilters.employee = '';
                var getZone = true;

                if ($scope.reportFilters.zone !== null && !angular.isUndefined($scope.reportFilters.zone[0]) && $scope.reportFilters.zone[0].code === "") {
                    getZone = false;
                    data = {
                        results: []
                    };

                } else if ($scope.reportFilters.zone === null || angular.isUndefined($scope.reportFilters.zone[0])) {
                    data.results.push({
                        text: 'All',
                        id: 'all',
                        code: ''
                    });
                }

                if (getZone === true) {

                     $scope.zoneObj = {
                        fields: "zone_name,zone_code,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'zone_name asc',
                        limit: 5
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
                                "code": item.zone_code
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


        $scope.selectEmployee = {
            query: function(query) {
                var data = {
                    results: []
                };
                data.results.push({
                    text: 'All',
                    id: 'all',
                    code: ''
                });
                $scope.filterVal = [];
                $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
                $scope.empObj = {
                    fields: "last_name,first_name,access_code,id",
                    filter: "status > 0 and zone_id in(" + $scope.zone_id + ") and agency_id =" + Services.getAgencyID(),
                    order: 'last_name asc',
                    limit: 5
                };
                if (query.term) {
                    $scope.empObj.filter += " and ( last_name like '%" + query.term + "%' or first_name like '%" + query.term + "%' )";
                }
                Services.employeeService.get($scope.empObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            text: item.last_name + ', ' + item.first_name,
                            id: item.id,
                            code: item.access_code
                        });
                        query.callback(data);

                    });

                });




            },
            initSelection: function(element, callback) {}
        };

    }
]);