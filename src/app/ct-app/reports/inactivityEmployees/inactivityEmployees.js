angular.module('ctApp.inactivityEmployee', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.inactivityEmployee', {
        url: '/inactivityEmployee',
        views: {
            "appNested": {
                controller: 'InactivityEmployeeCtrl',
                templateUrl: 'ct-app/reports/inactivityEmployees/inactivityEmployees.tpl.html'
            }
        },
        data: {
            pageTitle: 'Inactive Employee List',
            access: access.inactivityEmployee
        }
    });

}])


.controller("InactivityEmployeeCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage" ,function($scope, Services, HelperService, $timeout,$localStorage) {
    $scope.reportFilters = {};
    $scope.reportFilters.searchtxt = '';
    $scope.showerrorMsg = false;
    $scope.show_activities_loader = false;
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
    $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
    $scope.reportFilters.zone = null;
    if($localStorage.user_info.iszone_code){
        Services.getEmpZoneDetail().then(function(res) {
        
        $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                            "id": res.data.record[0]["id"],
                            "code": res.data.record[0]["zone_code"]}];
        });
    }

    $scope.loadData = function(startDate, endDate, zone_id,searchtxt, offset) {
        var filterObj;
        filterObj = {
                'fiels':"access_code,last_name,first_name,primary_state,primary_city,zone_detail,last_clocked_in_date,country,status",
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'id desc',
                'filter': "((last_clocked_in_date NOT BETWEEN  '" + startDate + "' AND '" + endDate + "')  or last_clocked_in_date IS NULL)  and  status > 0 and agency_id = " + Services.getAgencyID() 
            };
        if (searchtxt) {

            filterObj.filter = filterObj.filter +' and (first_name like "%' + searchtxt + '%" or last_name like "%' + searchtxt + '%" or username like "%' + searchtxt + '%" or zone_id like "%' + searchtxt + '%" or primary_city like "%' + searchtxt + '%" or primary_state like "%' + searchtxt + '%" or zone_detail like "%' + searchtxt + '%" )';
    

        } 

        if (zone_id) {
                 filterObj.filter=filterObj.filter+' and zone_id  in(' + zone_id+ ')';
               
            }

        Services.employeeService.get(filterObj, function(data) { 
            if (data.record.length !== 0) {


                angular.forEach(data.record, function(item) {
                    // $scope.empCode.push(item.access_code);
                    var zoneDetail='';
                    if(item.zone_detail)
                    {
                     zoneDetail = JSON.parse(item.zone_detail);
                    }//
                    $scope.resultData.push({
                        "access_code": (item.access_code)?(item.access_code).toString():"",
                        "employee_name": item.last_name + ', ' + item.first_name +' ('+item.access_code+')',
                        "primary_state": item.primary_state,
                        "primary_city": item.primary_city,
                        "zone_detail": zoneDetail.text,
                        "lastActive": (item.last_clocked_in_date) ? HelperService.formatingDate(item.last_clocked_in_date,$localStorage.user_info.country) : "No Activity",
                        "status": HelperService.checkstatus(item.status)

                    });
                    if (data.meta.count > (offset + $scope.call_limit)) {

                        var nextOffset = offset + $scope.call_limit + 1;
                        $scope.loadData(startDate, endDate, zone_id, searchtxt, nextOffset);
                    } else {
                        $scope.show_activities_loader = false;
                        $scope.startDate = moment($scope.reportFilters.startDate).format('YYYY-MM-DD');
                        $scope.endDate =  moment($scope.reportFilters.endDate).format('YYYY-MM-DD');
                        if ($scope.resultData.length !== 0) {
                            $scope.ctx = {
                                    flexGrid: null,
                                    data: $scope.resultData,
                                    includeColumnHeader: true
                                };
                            $scope.noRecord = 0;
                            $scope.showRecord = 1;
                            $scope.EmployeeDetails = new wijmo.collections.CollectionView($scope.resultData);
                            $scope.EmployeeDetails.pageSize = 10;

                        } else {
                            $scope.noRecord = 1;
                            $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                        }

                    }

                });
            } else {
                $scope.show_activities_loader = false;
                $scope.startDate = moment($scope.reportFilters.startDate).format('YYYY-MM-DD');
                $scope.endDate =  moment($scope.reportFilters.endDate).format('YYYY-MM-DD');
                $scope.noRecord = 1;
                $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
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

        $scope.showRecord = 0;
        $scope.resultData = [];
        $scope.noRecord = 0;
        $scope.zone_id='';
        $scope.show_activities_loader = true;
        var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
        mixpanelObj={
                 "Start Date":'"'+moment($scope.reportFilters.startDate).format('MM/DD/YYYY')+'"',
                "End Date":'"'+moment($scope.reportFilters.endDate).format('MM/DD/YYYY')+'"',
                "Agency": Services.serviceName
            };
        if($scope.reportFilters.searchtxt)
        {
            mixpanelObj.SearchText=$scope.reportFilters.searchtxt;
            
                        
        }
        if($scope.reportFilters.zone!== null && $scope.reportFilters.zone)
        {
            $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
            $scope.zone_id =$scope.zone_nameid.Code;
            $scope.zone_name =$scope.zone_nameid.Code_Name;
            mixpanelObj.Zone=($scope.zone_name ?$scope.zone_name :"All");
        }
        mixpanel.track("Inactive Employee List",mixpanelObj);
        $scope.loadData(fdate, ldate, $scope.zone_id,$scope.reportFilters.searchtxt, 0);

    };



    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Inactive Employee List');




    $scope.clearSearch = function() {
        $scope.reportFilters.searchtxt = '';
        if($localStorage.user_info.iszone_code){
        Services.getEmpZoneDetail().then(function(res) {
        
        $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                            "id": res.data.record[0]["id"],
                            "code": res.data.record[0]["zone_code"]}];
        });
        }
        else
        {
          $scope.reportFilters.zone = null;

        }
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
        $scope.noRecord = 1;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Inactive Employee List');
        $scope.showRecord = 0;

    };
    $scope.selectzone = {
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
                            "code": item.zone_code,
                        });
                        query.callback(data);

                    });

                });
                 } else {
                    query.callback(data);
                }
            },initSelection: function(element, callback) {}


        };



}]);