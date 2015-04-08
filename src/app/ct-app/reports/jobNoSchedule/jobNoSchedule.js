angular.module('ctApp.jobNoSchedule', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.jobNoSchedule', {
        url: '/jobNoSchedule',
        views: {
            "appNested": {
                controller: 'JobNoScheduleCtrl',
                templateUrl: 'ct-app/reports/jobNoSchedule/jobNoSchedule.tpl.html'
            }
        },
        data: {
            pageTitle: 'Jobs List without Schedule',
            access: access.jobNoSchedule
        }
    });

}])


.controller("JobNoScheduleCtrl", ["$scope", "Services", "HelperService", "$timeout","$localStorage", function($scope, Services, HelperService, $timeout,$localStorage) {
    $scope.reportFilters = {};
    $scope.reportFilters.searchtxt = '';
    $scope.showerrorMsg = false;
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    $scope.show_activities_loader = false;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
    $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");


    $scope.loadData = function(startDate, endDate, searchtxt, offset) {
        var  filterObj = {
                'limit': $scope.call_limit,
                'offset': offset,
                'include_count': true,
                'order': 'id desc',
                'filter': "((last_scheduled_date  NOT BETWEEN  '" + startDate + "' AND '" + endDate + "')  or last_scheduled_date IS NULL) and status > 0 and agency_id = " + Services.getAgencyID()
            };
        if (searchtxt) {
            filterObj.filter = filterObj.filter + ' and  (job_name like "%' + searchtxt + '%" or job_code like "%' + searchtxt + '%" or job_notes like "%' + searchtxt + '%" or job_zone like "%' + searchtxt + '%" or contact_name like "%' + searchtxt + '%" or job_zone_detail like "%' + searchtxt + '%")';

           
        } 

        if($localStorage.user_info.iszone_code)
        {
            filterObj.filter = filterObj.filter +' and job_zone='+$localStorage.user_info.zone_code;
        }
        
        /*if (jobWhiteList) {
            filterObj.filter = filterObj.filter + " and job_code NOT IN(" + jobWhiteList + ")";

        }*/

        Services.jobService.get(filterObj, function(data) { //Need To change into post Method.Header is not working currently 

            if (data.record.length !== 0) {
            angular.forEach(data.record, function(item) {
                //$scope.jobCode.push(item.job_code);
                var zoneDetail="";
                if(item.job_zone_detail)
                {
                     zoneDetail = (JSON.parse(item.job_zone_detail)).text;

                }
                $scope.resultData.push({
                        "job_code": item.job_code,
                        "job_name": item.job_name +' ('+item.job_code+')',
                        "contact_name": item.contact_name,
                        "authorized_phone_format": HelperService.phoneFormat(item.authorized_phone_format),
                        "zone_name": zoneDetail,
                        "lastActive": (item.last_scheduled_date) ? HelperService.formatingDate(item.last_clocked_in_date) : "No Activity",
                        "status": HelperService.checkstatus(item.status)

                    }


                );
            });

            if (data.meta.count > (offset + $scope.call_limit)) {

                var nextOffset = offset + $scope.call_limit + 1;
                $scope.loadData(startDate, endDate, searchtxt, nextOffset);
            } else {
                $scope.show_activities_loader = false;
                $scope.startDate = moment($scope.reportFilters.startDate).format('YYYY-MM-DD');
                $scope.endDate = moment($scope.reportFilters.endDate).format('YYYY-MM-DD');
                if ($scope.resultData.length !== 0) {

                    $scope.noRecord = 0;
                    $scope.showRecord = 1;
                    $scope.JobDetails = new wijmo.collections.CollectionView($scope.resultData);
                    $scope.JobDetails.pageSize = 10;

                } else {
                    $scope.noRecord = 1;
                    $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                }

            } 
        }else {
                $scope.show_activities_loader = false;
                $scope.startDate = moment($scope.reportFilters.startDate).format('YYYY-MM-DD');
                $scope.endDate = moment($scope.reportFilters.endDate).format('YYYY-MM-DD');
                $scope.noRecord = 1;
                $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
            }


        });


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
        $scope.show_activities_loader = true;
        //$scope.jobWhiteList = [];
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
        mixpanel.track("Jobs List without Schedule",mixpanelObj);
         $scope.loadData(fdate, ldate, $scope.reportFilters.searchtxt, 0);

    };



    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Jobs List without Schedule');




    $scope.clearSearch = function() {
        $scope.reportFilters.searchtxt = '';
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
        //$scope.updateTableData();
        $scope.noRecord = 1;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Jobs List without Schedule');
        $scope.showRecord = 0;

    };



}]);