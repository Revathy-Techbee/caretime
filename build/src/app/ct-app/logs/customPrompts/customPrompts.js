angular.module('ctApp.customPrompt', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.customPrompt', {
      url: '/customPrompt',
      views: {
        'appNested': {
          controller: 'CustomPromptCtrl',
          templateUrl: 'ct-app/logs/customPrompts/customPrompts.tpl.html'
        }
      },
      data: {
        pageTitle: 'CUSTOM PROMPT LOG',
        access: access.customPrompt
      }
    });
  }
]).controller('CustomPromptCtrl', [
  '$scope',
  'Services',
  '$state',
  'HelperService',
  '$timeout',
  '$localStorage',
  function ($scope, Services, $state, HelperService, $timeout, $localStorage) {
    $scope.logFilters = {};
    $scope.showerrorMsg = false;
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
    $scope.logFilters.filterValue = '';
    $scope.show_activities_loader = false;
    $scope.customPromptList = [];
    $scope.customPromptListDetail = {};
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    $scope.showdetails = 0;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.logFilters.startDate = moment(firstDay).format('YYYY-MM-DD');
    $scope.logFilters.endDate = moment(lastDay).format('YYYY-MM-DD');
    $scope.loadData = function (fdate, ldate, zoneName, filterCode, offset) {
      var filterObj = {
          'fields': 'ref_id,job_name,Job_code,clockin,clockout,work_duration,work_duration_rounded',
          'limit': $scope.call_limit,
          'offset': offset,
          'include_count': true,
          'order': 'id desc',
          'filter': 'employee_code <>\'\' and job_code<>\'\' and clockin >=\'' + fdate + '\' and clockout <=\'' + ldate + '\' and agency_id = ' + Services.getAgencyID()
        };
      if (filterCode && !angular.isUndefined(filterCode.code) && filterCode.code) {
        filterObj.filter = filterObj.filter + ' and employee_code = "' + filterCode.code + '"';
      } else if ($scope.zone_id) {
        filterObj.filter = filterObj.filter + ' and empzone_code in(' + $scope.zone_id + ')';
      }
      Services.employeeActivitiesService.get(filterObj, function (data) {
        angular.forEach(data.record, function (item, key) {
          $scope.customPromptList.push({
            'ref_id': item.ref_id,
            'job_name': item.job_name,
            'job_code': item.job_name + ' (' + item.Job_code + ')',
            'clockin': HelperService.formatingDate(item.clockin, $localStorage.user_info.country),
            'clockout': HelperService.formatingDate(item.clockout, $localStorage.user_info.country),
            'work_duration': item.work_duration,
            'work_duration_rounded': item.work_duration_rounded,
            'work_duration_formated': HelperService.formating_hours(item.work_duration),
            'work_duration_rounded_formated': HelperService.formating_hours(item.work_duration_rounded)
          });
        });
        if (data.meta.count > offset + $scope.call_limit) {
          var nextOffset = offset + $scope.call_limit + 1;
          $scope.loadData(fdate, ldate, zoneName, filterCode, nextOffset);
        } else {
          $scope.show_activities_loader = false;
          if ($scope.customPromptList.length !== 0) {
            $scope.noRecord = 0;
            $scope.customPromptListDetail = new wijmo.collections.CollectionView($scope.customPromptList);
            $scope.customPromptListDetail.pageSize = 10;
            $scope.displayPromptDetail();
            $scope.showRecord = 1;
            $scope.customPromptListDetail.currentChanged.addHandler(function () {
              $scope.displayPromptDetail();
            });
          } else {
            $scope.noRecord = 1;
            $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
          }
        }
      });
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
      if ($scope.logFilters.zoneName == null || angular.isUndefined($scope.logFilters.zoneName[0]) || $scope.logFilters.filterValue === '' && ($scope.logFilters.zoneName[0].id !== 'all' && $scope.logFilters.filterValue.id !== 'all')) {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please use the required filters';
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      $scope.showRecord = 0;
      $scope.customPromptList = [];
      $scope.noRecord = 0;
      $scope.showdetails = 0;
      $scope.show_activities_loader = true;
      var fdate = moment(moment($scope.logFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
      var a = moment(moment($scope.logFilters.endDate).format('YYYY-MM-DD'));
      var addObj = a.add('24', 'hours');
      var ldatehrs = addObj.toDate();
      var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      mixpanelObj = {
        'Zone': $scope.zone_name ? $scope.zone_name : 'All',
        'Start Date': '"' + moment($scope.logFilters.startDate).format('MM/DD/YYYY') + '"',
        'End Date': '"' + moment($scope.logFilters.endDate).format('MM/DD/YYYY') + '"',
        'Agency': Services.serviceName
      };
      if ($scope.logFilters.filterValue && !angular.isUndefined($scope.logFilters.filterValue.code)) {
        var temp_empcode = 'All';
        if ($scope.logFilters.filterValue.code) {
          temp_empcode = $scope.logFilters.filterValue.text + ' (' + $scope.logFilters.filterValue.code + ')';
        }
        mixpanelObj.Employee = temp_empcode;
      }
      mixpanel.track('custom Prompt Log', mixpanelObj);
      $scope.loadData(fdate, ldate, $scope.logFilters.zoneName, $scope.logFilters.filterValue, 0);
    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Custom Prompt Log');
    $scope.displayPromptDetail = function () {
      // $scope.prompt_norecord = '';
      $scope.ref_id = $scope.customPromptListDetail.currentItem.ref_id;
      $scope.showdetails = 1;
      $scope.activity_details = $scope.customPromptListDetail.currentItem.job_name;
      filterObj = {
        'fields': 'prompt_type,prompt_answer,prompt_id',
        'include_count': true,
        'filter': 'ref_id=\'' + $scope.ref_id + '\' and agency_id = ' + Services.getAgencyID(),
        'order': 'id desc'
      };
      Services.ivr_promt_detailService.get(filterObj, function (remoteData) {
        if (remoteData.meta.count > 0) {
          $scope.prompt_norecord = '';
          $scope.prompt_details_temp = remoteData.record[0].prompt_type ? JSON.parse(remoteData.record[0].prompt_type) : '';
          $scope.prompt_when = $scope.prompt_details_temp.logtype;
          $scope.promptAnsArray = remoteData.record[0].prompt_answer.split(',');
          $scope.promptIDArray = remoteData.record[0].prompt_id.split(',');
          $scope.promptID = remoteData.record[0].prompt_id;
          $scope.AnsWithId = [];
          angular.forEach($scope.promptAnsArray, function (item, key) {
            $scope.AnsWithId[$scope.promptIDArray[key]] = item;
          });
          filterObjP = {
            'fields': 'id,prompt_name,prompt_text,prompt_answers,id',
            'include_count': true,
            filter: 'id IN (' + $scope.promptID + ')'
          };
          Services.customPromptService.get(filterObjP, function (promptDetail) {
            $scope.prompt_details = [];
            angular.forEach(promptDetail.record, function (item, key) {
              $scope.prompt_details.push({
                'prompt_when': HelperService.logType($scope.prompt_when),
                'id': item.id,
                'prompt_name': item.prompt_name,
                'prompt_text': item.prompt_text,
                'prompt_answers': item.prompt_answers,
                'AnsWithId': HelperService.getAnswer($scope.AnsWithId[item.id], item.prompt_answers)
              });
            });
            $scope.allpromptdetails = new wijmo.collections.CollectionView($scope.prompt_details);
          });
        } else {
          $scope.prompt_norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
        }
      });
    };
    $scope.clearSearch = function () {
      $scope.logFilters.filterValue = '';
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
      $scope.customPromptList = [];
      $scope.noRecord = 1;
      $scope.showdetails = 0;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Custom Prompt Log');
    };
    $scope.$watch('logFilters.zoneName', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.logFilters.filterValue = '';
        $scope.zone_nameid = '';
        $scope.zone_id = '';
        $scope.zone_name = '';
      }
    });
    $scope.selectZoneOptions = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
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
          $scope.logFilters.filterValue = '';
          $scope.zoneObj = {
            fields: 'zone_name,zone_code,id',
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
        // $scope.zone_id = HelperService.getAsArray($scope.logFilters.zoneName, 'code');
        $scope.zone_nameid = HelperService.getCode_Name($scope.logFilters.zoneName, 'code', 'text');
        $scope.zone_id = $scope.zone_nameid.Code;
        $scope.zone_name = $scope.zone_nameid.Code_Name;
        $scope.employeeObj = {
          fields: 'id,last_name,first_name,access_code',
          filter: 'zone_id in(' + $scope.zone_id + ')  and status > 0 and agency_id = ' + Services.getAgencyID(),
          limit: 5
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
  }
]);