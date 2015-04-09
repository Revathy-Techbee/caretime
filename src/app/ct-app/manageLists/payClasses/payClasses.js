angular.module('ctApp.payClasses', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.payClasses', {
        url: '/payClasses',
        views: {
            "appNested": {
                controller: 'PayClassesCtrl',
                templateUrl: 'ct-app/manageLists/payClasses/payClasses.tpl.html'
            }
        },
        data: {
            pageTitle: 'PayClasses',
            access: access.payClasses
        }
    }).state('ctApp.addUpdatePayClass', {
        url: '/payClass/:payClassId',
        views: {
            "appNested": {
                controller: 'AddUpdatePayClassCtrl',
                templateUrl: 'ct-app/manageLists/payClasses/add-update-payClass.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit PayClass',
            access: access.payClasses
        }
    });

}])

.controller("PayClassesCtrl", ["$scope", "Services", "$state", "$modal","$localStorage",
    function($scope, Services, $state, $modal,$localStorage) {
        $scope.empCountry=$localStorage.user_info.country;
        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_payClasses_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "pay_class";
        $scope.sortType = "asc";
        $scope.payClassDetailList = [];


        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_payClasses_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.payClassDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter:'agency_id='+Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter+' and pay_class like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.agencyPayclass.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.payClassDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_payClasses_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.payClassDetailList = [];
            $scope.config.show_payClasses_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter:'agency_id='+Services.getAgencyID()
            };

            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter+' and pay_class like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.agencyPayclass.get($scope.filterObj, function(data) {
                $scope.payClassDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_payClasses_loader = false;
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
            $state.go("ctApp.addUpdatePayClass", {
                payClassId: id
            });
        };
        $scope.enableDelete = function(id) {
            Services.setModelTempVar(id);
            $scope.modalInstance = $modal.open({
                template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Pay Class permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
                controller: 'DeletePayClassCtrl'
            });
            $scope.modalInstance.result.then(function(id) {
                Services.agencyPayclass.delete({
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
 * PayClass Controller....
 * **/

.controller("AddUpdatePayClassCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage",
    function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {

        $scope.payClass_id = $stateParams.payClassId;
        $scope.payClass = {};
        $scope.pageTitle = "Add New";
        $scope.payClassDBField = null;
        $scope.show_payClass_form_loader = false;
        $scope.payClass.status = 1;
       
        $scope.getPayClassDetail = function() {
            if ($scope.payClass_id) {
                $scope.pageTitle = "Update";


                Services.agencyPayclass.get({
                    "filter": "id='" + $scope.payClass_id + "'"
                }, function(resp) {
                    $scope.payClassDBField = resp.record[0];
   angular.extend($scope.payClass, {
                        pay_class: $scope.payClassDBField.pay_class,
                        status: $scope.payClassDBField.status,
                        created_on: HelperService.convertUTCtoMytimeZone($scope.payClassDBField.created_on),
                        created_by: $scope.payClassDBField.created_by,
                        editedOn: HelperService.convertUTCtoMytimeZone($scope.payClassDBField.edited_on),
                        edited_by: $scope.payClassDBField.edited_by
                    });
                });


            }
        };
        $scope.getPayClassDetail();
        $scope.payClassManage = function(step) {
            $scope.showerrorMsg = false;
            if ($scope.addUpdatePayClassForm.$valid) {
                $scope.show_payClass_form_loader = true;
                $scope.payClassDBField = {
                    pay_class: $scope.payClass.pay_class,
                    status: $scope.payClass.status
                };

                if ($scope.payClass_id) { // means it is in edit state
                    $scope.payClassDBField.edited_on = moment().utc();
                    $scope.payClassDBField.edited_by =JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                        "user_id": $localStorage.user_info.user_id
                    });


                } else {
                    $scope.payClassDBField.agency_id=Services.getAgencyID();
                    $scope.payClassDBField.created_on = moment().utc();
                    $scope.payClassDBField.created_by = JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                        "user_id": $localStorage.user_info.user_id
                    });

                }

                if ($scope.payClass_id) {

                    Services.agencyPayclass.update({
                        id: $stateParams.payClassId
                    }, $scope.payClassDBField, function(data) {
                        $scope.show_payClass_form_loader = false;
                        $scope.showMessageFunc("Pay Class detail edited sucessfully.", "success", function() {
                            $timeout(function() {
                                $scope.showerrorMsg = false;
                                $state.go("ctApp.payClasses");
                            }, 3000);
                        });
                    });

                } else {

                    Services.agencyPayclass.save($scope.payClassDBField, function(data) {
                        $scope.showMessageFunc("New Pay Class added sucessfully.", "success", function() {
                                $scope.show_payClass_form_loader = false;
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $state.go("ctApp.payClasses");
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




        $scope.cancelPayClass = function() {
            $state.go("ctApp.payClasses");
        };

    }
])
.controller("DeletePayClassCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
        var PayClassID= Services.getModelTempVar();
        Services.setModelTempVar('');
        $scope.all = function() {
            $modalInstance.close(PayClassID);
        };
        $scope.cancel = function() {

            $modalInstance.dismiss('cancel');

        };
    }
]);