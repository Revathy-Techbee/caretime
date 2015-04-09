angular.module('ctApp.employeeActivity', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.employeeActivity', {
      url: '/employeeActivity',
      views: {
        'appNested': {
          controller: 'EmployeeActivitiesCtrl',
          templateUrl: 'ct-app/logs/employeeActivities/employeeActivities.tpl.html'
        }
      },
      data: {
        pageTitle: 'Employee Activity LIST',
        access: access.employeeActivity
      }
    });
  }
]).controller('EmployeeActivitiesCtrl', [
  '$scope',
  'Services',
  'HelperService',
  '$timeout',
  '$localStorage',
  function ($scope, Services, HelperService, $timeout, $localStorage) {
    $scope.logFilters = {};
    $scope.logFilters.filterName = '';
    $scope.logFilters.zoneName = null;
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.logFilters.zoneName = [{
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['zone_code'],
            'code': res.data.record[0]['zone_code']
          }];
      });
    }
    $scope.logFilters.filterValue = '';
    $scope.filterName = [
      {
        name: 'Employee',
        id: 'employee_code'
      },
      {
        name: 'Job',
        id: 'job_code'
      }
    ];
    $scope.showerrorMsg = false;
    $scope.show_activities_loader = false;
    $scope.employeeActivityList = [];
    $scope.employeeActivityListDetail = {};
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.logFilters.startDate = moment(firstDay).format('YYYY-MM-DD');
    $scope.logFilters.endDate = moment(lastDay).format('YYYY-MM-DD');
    $scope.loadData = function (fdate, ldate, filterZone, filterName, filterCode, offset) {
      var filterObj = {
          'fields': 'employee_code,employee_name,Job_code,job_name,Zone_code,Zone_name,clockin,clockout,orig_clock_in,orig_clock_out,Call_status_IN,Call_status_OUT,work_duration,orig_work_duration',
          'limit': $scope.call_limit,
          'offset': offset,
          'include_count': true,
          'order': 'id desc',
          'filter': 'employee_code <>\'\' and job_code<>\'\' and clockin >=\'' + fdate + '\' and clockout <=\'' + ldate + '\' and agency_id = ' + Services.getAgencyID()
        };
      if (filterCode && !angular.isUndefined(filterCode.code) && filterCode.code && filterCode.id !== 'all') {
        filterObj.filter = filterObj.filter + ' and ' + filterName.id + ' like "' + filterCode.code + '"';
      } else if ($scope.zoneid) {
        if (filterName.id == 'job_code') {
          filterObj.filter = filterObj.filter + ' and jobzone_code in(' + $scope.zoneid + ')';
        } else {
          filterObj.filter = filterObj.filter + ' and empzone_code in(' + $scope.zoneid + ')';
        }
      }
      Services.employeeActivitiesService.get(filterObj, function (data) {
        angular.forEach(data.record, function (item, key) {
          $scope.employeeActivityList.push({
            'employee_code': item.employee_name + ' (' + item.employee_code + ')',
            'job_code': item.job_name + ' (' + item.Job_code + ')',
            'Zone_code': item.Zone_name + ' (' + item.Zone_code + ')',
            'clockin': HelperService.formatingDate(item.clockin, $localStorage.user_info.country),
            'clockout': HelperService.formatingDate(item.clockout, $localStorage.user_info.country),
            'orig_clock_in': HelperService.formatingDate(item.orig_clock_in, $localStorage.user_info.country),
            'orig_clock_out': HelperService.formatingDate(item.orig_clock_out, $localStorage.user_info.country),
            'Call_status_IN': item.Call_status_IN,
            'Call_status_OUT': item.Call_status_OUT,
            'work_duration': item.work_duration,
            'orig_work_duration': item.orig_work_duration
          });
        });
        if (data.meta.count > offset + $scope.call_limit) {
          var nextOffset = offset + $scope.call_limit + 1;
          $scope.loadData(fdate, ldate, filterZone, filterName, filterCode, nextOffset);
        } else {
          $scope.show_activities_loader = false;
          if ($scope.employeeActivityList.length !== 0) {
            $scope.noRecord = 0;
            $scope.ctx = {
              flexGrid: null,
              data: $scope.employeeActivityList,
              includeColumnHeader: true
            };
            $scope.employeeActivityListDetail = new wijmo.collections.CollectionView($scope.employeeActivityList);
            $scope.employeeActivityListDetail.pageSize = 10;
            $scope.showRecord = 1;
          } else {
            $scope.noRecord = 1;
            $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
          }
        }
      });
    };
    $scope.exportExcel = function () {
      if ($scope.noRecord === 0) {
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
    $scope.updateTableData = function (isFilter) {
      // on limit change
      if ($scope.logFilters.startDate && $scope.logFilters.endDate) {
        if (Date.parse($scope.logFilters.startDate) > Date.parse($scope.logFilters.endDate)) {
          $scope.showerrorMsg = true;
          $scope.error_msg = 'Invalid Date';
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
      } else {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please Select Date';
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if ($scope.logFilters.filterName.id !== 'all' && ($scope.logFilters.zoneName == null || angular.isUndefined($scope.logFilters.zoneName[0])) || ($scope.logFilters.filterName === '' || $scope.logFilters.filterValue === '') && ($scope.logFilters.filterValue.id !== 'all' && $scope.logFilters.zoneName != null && !angular.isUndefined($scope.logFilters.zoneName[0]) && $scope.logFilters.zoneName[0].id !== 'all') && $scope.logFilters.filterName.id !== 'all') {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please use the required filters';
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      $scope.showRecord = 0;
      $scope.employeeActivityList = [];
      $scope.noRecord = 0;
      $scope.show_activities_loader = true;
      var fdate = moment(moment($scope.logFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
      var a = moment(moment($scope.logFilters.endDate).format('YYYY-MM-DD'));
      var addObj = a.add('24', 'hours');
      var ldatehrs = addObj.toDate();
      var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      // $scope.zoneid = HelperService.getAsArray($scope.logFilters.zoneName, 'code');
      mixpanelObj = {
        'Field': $scope.logFilters.filterName.text,
        'Start Date': '"' + moment($scope.logFilters.startDate).format('MM/DD/YYYY') + '"',
        'End Date': '"' + moment($scope.logFilters.endDate).format('MM/DD/YYYY') + '"',
        'Agency': Services.serviceName
      };
      if ($scope.logFilters.filterName.id != 'all') {
        mixpanelObj.Zone = $scope.zone_name ? $scope.zone_name : 'All';
      }
      if ($scope.logFilters.filterValue && !angular.isUndefined($scope.logFilters.filterValue.code)) {
        var temp_fieldvalue = 'All';
        if ($scope.logFilters.filterValue.code) {
          temp_fieldvalue = $scope.logFilters.filterValue.text + ' (' + $scope.logFilters.filterValue.code + ')';
        }
        if ($scope.logFilters.filterName.id == 'job_code') {
          mixpanelObj.Job = temp_fieldvalue;
        } else {
          mixpanelObj.Employee = temp_fieldvalue;
        }
      }
      mixpanel.track('Employee Activities List', mixpanelObj);
      $scope.loadData(fdate, ldate, $scope.logFilters.zoneName, $scope.logFilters.filterName, $scope.logFilters.filterValue, 0);
    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Employee Activities list');
    $scope.clearSearch = function () {
      $scope.logFilters.filterValue = '';
      $scope.logFilters.filterName = '';
      $scope.logFilters.zoneName = null;
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.logFilters.zoneName = [{
              'text': res.data.record[0]['zone_name'],
              'id': res.data.record[0]['id'],
              'code': res.data.record[0]['zone_code']
            }];
        });
      }
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      $scope.logFilters.startDate = moment(firstDay).format('YYYY-MM-DD');
      $scope.logFilters.endDate = moment(lastDay).format('YYYY-MM-DD');
      $scope.showRecord = 0;
      $scope.employeeActivityList = [];
      $scope.noRecord = 1;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Employee Activities list');
    };
    $scope.$watch('logFilters.zoneName', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.logFilters.filterValue = '';
        $scope.zone_nameid = '';
        $scope.zoneid = '';
        $scope.zone_name = '';
      }
    });
    $scope.selectZoneOptions = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
        $scope.logFilters.filterValue = '';
        var getZone = true;
        if ($scope.logFilters.zoneName !== null && !angular.isUndefined($scope.logFilters.zoneName[0]) && $scope.logFilters.zoneName[0].code === '') {
          getZone = false;
          data = { results: [] };
        } else if ($scope.logFilters.zoneName === null || angular.isUndefined($scope.logFilters.zoneName[0])) {
          data.results.push({
            text: 'All',
            id: 'all',
            code: ''
          });
        }
        if (getZone === true) {
          $scope.zoneObj = {
            fields: 'zone_name,zone_code',
            filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
            order: 'zone_name asc',
            limit: 5
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
                'id': item.zone_code,
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
    $scope.$watch('logFilters.filterName', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.logFilters.zoneName = null;
        if ($scope.logFilters.filterName.id != 'all') {
          if ($localStorage.user_info.iszone_code) {
            Services.getEmpZoneDetail().then(function (res) {
              $scope.logFilters.zoneName = [{
                  'text': res.data.record[0]['zone_name'],
                  'id': res.data.record[0]['zone_code'],
                  'code': res.data.record[0]['zone_code']
                }];
            });
          }
        }
      }
    });
    $scope.Selectfield = {
      query: function (query) {
        var data = { results: [] };
        $scope.logFilters.filterValue = '';
        $scope.zone_nameid = '';
        $scope.zoneid = '';
        $scope.zone_name = '';
        var items = [
            {
              id: 'job_code',
              name: 'Job'
            },
            {
              id: 'employee_code',
              name: 'Employee'
            }
          ];
        data.results.push({
          text: 'Date',
          id: 'all'
        });
        angular.forEach(items, function (item, key) {
          data.results.push({
            'text': item.name,
            'id': item.id
          });
          query.callback(data);
        });
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.getFilterValue = {
      query: function (query) {
        var data = { results: [] };
        data.results.push({
          text: 'All',
          id: 'all',
          code: ''
        });
        // $scope.zoneid = HelperService.getAsArray($scope.logFilters.zoneName, 'code');
        $scope.zone_nameid = HelperService.getCode_Name($scope.logFilters.zoneName, 'code', 'text');
        $scope.zoneid = $scope.zone_nameid.Code;
        $scope.zone_name = $scope.zone_nameid.Code_Name;
        if ($scope.logFilters.filterName.id == 'job_code') {
          $scope.filterVal = [];
          $scope.jobObj = {
            fields: 'id,job_name,job_code',
            filter: 'job_zone in(' + $scope.zoneid + ') and status > 0 and agency_id =' + Services.getAgencyID(),
            limit: 5
          };
          if (query.term) {
            $scope.jobObj.filter += ' and (job_name like \'%' + query.term + '%\')';
          }
          Services.jobService.get($scope.jobObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                name: item.job_name,
                code: item.job_code,
                text: item.job_name,
                id: item.job_code
              });
              query.callback(data);
            });
          });
        } else if ($scope.logFilters.filterName.id == 'employee_code') {
          $scope.filterVal = [];
          $scope.employeeObj = {
            fields: 'id,last_name,first_name,access_code',
            filter: 'zone_id in(' + $scope.zoneid + ')  and status > 0 and agency_id =' + Services.getAgencyID(),
            limit: 5
          };
          if (query.term) {
            $scope.employeeObj.filter += '  and (last_name like \'%' + query.term + '%\' or first_name like \'%' + query.term + '%\')';
          }
          Services.employeeService.get($scope.employeeObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                name: item.last_name + ', ' + item.first_name,
                code: item.access_code,
                text: item.last_name + ', ' + item.first_name,
                id: item.access_code
              });
              query.callback(data);
            });
          });
        }
      },
      initSelection: function (element, callback) {
      }
    };
  }
]);