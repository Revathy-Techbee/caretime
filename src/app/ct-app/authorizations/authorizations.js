angular.module('ctApp.authorizations', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.authorizations', {
        url: '/authorizations',
        views: {
            "appNested": {
                controller: 'AuthorizationsCtrl',
                templateUrl: 'ct-app/authorizations/authorizations.tpl.html'
            }
        },
        data: {
            pageTitle: 'Authorizations',
            access: access.authorizations
        }
    }).state('ctApp.addUpdateAuthorization', {
        url: '/authorizations/:action/:authorizationId',
        views: {
            "appNested": {
                controller: 'AddUpdateAuthorizationCtrl',
                templateUrl: 'ct-app/authorizations/add-update-authorizations.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit Authorization',
            access: access.authorizations
        }
    });

}])

.controller("AuthorizationsCtrl", ["$scope", "Services", "$state", "$modal","HelperService","$localStorage",
    function($scope, Services, $state, $modal,HelperService,$localStorage) {
        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_authorizations_loader: true
        };
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
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "job";
        $scope.sortType = "asc";
        $scope.authorizationDetailList = [];


        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_authorizations_loader = true;
            $scope.filterObj = {
                fields: "job_detail,payor_detail,authorization_start_date,authorization_end_date,frequency,hours,total_hours,status,id",
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.authorizationDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter:'agency_id='+Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter +' and (job_detail  like "%' + $scope.config.general.searchtxt + '%" or zone_detail like "%' + $scope.config.general.searchtxt + '%" or skill_detail   like "%' + $scope.config.general.searchtxt + '%" or payor_detail   like "%' + $scope.config.general.searchtxt + '%" or acitivity_detail  like "%' + $scope.config.general.searchtxt + '%" or total_hours like "%' + $scope.config.general.searchtxt + '%" or payor_ref_number like "%' + $scope.config.general.searchtxt + '%" or notes  like "%' + $scope.config.general.searchtxt + '%")';
            }
            if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && ($scope.config.general.zone[0].id !== "all")) {
                $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
                $scope.filterObj.filter += ' and zone in(' + $scope.zone_id + ')';
                
            }

            Services.jobauthorizationService.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.authorizationDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_authorizations_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.authorizationDetailList = [];
            $scope.config.show_authorizations_loader = true;
            $scope.filterObj = {
                fields: "job_detail,payor_detail,authorization_start_date,authorization_end_date,frequency,hours,total_hours,status,id",
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter:'agency_id='+Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter +' and (job_detail  like "%' + $scope.config.general.searchtxt + '%" or zone_detail like "%' + $scope.config.general.searchtxt + '%" or skill_detail   like "%' + $scope.config.general.searchtxt + '%" or payor_detail   like "%' + $scope.config.general.searchtxt + '%" or acitivity_detail  like "%' + $scope.config.general.searchtxt + '%" or total_hours like "%' + $scope.config.general.searchtxt + '%" or payor_ref_number like "%' + $scope.config.general.searchtxt + '%" or notes  like "%' + $scope.config.general.searchtxt + '%")';
            }
            if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && ($scope.config.general.zone[0].id !== "all")) {
                $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
                $scope.filterObj.filter += ' and zone in(' + $scope.zone_id + ')';
               
            }
            Services.jobauthorizationService.get($scope.filterObj, function(data) {
                $scope.authorizationDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_authorizations_loader = false;
            });

        };

        $scope.applyProgramSort = function() {
            $scope.updateTableData();
        };

        $scope.clearSearch = function() {
            $scope.config.general.searchtxt = "";
            if ($localStorage.user_info.iszone_code) {
                Services.getEmpZoneDetail().then(function(res) {

                    $scope.config.general.zone = [{
                        "text": res.data.record[0]["zone_name"],
                        "id": res.data.record[0]["id"],
                        "code": res.data.record[0]["zone_code"]
                    }];
                    $scope.updateTableData();


                });


            }
            else
            {
                $scope.config.general.zone = null;
                $scope.updateTableData();

            }
        };


        $scope.enableEditView = function(id) {
            $state.go("ctApp.addUpdateAuthorization", {
                action: "edit",
                authorizationId: id
            });
        };
        $scope.enableCopy = function(id) {
            $state.go("ctApp.addUpdateAuthorization", {
                action: "copy",
                authorizationId: id
            });
        };
        $scope.enableDelete = function(id) {
            Services.setModelTempVar(id);
            $scope.modalInstance = $modal.open({
                template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Authorization permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
                controller: "DeleteAuthorizationCtrl"
               
            });
            $scope.modalInstance.result.then(function(id) {
                Services.jobauthorizationService.delete({
                    filter: "id='" + id + "'"
                }, function(data) {
                    $scope.updateTableData();
                });

            }, function() {

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
                        filter: "status > 0 and agency_id="+Services.getAgencyID(),
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
 * Authorization Controller....
 * **/

.controller("AddUpdateAuthorizationCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage",
    function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {

        $scope.savedisable = 0;
        $scope.jobAuthorization = {};
        $scope.jobAuthorization.status = 1;
        $scope.pageTitle = "Add New";
        $scope.authorization_id = $stateParams.authorizationId;
        $scope.authorization_action = $stateParams.action;
        if ($localStorage.user_info.iszone_code && !$scope.authorization_id) {
                Services.getEmpZoneDetail().then(function(res) {
                    $scope.jobAuthorization.zone = {
                        "text": res.data.record[0]["zone_name"],
                        "id": res.data.record[0]["zone_code"]
                    };
                });
            }

        $scope.getAuthorizationDetail = function() {
            if (!angular.isUndefined($scope.authorization_id) && $scope.authorization_id) {
                Services.jobauthorizationService.get({
                    filter: "id='" + $scope.authorization_id + "'"
                }, function(remoteData) {
                    $scope.jobAuthorizationDBField = remoteData.record[0];
                    $scope.jobAuthorization.zone = ($scope.jobAuthorizationDBField.zone_detail) ? JSON.parse($scope.jobAuthorizationDBField.zone_detail) : "";
                    $scope.jobAuthorization.job = ($scope.jobAuthorizationDBField.job_detail) ? JSON.parse($scope.jobAuthorizationDBField.job_detail) : "";

                    $scope.jobAuthorization.payor = ($scope.jobAuthorizationDBField.payor_detail) ? JSON.parse($scope.jobAuthorizationDBField.payor_detail) : "";
                    $scope.jobAuthorization.skill = ($scope.jobAuthorizationDBField.skill_detail) ? JSON.parse($scope.jobAuthorizationDBField.skill_detail) : "";

                    $scope.jobAuthorization.frequancy = {
                        "text": $scope.jobAuthorizationDBField.frequency,
                        "id": $scope.jobAuthorizationDBField.frequency
                    };
                    $scope.jobAuthorization.acitivity = ($scope.jobAuthorizationDBField.acitivity_detail) ? JSON.parse($scope.jobAuthorizationDBField.acitivity_detail) : "";
                    $scope.jobAuthorization.payor_ref_number = $scope.jobAuthorizationDBField.payor_ref_number;
                    $scope.jobAuthorization.payor_medicare_id = $scope.jobAuthorizationDBField.payor_medicare_id;
                    $scope.jobAuthorization.status = $scope.jobAuthorizationDBField.status;
                    $scope.jobAuthorization.notes = $scope.jobAuthorizationDBField.notes;




                    if (!angular.isUndefined($scope.authorization_action) && $scope.authorization_action && $scope.authorization_action == 'edit') {
                        $scope.pageTitle = "Update";

                        $scope.jobAuthorization.startdate = ($scope.jobAuthorizationDBField.authorization_start_date) ? moment($scope.jobAuthorizationDBField.authorization_start_date).format("YYYY-MM-DD") : "";
                        $scope.jobAuthorization.enddate = ($scope.jobAuthorizationDBField.authorization_end_date) ? moment($scope.jobAuthorizationDBField.authorization_end_date).format("YYYY-MM-DD") : "";
                        $scope.jobAuthorization.hours = $scope.jobAuthorizationDBField.hours;
                        $scope.jobAuthorization.total_hours = $scope.jobAuthorizationDBField.total_hours;
                        $scope.jobAuthorization.editedOn = ($scope.jobAuthorizationDBField.updated_on)?HelperService.convertUTCtoMytimeZone(moment.tz($scope.jobAuthorizationDBField.updated_on,"UTC").format()):"";
                        $scope.jobAuthorization.edited_by = $scope.jobAuthorizationDBField.edited_by;
                        $scope.jobAuthorization.created_on = HelperService.convertUTCtoMytimeZone(moment.tz($scope.jobAuthorizationDBField.created_on,"UTC").format());
                        $scope.jobAuthorization.created_by = $scope.jobAuthorizationDBField.created_by;


                    }

                });
            }
        };
        $scope.getAuthorizationDetail();
        $scope.calculateTotalhrs = function() {

            if ($scope.jobAuthorization.startdate && $scope.jobAuthorization.enddate && $scope.jobAuthorization.frequancy && $scope.jobAuthorization.hours) {
                if($scope.jobAuthorization.hours>0)
                {
                      $scope.jobAuthorization.total_hours = HelperService.totalAuthorizedHours($scope.jobAuthorization.frequancy.text, moment($scope.jobAuthorization.startdate).format('YYYY-MM-DD'), moment($scope.jobAuthorization.enddate).format('YYYY-MM-DD'), $scope.jobAuthorization.hours);
                }
                else
                {
                    $scope.jobAuthorization.hours = '';
                }
              



            } else {
                $scope.jobAuthorization.total_hours = 0;
                
            }
        };
        $scope.saveJobAuthorization = function() {
            $scope.savedisable = 1;
            if (!($scope.jobAuthorization.zone) || !($scope.jobAuthorization.job) || !($scope.jobAuthorization.payor) || !($scope.jobAuthorization.skill) || !($scope.jobAuthorization.acitivity) || !($scope.jobAuthorization.hours) || !($scope.jobAuthorization.startdate) || !($scope.jobAuthorization.enddate) || !($scope.jobAuthorization.frequancy)) {
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Required field is missing !!!";
                jQuery(".addtimecard .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

          
            if (Date.parse($scope.jobAuthorization.startdate) > Date.parse($scope.jobAuthorization.enddate)) {
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Invalid End Date!!!";
                jQuery(".addtimecard .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            } else {
                $scope.filterObj = {
                        fields:"id",
                        filter: "agency_id = " + Services.getAgencyID() +" and skill='" + $scope.jobAuthorization.skill.id + "' and acitivity='" + $scope.jobAuthorization.acitivity.id + "' and authorization_start_date ='" + moment($scope.jobAuthorization.startdate).format('YYYY-MM-DD') + "' and authorization_end_date ='" + moment($scope.jobAuthorization.enddate).format('YYYY-MM-DD') + "' and frequency ='" + $scope.jobAuthorization.frequancy.id + "' and payor ='" + $scope.jobAuthorization.payor.id + "' and job ='" + $scope.jobAuthorization.job.id + "'"
                    };
                if ($scope.authorization_id && $scope.authorization_action == 'edit') {
                    $scope.filterObj.filter=$scope.filterObj.filter + " and id!='" + $scope.authorization_id + "'";

                }


                Services.jobauthorizationService.get($scope.filterObj, function(remoteData) {

                    if (remoteData.record.length > 0) {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Authorization Already Exist";
                        jQuery(".addtimecard .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    } else {

                        $scope.savedisable = 1;
                        if ($scope.authorization_id && $scope.authorization_action == 'edit') {

                            var updateprompt = {
                                zone: $scope.jobAuthorization.zone.id,
                                zone_detail: JSON.stringify($scope.jobAuthorization.zone),
                                job: $scope.jobAuthorization.job.id,
                                job_detail: JSON.stringify($scope.jobAuthorization.job),
                                payor: $scope.jobAuthorization.payor.id,
                                skill: $scope.jobAuthorization.skill.id,
                                authorization_start_date: moment($scope.jobAuthorization.startdate).format('YYYY-MM-DD'),
                                authorization_end_date: moment($scope.jobAuthorization.enddate).format('YYYY-MM-DD'),
                                hours: $scope.jobAuthorization.hours,
                                total_hours: $scope.jobAuthorization.total_hours,
                                frequency: $scope.jobAuthorization.frequancy.id,
                                acitivity: $scope.jobAuthorization.acitivity.id,
                                payor_ref_number: $scope.jobAuthorization.payor_ref_number,
                                payor_medicare_id: $scope.jobAuthorization.payor_medicare_id,
                                status: $scope.jobAuthorization.status,
                                notes: $scope.jobAuthorization.notes,
                                updated_on: moment().utc(),
                                skill_detail: JSON.stringify($scope.jobAuthorization.skill),
                                acitivity_detail: JSON.stringify($scope.jobAuthorization.acitivity),
                                payor_detail: JSON.stringify($scope.jobAuthorization.payor),
                                edited_by:JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                    "user_id": $localStorage.user_info.user_id
                                })



                            };
                         
                            $scope.savedisable = 1;
                            Services.jobauthorizationService.update({
                                id: $scope.authorization_id
                            }, updateprompt, function(data) {

                                $scope.logger = {};
                                $scope.logger.userid = $localStorage.user_info.user_id;
                                $scope.logger.username = $localStorage.user_info.username;
                                $scope.logger.useremail = $localStorage.user_info.email;
                                $scope.logger.authorization_id = data.id;
                                $scope.logger.activity = 'Update "' + data.id + '" record by ' + $localStorage.user_info.username;
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");
                                $scope.logger.timestamp_ref = moment().utc();

                                Services.log_details.save({
                                    dbname: 'log_authorization'
                                }, $scope.logger, function(data) {

                                });

                                $scope.showerrorMsg = true;
                                $scope.ErrorClass = "success";
                                $scope.ErrorMsg = "Authorization edited sucessfully !!!";
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $scope.cancelAuthorization();
                                }, 3000);

                            });
                              
                        } else {
                            $scope.savedisable = 1;
                            var addprompt = {
                                zone: $scope.jobAuthorization.zone.id,
                                zone_detail: JSON.stringify($scope.jobAuthorization.zone),
                                job: $scope.jobAuthorization.job.id,
                                job_detail: JSON.stringify($scope.jobAuthorization.job),
                                payor: $scope.jobAuthorization.payor.id,
                                skill: $scope.jobAuthorization.skill.id,
                                authorization_start_date: moment($scope.jobAuthorization.startdate).format('YYYY-MM-DD'),
                                authorization_end_date: moment($scope.jobAuthorization.enddate).format('YYYY-MM-DD'),
                                hours: $scope.jobAuthorization.hours,
                                total_hours: $scope.jobAuthorization.total_hours,
                                frequency: $scope.jobAuthorization.frequancy.id,
                                acitivity: $scope.jobAuthorization.acitivity.id,
                                payor_ref_number: $scope.jobAuthorization.payor_ref_number,
                                payor_medicare_id: $scope.jobAuthorization.payor_medicare_id,
                                status: $scope.jobAuthorization.status,
                                notes: $scope.jobAuthorization.notes,
                                created_on: moment().utc(),
                                skill_detail: JSON.stringify($scope.jobAuthorization.skill),
                                acitivity_detail: JSON.stringify($scope.jobAuthorization.acitivity),
                                payor_detail: JSON.stringify($scope.jobAuthorization.payor),
                                created_by: JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                    "user_id": $localStorage.user_info.user_id
                                }),
                                agency_id:Services.getAgencyID()


                            };

                            Services.jobauthorizationService.save(addprompt, function(data) {

                                $scope.logger = {};
                                $scope.logger.userid = $localStorage.user_info.user_id;
                                $scope.logger.username = $localStorage.user_info.username;
                                $scope.logger.useremail = $localStorage.user_info.email;
                                $scope.logger.authorization_id = data.id;
                                $scope.logger.activity = 'Created "' + data.id + '" record by ' + $localStorage.user_info.username;
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");
                                $scope.logger.timestamp_ref = moment().utc();

                                Services.log_details.save({
                                    dbname: 'log_authorization'
                                }, $scope.logger, function(data) {

                                });


                                $scope.showerrorMsg = true;
                                $scope.ErrorClass = "success";
                                $scope.ErrorMsg = "Authorization Added sucessfully !!!";
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $state.go("ctApp.authorizations");
                                }, 3000);

                            });
                        }
                    }
                });



            }

        };

        $scope.selectzone = {

            query: function(query) {
                var data = {
                    results: []
                };
                $scope.jobAuthorization.job='';
                 $scope.zoneObj = {
                        fields: "zone_name,zone_code",
                        filter: "status > 0 and agency_id="+Services.getAgencyID(),
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
                            "id": item.zone_code
                        });
                        query.callback(data);

                    });

                });
            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.jobAuthorization.zone) && !angular.isUndefined($scope.jobAuthorization.zone.id) && $scope.jobAuthorization.zone.id) {
                    callback({
                        "text": $scope.jobAuthorization.zone.text,
                        "id": $scope.jobAuthorization.zone.id
                    });
                }

            }


        };


        $scope.frequancy = {

            query: function(query) {
                var data = {
                    results: []
                };

                var items = ["Total", "Daily", "Weekly", "Monthly"];
                angular.forEach(items, function(item, key) {
                    data.results.push({
                        "text": item,
                        "id": item
                    });
                    query.callback(data);

                });


            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.jobAuthorization.frequancy) && !angular.isUndefined($scope.jobAuthorization.frequancy.id) && $scope.jobAuthorization.frequancy.id) {
                    callback({
                        "text": $scope.jobAuthorization.frequancy.text,
                        "id": $scope.jobAuthorization.frequancy.id
                    });
                }

            }


        };



        $scope.selectJob = {

            query: function(query) {
                var data = {
                    results: []
                };
                $scope.filterVal = [];
                $scope.jobObj={
                    filter: "status > 0 and agency_id =" + Services.getAgencyID() + " and job_zone =" + $scope.jobAuthorization.zone.id,
                    order: 'job_name asc',
                    limit: 5
                };
                if (query.term) {
                        $scope.jobObj.filter += " and job_name like '%" + query.term + "%'";
                    }
                Services.jobService.get($scope.jobObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            name: item.job_name,
                            code: item.job_code,
                            text: item.job_name,
                            id: item.job_code
                        });
                        query.callback(data);

                    });


                });

            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.jobAuthorization.job) && !angular.isUndefined($scope.jobAuthorization.job.id) && $scope.jobAuthorization.job.id) {
                    callback({
                        "name": $scope.jobAuthorization.job.name,
                        "code": $scope.jobAuthorization.job.code,
                        "text": $scope.jobAuthorization.job.text,
                        "id": $scope.jobAuthorization.job.id

                    });
                }

            }

        };
        $scope.selectPayors = {

            query: function(query) {
                var data = {
                    results: []
                };
                 $scope.payorObj = {
                        fields: "name,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        'order': 'id  desc',
                        limit: 5
                    };
                    if (query.term) {
                        $scope.payorObj.filter += " and  name  like '%" + query.term + "%'";
                    }
                Services.auth_payorsService.get($scope.payorObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            text: item.name,
                            id: item.id
                        });
                        query.callback(data);

                    });


                });

            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.jobAuthorization.payor) && !angular.isUndefined($scope.jobAuthorization.payor.id) && $scope.jobAuthorization.payor.id) {
                    callback({
                        "text": $scope.jobAuthorization.payor.text,
                        "id": $scope.jobAuthorization.payor.id
                    });
                }

            }

        };
        $scope.selectActivity = {

            query: function(query) {
                var data = {
                    results: []
                };
                $scope.activityObj = {
                        fields: "name,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        'order': 'id  desc',
                        limit: 5
                    };
                    if (query.term) {
                        $scope.activityObj.filter += " and  name  like '%" + query.term + "%'";
                    }
                Services.auth_activityService.get($scope.activityObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            text: item.name,
                            id: item.id
                        });
                        query.callback(data);

                    });


                });

            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.jobAuthorization.acitivity) && !angular.isUndefined($scope.jobAuthorization.acitivity.id) && $scope.jobAuthorization.acitivity.id) {
                    callback({
                        "text": $scope.jobAuthorization.acitivity.text,
                        "id": $scope.jobAuthorization.acitivity.id
                    });
                }

            }

        };
        $scope.selectSkills = {

            query: function(query) {
                var data = {
                    results: []
                };
                $scope.skillObj = {
                        fields: "name,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        'order': 'id  desc',
                        limit: 5
                    };
                    if (query.term) {
                        $scope.skillObj.filter += " and  name  like '%" + query.term + "%'";
                    }
                Services.auth_skillsService.get($scope.skillObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            text: item.name,
                            id: item.id
                        });
                        query.callback(data);

                    });


                });

            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.jobAuthorization.skill) && !angular.isUndefined($scope.jobAuthorization.skill.id) && $scope.jobAuthorization.skill.id) {
                    callback({
                        "text": $scope.jobAuthorization.skill.text,
                        "id": $scope.jobAuthorization.skill.id
                    });
                }

            }

        };


        $scope.showMessageFunc = function(error_msg, error_class, callback) {
            $scope.ErrorMsg = error_msg || "Operation was successfull.";
            $scope.ErrorClass = error_class || "success";
            if (callback) {
                callback();
            } else {
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
            }
            $scope.showerrorMsg = true;
        };




        $scope.cancelAuthorization = function() {
            $state.go("ctApp.authorizations");
        };

    }
    ])
    .controller("DeleteAuthorizationCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
        var authorization_ID= Services.getModelTempVar();
        Services.setModelTempVar('');
        $scope.all = function() {
            $modalInstance.close(authorization_ID);
        };
        $scope.cancel = function() {

            $modalInstance.dismiss('cancel');

        };
    }
]);