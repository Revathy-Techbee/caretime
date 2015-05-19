angular.module('ctApp.alertLog', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.alertLog', {
        url: '/alertLog',
        views: {
            "appNested": {
                controller: 'AlertLogCtrl',
                templateUrl: 'ct-app/logs/alertLog/alertLog.tpl.html'
            }
        },
        data: {
            pageTitle: 'Alert Log',
            access: access.alertLog
        }
    });

}])


.controller("AlertLogCtrl", ["$scope", "Services", "HelperService", "$timeout", "$localStorage", "$modal", function($scope, Services, HelperService, $timeout, $localStorage, $modal) {
        $scope.logFilters = {};
        $scope.logFilters.zone = null;
        if ($localStorage.user_info.iszone_code) {

            Services.getEmpZoneDetail().then(function(res) {

                $scope.logFilters.zone = [{
                    "text": res.data.record[0]["zone_name"],
                    "id": res.data.record[0]["id"],
                    "code": res.data.record[0]["zone_code"]
                }];

            });
        }
        $scope.logFilters.field = '';
        $scope.logFilters.field_value = '';
        $scope.logFilters.alertType = {
            text: 'All',
            id: 'all'
        };
        $scope.showerrorMsg = false;
        $scope.call_limit = 500;
        $scope.showRecord = 0;
        $scope.show_activities_loader = false;
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.logFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.logFilters.endDate = moment(lastDay).format("YYYY-MM-DD");


        $scope.loadData = function(fdate, ldate, zone, fieldname, fieldval, alertType, offset) {
            var filterObj = {
                'fields': "id,empcode,jobcode,alert_type,date_time,job_zone,emp_zone,jobname,job_zonename,employeename,employee_zonename,notes",
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'id desc',
                'filter': "date_time >='" + fdate + "' and date_time <='" + ldate + "' and agency_id = " + Services.getAgencyID()
            };

            if (fieldval && !angular.isUndefined(fieldval.code) && fieldval.code) {
                filterObj.filter = filterObj.filter + ' and ' + fieldname.id + ' = "' + fieldval.code + '"';

            } else if ($scope.zone_id) {
                if (fieldname.id == 'empcode') {
                    filterObj.filter = filterObj.filter + ' and emp_zone in(' + $scope.zone_id + ')';


                } else if (fieldname.id == 'jobcode') {
                    filterObj.filter = filterObj.filter + ' and job_zone in(' + $scope.zone_id + ')';

                } else {
                    filterObj.filter = filterObj.filter + ' and (job_zone in(' + $scope.zone_id + ') or emp_zone in(' + $scope.zone_id + ') )';

                }


            }

            if (alertType.id != 'all') {
                filterObj.filter = filterObj.filter + ' and alert_type like "' + alertType.id + '"';
            }

            Services.alertService.get(filterObj, function(data) {
                angular.forEach(data.record, function(item, key) {
                    var employeeTemp = '';
                    if (item.employeename) {
                        var employeename = JSON.parse(item.employeename);
                        employeeTemp = employeename.lastname + ', ' + employeename.firstname;
                    }

                    $scope.resultData.push({
                            "id":item.id,
                            "empcode": employeeTemp + '( ' + item.empcode + ')',
                            "jobcode": item.jobname + '( ' + item.jobcode + ')',
                            "alert_type": item.alert_type,
                            "date_time": HelperService.formatingDate(item.date_time, $localStorage.user_info.country),
                            "notes": item.notes,
                            "job_zone": item.job_zonename + '( ' + item.job_zone + ')',
                            "emp_zone": item.employee_zonename + '( ' + item.emp_zone + ')'



                        }


                    );


                });
                if (data.meta.count > (offset + $scope.call_limit)) {

                    var nextOffset = offset + $scope.call_limit + 1;
                    $scope.loadData(fdate, ldate, zone, fieldname, fieldval, alertType, nextOffset);
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
                        $scope.AlertDetails = new wijmo.collections.CollectionView($scope.resultData);
                        $scope.AlertDetails.pageSize = 10;



                    } else {
                        $scope.noRecord = 1;
                        $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                    }

                }
            });

        };

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

        $scope.updateTableData = function(isFilter) { // on limit change

            if ($scope.logFilters.startDate && $scope.logFilters.endDate) {

                if (Date.parse($scope.logFilters.startDate) > Date.parse($scope.logFilters.endDate)) {
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


            if ($scope.logFilters.zone == null || angular.isUndefined($scope.logFilters.zone[0]) || (($scope.logFilters.zone === "" || $scope.logFilters.field === "" || $scope.logFilters.field_value === "") && ($scope.logFilters.zone[0].id !== "all" && $scope.logFilters.field_value.id !== "all" && $scope.logFilters.field.id !== 'startDate')) || ($scope.logFilters.zone[0].id == "all" && $scope.logFilters.alertType === '')) {

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
            var fdate = moment(moment($scope.logFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
            var a = moment(moment($scope.logFilters.endDate).format('YYYY-MM-DD'));
            var addObj = a.add('24', 'hours');
            var ldatehrs = addObj.toDate();
            var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
            $scope.zone_nameid = HelperService.getCode_Name($scope.logFilters.zone, 'code', 'text');
            $scope.zone_id = $scope.zone_nameid.Code;
            $scope.zone_name = $scope.zone_nameid.Code_Name;
            mixpanelObj = {
                "Field": $scope.logFilters.field.text,
                "Start Date": '"' + moment($scope.logFilters.startDate).format('MM/DD/YYYY') + '"',
                "End Date": '"' + moment($scope.logFilters.endDate).format('MM/DD/YYYY') + '"',
                "Zone": ($scope.zone_name ? $scope.zone_name : "All"),
                "Agency": Services.serviceName
            };

            if ($scope.logFilters.field_value && !angular.isUndefined($scope.logFilters.field_value.code)) {
                var temp_fieldvalue = "All";
                if ($scope.logFilters.field_value.code) {
                    temp_fieldvalue = $scope.logFilters.field_value.text + ' (' + $scope.logFilters.field_value.code + ')';
                }
                if ($scope.logFilters.field.id == 'jobcode') {
                    mixpanelObj.Job = temp_fieldvalue;
                } else {
                    mixpanelObj.Employee = temp_fieldvalue;
                }


            }
            mixpanel.track("Alert Log", mixpanelObj);

            $scope.loadData(fdate, ldate, $scope.logFilters.zone, $scope.logFilters.field, $scope.logFilters.field_value, $scope.logFilters.alertType, 0);


        };
        $scope.enableEditView = function() {
            var current_id = $scope.AlertDetails.currentItem.id;
            Services.setModelTempVar({
                "AlertID": current_id
            });
            $scope.modalInstance = $modal.open({
                templateUrl: 'ct-app/logs/alertLog/add-update-alertLog.tpl.html',
                size: 'lg',
                controller: "AddUpdateAlertLogCtrl"

            });
            $scope.modalInstance.result.then(function() {
                $scope.updateTableData();

            });




        };
        $scope.noRecord = 1;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Alert Log');
        $scope.clearSearch = function() {
            $scope.logFilters.zone = null;
            if ($localStorage.user_info.iszone_code) {

                Services.getEmpZoneDetail().then(function(res) {

                    $scope.logFilters.zone = [{
                        "text": res.data.record[0]["zone_name"],
                        "id": res.data.record[0]["id"],
                        "code": res.data.record[0]["zone_code"]
                    }];

                });
            }
            $scope.logFilters.field = '';
            $scope.logFilters.field_value = '';
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            $scope.logFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
            $scope.logFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
            $scope.logFilters.alertType = {
                text: 'All',
                id: 'all'
            };
            //$scope.updateTableData();
            $scope.noRecord = 1;
            $scope.showRecord = 0;
            $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Alert Log');

        };

        $scope.$watch('logFilters.zone', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.logFilters.field_value = '';

            }


        });


        $scope.selectZone = {
            multiple: true,
            query: function(query) {
                var data = {
                    results: []
                };

                $scope.logFilters.field_value = '';
                var getZone = true;
                if ($scope.logFilters.zone !== null && !angular.isUndefined($scope.logFilters.zone[0]) && $scope.logFilters.zone[0].code === "") {
                    getZone = false;
                    data = {
                        results: []
                    };

                } else if ($scope.logFilters.zone === null || angular.isUndefined($scope.logFilters.zone[0])) {
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
        $scope.Selectfield = {
            query: function(query) {
                var data = {
                    results: []
                };
                $scope.logFilters.field_value = '';
                $scope.logFilters.filter_value = {
                    "text": "All",
                    "id": "all",
                    "code": "all"
                };
                $scope.logFilters.alertType = {
                    text: 'All',
                    id: 'all'
                };
                var items = [{
                    id: "jobcode",
                    name: "Job"
                }, {
                    id: "empcode",
                    name: "Employee"
                }, , {
                    id: "startDate",
                    name: "Date"
                }];
                angular.forEach(items, function(item, key) {
                    data.results.push({
                        "text": item.name,
                        "id": item.id

                    });
                    query.callback(data);
                });



            },
            initSelection: function(element, callback) {}

        };
        $scope.selectValue = {
            query: function(query) {
                var data = {
                    results: []
                };
                data.results.push({
                    text: 'All',
                    id: 'all',
                    code: ''
                });
                //$scope.zone_id = HelperService.getAsArray($scope.logFilters.zone, 'code');
                $scope.zone_nameid = HelperService.getCode_Name($scope.logFilters.zone, 'code', 'text');
                $scope.zone_id = $scope.zone_nameid.Code;
                $scope.zone_name = $scope.zone_nameid.Code_Name;

                if ($scope.logFilters.field.id == 'empcode') {
                    $scope.employeeObj = {
                        fields: "id,last_name,first_name,access_code",
                        filter: "zone_id in(" + $scope.zone_id + ")  and status > 0 and agency_id = " + Services.getAgencyID(),
                        limit: 5
                    };
                    if (query.term) {
                        $scope.employeeObj.filter += '  and (last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%")';
                    }
                    Services.employeeService.get($scope.employeeObj, function(remoteData) {
                        items = remoteData.record;
                        if (items.length < 1) {
                            query.callback(data);
                        }
                        angular.forEach(items, function(item, key) {
                            data.results.push({
                                "text": item.last_name + ', ' + item.first_name,
                                "id": item.id,
                                "code": item.access_code
                            });
                            query.callback(data);
                        });

                    });

                } else if ($scope.logFilters.field.id == 'jobcode') {
                    $scope.jobObj = {
                        fields: "id,job_name,job_code",
                        filter: "job_zone in(" + $scope.zone_id + ") and status > 0",
                        limit: 20
                    };
                    if (query.term) {
                        $scope.jobObj.filter += ' and (job_name like "%' + query.term + '%")';
                    }
                    Services.jobService.get($scope.jobObj, function(remoteData) {
                        items = remoteData.record;
                        if (items.length < 1) {
                            query.callback(data);
                        }
                        angular.forEach(items, function(item, key) {
                            data.results.push({
                                "text": item.job_name,
                                "id": item.id,
                                "code": item.job_code
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
        $scope.selectAlertType = {
            query: function(query) {
                var data = {
                    results: []
                };
                data.results.push({
                    text: 'All',
                    id: 'all',

                });

                var items = [{
                        id: "Auto clock out",
                        name: "Auto clock out"
                    }, {
                        id: "Not clocked OUT on time",
                        name: "Not clocked OUT on time"
                    }, {
                        id: "Not clocked IN on time",
                        name: "Not clocked IN on time"
                    }, {
                        id: "Schedule Reminder",
                        name: "Schedule Reminder"
                    }

                ];
                angular.forEach(items, function(item, key) {
                    data.results.push({
                        "text": item.name,
                        "id": item.id

                    });
                    query.callback(data);
                });



            },
            initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.logFilters.alertType.id) && $scope.logFilters.alertType.id) {
                    callback({
                        "text": $scope.logFilters.alertType.text,
                        "id": $scope.logFilters.alertType.id
                    });
                }
            }


        };




    }])
    .controller("AddUpdateAlertLogCtrl", ["$scope", "Services", "$timeout", "$modalInstance", function($scope, Services, $timeout, $modalInstance) {
        var AlertDetails = Services.getModelTempVar();
        if (AlertDetails && AlertDetails.AlertID) {

            $scope.alertID = AlertDetails.AlertID;
            Services.setModelTempVar('');
            Services.alertService.get({
                filter: "id='" + $scope.alertID + "'",
                fields: "notes"
            }, function(remoteData) {
                $scope.notes = remoteData.record[0].notes;

            });


        }
        $scope.saveNotes = function() {
            $scope.savedisable = 1;
            Services.alertService.update({
                id: $scope.alertID
            }, {
                notes: $scope.notes
            }, function(data) {
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "success";
                $scope.ErrorMsg = "Notes edited sucessfully !!!";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                     $modalInstance.close("takethisvalue");

                }, 3000);

            });
        };
        $scope.modelclose = function() {
            $modalInstance.dismiss('cancel');

        };

    }]);