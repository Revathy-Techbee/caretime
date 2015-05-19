angular.module('ctApp.dailyHoursChart', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.dailyHoursChart', {
      url: '/dailyHoursChart',
      views: {
        'appNested': {
          controller: 'DailyHoursChartCtrl',
          templateUrl: 'ct-app/reports/dailyHoursChart/dailyHoursChart.tpl.html'
        }
      },
      data: {
        pageTitle: 'Daily Hours Chart',
        access: access.dailyHoursChart
      }
    });
  }
]).controller('DailyHoursChartCtrl', [
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
    $scope.reportFilters.employee = '';
    $scope.show_norecord = 1;
    $scope.show_activities_loader = false;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Daily Hours Chart');
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.from = moment(firstDay).format('YYYY-MM-DD');
    $scope.reportFilters.to = moment(lastDay).format('YYYY-MM-DD');
    $scope.chartResult = '';
    $scope.data = [];
    $scope.loadData = function (firstdate, lastdate, zonecode, empcode) {
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
      $scope.filterObj = {
        'include_count': true,
        'fields': 'sum(work_duration_rounded_number),clockin_date,clockin',
        'filter': 'employee_code <>"" and job_code<>"" and clockin >"' + $scope.fdate + '" and clockout <="' + $scope.ldate + '" and clockin_date<>"" and clockout<>"0000-00-00 00:00:00" and agency_id = ' + Services.getAgencyID(),
        'order': 'clockin_date asc'
      };
      if (empcode && !angular.isUndefined(empcode.code) && empcode.code) {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and employee_code="' + empcode.code + '"';
      } else if ($scope.zone_id) {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and empzone_code in(' + $scope.zone_id + ')';
      }
      $scope.filterObj.filter = $scope.filterObj.filter + ' GROUP BY clockin_date';
      Services.employeeActivitiesService.get($scope.filterObj, function (response) {
        angular.forEach(response.record, function (item, key) {
          var regular_hours = HelperService.regularHours(item['sum(work_duration_rounded_number)']);
          $scope.data.push({
            'dateclockin': HelperService.formatUTCOnlyDate(item.clockin, $localStorage.user_info.country),
            'regularhours': Number(regular_hours)
          });
        });
        // console.log($scope.data);
        $scope.show_activities_loader = false;
        if (response.record.length !== 0) {
          $scope.show_norecord = 2;
          $scope.chartResult = new wijmo.collections.CollectionView($scope.data);
        } else {
          $scope.show_norecord = 1;
          $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
        }
      });
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
      if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || $scope.reportFilters.employee === '' && ($scope.reportFilters.zone[0].id !== 'all' && $scope.reportFilters.employee.id !== 'all')) {
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
      $scope.data = [];
      var f_date = moment($scope.reportFilters.from).format('YYYY-MM-DD');
      var l_date = moment($scope.reportFilters.to).format('YYYY-MM-DD');
      $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
      $scope.zone_id = $scope.zone_nameid.Code;
      $scope.zone_name = $scope.zone_nameid.Code_Name;
      mixpanelObj = {
        'Zone': $scope.zone_name ? $scope.zone_name : 'All',
        'Start Date': '"' + moment($scope.reportFilters.from).format('MM/DD/YYYY') + '"',
        'End Date': '"' + moment($scope.reportFilters.to).format('MM/DD/YYYY') + '"',
        'Agency': Services.serviceName
      };
      if ($scope.reportFilters.employee && !angular.isUndefined($scope.reportFilters.employee.code)) {
        var temp_empcode = 'All';
        if ($scope.reportFilters.employee.code) {
          temp_empcode = $scope.reportFilters.employee.text + ' (' + $scope.reportFilters.employee.code + ')';
        }
        mixpanelObj.Employee = temp_empcode;
      }
      mixpanel.track('Daily Hours Chart', mixpanelObj);
      $scope.loadData(f_date, l_date, $scope.reportFilters.zone, $scope.reportFilters.employee);
    };
    // $scope.updateTableData();
    $scope.$watch('reportFilters.zone', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.reportFilters.employee = '';
      }
    });
    $scope.selectzone = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
        $scope.reportFilters.employee = '';
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
    $scope.selectEmployee = {
      query: function (query) {
        var data = { results: [] };
        data.results.push({
          text: 'All',
          id: 'all',
          code: ''
        });
        $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
        $scope.empObj = {
          fields: 'last_name,first_name,access_code,id',
          filter: 'status > 0 and zone_id in(' + $scope.zone_id + ') and agency_id = ' + Services.getAgencyID(),
          order: 'last_name asc',
          limit: 20
        };
        if (query.term) {
          $scope.empObj.filter += '  and (last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%")';
        }
        Services.employeeService.get($scope.empObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            data.results.push({
              'text': item.last_name + ', ' + item.first_name,
              'id': item.id,
              'code': item.access_code
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
      $scope.reportFilters.employee = '';
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      $scope.reportFilters.from = moment(firstDay).format('YYYY-MM-DD');
      $scope.reportFilters.to = moment(lastDay).format('YYYY-MM-DD');
      //$scope.updateTableData();
      $scope.show_norecord = 1;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Daily Hours Chart');
    };
  }
]);