angular.module('ctApp.serviceItems', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.serviceItems', {
        url: '/serviceItems',
        views: {
            "appNested": {
                controller: 'ServiceItemsCtrl',
                templateUrl: 'ct-app/manageLists/serviceItems/serviceItems.tpl.html'
            }
        },
        data: {
            pageTitle: 'ServiceItems',
            access: access.serviceItems
        }
    }).state('ctApp.addUpdateServiceItem', {
        url: '/serviceItem/:serviceItemId',
        views: {
            "appNested": {
                controller: 'AddUpdateServiceItemCtrl',
                templateUrl: 'ct-app/manageLists/serviceItems/add-update-serviceItem.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit ServiceItem',
            access: access.serviceItems
        }
    });

}])

.controller("ServiceItemsCtrl", ["$scope", "Services", "$state", "$modal",
    function($scope, Services, $state, $modal) {
        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_serviceItems_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "name";
        $scope.sortType = "asc";
        $scope.serviceItemDetailList = [];


        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_serviceItems_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.serviceItemDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
            }

            Services.service_item.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.serviceItemDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_serviceItems_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.serviceItemDetailList = [];
            $scope.config.show_serviceItems_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.service_item.get($scope.filterObj, function(data) {
                $scope.serviceItemDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_serviceItems_loader = false;
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
            $state.go("ctApp.addUpdateServiceItem", {
                serviceItemId: id
            });
        };
        $scope.enableDelete = function(id) {
            Services.setModelTempVar(id);
            $scope.modalInstance = $modal.open({
                template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Service Item permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
                controller: 'DeleteServiceItemCtrl'
            });
            $scope.modalInstance.result.then(function(id) {

                Services.service_item.delete({
                    filter: "id='" + id + "'"
                }, function(data) {


                    $scope.updateTableData();
                });

            }, function() {

            });

        };
    }
])

/*
 * Add Update
 * ServiceItem Controller....
 * **/

.controller("AddUpdateServiceItemCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage",
        function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {

            $scope.serviceItem_id = $stateParams.serviceItemId;
            $scope.serviceItem = {};
            $scope.pageTitle = "Add New";
            $scope.serviceItemDBField = null;
            $scope.show_serviceItem_form_loader = false;
            $scope.serviceItem.status = 1;
            $scope.billable_hours = [{
                "text": "No",
                "id": 0
            }, {
                "text": "Yes",
                "id": 1
            }];
            $scope.serviceItem.billable_hours = {
                "text": "No",
                "id": 0
            };

            $scope.getServiceItemDetail = function() {
                if ($scope.serviceItem_id) {
                    $scope.pageTitle = "Update";

                    Services.service_item.get({
                        filter: "id='" + $scope.serviceItem_id + "'"
                    }, function(resp) {

                        $scope.serviceItemDBField = resp.record[0];
                        if ($scope.serviceItemDBField.billable_hours == 1) {
                            $scope.serviceItem.billable_hours = {
                                "text": "Yes",
                                "id": 1
                            };
                        }

                        angular.extend($scope.serviceItem, {

                            name: $scope.serviceItemDBField.name,
                            status: $scope.serviceItemDBField.status,
                            created_on: HelperService.convertUTCtoMytimeZone($scope.serviceItemDBField.created_on),

                            created_by: $scope.serviceItemDBField.created_by,
                            editedOn: HelperService.convertUTCtoMytimeZone($scope.serviceItemDBField.edited_on),

                            edited_by: $scope.serviceItemDBField.edited_by
                        });
                    });

                }
            };
            $scope.getServiceItemDetail();

            $scope.serviceItemManage = function(step) {
                $scope.showerrorMsg = false;
                if ($scope.addUpdateserviceItemForm.$valid) {
                    $scope.show_serviceItem_form_loader = true;
                    $scope.serviceItemDBField = {
                        name: $scope.serviceItem.name,
                        billable_hours: $scope.serviceItem.billable_hours.id,
                        status: $scope.serviceItem.status
                    };

                    if ($scope.serviceItem_id) { // means it is in edit state
                        $scope.serviceItemDBField.edited_on = moment().utc();
                        $scope.serviceItemDBField.edited_by = JSON.stringify({
                            "username": $localStorage.user_info.username,
                            "firstname": $localStorage.user_info.first_name,
                            "lastname": $localStorage.user_info.last_name,
                            "user_id": $localStorage.user_info.user_id
                        });

                    } else {
                        $scope.serviceItemDBField.agency_id = Services.getAgencyID();
                        $scope.serviceItemDBField.created_on = moment().utc();
                        $scope.serviceItemDBField.created_by = JSON.stringify({
                            "username": $localStorage.user_info.username,
                            "firstname": $localStorage.user_info.first_name,
                            "lastname": $localStorage.user_info.last_name,
                            "user_id": $localStorage.user_info.user_id
                        });

                    }

                    if ($scope.serviceItem_id) {

                        Services.service_item.update({
                            id: $stateParams.serviceItemId
                        }, $scope.serviceItemDBField, function(data) {
                            $scope.show_serviceItem_form_loader = false;
                            $scope.showMessageFunc("Service Item detail edited sucessfully.", "success", function() {
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $state.go("ctApp.serviceItems");
                                }, 3000);
                            });
                        });

                    } else {

                        Services.service_item.save($scope.serviceItemDBField, function(data) {
                            $scope.showMessageFunc("New Service Item added sucessfully.", "success", function() {
                                $scope.show_serviceItem_form_loader = false;
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $state.go("ctApp.serviceItems");
                                }, 3000);
                            });
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
            $scope.cancelServiceItem = function() {
                $state.go("ctApp.serviceItems");
            };

        }
    ])
    .controller("DeleteServiceItemCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
        var ServiceItemID = Services.getModelTempVar();
        Services.setModelTempVar('');
        $scope.all = function() {
            $modalInstance.close(ServiceItemID);
        };
        $scope.cancel = function() {

            $modalInstance.dismiss('cancel');

        };
    }]);