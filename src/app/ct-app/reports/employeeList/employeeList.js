angular.module('ctApp.employeeList', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.employeeList', {
        url: '/employeeList',
        views: {
            "appNested": {
                controller: 'EmployeeListCtrl',
                templateUrl: 'ct-app/reports/employeeList/employeeList.tpl.html'
            }
        },
        data: {
            pageTitle: 'Schedule Reporting',
            access: access.employeeList
        }
    });

}])

.controller("EmployeeListCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage", function($scope, Services, HelperService, $timeout,$localStorage) {
    $scope.reportFilters = {};
    $scope.reportFilters.field = '';
    $scope.reportFilters.zone = null;
     if($localStorage.user_info.iszone_code){
            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
             });
        }
    $scope.showerrorMsg = false;
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    $scope.show_activities_loader = false;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
    $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");


    $scope.loadData = function(fdate, ldate, zone, fieldname,  offset) {
        var filterObj;
         filterObj = {
                'fields': "access_code,last_name,first_name,agency_empid,primary_address1,primary_city,primary_state,primary_zip,birth_date,zone_detail,is_supervisor,status,last_clocked_in_date,last_scheduled_date,created_on",
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'id desc',
                'filter': fieldname.id +" >='" + fdate + "' and "+ fieldname.id +" <='" + ldate + "' and "+fieldname.id+"<>'' and  agency_id = " + Services.getAgencyID()
            };
        if ($scope.zone_id) {
            filterObj.filter = filterObj.filter + ' and  zone_id in(' + $scope.zone_id + ')';
            }
            
   

        Services.employeeService.get(filterObj, function(data) {
            angular.forEach(data.record, function(item, key) {
                tempzone = (item.zone_detail)?JSON.parse(item.zone_detail):"";
                $scope.resultData.push({
                        "access_code": (item.access_code)?(item.access_code).toString():"",
                        "employee_name": item.last_name + ', ' + item.first_name ,
                        "agency_empid": item.agency_empid,
                        "primary_address1": item.primary_address1,
                        "primary_city": item.primary_city,
                        "primary_state": item.primary_state,
                        "primary_zip": item.primary_zip,
                        "birth_date": (item.birth_date)?HelperService.formatOnlyDate(item.birth_date,$localStorage.user_info.country):"",
                        "zone_detail": tempzone.text +' ('+tempzone.id+')',
                        "is_supervisor":HelperService.checklevel(item.is_supervisor),
                        "status": HelperService.checkstatus(item.status),
                        "last_clocked_in_date": ((item.last_clocked_in_date)?HelperService.formatUTCOnlyDate(item.last_clocked_in_date,$localStorage.user_info.country) : "Not Yet Clockedin"),
                        "last_scheduled_date": ((item.last_scheduled_date)?HelperService.formatUTCOnlyDate(item.last_scheduled_date,$localStorage.user_info.country):"Not Yet Scheduled"),
                        "created_on": ((item.created_on)?HelperService.formatUTCOnlyDate(item.created_on,$localStorage.user_info.country):"No Created Date")
                      //  "created_on": (item.created_on)?moment(item.created_on).format('MM/DD/YYYY'):""



                    }


                );


            });
            if (data.meta.count > (offset + $scope.call_limit)) {

                var nextOffset = offset + $scope.call_limit + 1;
                $scope.loadData(fdate, ldate, zone, fieldname,  nextOffset);
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
                    $scope.EmployeeDetails = new wijmo.collections.CollectionView($scope.resultData);
                    $scope.EmployeeDetails.pageSize = 10;
                    
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


        if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || $scope.reportFilters.field === "" ) {

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
        $scope.zone_id =$scope.zone_nameid.Code;
        $scope.zone_name =$scope.zone_nameid.Code_Name;
       mixpanelObj={
                "Field":$scope.reportFilters.field.text,
                "Zone": ($scope.zone_name ?$scope.zone_name :"All") ,
                "Start Date":'"'+moment($scope.reportFilters.startDate).format('MM/DD/YYYY')+'"',
                "End Date":'"'+moment($scope.reportFilters.endDate).format('MM/DD/YYYY')+'"',
                "Agency": Services.serviceName
            };
            mixpanel.track("Employee List Reporting",mixpanelObj);
        $scope.loadData(fdate, ldate, $scope.reportFilters.zone, $scope.reportFilters.field, 0);


    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Employee List');
    $scope.clearSearch = function() {
        $scope.reportFilters.zone = null;
        if($localStorage.user_info.iszone_code){
            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
             });
        }
        $scope.reportFilters.field = '';
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
        $scope.noRecord = 1;
        $scope.showRecord = 0;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Employee List');

    };

       

    $scope.selectZone = {
        multiple: true,
        query: function(query) {
            var data = {
                results: []
            };
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
    $scope.Selectfield = {
        query: function(query) {
            var data = {
                results: []
            };
            
            var items = [{
                name: "Date Created",
                id: "created_on"
            }, {
                name: "Date Last Clocked IN",
                id: "last_clocked_in_date"
            }, , {
                name: "Date Last Scheduled",
                id: "last_scheduled_date"
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
   




}]);