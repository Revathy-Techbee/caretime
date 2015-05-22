angular.module('ctApp.timeCard', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.timeCard', {
      url: '/timeCard',
      views: {
        'appNested': {
          controller: 'TimeCardsCtrl',
          templateUrl: 'ct-app/logs/timeCards/timeCards.tpl.html'
        }
      },
      data: {
        pageTitle: 'TIME CARD LIST',
        access: access.timeCard
      }
    }).state('ctApp.addUpdateTimeCard', {
      url: '/timeCard/:timeCardId',
      views: {
        'appNested': {
          controller: 'AddUpdateTimeCardCtrl',
          templateUrl: 'ct-app/logs/timeCards/add-update-timeCard.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Zone',
        access: access.timeCard
      }
    });
  }
]).controller('TimeCardsCtrl', [
  '$scope',
  'Services',
  '$state',
  '$modal',
  'HelperService',
  '$timeout',
  '$localStorage',
  function ($scope, Services, $state, $modal, HelperService, $timeout, $localStorage) {
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
    $scope.show_activities_loader = false;
    $scope.showerrorMsg = false;
    $scope.calllogList = [];
    $scope.calllogListDetail = {};
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.logFilters.startDate = moment(firstDay).format('YYYY-MM-DD');
    $scope.logFilters.endDate = moment(lastDay).format('YYYY-MM-DD');
    $scope.loadData = function (fdate, ldate, filterZone, filterName, filterCode, offset) {
      var filterObj = {
          'fields': 'employee_code,job_code,id,log_type,call_duriation,timestamp,call_status,adjusted_timestamp,adjusted_call_duriation,created_by',
          'limit': $scope.call_limit,
          'offset': offset,
          'include_count': true,
          'order': 'id desc',
          'filter': 'employee_code <>\'\' and job_code<>\'\' and  timestamp >=\'' + fdate + '\' and timestamp <=\'' + ldate + '\' and agency_id = ' + Services.getAgencyID()
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
                $scope.calllogList.push({
                  'id': item.id,
                  'employee_code': $scope.empNameList[item.employee_code],
                  'job_code': $scope.jobNameList[item.job_code],
                  'log_type': HelperService.logType(item.log_type),
                  'call_duriation': item.call_duriation,
                  'timestamp': HelperService.formatingDate(item.timestamp, $localStorage.user_info.country),
                  'call_status': item.call_status,
                  'adjusted_timestamp': HelperService.formatingDate(item.adjusted_timestamp, $localStorage.user_info.country),
                  'adjusted_call_duriation': item.adjusted_call_duriation,
                  'created_by': HelperService.AddEditUser(item.created_by)
                });
              });
              if (data.meta.count > offset + $scope.call_limit) {
                var nextOffset = offset + $scope.call_limit + 1;
                $scope.loadData(fdate, ldate, filterZone, filterName, filterCode, nextOffset);
              } else {
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
              }
            });
          });
        } else {
          $scope.show_activities_loader = false;
          $scope.noRecord = 1;
          $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
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
      $scope.calllogList = [];
      $scope.noRecord = 0;
      $scope.show_activities_loader = true;
      var fdate = moment(moment($scope.logFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
      var a = moment(moment($scope.logFilters.endDate).format('YYYY-MM-DD'));
      var addObj = a.add('24', 'hours');
      var ldatehrs = addObj.toDate();
      var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      //$scope.zoneid = HelperService.getAsArray($scope.logFilters.zoneName, 'code');
      /*$scope.zone_nameid = HelperService.getCode_Name($scope.logFilters.zoneName, 'code', 'text');
       $scope.zoneid =$scope.zone_nameid.Code;
       $scope.zone_name =$scope.zone_nameid.Code_Name;*/
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
      mixpanel.track('Time Card List', mixpanelObj);
      $scope.loadData(fdate, ldate, $scope.logFilters.zoneName, $scope.logFilters.filterName, $scope.logFilters.filterValue, 0);
    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Time Card List');
    //  $scope.updateTableData();
    $scope.enableEditView = function () {
      var current_id = $scope.calllogListDetail.currentItem.id;
      Services.setModelTempVar({ 'Timecard': current_id });
      $scope.modalInstance = $modal.open({
        templateUrl: 'ct-app/logs/timeCards/add-update-timeCard.tpl.html',
        size: 'lg',
        controller: 'AddUpdateTimeCardCtrl'
      });
      $scope.modalInstance.result.then(function () {
        $scope.updateTableData();
      });
    };
    $scope.$on('close-edit-modal', function () {
      $scope.modalInstance.close('takethisvalue');
    });
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
      $scope.calllogList = [];
      $scope.noRecord = 1;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Time Card List');
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
            filter: 'job_zone in(' + $scope.zoneid + ')  and status > 0 and agency_id =' + Services.getAgencyID(),
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
            fields: 'last_name,first_name,access_code',
            filter: 'zone_id in(' + $scope.zoneid + ')  and status > 0 and agency_id =' + Services.getAgencyID(),
            limit: 20
          };
          if (query.term) {
            $scope.employeeObj.filter += '  and (last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%")';
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
]).controller('AddUpdateTimeCardCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  '$rootScope',
  '$modal',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage, $rootScope, $modal) {
    $scope.empCountry = $localStorage.user_info.country;
    $scope.showWarningMsg = false;
    $scope.savedisable = 0;
    $scope.timecard = {};
    $scope.timecard.zone = [];
    // {id:"",text:""};
    $scope.timecard.employee_code = '';
    //{id:"",text:""};
    $scope.timecard.job_code = '';
    //{id:"",text:""};
    $scope.filterValues = [];
    $scope.zonecodeValues = [];
    $scope.filterJobValues = [];
    $scope.log_type = 0;
    $scope.last_date = '';
    $scope.timecardDBField = {};
    $scope.authWarning = false;
    // $scope.timecard.clock_in = '';
    $scope.showinactive = 0;
    $scope.clock_in_flag = 0;
    var timecard_details = Services.getModelTempVar();
    if (timecard_details) {
      if (timecard_details.Timecard) {
        $scope.timecardId = timecard_details.Timecard;
        Services.setModelTempVar('');
      }
    }
    if ($scope.timecardId) {
      $scope.pageTitle = 'Update';
      Services.timeLog.get({ filter: 'id=\'' + $scope.timecardId + '\'' }, function (remoteData) {
        $scope.timecardDBField = remoteData.record[0];
        $scope.timecard.zone = $scope.timecardDBField.zone_code;
        $scope.timecard.employee_code = $scope.timecardDBField.employee_code;
        $scope.timecard.employeecodeonly = $scope.timecardDBField.employee_code;
        $scope.timecard.job_code = $scope.timecardDBField.job_code;
        $scope.timecard.jobcodeonly = $scope.timecardDBField.job_code;
        $scope.timecard.originaldat = $scope.timecardDBField.adjusted_timestamp;
        $scope.timecard.originaldur = $scope.timecardDBField.adjusted_call_duriation;
        $scope.timecard.editedOn = HelperService.convertUTCtoMytimeZone($scope.timecardDBField.edited_on);
        $scope.timecard.edited_by = $scope.timecardDBField.updated_by;
        $scope.timecard.created_on = HelperService.convertUTCtoMytimeZone($scope.timecardDBField.created_on);
        $scope.timecard.created_by = $scope.timecardDBField.created_by;
        $scope.timecard.notes = $scope.timecardDBField.notes;
        //$scope.timecard.current_date = moment().format('YYYY-MM-DD hh:mm a');
        $scope.timecard.ref_id = $scope.timecardDBField.ref_id;
        $scope.log_type = $scope.timecardDBField.log_type;
        var lastTimeUTC = moment.tz($scope.timecardDBField.timestamp, 'UTC').format();
        // set incoming time zone as UTC
        $scope.timecard.current_date = moment(lastTimeUTC).format('YYYY-MM-DD hh:mm a');
        $scope.timecardDBField.timestamp = lastTimeUTC;
        $scope.last_date = moment($scope.timecardDBField.timestamp).toDate();
        if ($scope.log_type == 1) {
          $scope.timecard.clock_in = moment($scope.timecardDBField.timestamp).toDate();
          $scope.timecard.clockinID = $scope.timecardDBField.id;
          $scope.timecard.clockInSat = $scope.timecardDBField.call_status;
        } else {
          $scope.timecard.clockoutID = $scope.timecardDBField.id;
          $scope.timecard.clockOutSat = $scope.timecardDBField.call_status;
          $scope.timecard.clock_out = moment($scope.timecardDBField.timestamp).toDate();
          $scope.timecard.duration = $scope.timecardDBField.call_duriation;
          $scope.timecard.durOld = $scope.timecardDBField.call_duriation;
          $scope.last_dur = $scope.timecardDBField.call_duriation;
        }
        $scope.timecard.authorization = $scope.timecardDBField.authorization_id ? $scope.timecardDBField.authorization_id : '';
        $scope.timecard.authorizationID = $scope.timecard.authorization;
        $scope.timecard.authOld = $scope.timecard.authorization;
        $scope.getempyid($scope.timecard.employee_code);
        $scope.getjobbyid($scope.timecard.job_code);
        if ($scope.log_type == 2) {
          $scope.showinactive = 1;
          Services.timeLog.get({
            fields: 'id,timestamp,call_status',
            limit: '1',
            order: 'id desc',
            filter: 'id=\'' + $scope.timecard.ref_id + '\''
          }, function (remoteData) {
            $scope.timeLogDBField = remoteData.record[0];
            var lastTimeLogUTC = moment.tz($scope.timeLogDBField.timestamp, 'UTC').format();
            $scope.timecard.clockinID = $scope.timeLogDBField.id;
            $scope.timecard.clockInSat = $scope.timeLogDBField.call_status;
            $scope.timeLogDBField.timestamp = lastTimeLogUTC;
            $scope.logoutID = $scope.timecard.ref_id;
            $scope.timecard.clock_in = moment($scope.timeLogDBField.timestamp).toDate();
            $scope.timecard.authorization = $scope.timecard.authorizationID;
          });
        } else {
          Services.timeLog.get({
            fields: 'id,timestamp,call_duriation,id,adjusted_timestamp,call_status',
            limit: '1',
            order: 'id desc',
            filter: 'ref_id=\'' + $scope.timecardId + '\''
          }, function (remoteData) {
            if (remoteData.record.length !== 0) {
              $scope.showinactive = 1;
              $scope.timeLogDBField = remoteData.record[0];
              var lastTimeLogUTC = moment.tz($scope.timeLogDBField.timestamp, 'UTC').format();
              // set incoming time zone as UTC
              $scope.timeLogDBField.timestamp = lastTimeLogUTC;
              $scope.timecard.clockoutID = $scope.timeLogDBField.id;
              $scope.timecard.clockOutSat = $scope.timeLogDBField.call_status;
              $scope.timecard.clock_out = moment($scope.timeLogDBField.timestamp).toDate();
              $scope.timecard.duration = $scope.timeLogDBField.call_duriation;
              $scope.timecard.durOld = $scope.timeLogDBField.call_duriation;
              $scope.logoutID = $scope.timeLogDBField.id;
              $scope.timecard.clockout_originaldat = $scope.timeLogDBField.adjusted_timestamp;
              $scope.last_dur = $scope.timeLogDBField.call_duriation;
              $scope.timecard.authorization = $scope.timecard.authorizationID;
            } else {
              $scope.clock_in_flag = 1;
              $scope.showinactive = 0;
            }
          });
        }
      });
    } else {
      $scope.pageTitle = 'Add New';
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.timecard.zone = {
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['zone_code']
          };
        });
      }
    }
    $scope.selectZoneOptions = {
      query: function (query) {
        var data = { results: [] };
        $scope.timecard.employee_code = '';
        $scope.timecard.job_code = '';
        $scope.timecard.authorization = '';
        $scope.timecard.authorization_notes = '';
        $scope.zoneObj = {
          fields: 'zone_name,zone_code',
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
              'id': item.zone_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if ($localStorage.user_info.iszone_code && !angular.isUndefined($scope.timecard.zone) && !angular.isUndefined($scope.timecard.zone.id) && $scope.timecard.zone.id) {
          callback({
            'text': $scope.timecard.zone.text,
            'id': $scope.timecard.zone.id
          });
        }
      }
    };
    $scope.inactiveTimecard = function (data) {
      Services.setModelTempVar(data);
      $scope.modalInstance = $modal.open({
        templateUrl: 'ct-app/logs/timeCards/InactiveTimeCard.tpl.html',
        controller: 'InactiveTimecardCtrl'
      });
      $scope.modalInstance.result.then(function () {
      });
    };
    $scope.savetimecard = function () {
      $scope.savedisable = 1;
      $scope.existdate = {};
      if ($scope.clock_in_flag == 1) {
        if (!$scope.timecard.employee_code || !$scope.timecard.job_code || !$scope.timecard.clock_in) {
          $scope.showerrorMsg = true;
          $scope.savedisable = 0;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Required field is missing !!!';
          jQuery('.addtimecard .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        } else {
          $scope.savedisable = 1;
          var dt = new Date();
          if (Date.parse($scope.timecard.clock_in) > Date.parse(dt)) {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'InValid New Date/time !!!';
            jQuery('.addtimecard .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        }
      } else {
        if (!$scope.timecard.employee_code || !$scope.timecard.job_code || !$scope.timecard.clock_in || !$scope.timecard.duration || !$scope.timecard.clock_out) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Required field is missing !!!';
          jQuery('.addtimecard .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
      }
      if ($scope.timecard.employee_code.id === '' || $scope.timecard.job_code.id === '') {
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Required field is missing !!!';
        jQuery('.addtimecard .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      } else {
        //Revathy check  authorizationService exist
        Services.jobauthorizationService.get({
          filter: 'job =\'' + $scope.timecard.job_code + '\'  and status > 0 and authorization_end_date>=\'' + moment($scope.timecard.clock_in).format('YYYY-MM-DD') + '\' and authorization_start_date<=\'' + moment($scope.timecard.clock_in).format('YYYY-MM-DD') + '\' and agency_id = ' + Services.getAgencyID(),
          fields: 'count(id)'
        }, function (remoteData) {
          $scope.authorizationCnt = remoteData.record[0]['count(id)'];
          if ($scope.authorizationCnt > 0 && angular.isUndefined($scope.timecard.authorization.id)) {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Please Select Authorization !!!';
            jQuery('.addtimecard .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else {
            //Check clockin already exist 
            var format_clockin = moment($scope.timecard.clock_in).utc().format('YYYY-MM-DD HH:mm');
            var format_clockout = moment($scope.timecard.clock_out).utc().format('YYYY-MM-DD HH:mm');
            $scope.ActivitiesfilterObj = {
              fields: 'clockin,clockout',
              filter: 'agency_id = ' + Services.getAgencyID() + ' and (((clockin <=\'' + format_clockin + '\') AND  (clockout >=\'' + format_clockin + '\')) OR ((clockin <=\'' + format_clockout + '\') AND  (clockout >=\'' + format_clockout + '\')) OR ((clockin >=\'' + format_clockin + '\') AND  (clockout <=\'' + format_clockout + '\')))  ',
              'include_count': true
            };
            if ($scope.timecardId) {
              if ($scope.log_type == 2) {
                $scope.ActivitiesfilterObj.filter = $scope.ActivitiesfilterObj.filter + ' and  employee_code = \'' + $scope.timecard.employeecodeonly + '\' and ref_id!=\'' + $scope.timecard.ref_id + '\'';
              } else {
                $scope.ActivitiesfilterObj.filter = $scope.ActivitiesfilterObj.filter + ' and  employee_code = \'' + $scope.timecard.employeecodeonly + '\' and ref_id!=\'' + $scope.timecardId + '\'';
              }
            } else {
              $scope.ActivitiesfilterObj.filter = $scope.ActivitiesfilterObj.filter + ' and  employee_code = \'' + $scope.timecard.employee_code.id + '\'';
            }
            //return;
            Services.employeeActivitiesService.get($scope.ActivitiesfilterObj, function (remoteData) {
              if (remoteData.meta.count > 0) {
                angular.forEach(remoteData.record, function (item, key) {
                  $scope.existdate.push = {
                    'clockin': item.clockin,
                    'clockout': item.clockout
                  };
                });
                $scope.showWarningMsg = true;
                $scope.WarningClass = 'warning';
                $scope.Splittimecard();
              } else {
                $scope.Splittimecard();
              }
            });
          }
        });
      }
    };
    $scope.Splittimecard = function () {
      $scope.savedisable = 1;
      $scope.Splittimecnt = 0;
      var a, b;
      $scope.newInOut = [];
      $scope.timecard.newClockin = moment($scope.timecard.clock_in).format('YYYY-MM-DD HH:mm');
      $scope.timecard.newClockout = $scope.timecard.clock_out;
      var dayCount = moment(moment($scope.timecard.clock_out).format('YYYY-MM-DD')).diff(moment(moment($scope.timecard.clock_in).format('YYYY-MM-DD')), 'days');
      if (moment(moment($scope.timecard.clock_in).format('YYYY-MM-DD')).unix() < moment(moment($scope.timecard.clock_out).format('YYYY-MM-DD')).unix()) {
        var i = 0;
        do {
          $scope.timecard.newClockout = moment($scope.timecard.newClockin).format('YYYY-MM-DD') + ' 23:59';
          if (moment($scope.timecard.newClockout).unix() > moment($scope.timecard.clock_out).unix()) {
            $scope.timecard.newClockout = moment($scope.timecard.clock_out).format('YYYY-MM-DD HH:mm');
          }
          a = moment($scope.timecard.newClockin);
          b = moment($scope.timecard.newClockout);
          if (moment($scope.timecard.newClockin).unix() != moment($scope.timecard.newClockout).unix() || i === 0) {
            $scope.timecard.newduration = HelperService.floatToTime(b.diff(a, 'hours', true));
            checkclockin = moment($scope.timecard.newClockin).format('YYYY-MM-DD');
            if (!angular.isUndefined($scope.timecard.authorization) && !angular.isUndefined($scope.timecard.authorization.id)) {
              if (moment($scope.timecard.authorization.enddate).unix() >= moment(checkclockin).unix() && moment($scope.timecard.authorization.startdate).unix() <= moment(checkclockin).unix()) {
                $scope.newInOut.push({
                  'clockin': $scope.timecard.newClockin,
                  'clockout': $scope.timecard.newClockout,
                  'duration': $scope.timecard.newduration
                });
              } else {
                $scope.authWarning = true;
                break;
              }
            } else {
              $scope.newInOut.push({
                'clockin': $scope.timecard.newClockin,
                'clockout': $scope.timecard.newClockout,
                'duration': $scope.timecard.newduration
              });
            }
          }
          $scope.timecard.newClockin = moment(moment(moment($scope.timecard.newClockin).format('YYYY-MM-DD')).add(1, 'days')).format('YYYY-MM-DD') + ' 00:00';
          i++;
        } while (i <= dayCount);
      } else {
        $scope.newInOut.push({
          'clockin': $scope.timecard.newClockin,
          'clockout': $scope.timecard.newClockout,
          'duration': $scope.timecard.duration
        });
      }
      $scope.AddUpdatetimecard($scope.newInOut[0]);
    };
    $scope.AddUpdatetimecard = function (newClockInOut) {
      var clock_in;
      $scope.Splittimecnt++;
      if ($scope.timecardId && $scope.Splittimecnt == 1 && $scope.log_type == 2 || $scope.log_type == 1 && $scope.Splittimecnt == $scope.newInOut.length) {
        // means it is in edit state 
        var updatedur = '';
        updatedur = { authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : '' };
        if ($scope.log_type == 1) {
          //Edit clock In data
          if ($scope.timecard.originaldat) {
            clock_in = {
              timestamp: moment(newClockInOut.clockin).utc().format('YYYY-MM-DD HH:mm'),
              edited_on: moment().utc(),
              updated_by: JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              }),
              notes: $scope.timecard.notes,
              authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : ''
            };
          } else {
            clock_in = {
              timestamp: moment(newClockInOut.clockin).utc().format('YYYY-MM-DD HH:mm'),
              edited_on: moment().utc(),
              adjusted_timestamp: moment($scope.last_date).utc().format('YYYY-MM-DD HH:mm'),
              updated_by: JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              }),
              notes: $scope.timecard.notes,
              authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : ''
            };
          }
          if ($scope.clock_in_flag != 1) {
            if ($scope.timecard.clockout_originaldat) {
              updatedur = {
                call_duriation: newClockInOut.duration,
                edited_on: moment().utc(),
                updated_by: JSON.stringify({
                  'username': $localStorage.user_info.username,
                  'firstname': $localStorage.user_info.first_name,
                  'lastname': $localStorage.user_info.last_name,
                  'user_id': $localStorage.user_info.user_id
                }),
                authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : '',
                timestamp: moment(newClockInOut.clockout).utc().format('YYYY-MM-DD HH:mm')
              };
            } else {
              updatedur = {
                call_duriation: newClockInOut.duration,
                adjusted_timestamp: moment($scope.timeLogDBField.timestamp).utc().format('YYYY-MM-DD HH:mm'),
                adjusted_call_duriation: $scope.last_dur,
                edited_on: moment().utc(),
                updated_by: JSON.stringify({
                  'username': $localStorage.user_info.username,
                  'firstname': $localStorage.user_info.first_name,
                  'lastname': $localStorage.user_info.last_name,
                  'user_id': $localStorage.user_info.user_id
                }),
                authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : '',
                timestamp: moment(newClockInOut.clockout).utc().format('YYYY-MM-DD HH:mm')
              };
            }
          }
        } else {
          //Edit clock Out data
          if ($scope.timecard.originaldur) {
            clock_in = {
              timestamp: moment(newClockInOut.clockout).utc().format('YYYY-MM-DD HH:mm'),
              call_duriation: newClockInOut.duration,
              edited_on: moment().utc(),
              updated_by: JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              }),
              notes: $scope.timecard.notes,
              authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : ''
            };
          } else {
            clock_in = {
              timestamp: moment(newClockInOut.clockout).utc().format('YYYY-MM-DD HH:mm'),
              call_duriation: newClockInOut.duration,
              edited_on: moment().utc(),
              adjusted_timestamp: moment($scope.last_date).utc().format('YYYY-MM-DD HH:mm'),
              adjusted_call_duriation: $scope.last_dur,
              updated_by: JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              }),
              notes: $scope.timecard.notes,
              authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : ''
            };
          }
        }
        Services.timeLog.update({ id: $scope.timecardId }, clock_in, function (data) {
          $scope.logger = {};
          $scope.logger.userid = $localStorage.user_info.user_id;
          $scope.logger.user_detail = JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name
          });
          $scope.logger.action = 'Update';
          $scope.logger.agency_id = Services.getAgencyID();
          $scope.logger.action_id = data.id;
          $scope.logger.action_table = 'time_log';
          $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
          Services.userLog.save({}, $scope.logger, function (data) {
          });
          if ($scope.clock_in_flag != 1) {
            Services.timeLog.update({ id: $scope.logoutID }, updatedur, function (data) {
              //time_log
              $scope.logger = {};
              $scope.logger.userid = $localStorage.user_info.user_id;
              $scope.logger.user_detail = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name
              });
              $scope.logger.action = 'Update';
              $scope.logger.agency_id = Services.getAgencyID();
              $scope.logger.action_id = data.id;
              $scope.logger.action_table = 'time_log';
              $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
              Services.userLog.save({}, $scope.logger, function (data) {
              });
              if (updatedur.authorization_id || $scope.timecard.authOld) {
                if (updatedur.authorization_id == $scope.timecard.authOld) {
                  //Update for same  authorization
                  Services.jobauthorizationService.get({
                    filter: 'id=\'' + updatedur.authorization_id + '\'',
                    fields: 'hours_used,hours_remaining,total_hours'
                  }, function (remoteData) {
                    hours_used = remoteData.record[0].hours_used ? remoteData.record[0].hours_used : 0;
                    newhours_used = parseFloat(hours_used) + parseFloat(HelperService.timeToFloat(newClockInOut.duration)) - parseFloat(HelperService.timeToFloat($scope.timecard.durOld));
                    Services.jobauthorizationService.update({ id: updatedur.authorization_id }, {
                      hours_used: newhours_used,
                      hours_remaining: parseFloat(remoteData.record[0].total_hours) - parseFloat(newhours_used)
                    }, function (data) {
                      $scope.logger = {};
                      $scope.logger.userid = $localStorage.user_info.user_id;
                      $scope.logger.user_detail = JSON.stringify({
                        'username': $localStorage.user_info.username,
                        'firstname': $localStorage.user_info.first_name,
                        'lastname': $localStorage.user_info.last_name
                      });
                      $scope.logger.action = 'Update';
                      $scope.logger.agency_id = Services.getAgencyID();
                      $scope.logger.action_id = data.id;
                      $scope.logger.action_table = 'job_authorization';
                      $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                      Services.userLog.save({}, $scope.logger, function (data) {
                      });
                      if ($scope.newInOut.length > $scope.Splittimecnt) {
                        $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                      } else {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = 'success';
                        $scope.ErrorMsg = 'Time card edited successfully !!!';
                        $timeout(function () {
                          $scope.showerrorMsg = false;
                          $scope.modelclose();
                        }, 3000);
                      }
                    });
                  });
                } else if (updatedur.authorization_id != $scope.timecard.authOld) {
                  //Update for diffrent  authorization
                  if ($scope.timecard.authOld) {
                    Services.jobauthorizationService.get({
                      filter: 'id=\'' + $scope.timecard.authOld + '\'',
                      fields: 'hours_used,hours_remaining,authorization_end_date,total_hours'
                    }, function (remoteData) {
                      /*if (moment(moment(remoteData.record[0].authorization_end_date).format('MM/DD/YYYY')).isBefore(moment().format('MM/DD/YYYY'))) //check existing authorization is past date
                                            {*/
                      hours_used = remoteData.record[0].hours_used ? remoteData.record[0].hours_used : 0;
                      newhours_used = parseFloat(hours_used) - parseFloat(HelperService.timeToFloat($scope.timecard.durOld));
                      Services.jobauthorizationService.update({ id: $scope.timecard.authOld }, {
                        hours_used: newhours_used,
                        hours_remaining: parseFloat(remoteData.record[0].total_hours) - parseFloat(newhours_used)
                      }, function (data) {
                        $scope.logger = {};
                        $scope.logger.userid = $localStorage.user_info.user_id;
                        $scope.logger.user_detail = JSON.stringify({
                          'username': $localStorage.user_info.username,
                          'firstname': $localStorage.user_info.first_name,
                          'lastname': $localStorage.user_info.last_name
                        });
                        $scope.logger.action = 'Update';
                        $scope.logger.agency_id = Services.getAgencyID();
                        $scope.logger.action_id = data.id;
                        $scope.logger.action_table = 'job_authorization';
                        $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                        Services.userLog.save({}, $scope.logger, function (data) {
                        });
                        if (updatedur.authorization_id) {
                          Services.jobauthorizationService.get({
                            filter: 'id=\'' + updatedur.authorization_id + '\'',
                            fields: 'hours_used,hours_remaining,total_hours'
                          }, function (remoteData) {
                            hours_used = remoteData.record[0].hours_used ? remoteData.record[0].hours_used : 0;
                            newhours_used = parseFloat(hours_used) + parseFloat(HelperService.timeToFloat(newClockInOut.duration));
                            Services.jobauthorizationService.update({ id: updatedur.authorization_id }, {
                              hours_used: newhours_used,
                              hours_remaining: parseFloat(remoteData.record[0].total_hours) - parseFloat(newhours_used)
                            }, function (data) {
                              $scope.logger = {};
                              $scope.logger.userid = $localStorage.user_info.user_id;
                              $scope.logger.user_detail = JSON.stringify({
                                'username': $localStorage.user_info.username,
                                'firstname': $localStorage.user_info.first_name,
                                'lastname': $localStorage.user_info.last_name
                              });
                              $scope.logger.action = 'Update';
                              $scope.logger.agency_id = Services.getAgencyID();
                              $scope.logger.action_id = data.id;
                              $scope.logger.action_table = 'job_authorization';
                              $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                              Services.userLog.save({}, $scope.logger, function (data) {
                              });
                              if ($scope.newInOut.length > $scope.Splittimecnt) {
                                $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                              } else {
                                $scope.savedisable = 0;
                                $scope.showerrorMsg = true;
                                $scope.ErrorClass = 'success';
                                $scope.ErrorMsg = 'Time card edited successfully !!!';
                                $timeout(function () {
                                  $scope.showerrorMsg = false;
                                  $scope.modelclose();
                                }, 3000);
                              }
                            });
                          });
                        } else {
                          if ($scope.newInOut.length > $scope.Splittimecnt) {
                            $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                          } else {
                            $scope.savedisable = 0;
                            $scope.showerrorMsg = true;
                            $scope.ErrorClass = 'success';
                            $scope.ErrorMsg = 'Time card edited successfully !!!';
                            $timeout(function () {
                              $scope.showerrorMsg = false;
                              $scope.modelclose();
                            }, 3000);
                          }
                        }
                      });  // } 
                           /*else if (updatedur.authorization_id && moment($scope.timecard.authorization.enddate).isBefore(moment().format('MM/DD/YYYY'))) {


                                                Services.jobauthorizationService.get({
                                                    filter: "id='" + updatedur.authorization_id + "'",
                                                    fields: "hours_used,hours_remaining,total_hours"
                                                }, function(remoteData) {
                                                    hours_used = (remoteData.record[0].hours_used ? remoteData.record[0].hours_used : 0);
                                                    newhours_used = (parseFloat(hours_used) + parseFloat(HelperService.timeToFloat(newClockInOut.duration)));

                                                    Services.jobauthorizationService.update({
                                                        id: updatedur.authorization_id
                                                    }, {
                                                        hours_used: newhours_used,
                                                        hours_remaining: (parseFloat(remoteData.record[0].total_hours) - parseFloat(newhours_used)),
                                                    }, function(data) {

                                                        if ($scope.newInOut.length > $scope.Splittimecnt) {
                                                            $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                                                        } else {
                                                            $scope.savedisable = 0;
                                                            $scope.showerrorMsg = true;
                                                            $scope.ErrorClass = "success";
                                                            $scope.ErrorMsg = "Time card edited successfully !!!";
                                                            $timeout(function() {
                                                                $scope.showerrorMsg = false;
                                                                $scope.modelclose();
                                                            }, 3000);
                                                        }
                                                    });
                                                });
                                            }*/
                           /* else {
                                                if ($scope.newInOut.length > $scope.Splittimecnt) {
                                                    $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                                                } else {
                                                    $scope.savedisable = 0;
                                                    $scope.showerrorMsg = true;
                                                    $scope.ErrorClass = "success";
                                                    $scope.ErrorMsg = "Time card edited successfully !!!";
                                                    $timeout(function() {
                                                        $scope.showerrorMsg = false;
                                                        $scope.modelclose();
                                                    }, 3000);
                                                }

                                            }*/
                    });
                  } else if (updatedur.authorization_id && moment($scope.timecard.authorization.enddate).isBefore(moment().format('MM/DD/YYYY'))) {
                    Services.jobauthorizationService.get({
                      filter: 'id=\'' + updatedur.authorization_id + '\'',
                      fields: 'hours_used,hours_remaining,total_hours'
                    }, function (remoteData) {
                      hours_used = remoteData.record[0].hours_used ? remoteData.record[0].hours_used : 0;
                      newhours_used = parseFloat(hours_used) + parseFloat(HelperService.timeToFloat(newClockInOut.duration));
                      Services.jobauthorizationService.update({ id: updatedur.authorization_id }, {
                        hours_used: newhours_used,
                        hours_remaining: parseFloat(remoteData.record[0].total_hours) - parseFloat(newhours_used)
                      }, function (data) {
                        $scope.logger = {};
                        $scope.logger.userid = $localStorage.user_info.user_id;
                        $scope.logger.user_detail = JSON.stringify({
                          'username': $localStorage.user_info.username,
                          'firstname': $localStorage.user_info.first_name,
                          'lastname': $localStorage.user_info.last_name
                        });
                        $scope.logger.action = 'Update';
                        $scope.logger.agency_id = Services.getAgencyID();
                        $scope.logger.action_id = data.id;
                        $scope.logger.action_table = 'job_authorization';
                        $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                        Services.userLog.save({}, $scope.logger, function (data) {
                        });
                        if ($scope.newInOut.length > $scope.Splittimecnt) {
                          $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                        } else {
                          $scope.savedisable = 0;
                          $scope.showerrorMsg = true;
                          $scope.ErrorClass = 'success';
                          $scope.ErrorMsg = 'Time card edited successfully !!!';
                          $timeout(function () {
                            $scope.showerrorMsg = false;
                            $scope.modelclose();
                          }, 3000);
                        }
                      });
                    });
                  } else {
                    if ($scope.newInOut.length > $scope.Splittimecnt) {
                      $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                    } else {
                      $scope.savedisable = 0;
                      $scope.showerrorMsg = true;
                      $scope.ErrorClass = 'success';
                      $scope.ErrorMsg = 'Time card edited successfully !!!';
                      $timeout(function () {
                        $scope.showerrorMsg = false;
                        $scope.modelclose();
                      }, 3000);
                    }
                  }
                } else {
                  if ($scope.newInOut.length > $scope.Splittimecnt) {
                    $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                  } else {
                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = 'success';
                    $scope.ErrorMsg = 'Time card edited successfully !!!';
                    $timeout(function () {
                      $scope.showerrorMsg = false;
                      $scope.modelclose();
                    }, 3000);
                  }
                }
              } else {
                if ($scope.newInOut.length > $scope.Splittimecnt) {
                  $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                } else {
                  $scope.savedisable = 0;
                  $scope.showerrorMsg = true;
                  $scope.ErrorClass = 'success';
                  $scope.ErrorMsg = 'Time card edited successfully !!!';
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $scope.modelclose();
                  }, 3000);
                }
              }
            });
          } else {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'success';
            $scope.ErrorMsg = 'Time card edited successfully !!!';
            $timeout(function () {
              $scope.showerrorMsg = false;
              $scope.modelclose();
            }, 3000);
          }
        });
      } else {
        //Adding New
        clock_in = {
          log_type: '1',
          timestamp: moment(newClockInOut.clockin).utc().format('YYYY-MM-DD HH:mm'),
          created_on: moment().utc(),
          created_by: JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name,
            'user_id': $localStorage.user_info.user_id
          }),
          notes: $scope.timecard.notes,
          authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : '',
          agency_id: Services.getAgencyID()
        };
        if ($scope.timecardId) {
          clock_in.employee_code = $scope.timecard.employeecodeonly;
          clock_in.job_code = $scope.timecard.jobcodeonly;
          if (!angular.isUndefined($scope.timecard.zone) && $scope.timecard.zone && $scope.timecard.zone != null) {
            clock_in.zone_code = $scope.timecard.zone;
          }
          clock_in.call_status = 'Timecard Split';
        } else {
          if ($scope.Splittimecnt == 1) {
            clock_in.call_status = 'Agency-Manual';
          } else {
            clock_in.call_status = 'Timecard Split';
          }
          clock_in.employee_code = $scope.timecard.employee_code.id;
          clock_in.job_code = $scope.timecard.job_code.id;
          if (!angular.isUndefined($scope.timecard.zone) && $scope.timecard.zone && $scope.timecard.zone != null) {
            clock_in.zone_code = $scope.timecard.zone.id;
          }
        }
        Services.timeLog.save(clock_in, function (data) {
          $scope.logger = {};
          $scope.logger.userid = $localStorage.user_info.user_id;
          $scope.logger.user_detail = JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name
          });
          $scope.logger.action = 'Add';
          $scope.logger.agency_id = Services.getAgencyID();
          $scope.logger.action_id = data.id;
          $scope.logger.action_table = 'time_log';
          $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
          Services.userLog.save({}, $scope.logger, function (data) {
          });
          var clock_out = {
              log_type: '2',
              timestamp: moment(newClockInOut.clockout).utc().format('YYYY-MM-DD HH:mm'),
              call_duriation: newClockInOut.duration,
              created_on: moment().utc(),
              ref_id: data.id,
              created_by: JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              }),
              notes: $scope.timecard.notes,
              authorization_id: $scope.timecard.authorization ? $scope.timecard.authorization.id : '',
              agency_id: Services.getAgencyID()
            };
          if ($scope.timecardId) {
            clock_out.employee_code = $scope.timecard.employeecodeonly;
            clock_out.job_code = $scope.timecard.jobcodeonly;
            if (!angular.isUndefined($scope.timecard.zone) && $scope.timecard.zone && $scope.timecard.zone != null) {
              clock_in.zone_code = $scope.timecard.zone;
            }
            clock_out.call_status = 'Timecard Split';
          } else {
            if ($scope.Splittimecnt == $scope.newInOut.length) {
              clock_out.call_status = 'Agency-Manual';
            } else {
              clock_out.call_status = 'Timecard Split';
            }
            clock_out.employee_code = $scope.timecard.employee_code.id;
            clock_out.job_code = $scope.timecard.job_code.id;
            if (!angular.isUndefined($scope.timecard.zone) && $scope.timecard.zone && $scope.timecard.zone != null) {
              clock_out.zone_code = $scope.timecard.zone.id;
            }  // clock_out.zone_code = $scope.timecard.zone.id;
          }
          Services.timeLog.save(clock_out, function (data) {
            $scope.logger = {};
            $scope.logger.userid = $localStorage.user_info.user_id;
            $scope.logger.user_detail = JSON.stringify({
              'username': $localStorage.user_info.username,
              'firstname': $localStorage.user_info.first_name,
              'lastname': $localStorage.user_info.last_name
            });
            $scope.logger.action = 'Add';
            $scope.logger.agency_id = Services.getAgencyID();
            $scope.logger.action_id = data.id;
            $scope.logger.action_table = 'time_log';
            $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
            Services.userLog.save({}, $scope.logger, function (data) {
            });
            if (clock_out.authorization_id && moment($scope.timecard.authorization.enddate).isBefore(moment().format('MM/DD/YYYY'))) {
              Services.jobauthorizationService.get({
                filter: 'id=\'' + clock_out.authorization_id + '\'',
                fields: 'hours_used,hours_remaining,total_hours'
              }, function (remoteData) {
                hours_used = remoteData.record[0].hours_used ? remoteData.record[0].hours_used : 0;
                newhours_used = parseFloat(hours_used) + parseFloat(HelperService.timeToFloat(clock_out.call_duriation));
                total_hours = remoteData.record[0].total_hours ? remoteData.record[0].total_hours : 0;
                Services.jobauthorizationService.update({ id: clock_out.authorization_id }, {
                  hours_used: newhours_used,
                  hours_remaining: parseFloat(total_hours) - parseFloat(newhours_used)
                }, function (data) {
                  $scope.logger = {};
                  $scope.logger.userid = $localStorage.user_info.user_id;
                  $scope.logger.user_detail = JSON.stringify({
                    'username': $localStorage.user_info.username,
                    'firstname': $localStorage.user_info.first_name,
                    'lastname': $localStorage.user_info.last_name
                  });
                  $scope.logger.action = 'Update';
                  $scope.logger.agency_id = Services.getAgencyID();
                  $scope.logger.action_id = data.id;
                  $scope.logger.action_table = 'job_authorization';
                  $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                  Services.userLog.save({}, $scope.logger, function (data) {
                  });
                  if ($scope.newInOut.length > $scope.Splittimecnt) {
                    $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
                  } else {
                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = 'success';
                    if ($scope.timecardId) {
                      $scope.ErrorMsg = 'Time card edited successfully !!!';
                      $timeout(function () {
                        $scope.showerrorMsg = false;
                        $scope.modelclose();
                      }, 3000);
                    } else {
                      $scope.ErrorMsg = 'Time card successfully added !!!';
                      $timeout(function () {
                        $scope.showerrorMsg = false;
                        $state.go('ctApp.timeCard');
                      }, 3000);
                    }
                  }
                });
              });
            } else {
              if ($scope.newInOut.length > $scope.Splittimecnt) {
                $scope.AddUpdatetimecard($scope.newInOut[$scope.Splittimecnt]);
              } else {
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'success';
                if ($scope.timecardId) {
                  $scope.ErrorMsg = 'Time card edited successfully !!!';
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $scope.modelclose();
                  }, 3000);
                } else {
                  $scope.ErrorMsg = 'Time card successfully added !!!';
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.timeCard');
                  }, 3000);
                }
              }
            }
          });
        });
      }
    };
    $scope.$watch('timecard.clock_out', function (newValue, oldValue) {
      var duration;
      if (newValue != oldValue) {
        if (!angular.isUndefined($scope.timecard.clock_in) && $scope.timecard.clock_in && !angular.isUndefined($scope.timecard.clock_out) && $scope.timecard.clock_out) {
          var a = moment(newValue);
          var b = moment($scope.timecard.clock_in);
          duration = a.diff(b, 'hours', true);
          if (duration >= 0) {
            duration = a.diff(b, 'hours', true);
            $scope.timecard.duration = HelperService.floatToTime(duration);
          } else {
            $scope.timecard.clock_out = '';
          }
        }
      }
    });
    $scope.$watch('timecard.clock_in', function (newValue, oldValue) {
      var a, b;
      if (newValue != oldValue) {
        $scope.timecard.authorization = '';
        $scope.timecard.authorization_notes = '';
        if (!angular.isUndefined($scope.timecard.clock_out) && $scope.timecard.clock_out) {
          a = moment(newValue);
          b = moment($scope.timecard.clock_out);
          var dur = b.diff(a, 'hours', true);
          if (dur < 0) {
            $scope.timecard.clock_in = '';
          } else {
            if ($scope.timecardId) {
              if ($scope.log_type == 2) {
                $scope.timecard.duration = $scope.timecard.duration;
              }
              if ($scope.log_type == 1) {
                $scope.timecard.duration = HelperService.floatToTime(b.diff(a, 'hours', true));
              }
            } else {
              $scope.timecard.duration = HelperService.floatToTime(dur);
            }
          }
        } else {
          if ($scope.timecard.duration) {
            a = moment($scope.timecard.clock_in);
            var addObj = a.add($scope.timecard.duration, 'hours');
            $scope.timecard.clock_out = addObj.toDate();
          }
        }
      }
    });
    $scope.selectEmployeeOptions = {
      query: function (query) {
        var data = { results: [] };
        $scope.employeeObj = {
          fields: 'last_name,first_name,access_code',
          filter: 'zone_id = ' + ($scope.timecard.zone.id ? $scope.timecard.zone.id : 0) + ' and status > 0 and agency_id = ' + Services.getAgencyID(),
          limit: 20
        };
        if (query.term) {
          $scope.employeeObj.filter += '  and (last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%")';
        }
        Services.employeeService.get($scope.employeeObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            data.results.push({
              'text': item.last_name + ', ' + item.first_name,
              'id': item.access_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.selectJobOptions = {
      query: function (query) {
        var data = { results: [] };
        $scope.timecard.authorization = '';
        $scope.timecard.authorization_notes = '';
        $scope.jobObj = {
          fields: 'id,job_name,job_code',
          filter: 'job_zone = ' + ($scope.timecard.zone.id ? $scope.timecard.zone.id : 0) + ' and status > 0 and agency_id = ' + Services.getAgencyID(),
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
              'id': item.job_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.selectAuthorization = {
      query: function (query) {
        var data = { results: [] };
        var jobauthfilterObj = {
            'fields': 'id,payor_detail,frequency,total_hours,notes,authorization_start_date,authorization_end_date',
            'filter': 'status > 0 and authorization_end_date>=\'' + moment($scope.timecard.clock_in).format('YYYY-MM-DD') + '\' and authorization_start_date<=\'' + moment($scope.timecard.clock_in).format('YYYY-MM-DD') + '\' and agency_id = ' + Services.getAgencyID(),
            'include_count': true
          };
        if (!angular.isUndefined($scope.timecard.job_code.id)) {
          jobauthfilterObj.filter = jobauthfilterObj.filter + ' and job =\'' + $scope.timecard.job_code.id + '\'';
        } else {
          jobauthfilterObj.filter = jobauthfilterObj.filter + ' and job =\'' + $scope.timecard.job_code + '\'';
        }
        if (query.term) {
          jobauthfilterObj.filter += ' and payor like \'%' + query.term + '%\'';
        }
        Services.jobauthorizationService.get(jobauthfilterObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            if (item.payor_detail) {
              data.results.push({
                'text': JSON.parse(item.payor_detail).text + ' ( ' + item.frequency + ' ' + item.total_hours + ' Hrs )',
                'id': item.id,
                'notes': item.notes,
                'startdate': moment(item.authorization_start_date).format('MM/DD/YYYY'),
                'enddate': moment(item.authorization_end_date).format('MM/DD/YYYY')
              });
              query.callback(data);
            }
          });
        });
      },
      initSelection: function (element, callback) {
        if (angular.isUndefined($scope.timecard.authorization.id) && !angular.isUndefined($scope.timecard.authorization) && $scope.timecard.authorization) {
          Services.jobauthorizationService.get({
            'fields': 'id,payor_detail,frequency,total_hours,notes,authorization_start_date,authorization_end_date',
            filter: 'id =' + $scope.timecard.authorization,
            limit: 1
          }, function (remoteData) {
            item = remoteData.record[0];
            if (item) {
              return callback({
                'text': JSON.parse(item.payor_detail).text + ' ( ' + item.frequency + ' ' + item.total_hours + ' Hrs )',
                'id': item.id,
                'notes': item.notes,
                'startdate': moment(item.authorization_start_date).format('MM/DD/YYYY'),
                'enddate': moment(item.authorization_end_date).format('MM/DD/YYYY')
              });
            }
          });
        }
      }
    };
    $scope.getAuthorizationNotes = function () {
      $scope.timecard.authorization_notes = $scope.timecard.authorization.notes;
    };
    $scope.getFilterValue = function () {
      if (angular.isDefined($scope.timecard.zone.id)) {
        var zonecode = $scope.timecard.zone.id;
        $scope.filterValues = [{
            'name': '',
            'code': ''
          }];
        $scope.filterJobValues = [{
            'name': '',
            'code': ''
          }];
        $scope.filterJobVal = [];
        $scope.filterVal = [];
      }
    };
    $scope.getjobbyid = function (id) {
      Services.jobService.get({
        fields: 'job_name,job_code',
        filter: 'agency_id =' + Services.getAgencyID() + '  and job_code =' + id,
        limit: 1
      }, function (remoteData) {
        items = remoteData.record[0];
        if (items) {
          $scope.timecard.jobNamecode = items.job_name + ' ' + items.job_code;
        }
      });
    };
    $scope.getempyid = function (id) {
      Services.employeeService.get({
        fields: 'last_name,first_name,access_code',
        filter: 'agency_id =' + Services.getAgencyID() + '  and access_code =' + id,
        limit: 1
      }, function (remoteData) {
        items = remoteData.record[0];
        if (items) {
          $scope.timecard.employee_code = items.last_name + ', ' + items.first_name + ' ' + items.access_code;
        }
      });
    };
    $scope.cancel = function () {
      $state.go('ctApp.timeCard');
    };
    $scope.modelclose = function () {
      $rootScope.$broadcast('close-edit-modal');
    };
  }
]).controller('InactiveTimecardCtrl', [
  '$scope',
  'Services',
  '$timeout',
  '$modalInstance',
  '$rootScope',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $timeout, $modalInstance, $rootScope, HelperService, $localStorage) {
    $scope.TimecardDetails = Services.getModelTempVar();
    if ($scope.TimecardDetails) {
      $scope.employee_code = $scope.TimecardDetails.employee_code;
      $scope.jobNamecode = $scope.TimecardDetails.jobNamecode;
      $scope.clock_in = HelperService.formatingDate($scope.TimecardDetails.clock_in, $localStorage.user_info.country);
      $scope.clock_out = HelperService.formatingDate($scope.TimecardDetails.clock_out, $localStorage.user_info.country);
      $scope.duration = $scope.TimecardDetails.duration;
      $scope.clockInSat = $scope.TimecardDetails.clockInSat;
      $scope.clockOutSat = $scope.TimecardDetails.clockOutSat;
    }
    $scope.saveInactivetimecard = function () {
      $scope.savedisable = 1;
      clockin = {
        timestamp: moment($scope.TimecardDetails.clock_in).utc().format('YYYY-MM-DD HH:mm'),
        call_status: 'Inactivated'
      };
      if (!$scope.TimecardDetails.originaldat) {
        clockin.adjusted_timestamp = moment($scope.TimecardDetails.clock_in).utc().format('YYYY-MM-DD HH:mm');
      }
      clockout = {
        timestamp: moment($scope.TimecardDetails.clock_in).utc().format('YYYY-MM-DD HH:mm'),
        call_duriation: '0:0',
        call_status: 'Inactivated'
      };
      if (!$scope.TimecardDetails.originaldat) {
        clockout.adjusted_timestamp = moment($scope.TimecardDetails.clock_out).utc().format('YYYY-MM-DD HH:mm');
        clockout.adjusted_call_duriation = $scope.TimecardDetails.duration;
      }
      Services.timeLog.update({ id: $scope.TimecardDetails.clockinID }, clockin, function (data) {
        $scope.logger = {};
        $scope.logger.userid = $localStorage.user_info.user_id;
        $scope.logger.user_detail = JSON.stringify({
          'username': $localStorage.user_info.username,
          'firstname': $localStorage.user_info.first_name,
          'lastname': $localStorage.user_info.last_name
        });
        $scope.logger.action = 'Update';
        $scope.logger.agency_id = Services.getAgencyID();
        $scope.logger.action_id = data.id;
        $scope.logger.action_table = 'time_log';
        $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        Services.userLog.save({}, $scope.logger, function (data) {
        });
        Services.timeLog.update({ id: $scope.TimecardDetails.clockoutID }, clockout, function (data) {
          $scope.logger = {};
          $scope.logger.userid = $localStorage.user_info.user_id;
          $scope.logger.user_detail = JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name
          });
          $scope.logger.action = 'Update';
          $scope.logger.agency_id = Services.getAgencyID();
          $scope.logger.action_id = data.id;
          $scope.logger.action_table = 'time_log';
          $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
          Services.userLog.save({}, $scope.logger, function (data) {
          });
          Services.employeeActivitiesService.get({
            filter: 'ref_id=\'' + $scope.TimecardDetails.clockinID + '\'',
            fields: 'id'
          }, function (remoteData) {
            Services.employeeActivitiesService.update({ id: remoteData.record[0].id }, {
              Call_status_IN: 'Inactivated',
              Call_status_OUT: 'Inactivated'
            }, function (data) {
              if ($scope.TimecardDetails.authorizationID && moment($scope.TimecardDetails.authorization.enddate).isBefore(moment().format('MM/DD/YYYY'))) {
                Services.jobauthorizationService.get({
                  filter: 'id=\'' + $scope.TimecardDetails.authorizationID + '\'',
                  fields: 'hours_used,hours_remaining'
                }, function (remoteData) {
                  Services.jobauthorizationService.update({ id: $scope.TimecardDetails.authorizationID }, {
                    hours_used: parseFloat(remoteData.record[0].hours_used) - parseFloat(HelperService.timeToFloat($scope.TimecardDetails.duration)),
                    hours_remaining: parseFloat(remoteData.record[0].hours_remaining) + parseFloat(HelperService.timeToFloat($scope.TimecardDetails.duration))
                  }, function (data) {
                    $scope.logger = {};
                    $scope.logger.userid = $localStorage.user_info.user_id;
                    $scope.logger.user_detail = JSON.stringify({
                      'username': $localStorage.user_info.username,
                      'firstname': $localStorage.user_info.first_name,
                      'lastname': $localStorage.user_info.last_name
                    });
                    $scope.logger.action = 'Update';
                    $scope.logger.agency_id = Services.getAgencyID();
                    $scope.logger.action_id = data.id;
                    $scope.logger.action_table = 'job_authorization';
                    $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                    Services.userLog.save({}, $scope.logger, function (data) {
                    });
                    $scope.savedisable = 0;
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = 'success';
                    $scope.ErrorMsg = 'Notes edited successfully !!!';
                    $timeout(function () {
                      $scope.showerrorMsg = false;
                      $modalInstance.dismiss('cancel');
                      $rootScope.$broadcast('close-edit-modal');  //$modalInstance.close("takethisvalue");
                    }, 3000);
                  });
                });
              } else {
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'success';
                $scope.ErrorMsg = 'Notes edited successfully !!!';
                $timeout(function () {
                  $scope.showerrorMsg = false;
                  $modalInstance.dismiss('cancel');
                  $rootScope.$broadcast('close-edit-modal');  //$modalInstance.close("takethisvalue");
                }, 3000);
              }
            });
          });
        });
      });
    };
    $scope.Inactivemodelclose = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);