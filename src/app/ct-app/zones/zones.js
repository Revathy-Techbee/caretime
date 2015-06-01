angular.module('ctApp.zones', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    //var access_inter = routingConfig.accessinterface; 
    $stateProvider.state('ctApp.zones', {
        url: '/zones',
        views: {
            "appNested": {
                controller: 'ZonesCtrl',
                templateUrl: 'ct-app/zones/zones.tpl.html'
            }
        },
        data: {
            pageTitle: 'Zones',
            access: access.zones
        }
    }).state('ctApp.addUpdateZone', {
        url: '/zone/:zoneId',
        views: {
            "appNested": {
                controller: 'AddUpdateZoneCtrl',
                templateUrl: 'ct-app/zones/add-update-zone.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit Zone',
            access: access.zones
        }
    });

}])



.controller("ZonesCtrl", ["$scope", "Auth", "Services", "$window", "$state", "$modal", "HelperService", "$localStorage",
    function($scope, Auth, Services, $window, $state, $modal, HelperService, $localStorage) {
        /* $scope.addAccess = false;
         if($localStorage.user_info.user_type=='1' || $localStorage.user_info.user_type=='9')
         {
                         $scope.addAccess = true;

         }*/
        $scope.addAccess = true;
        $scope.config = {
            general: {
                searchtxt: "",
                filterDBField: null
            },
            page_size: 15,
            loaded_all_records: false,
            show_zones_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "zone_name";
        $scope.sortType = "asc";
        $scope.zoneDetailList = [];
        /*
        $scope.zoneSearchOptionUnsorted = [];
       
        $scope.getZoneFilters = function() {
            Services.getZoneFilter().then(function(resp) {
                angular.forEach(resp.data.field, function(item, index) {
                      
                   if(item.name=='created_by' || item.name=='edited_by' || item.name=='notify_detail' || item.name=='supervisor_detail' || item.name=='zone_code'|| item.name=='zone_name')
                   {
                    $scope.zoneSearchOptionUnsorted.push({
                        id: item.name,
                        name: item.label
                    });
                   }
                    
                });


                if ($scope.zoneSearchOptionUnsorted.length > 0) {
                    $scope.zoneSearchOption = HelperService.arr.multisort($scope.zoneSearchOptionUnsorted, ['name'], ['ASC']);

                }
            });
        };

        $scope.getZoneFilters();
        */
        $scope.zoneSearchOption = [{
            id: "created_by",
            name: "Created By"
        }, {
            id: "edited_by",
            name: "Edited By"
        }, {
            id: "notify_detail",
            name: "Notify Detail"
        }, {
            id: "supervisor_detail",
            name: "Supervisor Detail"
        }, {
            id: "zone_code",
            name: "Zone Code"
        }, {
            id: "zone_name",
            name: "Zone Name"
        }];

        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_zones_loader = true;
            var filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.zoneDetailList.length, //30
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };


            if ($scope.config.general.filterDBField) {
                filterObj.filter = filterObj.filter + ' and ' + $scope.config.general.filterDBField.id + ' like "%' + $scope.config.general.searchtxt + '%"';
            } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                filterObj.filter = filterObj.filter + ' and zone_name like "%' + $scope.config.general.searchtxt + '%" or zone_code like "%' + $scope.config.general.searchtxt + '%" or supervisor like "%' + $scope.config.general.searchtxt + '%" or supervisor_detail like "%' + $scope.config.general.searchtxt + '%"';
            }



            Services.employeeZones.get(filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.zoneDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_zones_loader = false;

            });
        };
        //////////////////////////////refectored...//////////////////////////////////////////////////

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.zoneDetailList = [];
            $scope.config.show_zones_loader = true;
            var filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter: 'agency_id=' + Services.getAgencyID()
            };

            if ($scope.config.general.filterDBField) {
                filterObj.filter = filterObj.filter + ' and ' + $scope.config.general.filterDBField.id + ' like "%' + $scope.config.general.searchtxt + '%"';
            } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                filterObj.filter = filterObj.filter + ' and zone_name like "%' + $scope.config.general.searchtxt + '%" or zone_code like "%' + $scope.config.general.searchtxt + '%" or supervisor like "%' + $scope.config.general.searchtxt + '%" or supervisor_detail like "%' + $scope.config.general.searchtxt + '%"';
            }



            Services.employeeZones.get(filterObj, function(data) {
                $scope.zoneDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_zones_loader = false;
            });

        };

        $scope.applyProgramSort = function() {
            $scope.updateTableData();
        };
        //code by Anbu
        $scope.clearSearch = function() {
            $scope.config.general.filterDBField = null;
            $scope.config.general.searchtxt = "";
            $scope.updateTableData();
        };


        $scope.enableEditView = function(id) {
            $state.go("ctApp.addUpdateZone", {
                zoneId: id
            });
        };
        $scope.enableEdit = function(id) {
            $state.go("ctApp.zonestats", {
                statsId: id
            });
        };

    }
])

