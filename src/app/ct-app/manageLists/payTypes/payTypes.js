angular.module('ctApp.payTypes', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.payTypes', {
        url: '/payTypes',
        views: {
            "appNested": {
                controller: 'PayTypesCtrl',
                templateUrl: 'ct-app/manageLists/payTypes/payTypes.tpl.html'
            }
        },
        data: {
            pageTitle: 'PayTypes',
            access: access.payTypes
        }
    }).state('ctApp.addUpdatePayType', {
        url: '/payType/:payTypeId',
        views: {
            "appNested": {
                controller: 'AddUpdatePayTypeCtrl',
                templateUrl: 'ct-app/manageLists/payTypes/add-update-payType.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit PayType',
            access: access.payTypes
        }
    });

}])

.controller("PayTypesCtrl", ["$scope", "Services", "$state", "$modal","$localStorage",
    function($scope, Services, $state, $modal,$localStorage) {
        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_payTypes_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "name";
        $scope.sortType = "asc";
        $scope.payTypeDetailList = [];


        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_payTypes_loader = true;
            var filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.payTypeDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                filterObj.filter = filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
            }

            Services.pay_type.get(filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.payTypeDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_payTypes_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.payTypeDetailList = [];
            $scope.config.show_payTypes_loader = true;
            var filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                filterObj.filter = filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.pay_type.get(filterObj, function(data) {
                $scope.payTypeDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_payTypes_loader = false;
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
            $state.go("ctApp.addUpdatePayType", {
                payTypeId: id
            });
        };
        $scope.enableDelete = function(id) {
            Services.setModelTempVar(id);
            var modalInstance = $modal.open({
                template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Pay Type permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
                controller: 'DeletePayTypeCtrl'

            });
            modalInstance.result.then(function(id) {
                Services.pay_type.delete({
                    filter: "id='" + id + "'"
                }, function(data) {
                    //pay_type
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
                    $scope.logger.action_table ="pay_type";
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
 * PayType Controller....
 * **/

.controller("AddUpdatePayTypeCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage",
    function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {

        $scope.payType_id = $stateParams.payTypeId;
        $scope.payType = {};
        $scope.pageTitle = "Add New";
        $scope.payTypeDBField = null;
        $scope.show_payType_form_loader = false;
        $scope.payType.status = 1;
        $scope.savedisable = 0;
        $scope.overtime_exempts = [{
            "text": "No",
            "id": 0
        }, {
            "text": "Yes",
            "id": 1
        }];
        $scope.payType.overtime_exempt = {
            "text": "No",
            "id": 0
        };
        $scope.getPayTypeDetail = function() {
            if ($scope.payType_id) {
                $scope.pageTitle = "Update";


                Services.pay_type.get({
                    "filter": "id='" + $scope.payType_id + "'"
                }, function(resp) {

                    $scope.payTypeDBField = resp.record[0];
                    var overtime_exempt = $scope.payTypeDBField.overtime_exempt;

                    if (overtime_exempt == 1) {
                        $scope.payType.overtime_exempt = {
                            "text": "Yes",
                            "id": 1
                        };
                    }

                    angular.extend($scope.payType, {
                        name: $scope.payTypeDBField.name,
                        status: $scope.payTypeDBField.status,
                        created_on: HelperService.convertUTCtoMytimeZone($scope.payTypeDBField.created_on),
                        created_by: $scope.payTypeDBField.created_by,
                        editedOn: HelperService.convertUTCtoMytimeZone($scope.payTypeDBField.edited_on),
                        edited_by: $scope.payTypeDBField.edited_by
                    });
                });


            }
        };
        $scope.getPayTypeDetail();
        $scope.payTypeManage = function() {
            $scope.showerrorMsg = false;
            if ($scope.addUpdatePayTypeForm.$valid) {
                $scope.show_payType_form_loader = true;
                $scope.savedisable = 1;
                $scope.filterObj = {
                    field: "id",
                    filter: 'name="' + $scope.payType.name + '" and agency_id = ' + Services.getAgencyID()

                };
                if (!angular.isUndefined($scope.payType_id) && $scope.payType_id) {
                    $scope.filterObj.filter += " and id <>" + $scope.payType_id;
                }
                Services.pay_type.get($scope.filterObj, function(data) {
                    if (data.record.length > 0) {
                        $scope.show_payType_form_loader = false;
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Pay Type Alread Exist!!!";
                        jQuery(".basic .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    } else {

                        $scope.payTypeDBField = {
                            name: $scope.payType.name,
                            overtime_exempt: $scope.payType.overtime_exempt.id,
                            status: $scope.payType.status
                        };

                        if ($scope.payType_id) { // means it is in edit state
                            $scope.payTypeDBField.edited_on = moment().utc();
                            $scope.payTypeDBField.edited_by = JSON.stringify({
                                "username": $localStorage.user_info.username,
                                "firstname": $localStorage.user_info.first_name,
                                "lastname": $localStorage.user_info.last_name,
                                "user_id": $localStorage.user_info.user_id
                            });


                        } else {
                            $scope.payTypeDBField.agency_id = Services.getAgencyID();
                            $scope.payTypeDBField.created_on = moment().utc();
                            $scope.payTypeDBField.created_by = JSON.stringify({
                                "username": $localStorage.user_info.username,
                                "firstname": $localStorage.user_info.first_name,
                                "lastname": $localStorage.user_info.last_name,
                                "user_id": $localStorage.user_info.user_id
                            });

                        }

                        if ($scope.payType_id) {

                            Services.pay_type.update({
                                id: $stateParams.payTypeId
                            }, $scope.payTypeDBField, function(data) {
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
                                $scope.logger.action_table ="pay_type";
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                Services.userLog.save({
                                }, $scope.logger, function(data) {

                                });

                                $scope.show_payType_form_loader = false;
                                showMessageFunc("PayType detail edited sucessfully.", "success", function() {
                                    $timeout(function() {
                                        $scope.showerrorMsg = false;
                                        $state.go("ctApp.payTypes");
                                    }, 3000);
                                });
                            });

                        } else {

                            Services.pay_type.save($scope.payTypeDBField, function(data) {
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
                                $scope.logger.action_table ="pay_type";
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                Services.userLog.save({
                                }, $scope.logger, function(data) {

                                });

                                showMessageFunc("New PayType added sucessfully.", "success", function() {
                                    $scope.show_payType_form_loader = false;
                                    $timeout(function() {
                                        $scope.showerrorMsg = false;
                                        $state.go("ctApp.payTypes");
                                    }, 3000);
                                });
                            });

                        }
                    }
                });


            }

        };

        var showMessageFunc = function(error_msg, error_class, callback) {
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




        $scope.cancelPayType = function() {
            $state.go("ctApp.payTypes");
        };

    }
]).controller("DeletePayTypeCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
    var PayTypeID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function() {
        $modalInstance.close(PayTypeID);
    };
    $scope.cancel = function() {

        $modalInstance.dismiss('cancel');

    };
}]);