angular.module('ctApp.authorizedVsActuall', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.authorizedVsActuall', {
        url: '/authorizedVsActuall',
        views: {
            "appNested": {
                controller: 'AuthorizedVsActuallCtrl',
                templateUrl: 'ct-app/reports/authorizedVsActuall/authorizedVsActuall.tpl.html'
            }
        },
        data: {
            pageTitle: 'Authorized Vs Actual Report',
            access: access.authorizedVsActuall
        }
    });

}])


.controller("AuthorizedVsActuallCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage",
    function($scope, Services, HelperService, $timeout,$localStorage) {

        $scope.reportFilters = {};
      //  $scope.reportFilters.zoneName = '';
        $scope.reportFilters.zone = null;

        if($localStorage.user_info.iszone_code){
            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
        }
        $scope.reportFilters.job = '';
        $scope.showerrorMsg = false;
        $scope.call_limit = 500;
        $scope.showRecord = 0;
        $scope.show_activities_loader = false;


        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");


        $scope.loadData = function(fdate, ldate, zone, job, offset) {
            var filterObj = {
                'fields': "hours_remaining,hours_used,total_hours,frequency,hours,authorization_end_date,zone_detail,job_detail,payor_detail",
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'id desc',
                'filter': "authorization_end_date >='" + fdate + "' and authorization_end_date <='" + ldate + "' and  agency_id = " + Services.getAgencyID()
            };
            if (job && !angular.isUndefined(job.code) && job.code) {

                filterObj.filter = filterObj.filter +' and  job = "' + job.code + '"';
               

            } else if (zone) {
                filterObj.filter = filterObj.filter +' and zone in (' + zone + ')';

            }
           
            Services.jobauthorizationService.get(filterObj, function(data) {
                angular.forEach(data.record, function(item, key) {
                    var zoneDetail = JSON.parse(item.zone_detail);
                    var jobDetail = JSON.parse(item.job_detail);
                    var payorDetail = JSON.parse(item.payor_detail);
                    $scope.resultData.push({
                            "endDate": HelperService.formatOnlyDate(item.authorization_end_date,$localStorage.user_info.country),
                            "zone": zoneDetail.text + ' (' + zoneDetail.id + ')',
                            "job": jobDetail.text + ' (' + jobDetail.id + ')',
                            "payor": payorDetail.text + ' (' + payorDetail.id + ')',
                            "authorizedHours": item.frequency + ' ' + item.hours + ' Hrs',
                            "totalauthorizedHours": item.total_hours,
                            "hoursUsed": (item.hours_used?(parseFloat(item.hours_used).toFixed(2)):0),
                           "hoursRemaining": (item.hours_remaining?(parseFloat(item.hours_remaining).toFixed(2)):item.total_hours)
                        }


                    );


                });
                if (data.meta.count > (offset + $scope.call_limit)) {

                    var nextOffset = offset + $scope.call_limit + 1;
                    $scope.loadData(fdate, ldate, zone, job, nextOffset);
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
                        $scope.AuthorizedDetails = new wijmo.collections.CollectionView($scope.resultData);
                        $scope.AuthorizedDetails.pageSize = 10;




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
        $scope.getAmountColor = function(remaininghours) {
            if (remaininghours !== 0) {
                if (remaininghours < 0) {
                    return 'red';
                }
                return 'green';
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
            if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || (($scope.reportFilters.job === "") && ($scope.reportFilters.zone[0].id !== "all" && $scope.reportFilters.job.id !== "all"))) {

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
            var fdate = moment($scope.reportFilters.startDate).format('YYYY-MM-DD');
            //var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
           // var addObj = a.add('24', 'hours');
           // var ldatehrs = addObj.toDate();
           // var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
           var ldate = moment($scope.reportFilters.endDate).format('YYYY-MM-DD');


            mixpanelObj = {
                "Zone": ($scope.zone_name ? $scope.zone_name : "All"),
                "Start Date": '"' + moment($scope.reportFilters.startDate).format('MM/DD/YYYY') + '"',
                "End Date": '"' + moment($scope.reportFilters.endDate).format('MM/DD/YYYY') + '"',
                "Agency": Services.serviceName
            };

            if ($scope.reportFilters.job && !angular.isUndefined($scope.reportFilters.job.code)) {
                var temp_empcode = "All";
                if ($scope.reportFilters.job.code) {
                    temp_empcode = $scope.reportFilters.job.text + ' (' + $scope.reportFilters.job.code + ')';
                }
                mixpanelObj.Job = temp_empcode;

            }
            mixpanel.track("Authorized Vs Actual Report", mixpanelObj);


            $scope.loadData(fdate, ldate, $scope.zone_id, $scope.reportFilters.job, 0);


        };
        $scope.noRecord = 1;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Authorized Vs Actual Report');




        $scope.clearSearch = function() {
            $scope.reportFilters.job = '';
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
            $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Authorized Vs Actual Report');
        };


        $scope.$watch('reportFilters.zone', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.reportFilters.job = '';
                $scope.zone_nameid = '';
                $scope.zone_id = '';
                $scope.zone_name = '';
            }


        });
        $scope.selectZone = {
            multiple: true,
            query: function(query) {
                var data = {
                    results: []
                };

                $scope.reportFilters.job = '';
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
        $scope.selectJob = {
            query: function(query) {
                var data = {
                    results: []
                };
                data.results.push({
                    text: 'All',
                    id: 'all',
                    code: ''
                });
                $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
                $scope.jobObj = {
                    fields: "id,job_name,job_code",
                    filter: "job_zone in(" + $scope.zone_id + ") and status > 0 and agency_id = " + Services.getAgencyID(),
                    order: "job_name asc",
                    limit: 5
                };
                if (query.term) {
                    $scope.jobObj.filter += " and (job_name like '%" + query.term + "%')";
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
            },
            initSelection: function(element, callback) {}

        };



    }
]);