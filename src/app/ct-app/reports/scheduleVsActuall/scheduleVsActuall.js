angular.module('ctApp.scheduleVsActuall', [
    'ui.router',
    'wj',
   // 'multi-select'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.scheduleVsActuall', {
        url: '/scheduleVsActuall',
        views: {
            "appNested": {
                controller: 'ScheduleVsActuallCtrl',
                templateUrl: 'ct-app/reports/scheduleVsActuall/scheduleVsActuall.tpl.html'
            }
        },
        data: {
            pageTitle: 'Actual vs Scheduled Report',
            access: access.scheduleVsActuall
        }
    });

}])


.controller("ScheduleVsActuallCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage", function($scope, Services, HelperService, $timeout,$localStorage) {

    $scope.reportFilters = {};
   // $scope.reportFilters.zoneName = '';
    $scope.reportFilters.job = '';
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
    $scope.show_download_loader = false;

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
    $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");


    $scope.loadData = function(fdate, ldate, zone, job, offset) {
        var shiftfilterObj = {
                'fields': "job_id,ref_in_at,employee,employee_code,ref_out_at,duriation",
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'id desc',
                'filter': "job_id <>'' and ref_in_at >='" + fdate + "' and ref_out_at <='" + ldate + "'  and agency_id = " + Services.getAgencyID() 
            };
        if (job && !angular.isUndefined(job.code) && job.code) {
            shiftfilterObj.filter=shiftfilterObj.filter+ ' and  job_id = "' + job.code + '"';
                     
        } else if ($scope.zone_id) {
            shiftfilterObj.filter=shiftfilterObj.filter+ ' and  zone_id in (' + $scope.zone_id + ')';

            
        }
               
        Services.shiftService.get(shiftfilterObj, function(data) {
            if (data.record.length > 0) {
                $scope.schedule = {};
                $scope.job_id = [];
                var job_date;
                angular.forEach(data.record, function(item, key) {
                    job_date = item.job_id + '_' + HelperService.formatUTCOnlyDate(item.ref_in_at,$localStorage.user_info.country);
                    var tempEmpName = (item.employee)?JSON.parse(item.employee):"";
                    $scope.schedule[job_date] = [{
                        "scheduleEmployeeCode": item.employee_code,
                        "scheduleEmployeeDetail": tempEmpName.text + ' (' + tempEmpName.code + ')',
                        "scheduleStart": HelperService.formatingDate(item.ref_in_at,$localStorage.user_info.country),
                        "scheduleEnd": HelperService.formatingDate(item.ref_out_at,$localStorage.user_info.country),
                        "scheduleDuration": item.duriation
                    }];
                    $scope.job_id.push(item.job_id);
                });
               

                activityfilterObj = {
                    "fields": "clockin,Job_code,job_name,employee_code,employee_name,clockin,clockout,work_duration_non_rounded_number",
                    'order': 'id desc',
                    'filter': 'Job_code <>""  and  Job_code in(' + $scope.job_id + ') and  clockin >="' + fdate + '" and clockout <="' + ldate + '"  and agency_id = ' + Services.getAgencyID() 
                };
       
                Services.employeeActivitiesService.get(activityfilterObj, function(result) {
                    angular.forEach(result.record, function(item, key) {
                        job_date = item.Job_code + '_' + HelperService.formatUTCOnlyDate(item.clockin,$localStorage.user_info.country);
                        if (!angular.isUndefined($scope.schedule[job_date])) {
                            $scope.resultData.push({
                                "date": HelperService.formatUTCOnlyDate(item.clockin,$localStorage.user_info.country),
                                "job_id": item.Job_code,
                                "jobDetail": item.job_name + ' (' + item.Job_code + ')',
                                "scheduleEmployee": $scope.schedule[job_date][0].scheduleEmployeeDetail,
                                "scheduleStart": $scope.schedule[job_date][0].scheduleStart,
                                "scheduleEnd": $scope.schedule[job_date][0].scheduleEnd,
                                "scheduleDuration": $scope.schedule[job_date][0].scheduleDuration,
                                "actuallemployee_code": item.employee_code,
                                "actuallemployeeDetail": item.employee_name + ' (' + item.employee_code + ')',
                                "actuallStart": HelperService.formatingDate(item.clockin,$localStorage.user_info.country),
                                "actuallEnd": HelperService.formatingDate(item.clockout,$localStorage.user_info.country),
                                "actuallDuration": item.work_duration_non_rounded_number,
                                "variance":((item.work_duration_non_rounded_number)-($scope.schedule[job_date][0].scheduleDuration))
                            });
                        }

                    });

                   

                    if (data.meta.count > (offset + $scope.call_limit)) {
                        var nextOffset = offset + $scope.call_limit + 1;
                        $scope.loadData(fdate, ldate, zone, job, nextOffset);
                    } else {
                        $scope.show_activities_loader = false;
                        if ($scope.resultData.length !== 0) {
                             $scope.ctx = {
                            flexGrid: null,
                            data: $scope.resultData,
                            includeColumnHeader: true
                            };


                            $scope.noRecord = 0;
                            $scope.showRecord = 1;
                           
                            $scope.ScheduleActuallDetails = new wijmo.collections.CollectionView($scope.resultData);
                            $scope.ScheduleActuallDetails.pageSize = 10;

                        } else {
                            $scope.noRecord = 1;
                            $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                        }

                    }
                });
            }
            else {
                $scope.show_activities_loader = false;
                            $scope.noRecord = 1;
                            $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                        }
        });

    };
    $scope.getVarianceColor = function(variance) {
                                if (variance < 0) {
                                    return 'red';
                                }
                                return 'green';
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

        if ($scope.reportFilters.zone ==null || angular.isUndefined($scope.reportFilters.zone[0]) ||  ($scope.reportFilters.job === "" && ($scope.reportFilters.zone[0].id !== "all" && $scope.reportFilters.job.id !== "all"))) {

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
                "Zone": ($scope.zone_name ?$scope.zone_name :"All") ,
                "Start Date":'"'+moment($scope.reportFilters.startDate).format('MM/DD/YYYY')+'"',
                "End Date":'"'+moment($scope.reportFilters.endDate).format('MM/DD/YYYY')+'"',
                "Agency": Services.serviceName
            };

            if($scope.reportFilters.job && !angular.isUndefined($scope.reportFilters.job.code))
            {
                var temp_jobcode="All";
                if($scope.reportFilters.job.code)
                {
                     temp_jobcode=$scope.reportFilters.job.text +' (' +$scope.reportFilters.job.code+')';
                }
                mixpanelObj.Job=temp_jobcode;
                            
            }
            mixpanel.track("Actual vs Scheduled Report",mixpanelObj);


        $scope.loadData(fdate, ldate, $scope.reportFilters.zone, $scope.reportFilters.job, 0);


    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Actual vs Scheduled Report');




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
        //$scope.updateTableData();
        $scope.noRecord = 1;
        $scope.showRecord = 0;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Actual vs Scheduled Report');
    };
     $scope.$watch('reportFilters.zone', function(newValue, oldValue) {
            if (newValue != oldValue) {
               $scope.reportFilters.job = '';
            }


        });
    $scope.selectZone = {
       multiple: true,
        query: function(query) {
            var data = {
                results: []
            };
            
           
            
            $scope.reportFilters.job = '';
            var getZone=true;

           // console.log($scope.reportFilters.zone[0].code);
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

            if(getZone===true)
            {
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
            }
            else
            {
                 query.callback(data);
            }
        },
        initSelection: function(element, callback) {
           
        }
    };
    
    $scope.selectJob = {
        query: function(query) {
            var data = {
                results: []
            };
           // console.log($scope.reportFilters.zone);
            data.results.push({
                text: 'All',
                id: 'all',
                code: ''
            });
            $scope.zone_id=HelperService.getAsArray($scope.reportFilters.zone,'code');
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



}]);