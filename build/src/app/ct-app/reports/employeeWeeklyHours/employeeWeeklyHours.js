angular.module('ctApp.employeeWeeklyHours', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.employeeWeeklyHours', {
      url: '/employeeWeeklyHours',
      views: {
        'appNested': {
          controller: 'EmployeeWeeklyHoursCtrl',
          templateUrl: 'ct-app/reports/employeeWeeklyHours/employeeWeeklyHours.tpl.html'
        }
      },
      data: {
        pageTitle: 'Employee Weekly Hours',
        access: access.jobWeeklyHours
      }
    });
  }
]).controller('EmployeeWeeklyHoursCtrl', [
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
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.from = moment(firstDay).format('YYYY-MM-DD');
    $scope.reportFilters.to = moment(lastDay).format('YYYY-MM-DD');
    $scope.EmpReport = '';
    $scope.emp_details = '';
    $scope.data = [];
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Employee Weekly Hours Report');
    $scope.getweekdate = function () {
      var i;
      $scope.f_date = moment($scope.reportFilters.from).format('YYYY-MM-DD');
      $scope.l_date = moment($scope.reportFilters.to).format('YYYY-MM-DD');
      $scope.week_fdate = [$scope.f_date];
      $scope.week_ldate = [];
      $scope.noofdays = moment($scope.f_date).day();
      /* if ($scope.noofdays === 0) {
                $scope.week_days = 0;
            } else {
                $scope.week_days = 7 - $scope.noofdays;
            }*/
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
      for (i = 0; moment($scope.week_ldate[i]).unix() < moment($scope.l_date).unix(); i++) {
        var dt = moment(moment($scope.week_ldate[i]).add(1, 'days')).format('YYYY-MM-DD');
        $scope.week_fdate.push(dt);
        $scope.new_date = moment($scope.week_ldate[i]).add(1, 'weeks');
        $scope.new_date = moment($scope.new_date).format('YYYY-MM-DD');
        if (moment($scope.new_date).unix() < moment($scope.l_date).unix()) {
          $scope.week_ldate.push($scope.new_date);
        } else {
          $scope.week_ldate.push($scope.l_date);
        }
      }
      $scope.loadData($scope.week_fdate[0], $scope.week_ldate[0], 0, $scope.reportFilters.zone, $scope.reportFilters.employee);
    };
    $scope.loadData = function (firstdate, lastdate, length, zonecode, empcode) {
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
        'fields': 'employee_name ,employee_code,sum(work_duration_rounded_number)',
        'filter': 'employee_code <>"" and job_code<>"" and clockin >"' + $scope.fdate + '" and clockout <="' + $scope.ldate + '"  and agency_id = ' + Services.getAgencyID(),
        'order': 'employee_code desc'
      };
      if (empcode && !angular.isUndefined(empcode.code) && empcode.code) {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and  employee_code="' + empcode.code + '"';
      } else if ($scope.zone_id) {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and  empzone_code in(' + $scope.zone_id + ')';
      }
      $scope.filterObj.filter = $scope.filterObj.filter + ' GROUP BY employee_code';
      Services.employeeActivitiesService.get($scope.filterObj, function (response) {
        angular.forEach(response.record, function (item, key) {
          var week_day = moment(firstdate).day();
          var week_number = moment(firstdate).weeks();
          if (week_day === 0) {
            week_number = week_number - 1;
          }
          var regular_hours = HelperService.regularHours(item['sum(work_duration_rounded_number)']);
          var over_hours = HelperService.overHours(item['sum(work_duration_rounded_number)']);
          $scope.data.push({
            'empname': item.employee_name + ' (' + item.employee_code + ')',
            'regularhours': Number(regular_hours),
            'overhours': Number(over_hours),
            'totalhours': Number(item['sum(work_duration_rounded_number)']),
            'weekno': week_number,
            'weekstart': HelperService.formatOnlyDate(firstdate, $localStorage.user_info.country),
            'weekend': HelperService.formatOnlyDate(lastdate, $localStorage.user_info.country)
          });
        });
        // if there is more data, continue loading it
        if (length < $scope.week_ldate.length - 1) {
          length = length + 1;
          $scope.loadData($scope.week_fdate[length], $scope.week_ldate[length], length, zonecode, empcode);
        } else {
          $scope.show_activities_loader = false;
          if ($scope.data.length !== 0) {
            $scope.ctx = {
              flexGrid: null,
              data: $scope.data,
              includeColumnHeader: true
            };
            $scope.show_norecord = 2;
            $scope.EmpReport = new wijmo.collections.CollectionView($scope.data);
            $scope.EmpReport.pageSize = 10;
            $scope.groupBy = 'weekno';
            var cv = $scope.EmpReport;
            cv.groupDescriptions.clear();
            // clear current groups
            if ($scope.groupBy) {
              var groupNames = $scope.groupBy.split(',');
              //console.log(groupNames);
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
      $scope.emp_details = '';
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
      if ($scope.reportFilters.employee && !angular.isUndefined($scope.reportFilters.employee.code)) {
        var temp_empcode = 'All';
        if ($scope.reportFilters.employee.code) {
          temp_empcode = $scope.reportFilters.employee.text + ' (' + $scope.reportFilters.employee.code + ')';
        }
        mixpanelObj.Employee = temp_empcode;
      }
      mixpanel.track('Employee Weekly Hours Report', mixpanelObj);
      Services.agencyDetail.get({
        'fields': 'work_week',
        'filter': 'id="' + Services.getAgencyID() + '"'
      }, function (data) {
        $scope.week_startNo = data.record[0].work_week;
        $scope.getweekdate();
      });
    };
    //$scope.updateTableData();
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
          filter: 'status > 0 and zone_id in(' + $scope.zone_id + ')',
          order: 'last_name asc',
          limit: 20
        };
        if (query.term) {
          $scope.empObj.filter += ' and ( last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%" )';
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
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Employee Weekly Hours Report');
    };
  }
]);