/*
 * Add Update
 * Zone Controller....
 * **/

.controller("AddUpdateZoneCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "$localStorage", "HelperService", "$window",
    function AddUpdateZoneCtrl($scope, Services, $state, $stateParams, $timeout, $localStorage, HelperService, $window) {
        // $scope.default_ivr_number = null;
        $scope.zone_id = $stateParams.zoneId;
        $scope.zone = {};
        $scope.zoneSteps = {};
        $scope.pageTitle = "Add New";
        $scope.zone.notify_empname = {};
        $scope.zone.notify_empMax = 5;
        $scope.savedisable = 0; /* Edited by Lavanya */
        $scope.zone.notify_empname = [{
            "Employee": ""
        }];
        $scope.zone.notify_empname.addshow = -1;
        //$scope.zone.ivr_number = null;
        $scope.zoneDBField = null;
        $scope.show_zone_form_loader = false;
        $scope.generateZonecode_count = 0;

        /* $scope.employeeList = function() {
             $scope.noemployee = 0;

             if (!angular.isUndefined($scope.zone.zone_code) && $scope.zone.zone_code) {
                 Services.employeeService.get({
                     filter: "status > 0 and zone_id='" + $scope.zone.zone_code + "'",
                     fields: "count(id)"
                 }, function(remoteData) {
                     if ((remoteData.record[0]["count(id)"]) < 1) {
                         $scope.noemployee = 1;

                         $scope.norecord = HelperService.errorMsg('alert-danger', 'No Employees in the Zone');

                     } else {
                         $scope.noemployee = 0;
                     }
                 });
             } else {
                 $scope.noemployee = 1;
                 $scope.norecord = HelperService.errorMsg('alert-danger', 'Employee not avaliable');
             }

         };
         $scope.employeeList();
         */
        $scope.getZoneDetail = function() {
            if ($scope.zone_id) {
                $scope.pageTitle = "Update";
                Services.getZoneDetail($scope.zone_id).then(function(resp) {
                    $scope.zoneDBField = resp.data.record[0];
                    angular.extend($scope.zone, {
                        zone_name: $scope.zoneDBField.zone_name,
                        zone_code: $scope.zoneDBField.zone_code,
                        supervisor: JSON.parse($scope.zoneDBField.supervisor_detail),
                        zone_code1: $scope.zoneDBField.zone_code,
                        //ivr_number: $scope.zoneDBField.ivr_number,
                        editedOn: HelperService.convertUTCtoMytimeZone($scope.zoneDBField.edited_on),
                        edited_by: $scope.zoneDBField.edited_by,
                        created_on: HelperService.convertUTCtoMytimeZone($scope.zoneDBField.created_on),
                        created_by: $scope.zoneDBField.created_by
                    });
                    if ($scope.zoneDBField.notify_detail) {
                        $scope.zone.notify_empname = ($scope.zoneDBField.notify_detail) ? JSON.parse($scope.zoneDBField.notify_detail) : "";
                        $scope.zone.notify_empname.addshow = $scope.zone.notify_empname.length - 2;
                        if (!$scope.zone.notify_empname.length) {
                            $scope.zone.notify_empname = [{
                                "Employee": ""
                            }];
                        }

                    } else {
                        $scope.zone.notify_empname = [{
                            "Employee": ""
                        }];
                        $scope.zone.notify_empname.addshow = -1;


                    }
                    // $scope.employeeList();

                });
            }
        };
        $scope.getZoneDetail();
        /*$scope.getIVRDefault = function() {
            Services.getIVRDefault().then(function(resp) {
                $scope.default_ivr_number = resp.data.record[0].ivr_number;
                if (!$scope.zone_id) {
                    $scope.zone.ivr_number = $scope.default_ivr_number;
                }
            });
        };


        $scope.getIVRDefault();
        */

        // coded by Revathy to get  Zone code 
        $scope.getZonecode = function() {

            var characters = 0;
            if ($localStorage.configCode.zone) {
                getminimum = Math.pow(10, ($localStorage.configCode.zone - 1));
                characters = (Math.pow(10, ($localStorage.configCode.zone))) - getminimum;
            }
            $scope.zoneDBField.zone_code = $window.Math.floor($window.Math.random() * characters) + getminimum;


        };


        $scope.zoneManage = function(step) {
            $scope.showerrorMsg = false;

            if (step == "general") {
                /*
                if ($scope.addUpdateZoneForm.$valid) {
                    $scope.zoneSteps.notify = true;
                }
                */
                if (angular.isUndefined($scope.zone.zone_name) || !($scope.zone.zone_name)) {
                    $scope.zoneSteps.notify = false;

                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Required field is missing !!!";
                    jQuery(".general .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                } else {
                    $scope.zoneSteps.notify = true;
                }


            }
            if (step == "notify") {
                $scope.savedisable = 1; /* Edited by Lavanya */
                var flag = 1;
                var ids = [];

                angular.forEach($scope.zone.notify_empname, function(item, key) {
                    if (item.Employee) {
                        ids.push(item.Employee.id);
                    }

                });

                $scope.sorted_arr = ids.sort(); // You can define the comparing function here. 
                var results = 0;
                for (var i = 0; i < ids.length - 1; i++) {
                    if ($scope.sorted_arr[i + 1] == $scope.sorted_arr[i]) {
                        flag = 0;

                    }
                }




                if (flag == 1) {

                    $scope.show_zone_form_loader = true;
                    $scope.filterObj = {
                        field: "id",
                        filter: 'zone_name="' + $scope.zone.zone_name + '" and agency_id = ' + Services.getAgencyID()

                    };
                    if (!angular.isUndefined($scope.zone_id) && $scope.zone_id) {
                        $scope.filterObj.filter += " and id <>" + $scope.zone_id;
                    }
                    Services.employeeZones.get($scope.filterObj, function(data) {
                        if (data.record.length > 0) {
                            $scope.show_zone_form_loader = false;
                            $scope.savedisable = 0;
                            $scope.showerrorMsg = true;
                            $scope.ErrorClass = "danger";
                            $scope.ErrorMsg = "Zone name exists, type a different name!!!";
                            jQuery(".basic .ng-invalid").addClass("ng-dirty");
                            $scope.savedisable = 0;
                            $timeout(function() {
                                $scope.showerrorMsg = false;
                            }, 3000);
                            return false;

                        } else {
                            $scope.zoneDBField = {
                                agency_id: Services.getAgencyID(),
                                zone_name: $scope.zone.zone_name,
                                //ivr_number: $scope.zone.ivr_number
                            };
                            if ($scope.zone.supervisor) {
                                $scope.zoneDBField.supervisor = $scope.zone.supervisor.id;
                                $scope.zoneDBField.supervisor_detail = JSON.stringify($scope.zone.supervisor);

                            }
                            $scope.zoneDBField.notify_id = JSON.stringify(ids);
                            $scope.zoneDBField.notify_detail = JSON.stringify($scope.zone.notify_empname);
                            if ($scope.zone_id) { // means it is in edit state
                                $scope.zoneDBField.edited_on = moment().utc();
                                //$scope.zoneDBField.zone_code = $scope.zone.zone_code;
                                $scope.zoneDBField.edited_by = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                    "user_id": $localStorage.user_info.user_id
                                });
                            } else {
                                $scope.zoneDBField.created_on = moment().utc();
                                $scope.zoneDBField.created_by = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                    "user_id": $localStorage.user_info.user_id
                                });
                            }

                            $scope.addEditZone();

                        }
                    });
                } else {
                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Please select different Employee!!!";
                    jQuery(".basic .ng-invalid").addClass("ng-dirty");
                    $scope.savedisable = 0;
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }
            }

        };
        $scope.addEditZone = function() {
            if ($scope.zone_id) { // means it is in edit state                     
                Services.employeeZones.update({
                    id: $stateParams.zoneId
                }, $scope.zoneDBField, function(data) {
                    
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
                    $scope.logger.action_table ="agency_zones";
                    $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                    Services.userLog.save({
                    }, $scope.logger, function(data) {

                    });

                    $scope.show_zone_form_loader = false;
                    showMessageFunc("Zone detail edited successfully.", "success", function() {
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                            $state.go("ctApp.zones");
                        }, 3000);
                    });
                });
            } else {
                $scope.getZonecode();
                Services.employeeZones.get({
                    filter: "zone_code='" + $scope.zoneDBField.zone_code + "'"
                }, function(data) {
                    if (data.record.length >= 1) {
                        $scope.generateZonecode_count++;
                        if ($scope.generateZonecode_count < 5) {
                            $scope.getZonecode();
                            $scope.addEditZone();
                        } else {
                            $scope.show_zone_form_loader = false;
                            showMessageFunc("Conflict occur in zone code,try again if the problem persists please contact Administrator !!!", "danger");
                            return false;
                        }
                    } else {
                        Services.employeeZones.save($scope.zoneDBField, function(data) {
                            // $scope.zoneDBField.zone_code = $scope.generateZonecode(data.id);
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
                            $scope.logger.action_table ="agency_zones";
                            $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                            Services.userLog.save({
                            }, $scope.logger, function(data) {

                            });

                            Services.employeeZones.update({
                                id: data.id
                            }, $scope.zoneDBField, function(data) {
                                /*$scope.logger = {};
                                $scope.logger.userid = $localStorage.user_info.user_id;
                                $scope.logger.user_detail = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                });
                                $scope.logger.action ="Update";
                                $scope.logger.agency_id = Services.getAgencyID();
                                $scope.logger.action_id =  data.id;
                                $scope.logger.action_table ="agency_zones";
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                Services.userLog.save({
                                }, $scope.logger, function(data) {

                                });*/

                                showMessageFunc("New Zone added successfully.", "success", function() {
                                    $scope.show_zone_form_loader = false;
                                    $timeout(function() {
                                        $scope.showerrorMsg = false;
                                        $state.go("ctApp.zones");
                                    }, 3000);
                                });
                            });
                        });

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
                    ///$state.go("app.zones");
                }, 3000);
            }
            $scope.showerrorMsg = true;
        };

        $scope.supervisors = [];
        $scope.refreshSupervisors = function(name) {
            $scope.SupervisorEmp = {
                fields: "first_name,last_name,id",
                filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                'order': 'last_name asc',
                limit: 20
            };
            if (name) {
                $scope.SupervisorEmp.filter += ' and (first_name  like "%' + name + '%" OR last_name   like "%' + name + '%" )';
            }
            Services.employeeService.get($scope.SupervisorEmp, function(remoteData) {
                $scope.supervisors = [];
                angular.forEach(remoteData.record, function(item, key) {
                    $scope.supervisors.push({
                        "text": item.last_name + ', ' + item.first_name,
                        "id": item.id
                    });

                });

            });
        };

        $scope.cancelZone = function() {
            $state.go("ctApp.zones");
        };
        $scope.refreshNotifyEmp = function(name) {

            //if (!angular.isUndefined($scope.zone.zone_code) && $scope.zone.zone_code) {
            $scope.NotifyEmp = {
                //filter: "status > 0 and zone_id=" + $scope.zone.zone_code,
                fields: "first_name,last_name,id",
                filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                'order': 'last_name asc',
                limit: 20
            };
            if (name) {
                $scope.NotifyEmp.filter += ' and (first_name  like "%' + name + '%" OR last_name   like "%' + name + '%" )';
            }
            Services.employeeService.get($scope.NotifyEmp, function(remoteData) {
                $scope.NotifyEmployees = [];


                angular.forEach(remoteData.record, function(item, key) {
                    $scope.NotifyEmployees.push({
                        "text": item.first_name + ' ' + item.last_name,
                        "id": item.id
                    });

                });

            });
            // }
        };

        /*$scope.selectnotifyemp = {
            query: function(query) {
                var data = {
                    results: []
                };
                if ($scope.zone.zone_code) {
                    Services.employeeService.get({
                        filter: "(first_name  like '%" + query.term + "%' OR last_name   like '%" + query.term + "%' ) and status > 0 and zone_id=" + $scope.zone.zone_code,
                        'order': 'id asc',
                        limit: 5
                    }, function(remoteData) {

                        items = remoteData.record;
                        if (items.length < 1) {
                            query.callback(data);
                        }
                        angular.forEach(items, function(item, key) {
                            data.results.push({
                                "text": item.first_name + ' ' + item.last_name,
                                "id": item.id
                            });
                            query.callback(data);

                        });

                    });
                } else {
                    query.callback(data);
                }

            }


        };*/
        $scope.addEmpdetails = function(index) {
            if ($scope.zone.notify_empMax != index) {
                $scope.zone.notify_empname.addshow = index;
            }
            $scope.zone.notify_empname.push({
                "Empoyee": ""
            });
        };
        $scope.removeEmpdetails = function(index) {

            //console.log(index);
            // console.log($scope.zone.notify_empname.length);

            if ($scope.zone.notify_empname.length === 1) {
                $scope.zone.notify_empname = [{
                    "Employee": ""
                }];
                $scope.zone.notify_empname.addshow = -1;

            } else {
                $scope.zone.notify_empname.addshow = $scope.zone.notify_empname.addshow - 1;
                $scope.zone.notify_empname.splice(index, 1);
            }

        };
        $scope.zoneManagePrev = function(step) {
            if (step == "notify") {
                $scope.zoneSteps.notify = false;
                $scope.zoneSteps.general = true;

            }
        };

    }
]);