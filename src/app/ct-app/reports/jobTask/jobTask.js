angular.module('ctApp.jobTask', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.jobTask', {
        url: '/jobTask',
        views: {
            "appNested": {
                controller: 'JobTaskCtrl',
                templateUrl: 'ct-app/reports/jobTask/jobTask.tpl.html'
            }
        },
        data: {
            pageTitle: 'Job Task Report',
            access: access.jobTask
        }
    });

}])


.controller("JobTaskCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage",
    function($scope, Services, HelperService, $timeout,$localStorage) {

        $scope.reportFilters = {};
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
        $scope.show_activities_loader = false;

        $scope.call_limit = 500;
        $scope.showRecord = 0;
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");

        $scope.loadData = function(fdate, ldate, job, offset) {
            var  filterObj = {
                    'fields': "employee_code,job_code,task_id,duration,created_date,modified_date",
                    'limit': $scope.call_limit,
                    'offset': offset,
                    'include_count': true,
                    'order': 'job_code,id desc',
                    'filter': "employee_code <>'' and job_code<>'' and created_date >='" + fdate + "' and created_date <='" + ldate + "' and agency_id = " + Services.getAgencyID()
                };
            if (job && !angular.isUndefined(job.code) && job.code) {
                    filterObj.filter = filterObj.filter +' and job_code = "' + job.code + '"';
              

            } 

            Services.jobTask.get(filterObj, function(data) {
                if (data.record.length !== 0) {
                    $scope.empNameList = {};
                    $scope.jobNameList = {};
                    $scope.taskNameList = {};
                    $scope.empCode = HelperService.getAsArray(data.record, "employee_code");
                    $scope.jobCode = HelperService.getAsArray(data.record, "job_code");
                    $scope.task_id = HelperService.getAsArray(data.record, "task_id");
                    $scope.task_idFilterObj = {
                        'include_count': true,
                        'fields': 'task_name,id',
                        'filter': 'id  IN (' + $scope.task_id + ')  and agency_id = ' + Services.getAgencyID() 


                    };
                    Services.tasksName.get($scope.task_idFilterObj, function(task_idnameresult) {

                        angular.forEach(task_idnameresult.record, function(value, key) {
                            if (value.id) {
                                $scope.taskNameList[value.id] = value.task_name + ' (' + value.id + ')';
                            }
                        });

                        $scope.empFilterObj = {
                            'include_count': true,
                            'fields': 'first_name,last_name,access_code',
                            'filter': 'access_code  IN (' + $scope.empCode + ')  and agency_id = ' + Services.getAgencyID() 
                        };
                        Services.employeeService.get($scope.empFilterObj, function(employeenameresult) {

                            angular.forEach(employeenameresult.record, function(value, key) {
                                if (value.access_code) {
                                    $scope.empNameList[value.access_code] = value.last_name + ', ' + value.first_name + ' (' + value.access_code + ')';
                                }
                            });
                            $scope.jobFilterObj = {
                                'include_count': true,
                                'fields': 'job_name ,job_code',
                                'filter': 'job_code   IN (' + $scope.jobCode + ')  and agency_id = ' + Services.getAgencyID() 
                            };
                            Services.jobService.get($scope.jobFilterObj, function(jobnameresult) {

                                angular.forEach(jobnameresult.record, function(value, key) {
                                    if (value.job_code) {
                                        $scope.jobNameList[value.job_code] = value.job_name + ' (' + value.job_code + ')';
                                    }
                                });
                                angular.forEach(data.record, function(item, key) {
                                    $scope.resultData.push({
                                            "id": item.id,
                                            "employee_code": $scope.empNameList[item.employee_code],
                                            "job_code": $scope.jobNameList[item.job_code],
                                            "task_code": $scope.taskNameList[item.task_id],
                                            "duration": Number(item.duration),
                                            "created_date": HelperService.formatingDate(item.created_date,$localStorage.user_info.country),
                                            "modified_date": HelperService.formatingDate(item.modified_date,$localStorage.user_info.country)

                                        }


                                    );


                                });
                                if (data.meta.count > (offset + $scope.call_limit)) {

                                    var nextOffset = offset + $scope.call_limit + 1;
                                    $scope.loadData(fdate, ldate, job, nextOffset);

                                } else {
                                    $scope.show_activities_loader = false;

                                    $scope.noRecord = 0;
                                    $scope.showRecord = 1;
                                    $scope.ctx = {
                                        flexGrid: null,
                                        data: $scope.resultData,
                                        includeColumnHeader: true
                                    };
                                    $scope.TaskDetails = new wijmo.collections.CollectionView($scope.resultData);
                                    $scope.TaskDetails.pageSize = 10;
                                    $scope.groupBy = 'job_code';
                                    var cv = $scope.TaskDetails;
                                    cv.groupDescriptions.clear(); // clear current groups
                                    if ($scope.groupBy) {
                                        var groupDesc = new wijmo.collections.PropertyGroupDescription($scope.groupBy);
                                        cv.groupDescriptions.push(groupDesc);
                                    }




                                }

                            });
                        });

                    });
                } else {
                    $scope.show_activities_loader = false;
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


            if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0])||($scope.reportFilters.job === "" && ($scope.reportFilters.zone[0].id !== "all" && $scope.reportFilters.job.id !== "all"))) {

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
            mixpanel.track("Job Task Report",mixpanelObj);

            $scope.loadData(fdate, ldate, $scope.reportFilters.job, 0);


        };
        $scope.noRecord = 1;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Job Task Report');




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
            $scope.norecord = HelperService.errorMsg('alert-danger', 'Search to get Job Task Report');
            //$scope.updateTableData();

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


        $scope.selectJob = {
            query: function(query) {
                var data = {
                    results: []
                };
                if(!$localStorage.user_info.iszone_code)
                {
                     data.results.push({
                    text: 'All',
                    id: 'all',
                    code: ''
                });

                 }
               
                $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
                 $scope.jobObj = {
                    fields: "id,job_name,job_code",
                    filter: "job_zone in(" + $scope.zone_id + ") and status > 0  and agency_id = " + Services.getAgencyID(),
                    order: "job_name asc",
                    limit: 20
                };
                if (query.term) {
                    $scope.jobObj.filter +=  ' and (job_name like "%' + query.term + '%")';
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