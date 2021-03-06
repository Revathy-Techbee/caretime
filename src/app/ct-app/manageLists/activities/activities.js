angular.module('ctApp.activities', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.activities', {
        url: '/activities',
        views: {
            "appNested": {
                controller: 'ActivitiesCtrl',
                templateUrl: 'ct-app/manageLists/activities/activities.tpl.html'
            }
        },
        data: {
            pageTitle: 'Activities',
            access: access.activities
        }
    }).state('ctApp.addUpdateActivity', {
        url: '/activity/:activityId',
        views: {
            "appNested": {
                controller: 'AddUpdateActivityCtrl',
                templateUrl: 'ct-app/manageLists/activities/add-update-activity.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit Activity',
            access: access.activities
        }
    });

}])

.controller("ActivitiesCtrl", ["$scope", "Services", "$state", "$modal", "$localStorage",
    function($scope, Services, $state, $modal, $localStorage) {
        $scope.empCountry = $localStorage.user_info.country;
        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_activities_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "name";
        $scope.sortType = "asc";
        $scope.activityDetailList = [];


        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_activities_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.activityDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
            }

            Services.auth_activityService.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.activityDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_activities_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.activityDetailList = [];
            $scope.config.show_activities_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.auth_activityService.get($scope.filterObj, function(data) {
                $scope.activityDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_activities_loader = false;
            });

        };

        $scope.applyProgramSort = function() {
            $scope.updateTableData();
        };

        $scope.clearSearch = function() {
            $scope.config.general.searchtxt = "";
            $scope.updateTableData();
        };


        $scope.enableEditView = function(id) {
            $state.go("ctApp.addUpdateActivity", {
                activityId: id
            });
        };
        $scope.enableDelete = function(id) {
            Services.setModelTempVar(id);
            $scope.modalInstance = $modal.open({
                template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Activity permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
                controller: 'DeleteActivityCtrl'
            });
            $scope.modalInstance.result.then(function(id) {
                Services.auth_activityService.delete({
                    filter: "id='" + id + "'"
                }, function(data) {
                    $scope.logger = {};
                    $scope.logger.userid = $localStorage.user_info.user_id;
                    $scope.logger.user_detail = JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                    });
                    $scope.logger.action ="Delete";
                    $scope.logger.agency_id = Services.getAgencyID();
                    $scope.logger.action_id =  id;
                    $scope.logger.action_table ="auth_activity";
                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                    Services.userLog.save({
                    }, $scope.logger, function(data) {

                    });


                    $scope.updateTableData();
                });

            }, function() {

            });

        };


    }
])

/*
 * Add Update
 * Activity Controller....
 * **/

.controller("AddUpdateActivityCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage",
        function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {

            $scope.activity_id = $stateParams.activityId;
            $scope.activity = {};
            $scope.pageTitle = "Add New";
            $scope.activityDBField = null;
            $scope.show_activity_form_loader = false;
            $scope.activity.status = 1;
            $scope.savedisable = 0;

            $scope.getActivityDetail = function() {
                if ($scope.activity_id) {
                    $scope.pageTitle = "Update";


                    Services.auth_activityService.get({
                        "filter": "id='" + $scope.activity_id + "'"
                    }, function(resp) {
                        $scope.activityDBField = resp.record[0];
                        angular.extend($scope.activity, {
                            name: $scope.activityDBField.name,
                            status: $scope.activityDBField.status,
                            created_on: HelperService.convertUTCtoMytimeZone($scope.activityDBField.created_on),
                            created_by: $scope.activityDBField.created_by,
                            editedOn: HelperService.convertUTCtoMytimeZone($scope.activityDBField.edited_on),
                            edited_by: $scope.activityDBField.edited_by
                        });
                    });


                }
            };
            $scope.getActivityDetail();
            $scope.activityManage = function() {
                $scope.showerrorMsg = false;
                if ($scope.addUpdateActivityForm.$valid) {
                    $scope.show_activity_form_loader = true;
                    $scope.savedisable = 1;
                    $scope.filterObj = {
                        field: "id",
                        filter: 'name="' + $scope.activity.name + '" and agency_id = ' + Services.getAgencyID()

                    };
                    if (!angular.isUndefined($scope.activity_id) && $scope.activity_id) {
                        $scope.filterObj.filter += " and id <>" + $scope.activity_id;
                    }
                    Services.auth_activityService.get($scope.filterObj, function(data) {
                        if (data.record.length > 0) {
                            $scope.show_activity_form_loader = false;
                            $scope.savedisable = 0;
                            $scope.showerrorMsg = true;
                            $scope.ErrorClass = "danger";
                            $scope.ErrorMsg = "Activity Alread Exist!!!";
                            jQuery(".basic .ng-invalid").addClass("ng-dirty");
                            $timeout(function() {
                                $scope.showerrorMsg = false;
                            }, 3000);
                            return false;
                        } else {
                            $scope.activityDBField = {
                                name: $scope.activity.name,
                                status: $scope.activity.status
                            };

                            if ($scope.activity_id) { // means it is in edit state
                                $scope.activityDBField.edited_on = moment().utc();
                                $scope.activityDBField.edited_by = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                    "user_id": $localStorage.user_info.user_id
                                });


                            } else {
                                $scope.activityDBField.agency_id = Services.getAgencyID();
                                $scope.activityDBField.created_on = moment().utc();
                                $scope.activityDBField.created_by = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                    "user_id": $localStorage.user_info.user_id
                                });
                            }

                            if ($scope.activity_id) {

                                Services.auth_activityService.update({
                                    id: $stateParams.activityId
                                }, $scope.activityDBField, function(data) {
                                    //auth_activity
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
                                    $scope.logger.action_table ="auth_activity";
                                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                    Services.userLog.save({
                                    }, $scope.logger, function(data) {

                                    });
                                    $scope.show_activity_form_loader = false;
                                    $scope.showMessageFunc("Activity detail edited successfully.", "success", function() {
                                        $timeout(function() {
                                            $scope.showerrorMsg = false;
                                            $state.go("ctApp.activities");
                                        }, 3000);
                                    });
                                });

                            } else {

                                Services.auth_activityService.save($scope.activityDBField, function(data) {
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
                                    $scope.logger.action_table ="auth_activity";
                                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                    Services.userLog.save({
                                    }, $scope.logger, function(data) {

                                    });
                                    $scope.showMessageFunc("New Activity added successfully.", "success", function() {
                                        $scope.show_activity_form_loader = false;
                                        $timeout(function() {
                                            $scope.showerrorMsg = false;
                                            $state.go("ctApp.activities");
                                        }, 3000);
                                    });
                                });

                            }
                        }
                    });


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




            $scope.cancelActivity = function() {
                $state.go("ctApp.activities");
            };

        }
    ])
    .controller("DeleteActivityCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
        var ActivityID = Services.getModelTempVar();
        Services.setModelTempVar('');
        $scope.all = function() {
            $modalInstance.close(ActivityID);
        };
        $scope.cancel = function() {

            $modalInstance.dismiss('cancel');

        };
    }]);