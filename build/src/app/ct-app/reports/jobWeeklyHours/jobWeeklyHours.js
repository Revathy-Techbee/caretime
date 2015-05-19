angular.module('ctApp.jobWeeklyHours', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.jobWeeklyHours', {
      url: '/jobWeeklyHours',
      views: {
        'appNested': {
          controller: 'JobWeeklyHoursCtrl',
          templateUrl: 'ct-app/reports/jobWeeklyHours/jobWeeklyHours.tpl.html'
        }
      },
      data: {
        pageTitle: 'Job Weekly Hours',
        access: access.jobWeeklyHours
      }
    });
  }
]).controller('JobWeeklyHoursCtrl', [
  '$scope',
  'Services',
  'HelperService',
  '$timeout',
  '$localStorage',
  function ($scope, Services, HelperService, $timeout, $localStorage) {
    $scope.reportFilters = {};
    $scope.reportFilters.zone = null;
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.reportFilters.zone = [{
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['id'],
            'code': res.data.record[0]['zone_code']
          }];
      });
    }
    $scope.reportFilters.job = '';
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Job Weekly Hours Report');
    $scope.show_norecord = 1;
    $scope.show_activities_loader = false;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.from = moment(firstDay).format('YYYY-MM-DD');
    $scope.reportFilters.to = moment(lastDay).format('YYYY-MM-DD');
    $scope.jobWeeklyDetail = '';
    $scope.job_details = '';
    $scope.data = [];
    $scope.getweekdate = function () {
      $scope.f_date = moment($scope.reportFilters.from).format('YYYY-MM-DD');
      $scope.l_date = moment($scope.reportFilters.to).format('YYYY-MM-DD');
      $scope.week_fdate = [$scope.f_date];
      $scope.week_ldate = [];
      $scope.noofdays = moment($scope.f_date).day();
      $scope.week_days = $scope.week_startNo - $scope.noofdays - 1;
      //to calculate end date
      if ($scope.noofdays == '0') {
        $scope.week_days = $scope.week_startNo - 1;
      } else if ($scope.week_days < 0) {
        $scope.week_days = 7 + $scope.week_days;
      }
      $scope.new_date = moment($scope.f_date).add($scope.week_days, 'days');
      // adds 7 days 
      $scope.new_date = moment($scope.new_date).format('YYYY-MM-DD');
      $scope.week_ldate.push($scope.new_date);
      var i;
      for (i = 0; moment($scope.week_ldate[i]).unix() < moment($scope.l_date).unix(); i++) {
        var dt = moment(moment($scope.week_ldate[i]).add(1, 'days')).format('YYYY-MM-DD');
        $scope.week_fdate.push(dt);
        $scope.new_date = moment($scope.week_ldate[i]).add(1, 'weeks');
        $scope.new_date = moment($scope.new_date).format('YYYY-MM-DD');
        if (moment($scope.new_date).unix() < moment($scope.l_date).unix()) {
          $scope.week_ldate.push($scope.new_date);
        } else {
          {
            $scope.week_ldate.push($scope.l_date);
          }
        }
      }
      $scope.loadData($scope.week_fdate[0], $scope.week_ldate[0], 0, $scope.reportFilters.zone, $scope.reportFilters.job);
    };
    $scope.loadData = function (firstdate, lastdate, length, zonecode, jobcode) {
      if (firstdate) {
        $scope.fdate = moment(moment(firstdate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment(lastdate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        $scope.ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      } else {
        $scope.fdate = '';
        $scope.ldate = '';
      }
      $scope.activityFilterObj = {
        'include_count': true,
        'fields': 'job_name,job_code,sum(work_duration_rounded_number)',
        'filter': 'employee_code <>"" and job_code<>"" and clockin >"' + $scope.fdate + '" and clockout <="' + $scope.ldate + '" and agency_id = ' + Services.getAgencyID(),
        'order': 'job_code desc'
      };
      $scope.ShiftFilterObj = {
        'include_count': true,
        'fields': 'job_id,sum(duriation)',
        'filter': 'in_at >"' + $scope.fdate + '" and out_at <="' + $scope.ldate + '" and agency_id = ' + Services.getAgencyID(),
        'order': 'job_id desc'
      };
      if (jobcode && !angular.isUndefined(jobcode.code) && jobcode.code) {
        $scope.activityFilterObj.filter = $scope.activityFilterObj.filter + ' and job_code="' + jobcode.code + '"';
        $scope.ShiftFilterObj.filter = $scope.ShiftFilterObj.filter + ' and job_id="' + jobcode.code + '"';
      } else if ($scope.zone_id) {
        $scope.activityFilterObj.filter = $scope.activityFilterObj.filter + ' and jobzone_code in(' + $scope.zone_id + ')';
        $scope.ShiftFilterObj.filter = $scope.ShiftFilterObj.filter + ' and zone_id in(' + $scope.zone_id + ')';
      }
      $scope.activityFilterObj.filter = $scope.activityFilterObj.filter + ' GROUP BY job_code';
      $scope.ShiftFilterObj.filter = $scope.ShiftFilterObj.filter + ' GROUP BY job_id';
      Services.employeeActivitiesService.get($scope.activityFilterObj, function (response) {
        var regular_hours;
        Services.shiftService.get($scope.ShiftFilterObj, function (resresponse) {
          angular.forEach(response.record, function (item, key) {
            if (resresponse.record[key]) {
              regular_hours = resresponse.record[key]['sum(duriation)'];
            } else {
              regular_hours = 0;
            }
            var week_day = moment(firstdate).day();
            var week_number = moment(firstdate).weeks();
            if (week_day === 0) {
              week_number = week_number - 1;
            }
            // var regular_hours = workedhor;
            var over_hours = item['sum(work_duration_rounded_number)'];
            var remaininghours = over_hours - regular_hours;
            $scope.data.push({
              'jobname': item['job_name'] + ' (' + item['job_code'] + ')',
              'scheduledhours': Number(regular_hours),
              'workedhours': Number(over_hours),
              'remaininghours': Number(remaininghours),
              'weekno': week_number,
              'weekstart': HelperService.formatOnlyDate(firstdate, $localStorage.user_info.country),
              'weekend': HelperService.formatOnlyDate(lastdate, $localStorage.user_info.country)
            });
          });
          // if there is more data, continue loading it
          if (length < $scope.week_ldate.length - 1) {
            length = length + 1;
            $scope.loadData($scope.week_fdate[length], $scope.week_ldate[length], length, zonecode, jobcode);
          } else {
            $scope.show_activities_loader = false;
            if ($scope.data.length !== 0) {
              $scope.ctx = {
                flexGrid: null,
                data: $scope.data,
                includeColumnHeader: true
              };
              $scope.show_norecord = 2;
              $scope.jobWeeklyDetail = new wijmo.collections.CollectionView($scope.data);
              $scope.jobWeeklyDetail.pageSize = 10;
              $scope.groupBy = 'weekno';
              var cv = $scope.jobWeeklyDetail;
              cv.groupDescriptions.clear();
              // clear current groups
              if ($scope.groupBy) {
                var groupNames = $scope.groupBy.split(',');
                for (var i = 0; i < groupNames.length; i++) {
                  var groupName = groupNames[i];
                  var groupDesc = new wijmo.collections.PropertyGroupDescription(groupName);
                  cv.groupDescriptions.push(groupDesc);
                }
              }
            } else {
              $scope.show_norecord = 1;
              $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
            }
          }
        });
      });
    };
    $scope.getAmountColor = function (remaininghours) {
      if (remaininghours < 0) {
        return 'red';
      }
      return 'green';
    };
    $scope.exportExcel = function () {
      if ($scope.show_norecord === 2) {
        var pageSize = $scope.ctx.flexGrid.collectionView.pageSize;
        $scope.ctx.flexGrid.collectionView.pageSize = 0;
        var result = wijmo.grid.ExcelConverter.export($scope.ctx.flexGrid, { includeColumnHeader: $scope.ctx.includeColumnHeader });
        $scope.ctx.flexGrid.collectionView.pageSize = pageSize;
        if (navigator.msSaveBlob) {
          var blob = new Blob([result.base64Array]);
          navigator.msSaveBlob(blob, $('#export').attr('download'));
        } else {
          $('#export')[0].href = result.href();
        }
      }
    };
    $scope.updateTableData = function () {
      if ($scope.reportFilters.from && $scope.reportFilters.to) {
        if (Date.parse($scope.reportFilters.from) > Date.parse($scope.reportFilters.to)) {
          $scope.showSearchErrorMsg = true;
          $scope.Search_Errmsg = 'Invalid Date';
          $timeout(function () {
            $scope.showSearchErrorMsg = false;
          }, 3000);
          return false;
        }
      } else {
        $scope.showSearchErrorMsg = true;
        $scope.Search_Errmsg = 'Please Select Date';
        $timeout(function () {
          $scope.showSearchErrorMsg = false;
        }, 3000);
        return false;
      }
      if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || $scope.reportFilters.job === '' && ($scope.reportFilters.zone[0].id !== 'all' && $scope.reportFilters.job.id !== 'all')) {
        $scope.showSearchErrorMsg = true;
        $scope.Search_Errmsg = 'Please use the required filters';
        $timeout(function () {
          $scope.showSearchErrorMsg = false;
        }, 3000);
        return false;
      }
      $scope.show_norecord = 0;
      $scope.show_activities_loader = true;
      $scope.week_fdate = [];
      $scope.week_ldate = [];
      $scope.job_details = '';
      $scope.data = [];
      $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
      $scope.zone_id = $scope.zone_nameid.Code;
      $scope.zone_name = $scope.zone_nameid.Code_Name;
      mixpanelObj = {
        'Zone': $scope.zone_name ? $scope.zone_name : 'All',
        'Start Date': '"' + moment($scope.reportFilters.from).format('MM/DD/YYYY') + '"',
        'End Date': '"' + moment($scope.reportFilters.to).format('MM/DD/YYYY') + '"',
        'Agency': Services.serviceName
      };
      if ($scope.reportFilters.job && !angular.isUndefined($scope.reportFilters.job.code)) {
        var temp_empcode = 'All';
        if ($scope.reportFilters.job.code) {
          temp_empcode = $scope.reportFilters.job.text + ' (' + $scope.reportFilters.job.code + ')';
        }
        mixpanelObj.Job = temp_empcode;
      }
      mixpanel.track('Job Weekly Hours Report', mixpanelObj);
      Services.agencyDetail.get({
        'fields': 'work_week',
        'filter': 'id="' + Services.getAgencyID() + '"'
      }, function (data) {
        //console.log(data);
        $scope.week_startNo = data.record[0].work_week;
        // console.log($scope.week_startNo);
        $scope.getweekdate();
      });
    };
    $scope.$watch('reportFilters.zone', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.reportFilters.job = '';
      }
    });
    $scope.selectzone = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
        $scope.reportFilters.job = '';
        var getZone = true;
        if ($scope.reportFilters.zone !== null && !angular.isUndefined($scope.reportFilters.zone[0]) && $scope.reportFilters.zone[0].code === '') {
          getZone = false;
          data = { results: [] };
        } else if ($scope.reportFilters.zone === null || angular.isUndefined($scope.reportFilters.zone[0])) {
          data.results.push({
            text: 'All',
            id: 'all',
            code: ''
          });
        }
        if (getZone === true) {
          $scope.zoneObj = {
            fields: 'zone_name,zone_code,id',
            filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
            order: 'zone_name asc',
            limit: 20
          };
          if (query.term) {
            $scope.zoneObj.filter += ' and zone_name like \'%' + query.term + '%\'';
          }
          Services.employeeZones.get($scope.zoneObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                'text': item.zone_name,
                'id': item.id,
                'code': item.zone_code
              });
              query.callback(data);
            });
          });
        } else {
          query.callback(data);
        }
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.selectJob = {
      query: function (query) {
        var data = { results: [] };
        data.results.push({
          text: 'All',
          id: 'all',
          code: ''
        });
        $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
        $scope.jobObj = {
          fields: 'id,job_name,job_code',
          filter: 'job_zone in(' + $scope.zone_id + ') and status > 0 and agency_id = ' + Services.getAgencyID(),
          order: 'job_name asc',
          limit: 20
        };
        if (query.term) {
          $scope.jobObj.filter += ' and (job_name like "%' + query.term + '%")';
        }
        Services.jobService.get($scope.jobObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            data.results.push({
              'text': item.job_name,
              'id': item.id,
              'code': item.job_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.clearSearch = function () {
      $scope.reportFilters.zone = null;
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.reportFilters.zone = [{
              'text': res.data.record[0]['zone_name'],
              'id': res.data.record[0]['id'],
              'code': res.data.record[0]['zone_code']
            }];
        });
      }
      $scope.reportFilters.job = '';
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      $scope.reportFilters.from = moment(firstDay).format('YYYY-MM-DD');
      $scope.reportFilters.to = moment(lastDay).format('YYYY-MM-DD');
      //$scope.updateTableData();
      $scope.show_norecord = 1;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Job Weekly Hours Report');
    };
  }
]);