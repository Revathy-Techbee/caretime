angular.module('ctApp.mainDashboard', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.mainDashboard', {
      url: '/mainDashboard',
      views: {
        'appNested': {
          controller: 'MainDashboardCtrl',
          templateUrl: 'ct-app/mainDashboard/mainDashboard.tpl.html'
        }
      },
      data: {
        pageTitle: 'MainDashboard',
        access: access.mainDashboard
      }
    });
  }
]).controller('MainDashboardCtrl', [
  '$scope',
  'Services',
  '$localStorage',
  'HelperService',
  '$timeout',
  function ($scope, Services, $localStorage, HelperService, $timeout) {
    $scope.empCountry = $localStorage.user_info.country;
    $scope.dashboardOverview = 'Agency Overview';
    $scope.timeout_every = 15;
    $scope.getJobShiftDetails = function (startDateTime, ldate) {
      var ShiftObj = {
          fields: 'job_id,ref_in_at,ref_out_at,clock_in_time,clock_in_status',
          filter: 'ref_in_at >="' + startDateTime + '" and ref_out_at <="' + ldate + '" and agency_id = ' + Services.getAgencyID(),
          include_count: true
        };
      Services.shiftService.get(ShiftObj, function (remoteData) {
        $scope.jobShiftCount = remoteData.meta.count;
        angular.forEach(remoteData.record, function (value, key) {
          if (value.clock_in_status == '1') {
            if (moment(value.clock_in_time).unix() > moment(value.ref_in_at).unix()) {
              $scope.totalLateClockin++;
            } else {
              $scope.totalOnClockin++;
            }
          } else {
            $scope.totalNotClockin++;
          }
        });
      });
      //Latest job
      var jobObj = {
          fields: 'job_name, job_city, job_state',
          filter: 'agency_id = ' + Services.getAgencyID(),
          order: 'id desc',
          include_count: true,
          limit: '3'
        };
      Services.jobService.get(jobObj, function (remoteData) {
        $scope.jobLatest = {};
        $scope.jobLatest = remoteData.record;
      });
      //Latest Activity
      LatestActivityObj = {
        fields: 'employee_name,clockout,clockin',
        filter: 'agency_id = ' + Services.getAgencyID(),
        order: 'id desc',
        include_count: true,
        limit: '3'
      };
      Services.employeeActivitiesService.get(LatestActivityObj, function (remoteData) {
        $scope.LatestActivity = {};
        if (remoteData.meta.count > 0) {
          $scope.LatestActivity = remoteData.record;
        }
      });
      //Latest Shift
      LatestShiftObj = {
        fields: 'created_on, job, employee',
        filter: 'agency_id = ' + Services.getAgencyID(),
        order: 'id desc',
        include_count: true,
        limit: '5'
      };
      Services.shiftService.get(LatestShiftObj, function (remoteData) {
        $scope.shiftLatest = {};
        if (remoteData.meta.count > 0) {
          $scope.shiftLatest = remoteData.record;
        }
      });
    };
    $scope.getTimecardDetails = function (fdate, ldate, offset) {
      var filterObj;
      filterObj = {
        'fields': 'id,employee_code,job_code,timestamp,log_type,call_duriation,call_status',
        'limit': $scope.call_limit,
        'offset': offset,
        'include_count': true,
        'order': 'timestamp desc',
        'filter': 'employee_code <>\'\' and job_code<>\'\' and  timestamp >=\'' + fdate + '\' and timestamp <=\'' + ldate + '\' and agency_id = ' + Services.getAgencyID()
      };
      Services.timeLog.get(filterObj, function (data) {
        if (data.record.length !== 0) {
          $scope.empNameList = {};
          $scope.jobNameList = {};
          $scope.empCode = HelperService.getAsArray(data.record, 'employee_code');
          $scope.jobCode = HelperService.getAsArray(data.record, 'job_code');
          $scope.empFilterObj = {
            'include_count': true,
            'fields': 'first_name,last_name,access_code',
            'filter': 'access_code  IN (' + $scope.empCode + ') and agency_id = ' + Services.getAgencyID()
          };
          Services.employeeService.get($scope.empFilterObj, function (employeenameresult) {
            angular.forEach(employeenameresult.record, function (value, key) {
              if (value.access_code) {
                $scope.empNameList[value.access_code] = value.last_name + ', ' + value.first_name + ' (' + value.access_code + ')';
              }
            });
            $scope.jobFilterObj = {
              'include_count': true,
              'fields': 'job_name ,job_code',
              'filter': 'job_code   IN (' + $scope.jobCode + ') and agency_id = ' + Services.getAgencyID()
            };
            Services.jobService.get($scope.jobFilterObj, function (jobnameresult) {
              angular.forEach(jobnameresult.record, function (value, key) {
                if (value.job_code) {
                  $scope.jobNameList[value.job_code] = value.job_name + ' (' + value.job_code + ')';
                }
              });
              angular.forEach(data.record, function (item, key) {
                time = HelperService.getOnlyHour(item.timestamp);
                if (item.log_type == '1') {
                  $scope.totalClockin++;
                  $Clockin_Chart[time] = $Clockin_Chart[time] + 1;
                } else {
                  $scope.totalClockout++;
                  $Clockout_Chart[time] = $Clockout_Chart[time] + 1;
                }
                $scope.calllogList.push({
                  'id': item.id,
                  'employee_code': $scope.empNameList[item.employee_code],
                  'job_code': $scope.jobNameList[item.job_code],
                  'log_type': HelperService.logType(item.log_type),
                  'call_duriation': item.call_duriation,
                  'timestamp': HelperService.formatingDate(item.timestamp, $localStorage.user_info.country),
                  'call_status': item.call_status
                });
              });
              if (data.meta.count > offset + $scope.call_limit) {
                var nextOffset = offset + $scope.call_limit + 1;
                $scope.getTimecardDetails(fdate, ldate, nextOffset);
              } else {
                for (i = 0; i < 24; i++) {
                  $scope.Chartdetails.push({
                    'date_time': i,
                    'clockout': $Clockout_Chart[i],
                    'clockin': $Clockin_Chart[i]
                  });
                }
                $scope.show_activities_loader = false;
                $scope.noRecord = 0;
                $scope.ctx = {
                  flexGrid: null,
                  data: $scope.calllogList,
                  includeColumnHeader: true
                };
                $scope.calllogListDetail = new wijmo.collections.CollectionView($scope.calllogList);
                $scope.calllogListDetail.pageSize = 10;
                $scope.showRecord = 1;
                $timeout(function () {
                  $scope.updateDetails();
                }, $scope.timeout_every * 60 * 1000);
              }
            });
          });
        } else {
          $scope.show_activities_loader = false;
          $scope.noRecord = 1;
          $scope.norecord = HelperService.errorMsg('alert-danger', 'No clockin/clockout  Found');
        }
      });
    };
    $scope.updateDetails = function () {
      $scope.showRecord = 0;
      $scope.show_activities_loader = true;
      $scope.calllogList = [];
      $scope.totalClockout = 0;
      $scope.totalClockin = 0;
      $scope.totalLateClockin = 0;
      $scope.totalOnClockin = 0;
      $scope.totalNotClockin = 0;
      $scope.Chartdetails = [];
      $Clockin_Chart = {};
      $Clockout_Chart = {};
      for (i = 0; i < 24; i++) {
        $Clockin_Chart[i] = 0;
        $Clockout_Chart[i] = 0;
      }
      var CurrentDateTime = moment().utc().format('YYYY-MM-DD HH:mm');
      var startDateTime = moment(moment().utc().format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
      var a = moment(moment(CurrentDateTime).format('YYYY-MM-DD'));
      var addObj = a.add('24', 'hours');
      var ldatehrs = addObj.toDate();
      var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      if ($scope.empCountry && $scope.empCountry != 'United States') {
        $scope.currentDateonly = moment().format('DD/MM/YYYY');
      } else {
        $scope.currentDateonly = moment().format('MM/DD/YYYY');
      }
      $scope.currentTime = moment().format('hh:mm A');
      $scope.getJobShiftDetails(startDateTime, ldate);
      $scope.getTimecardDetails(startDateTime, CurrentDateTime, 0);
    };
    $scope.getdetails = function (days) {
      $scope.showRecord = 0;
      $scope.show_activities_loader = true;
      $scope.calllogList = [];
      $scope.totalClockout = 0;
      $scope.totalClockin = 0;
      $scope.totalLateClockin = 0;
      $scope.totalOnClockin = 0;
      $scope.totalNotClockin = 0;
      $scope.Chartdetails = [];
      $Clockin_Chart = {};
      $Clockout_Chart = {};
      for (i = 0; i < 24; i++) {
        $Clockin_Chart[i] = 0;
        $Clockout_Chart[i] = 0;
      }
      var CurrentDateTime = moment().subtract(days, 'days').format('YYYY-MM-DD HH:mm');
      var startDateTime = moment(moment(CurrentDateTime).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
      var a = moment(moment(CurrentDateTime).format('YYYY-MM-DD'));
      var addObj = a.add('24', 'hours');
      var ldatehrs = addObj.toDate();
      var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      if ($scope.empCountry && $scope.empCountry != 'United States') {
        $scope.currentDateonly = moment(CurrentDateTime).format('DD/MM/YYYY');
      } else {
        $scope.currentDateonly = moment(CurrentDateTime).format('MM/DD/YYYY');
      }
      $scope.currentTime = '12:00AM - 11:59PM';
      $scope.getJobShiftDetails(startDateTime, ldate);
      $scope.getTimecardDetails(startDateTime, ldate, 0);
    };
    $scope.updateDetails();
  }
]);