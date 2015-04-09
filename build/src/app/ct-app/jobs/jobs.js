angular.module('ctApp.jobs', [
  'ui.router',
  'ui.select2'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.jobs', {
      url: '/jobs',
      views: {
        'appNested': {
          controller: 'JobsCtrl',
          templateUrl: 'ct-app/jobs/jobs.tpl.html'
        }
      },
      data: {
        pageTitle: 'Jobs',
        access: access.jobs
      }
    }).state('ctApp.addUpdateJob', {
      url: '/job/:jobId',
      views: {
        'appNested': {
          controller: 'AddUpdateJobCtrl',
          templateUrl: 'ct-app/jobs/add-update-job.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Job',
        access: access.jobs
      }
    });
  }
]).controller('JobsCtrl', [
  '$scope',
  'Services',
  '$state',
  '$modal',
  'HelperService',
  '$http',
  '$localStorage',
  function ($scope, Services, $state, $modal, HelperService, $http, $localStorage) {
    $scope.empCountry = $localStorage.user_info.country;
    $scope.config = {
      general: { searchtxt: '' },
      page_size: 15,
      loaded_all_records: false,
      show_jobs_loader: true
    };
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'job_name';
    $scope.sortType = 'asc';
    $scope.jobDetailList = [];
    $scope.statusSearchOption = [
      {
        id: 'all',
        name: 'All'
      },
      {
        id: '1',
        name: 'Active'
      },
      {
        id: '0',
        name: 'Inactive'
      }
    ];
    $scope.config.general.filterDBField = '';
    $scope.config.general.filterStatus = '';
    $scope.config.general.searchtxt = '';
    $scope.config.general.zone = null;
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.config.general.zone = [{
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['id'],
            'code': res.data.record[0]['zone_code']
          }];
      });
    }
    /* $scope.jobSearchOptionUnsorted = [];
        $scope.getjobFilters = function() {
            Services.getjobFilter().then(function(resp) {
                angular.forEach(resp.data.field, function(item, index) {
                    $scope.jobSearchOptionUnsorted.push({
                        id: item.name,
                        name: item.label
                    });
                });

                if ($scope.jobSearchOptionUnsorted.length > 0) {
                    $scope.jobSearchOption = HelperService.arr.multisort($scope.jobSearchOptionUnsorted, ['name'], ['ASC']);
                }
            });
        };
        $scope.getjobFilters();
        */
    $scope.jobSearchOption = [
      {
        id: 'job_code',
        name: 'Job Code'
      },
      {
        id: 'job_name',
        name: 'Job Name'
      },
      {
        id: 'work_phone_format',
        name: 'Authorized Phone Format'
      }
    ];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_jobs_loader = true;
      $scope.filterObj = {
        fields: 'job_name,job_code,job_zone_detail,last_clocked_in_date,last_scheduled_date,status,id,work_phone_format,country,authorized_phone_format',
        limit: $scope.config.page_size,
        include_count: true,
        offset: $scope.jobDetailList.length,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '' && $scope.config.general.filterDBField.id) {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and (' + $scope.config.general.filterDBField.id + ' like "%' + $scope.config.general.searchtxt + '%")';
      } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and (job_name like "%' + $scope.config.general.searchtxt + '%" or job_code like "%' + $scope.config.general.searchtxt + '%" or job_notes like "%' + $scope.config.general.searchtxt + '%" or contact_name like "%' + $scope.config.general.searchtxt + '%" or job_zone_detail like "%' + $scope.config.general.searchtxt + '%")';
      }
      if ($scope.config.general.filterStatus.id === 0 || $scope.config.general.filterStatus.id == '1') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and status = ' + $scope.config.general.filterStatus.id;
      }
      /* if($localStorage.user_info.iszone_code)
                {
                    $scope.filterObj.filter  =$scope.filterObj.filter  +' and job_zone='+$localStorage.user_info.zone_code;
                }*/
      if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && $scope.config.general.zone[0].id !== 'all') {
        $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
        $scope.filterObj.filter += ' and job_zone in(' + $scope.zone_id + ')';
      }
      Services.jobService.get($scope.filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.jobDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_jobs_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.jobDetailList = [];
      $scope.config.show_jobs_loader = true;
      $scope.filterObj = {
        fields: 'job_name,job_code,job_zone_detail,last_clocked_in_date,last_scheduled_date,status,id,work_phone_format,country,authorized_phone_format',
        limit: $scope.config.page_size,
        include_count: true,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '' && $scope.config.general.filterDBField.id) {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and (' + $scope.config.general.filterDBField.id + ' like "%' + $scope.config.general.searchtxt + '%")';
      } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and (job_name like "%' + $scope.config.general.searchtxt + '%" or job_code like "%' + $scope.config.general.searchtxt + '%" or job_notes like "%' + $scope.config.general.searchtxt + '%" or contact_name like "%' + $scope.config.general.searchtxt + '%" or job_zone_detail like "%' + $scope.config.general.searchtxt + '%")';
      }
      if (!angular.isUndefined($scope.config.general.filterStatus.id) && $scope.config.general.filterStatus.id != 'all') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and status = ' + $scope.config.general.filterStatus.id;
      }
      if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && $scope.config.general.zone[0].id !== 'all') {
        $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
        $scope.filterObj.filter += ' and job_zone in(' + $scope.zone_id + ')';
      }
      /*
             if($localStorage.user_info.iszone_code)
                {
                    $scope.filterObj.filter  =$scope.filterObj.filter  +' and job_zone='+$localStorage.user_info.zone_code;
                }
            */
      Services.jobService.get($scope.filterObj, function (data) {
        $scope.jobDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_jobs_loader = false;
      });
    };
    $scope.applyProgramSort = function () {
      $scope.updateTableData();
    };
    $scope.clearSearch = function () {
      $scope.config.general.filterDBField = '';
      $scope.config.general.filterStatus = '';
      $scope.config.general.searchtxt = '';
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.config.general.zone = [{
              'text': res.data.record[0]['zone_name'],
              'id': res.data.record[0]['id'],
              'code': res.data.record[0]['zone_code']
            }];
          $scope.updateTableData();
        });
      } else {
        $scope.config.general.zone = null;
        $scope.updateTableData();
      }
    };
    $scope.enableEditView = function (id) {
      $state.go('ctApp.addUpdateJob', { jobId: id });
    };
    $scope.enableView = function (id) {
      Services.setModelTempVar(id);
      $scope.modalInstance = $modal.open({
        templateUrl: 'ct-app/jobs/view-job.tpl.html',
        controller: 'viewJobCtrl',
        size: 'lg'
      });
      $scope.modalInstance.result.then(function (selectedItem) {
        $scope.enableEditView(selectedItem);
      }, function () {
      });
    };
    $scope.selectzone = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
        var getZone = true;
        if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && $scope.config.general.zone[0].code === '') {
          getZone = false;
          data = { results: [] };
        } else if ($scope.config.general.zone === null || angular.isUndefined($scope.config.general.zone[0])) {
          data.results.push({
            text: 'All',
            id: 'all',
            code: ''
          });
        }
        if (getZone === true) {
          $scope.zoneObj = {
            fields: 'id,zone_name,zone_code',
            filter: 'status > 0 and agency_id=' + Services.getAgencyID(),
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
  }
]).controller('AddUpdateJobCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  '$modal',
  '$sce',
  '$http',
  '$window',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage, $modal, $sce, $http, $window) {
    $scope.job_id = $stateParams.jobId;
    $scope.job = {};
    $scope.pageTitle = 'Add New';
    $scope.jobDBField = {};
    $scope.jobSteps = {};
    $scope.job.visitonly = 0;
    $scope.job.employee_chart = 1;
    $scope.job.status = 1;
    $scope.job.long_lat = {};
    $scope.code_exist = 0;
    $scope.job.service_item = {};
    $scope.job.pay_type = {};
    $scope.job.workphones = {};
    $scope.job.workphonesMax = 3;
    $scope.job.customPrompt = {};
    $scope.job.customPromptMax = 10;
    //  $scope.authorizations = [];
    $scope.job.logtype = 2;
    $scope.job.late_notify = 0;
    $scope.savedisable = 0;
    $scope.generateJobcode_count = 0;
    // $scope.job.country="United States";
    //$scope.timezonedata = 0;
    $scope.jobcode_length = $localStorage.configCode.job;
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.job.job_zone = {
          'text': res.data.record[0]['zone_name'],
          'id': res.data.record[0]['zone_code']
        };
      });
    }
    $scope.getJobDetail = function () {
      $scope.job.workphones = [{ 'phone': '' }];
      $scope.job.workphones.addshow = -1;
      $scope.job.customPrompt = [{ 'prompt': '' }];
      $scope.job.customPrompt.addshow = -1;
      if (!angular.isUndefined($scope.job_id) && $scope.job_id) {
        $scope.pageTitle = 'Update';
        Services.jobService.get({ 'filter': 'id=\'' + $scope.job_id + '\'' }, function (resp) {
          $scope.jobDBField = resp.record[0];
          angular.extend($scope.job, {
            job_name: $scope.jobDBField.job_name,
            job_code: $scope.jobDBField.job_code,
            job_zone: $scope.jobDBField.job_zone_detail ? JSON.parse($scope.jobDBField.job_zone_detail) : '',
            timezone: $scope.jobDBField.timezone,
            main_phone: $scope.jobDBField.main_phone,
            fax: $scope.jobDBField.fax,
            contact_name: $scope.jobDBField.contact_name,
            other_phone: $scope.jobDBField.other_phone ? JSON.parse($scope.jobDBField.other_phone) : '',
            external_code: $scope.jobDBField.external_code ? JSON.parse($scope.jobDBField.external_code) : '',
            job_address1: $scope.jobDBField.job_address1,
            job_address2: $scope.jobDBField.job_address2,
            city: $scope.jobDBField.job_city,
            state: $scope.jobDBField.job_state,
            zip: $scope.jobDBField.job_zip,
            county: $scope.jobDBField.job_county,
            country: $scope.jobDBField.country ? $scope.jobDBField.country : 'United States',
            budgeted_hours: $scope.jobDBField.budgeted_hours,
            status: $scope.jobDBField.status,
            service_item: $scope.jobDBField.service_item_detail ? JSON.parse($scope.jobDBField.service_item_detail) : '',
            pay_type: $scope.jobDBField.pay_type_detail ? JSON.parse($scope.jobDBField.pay_type_detail) : '',
            job_notes: $scope.jobDBField.job_notes,
            employee_chart: $scope.jobDBField.employee_chart == '0' || $scope.jobDBField.employee_chart == '1' ? $scope.jobDBField.employee_chart : '1',
            visitonly: $scope.jobDBField.visitonly ? JSON.parse($scope.jobDBField.visitonly) : '',
            url: $scope.jobDBField.map_url,
            budgeted_type: $scope.jobDBField.budgeted_type,
            long_lat: $scope.jobDBField.long_lat ? JSON.parse($scope.jobDBField.long_lat) : '',
            late_notify: $scope.jobDBField.late_notify,
            created_on: HelperService.converttimeZone($scope.jobDBField.created_on),
            created_by: $scope.jobDBField.created_by,
            editedOn: HelperService.convertUTCtoMytimeZone($scope.jobDBField.edited_on),
            edited_by: $scope.jobDBField.edited_by,
            last_scheduled: HelperService.converttimeZone($scope.jobDBField.last_scheduled_date),
            last_clockedin: HelperService.converttimeZone($scope.jobDBField.last_clocked_in_date),
            jobgroup: $scope.jobDBField.jobgroup
          });
          if ($scope.jobDBField.prompt_logtype) {
            $scope.job.logtype = $scope.jobDBField.prompt_logtype;
          }
          //$scope.getTimezone($scope.job.timezone);
          if ($scope.jobDBField.work_phone !== '') {
            $scope.job.workphones = $scope.jobDBField.work_phone ? JSON.parse($scope.jobDBField.work_phone) : '';
            $scope.job.workphones.addshow = $scope.job.workphones.length - 2;
          }
          if ($scope.jobDBField.prompt_details) {
            $scope.job.customPrompt = $scope.jobDBField.prompt_details ? JSON.parse($scope.jobDBField.prompt_details) : '';
            $scope.job.customPrompt.addshow = $scope.job.customPrompt.length - 2;
          }
          Services.jobauthorizationService.get({
            fields: 'id,payor_detail,skill_detail,acitivity_detail,authorization_start_date,authorization_end_date,total_hours,status',
            filter: 'job=\'' + $scope.job.job_code + '\' and agency_id = ' + Services.getAgencyID()
          }, function (data) {
            if (data.record && data.record.length > 0) {
              $scope.authorizations = data.record;
            }
          });
          if ($scope.job.jobgroup) {
            $scope.getJobDetailByID($scope.job.jobgroup);
          }
        });
      }
    };
    $scope.getJobDetailByID = function (jobId) {
      Services.jobService.get({
        'fields': 'job_name',
        'filter': 'job_code=\'' + jobId + '\' and agency_id = ' + Services.getAgencyID(),
        limit: 1
      }, function (resp) {
        $scope.job.jobDes_Name = resp.record[0].job_name;
      });
    };
    $scope.jobManage = function (step, submit) {
      $scope.savedisable = 1;
      $scope.showerrorMsg = false;
      if (step == 'basic') {
        if (angular.isUndefined($scope.job.job_name) || angular.isUndefined($scope.job.job_zone) || !$scope.job.job_name || !$scope.job.job_zone) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Required field is missing !!!';
          jQuery('.basic .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
        if (submit === false) {
          $scope.savedisable = 1;
          $scope.savejobDetail();
        } else {
          $scope.savedisable = 0;
          $scope.jobSteps.location = true;
        }  /*  if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) { // means it is in edit state 
                        if (submit === false) {
                            $scope.savedisable = 1;
                            $scope.savejobDetail();
                        } else {
                            $scope.savedisable = 0;
                            $scope.jobSteps.location = true;
                        }


                    } else {
                        Services.jobService.get({
                            fields:"id",
                            filter: "job_code='" + $scope.job.job_code + "'"
                        }, function(data) {

                            if (data.record.length < 1) {
                                if (submit === false) {
                                    $scope.savedisable = 1;
                                    $scope.savejobDetail();
                                } else {
                                    $scope.savedisable = 0;
                                    $scope.jobSteps.location = true;
                                }
                            } else {
                                $scope.savedisable = 0;
                                $scope.showerrorMsg = true;
                                $scope.code_exist = 1;
                                $scope.ErrorClass = "danger";
                                $scope.ErrorMsg = "Job Code is already exist, Please retype your Job Name!!!";
                                jQuery(".basic .ng-invalid").addClass("ng-dirty");
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                }, 3000);
                                return false;
                            }
                        });
                    }
                    */
      }
      if (step == 'location') {
        $scope.savedisable = 1;
        if (submit === false) {
          $scope.savedisable = 1;
          $scope.savejobDetail();
        } else {
          $scope.savedisable = 0;
          $scope.jobSteps.advanced = true;
        }
      }
      if (step == 'advanced') {
        $scope.savedisable = 1;
        if (submit === false) {
          $scope.savedisable = 1;
          $scope.savejobDetail();
        } else {
          $scope.savedisable = 0;
          $scope.jobSteps.notes = true;
        }
      }
      if (step == 'notes') {
        if (submit === false) {
          $scope.savedisable = 1;
          $scope.savejobDetail();
        } else {
          $scope.savedisable = 0;
          $scope.jobSteps.customPrompt = true;
        }
      }
      if (step == 'customPrompt') {
        $scope.savedisable = 1;
        $scope.savejobDetail();
      }
    };
    $scope.addAuthorizedPhone = function (index) {
      if ($scope.job.workphonesMax != index) {
        $scope.job.workphones.addshow = index;
      }
      $scope.job.workphones.push({ 'phone': '' });
    };
    $scope.removeAuthorizedPhone = function (index) {
      if ($scope.job.workphones.length === 1) {
        $scope.job.workphones = [{ 'phone': '' }];
        $scope.job.workphones.addshow = -1;
      } else {
        $scope.job.workphones.addshow = $scope.job.workphones.addshow - 1;
        $scope.job.workphones.splice(index, 1);
      }
    };
    $scope.addprompt = function (index) {
      if ($scope.job.customPromptMax != index) {
        $scope.job.customPrompt.addshow = index;
      }
      $scope.job.customPrompt.push({ 'prompt': '' });
    };
    $scope.removeprompt = function (index2) {
      // console.log($scope.job.workphones.length);
      if ($scope.job.customPrompt.length === 1) {
        $scope.job.customPrompt = [{ 'prompt': '' }];
        $scope.job.customPrompt.addshow = -1;
      } else {
        $scope.job.customPrompt.addshow = $scope.job.customPrompt.addshow - 1;
        $scope.job.customPrompt.splice(index2, 1);
      }
    };
    $scope.savejobDetail = function () {
      $scope.savedisable = 1;
      if (!$scope.job.timezone) {
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Timezone is required !!!';
        jQuery('.personal .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      /*Services.employeeZips.get({
                    "filter": "timezone like '" + $scope.job.timezone + "'",
                    "fields": "timezone",
                    "limit": 1
                }, function(res) {
                    if (res.record.length <= 0) {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Enter Valid Timezone!!!";
                        jQuery(".personal .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    } else {*/
      $scope.prompt_id = [];
      angular.forEach($scope.job.customPrompt, function (item, key) {
        if (item.prompt) {
          $scope.prompt_id.push(item.prompt.id);
        }
      });
      $scope.sorted_arr = $scope.prompt_id.sort();
      // You can define the comparing function here. 
      var results = 0;
      for (var i = 0; i < $scope.prompt_id.length - 1; i++) {
        if ($scope.sorted_arr[i + 1] == $scope.sorted_arr[i]) {
          results = 1;
          break;
        }
      }
      if (results !== 0) {
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Please select different Prompt!!!';
        jQuery('.basic .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      } else {
        $scope.jobDBField.job_name = $scope.job.job_name;
        $scope.jobDBField.agency_id = Services.getAgencyID();
        $scope.jobDBField.prompt_id = JSON.stringify($scope.prompt_id);
        $scope.jobDBField.prompt_details = JSON.stringify($scope.job.customPrompt);
        $scope.jobDBField.prompt_logtype = $scope.job.logtype;
        $scope.jobDBField.job_zone_detail = JSON.stringify($scope.job.job_zone);
        $scope.jobDBField.job_zone = $scope.job.job_zone.id;
        $scope.jobDBField.visitonly = JSON.stringify($scope.job.visitonly);
        $scope.jobDBField.employee_chart = $scope.job.employee_chart;
        $scope.jobDBField.job_address1 = $scope.job.job_address1;
        $scope.jobDBField.job_address2 = $scope.job.job_address2;
        $scope.jobDBField.job_city = $scope.job.city;
        $scope.jobDBField.job_state = $scope.job.state;
        $scope.jobDBField.job_zip = $scope.job.zip;
        $scope.jobDBField.job_county = $scope.job.county;
        $scope.jobDBField.country = $scope.job.country;
        $scope.jobDBField.timezone = $scope.job.timezone;
        $scope.jobDBField.work_phone = angular.toJson($scope.job.workphones);
        $scope.jobDBField.fax = $scope.job.fax;
        $scope.jobDBField.contact_name = $scope.job.contact_name;
        $scope.jobDBField.other_phone = JSON.stringify($scope.job.other_phone);
        $scope.jobDBField.budgeted_hours = $scope.job.budgeted_hours;
        $scope.jobDBField.status = $scope.job.status;
        $scope.jobDBField.service_item_detail = JSON.stringify($scope.job.service_item);
        $scope.jobDBField.service_item = $scope.job.service_item.id;
        $scope.jobDBField.pay_type_detail = JSON.stringify($scope.job.pay_type);
        $scope.jobDBField.pay_type = $scope.job.pay_type.id;
        $scope.jobDBField.map_url = $scope.job.url;
        $scope.jobDBField.long_lat = JSON.stringify($scope.job.long_lat);
        $scope.jobDBField.external_code = JSON.stringify($scope.job.external_code);
        $scope.jobDBField.late_notify = $scope.job.late_notify;
        $scope.jobDBField.budgeted_type = $scope.job.budgeted_type;
        $scope.workphoneformat = [];
        $scope.authphoneformat = [];
        angular.forEach($scope.job.workphones, function (item, key) {
          $scope.workphoneformat.push(item.phone);
          var phonenum = item.phone;
          var phoneformat = phonenum.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
          $scope.authphoneformat.push(phoneformat);
        });
        $scope.jobDBField.work_phone_format = $scope.workphoneformat.join(', ');
        $scope.jobDBField.authorized_phone_format = $scope.authphoneformat.join(', ');
        $scope.jobDBField.job_notes = $scope.job.job_notes;
        $scope.jobDBField.jobgroup = $scope.job.jobgroup;
        $scope.saveUpdateJob();  /*if ($scope.jobDBField.job_zip) {

                                Services.employeeZips.get({
                                    fields:"id",
                                    filter: "Zip ='" + $scope.jobDBField.job_zip + "' and status > 0",
                                    limit: 1
                                }, function(remoteData) {

                                    if (remoteData.record.length > 0) {
                                        $scope.saveUpdateJob();

                                    } else {
                                        $scope.savedisable = 0;
                                        $scope.showerrorMsg = true;
                                        $scope.ErrorClass = "danger";
                                        $scope.ErrorMsg = "Invalid Zip Code";
                                        jQuery(".personal .ng-invalid").addClass("ng-dirty");
                                        $timeout(function() {
                                            $scope.showerrorMsg = false;
                                        }, 3000);
                                        return false;
                                    }

                                });



                            } else {
                                $scope.saveUpdateJob();
                            }*/
      }  /* }
                });*/
    };
    $scope.saveUpdateJob = function () {
      if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {
        // means it is in edit state 
        $scope.jobDBField.edited_on = moment().utc();
        $scope.jobDBField.edited_by = JSON.stringify({
          'username': $localStorage.user_info.username,
          'firstname': $localStorage.user_info.first_name,
          'lastname': $localStorage.user_info.last_name,
          'user_id': $localStorage.user_info.user_id
        });
        $scope.jobDBField.job_code = $scope.job.job_code;
        $scope.savedisable = 0;
        if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {
          if ($scope.job.status == '0') {
            Services.setModelTempVar($scope.deleteCode);
            $scope.modalInstance = $modal.open({
              template: '<div class="modal-header"> <h3 class="modal-title">Inactive Job</h3></div><div class="modal-body"><b> Changing Status to Inactive will DELETE all upcoming shifts for this Job. Please confirm by clicking Yes</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">No</button><button class="btn btn-primary" ng-click="all()">Yes</button> </div>',
              controller: 'changeStatusCtrl'
            });
            $scope.modalInstance.result.then(function (id) {
              $scope.savedisable = 1;
              Services.jobService.update({ id: $stateParams.jobId }, $scope.jobDBField, function (data) {
                $scope.insertJobAuthorizedPhones();
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'success';
                $scope.ErrorMsg = 'Job detail edited sucessfully !!!';
                $scope.job.edited_on = data.edited_on;
                var timePeriod = moment().utc().format('YYYY-MM-DD HH:mm');
                Services.shiftRecurService.delete({ filter: 'job_id=\'' + $scope.job.job_code + '\' and ref_in_at >=\'' + timePeriod + '\'' }, function (remoteData) {
                });
                $timeout(function () {
                  $scope.showerrorMsg = false;
                  $state.go('ctApp.jobs');
                }, 3000);
              });
            }, function () {
            });
            return false;
          }
          $scope.savedisable = 1;
          Services.jobService.update({ id: $stateParams.jobId }, $scope.jobDBField, function (data) {
            $scope.insertJobAuthorizedPhones();
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'success';
            $scope.ErrorMsg = 'Job detail edited sucessfully !!!';
            $scope.job.edited_on = data.edited_on;
            $timeout(function () {
              $scope.showerrorMsg = false;
              $state.go('ctApp.jobs');
            }, 3000);
          });
          return false;
        }
      } else {
        $scope.jobDBField.created_on = moment().utc().format('YYYY-MM-DD HH:mm');
        $scope.jobDBField.created_by = JSON.stringify({
          'username': $localStorage.user_info.username,
          'firstname': $localStorage.user_info.first_name,
          'lastname': $localStorage.user_info.last_name,
          'user_id': $localStorage.user_info.user_id
        });
        $scope.getJobcode();
        Services.jobService.get({
          field: 'id',
          filter: 'job_code=\'' + $scope.jobDBField.job_code + '\''
        }, function (data) {
          if (data.record.length < 1) {
            Services.jobService.save($scope.jobDBField, function (data) {
              $scope.insertJobAuthorizedPhones();
              //  $scope.jobDBField.job_code = $scope.generateJobcode(data.id);
              $scope.savedisable = 1;
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'success';
              $scope.ErrorMsg = 'Job sucessfully added !!!';
              $timeout(function () {
                $scope.showerrorMsg = false;
                $state.go('ctApp.jobs');
              }, 3000);
            });
          } else {
            $scope.generateJobcode_count++;
            if ($scope.generateJobcode_count < 5) {
              $scope.getJobcode();
              $scope.saveUpdateJob();
            } else {
              $scope.savedisable = 0;
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'danger';
              $scope.ErrorMsg = 'Conflict occur in job code,try again if the problem persists please contact Administrator !!!';
              $timeout(function () {
                $scope.showerrorMsg = false;  //$state.go("ctApp.jobs");
              }, 3000);
              return false;
            }
          }
        });
      }
    };
    $scope.insertJobAuthorizedPhones = function () {
      if (!angular.isUndefined($stateParams.jobId) && $stateParams.jobId) {
        $scope.deleteJobphones = function () {
          Services.jobAuthorizedPhones.delete({ filter: 'job_id=\'' + $scope.job.job_code + '\' and agency_id = ' + Services.getAgencyID() }, function (data) {
          });
        };
        $scope.deleteJobphones();
      }
      //insert job authorizd phone
      $scope.authorized_phone_DbField = [];
      angular.forEach($scope.job.workphones, function (item, key) {
        $scope.authorized_phone_DbField[key] = {};
        $scope.authorized_phone_DbField[key].agency_id = Services.getAgencyID();
        $scope.authorized_phone_DbField[key].job_id = $scope.job.job_code;
        $scope.authorized_phone_DbField[key].phone = item.phone;
        $scope.authorized_phone_DbField[key].created_on = new Date();
        $scope.authorized_phone_DbField[key].edited_on = $scope.jobDBField.edited_on;
        $scope.authorized_phone_DbField[key].status = $scope.job.status;
      });
      Services.jobAuthorizedPhones.save($scope.authorized_phone_DbField, function (data) {
        $timeout(function () {
        }, 3000);
      });
    };
    /*$scope.generateJobcode = function(lastIdDB) {
                var temp = lastIdDB;
                var characters = 0;
                if (($localStorage.configCode.job) && ($localStorage.configCode.job == "4")) {
                    characters = 1000;
                } else if (($localStorage.configCode.job) && ($localStorage.configCode.job == "5")) {
                    characters = 10000;
                } else if (($localStorage.configCode.job) && ($localStorage.configCode.job == "6")) {
                    characters = 100000;
                }
                return characters + temp;

            };*/
    // coded by Revathy to get  Job code 
    $scope.getJobcode = function () {
      var characters = 0;
      if ($localStorage.configCode.job) {
        // characters =(Math.pow(10, $localStorage.configCode.job))/10;
        getminimum = Math.pow(10, $localStorage.configCode.job - 1);
        characters = Math.pow(10, $localStorage.configCode.job) - getminimum;
      }
      $scope.jobDBField.job_code = $window.Math.floor($window.Math.random() * characters) + getminimum;
    };
    $scope.checkjobgroup = function () {
      if (angular.isUndefined($scope.job.jobgroup)) {
        $scope.job.jobDes_Name = '';
      } else if ($localStorage.configCode.job <= $scope.job.jobgroup.length) {
        $scope.savedisable = 1;
        Services.jobService.get({
          fields: 'job_name',
          filter: 'job_code=\'' + $scope.job.jobgroup + '\' and agency_id = ' + Services.getAgencyID()
        }, function (data) {
          if (data.record.length < 1) {
            $scope.savedisable = 0;
            $scope.job.jobgroup = '';
            $scope.job.jobDes_Name = '';
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Invalid Job Group';
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else {
            $scope.savedisable = 0;
            $scope.job.jobDes_Name = data.record[0].job_name;
          }
        });
      }
    };
    $scope.getmyTimezone = function (lat, lng) {
      if (lat && lng) {
        var tz = new TimeZoneDB();
        tz.getJSON({
          key: Services.timezoneKey,
          lat: lat,
          lng: lng
        }, function (data) {
          $scope.$apply(function () {
            $scope.job.timezone = data.zoneName;
          });
        });
      }
    };
    $scope.$on('place_changed', function (event, newValue) {
      $scope.street_number = '';
      $scope.street = '';
      $scope.city = '';
      $scope.state = '';
      $scope.zip = '';
      $scope.county = '';
      $scope.country = '';
      $scope.mymapVariable = newValue;
      // console.log($scope.mymapVariable);
      if (newValue) {
        $scope.job.timezone = '';
        if ($scope.mymapVariable.address_components) {
          for (var i = 0; i < $scope.mymapVariable.address_components.length; i++) {
            $scope.addressType = $scope.mymapVariable.address_components[i].types[0];
            if ($scope.addressType == 'street_number') {
              $scope.street_number = $scope.mymapVariable.address_components[i]['short_name'];
            }
            if ($scope.addressType == 'route') {
              $scope.street = $scope.mymapVariable.address_components[i]['short_name'];
            }
            if ($scope.addressType == 'locality') {
              $scope.city = $scope.mymapVariable.address_components[i]['short_name'];
            }
            if ($scope.addressType == 'administrative_area_level_1') {
              $scope.state = $scope.mymapVariable.address_components[i]['short_name'];
            }
            if ($scope.addressType == 'administrative_area_level_2') {
              $scope.county = $scope.mymapVariable.address_components[i]['short_name'];
            }
            if ($scope.addressType == 'postal_code') {
              $scope.zip = $scope.mymapVariable.address_components[i]['short_name'];
            }
            if ($scope.addressType == 'country') {
              $scope.country = $scope.mymapVariable.address_components[i]['long_name'];
            }
          }
          $scope.job.job_address1 = $scope.street_number + ' ' + $scope.street;
          //jQuery("#Autocomplete2").val($scope.job.job_address1);
          $scope.job.job_address2 = '';
          $scope.job.city = $scope.city;
          $scope.job.state = $scope.state;
          $scope.job.zip = $scope.zip;
          $scope.job.county = $scope.county;
          $scope.job.country = $scope.country;
          if ($scope.mymapVariable.url) {
            $scope.job.url = $scope.mymapVariable.url;
          }
          if ($scope.mymapVariable.geometry) {
            $scope.job.long_lat.long = $scope.mymapVariable.geometry.location['D'];
            $scope.job.long_lat.lat = $scope.mymapVariable.geometry.location['k'];
            $scope.getmyTimezone($scope.job.long_lat.lat, $scope.job.long_lat.long);
          }
        }
      }
    });
    $scope.mapView = function (mapurl) {
      Services.setModelTempVar(mapurl);
      $scope.modalInstance = $modal.open({
        templateUrl: 'ct-app/jobs/mapDetailView.tpl.html',
        controller: 'MapBoxJobCtrl'
      });
    };
    $scope.previous_state = function () {
      var prev = $rootScope.$previousState.name;
      if (prev !== '') {
        $state.go(prev);
      }
    };
    $scope.selectZone = {
      query: function (query) {
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
          $scope.zoneData = { results: [] };
          items = remoteData.record;
          if (items.length == '0') {
            query.callback($scope.zoneData);
          } else {
            angular.forEach(items, function (item, key) {
              $scope.zoneData.results.push({
                'text': item.zone_name,
                'id': item.zone_code
              });
              query.callback($scope.zoneData);
            });
          }
          return false;
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.job.job_zone.id) && $scope.job.job_zone.id) {
          return callback({
            'text': $scope.job.job_zone.text,
            'id': $scope.job.job_zone.id
          });
        }
      }
    };
    $scope.selectServiceItem = {
      query: function (query) {
        var serviceItemData = { results: [] };
        $scope.serviceObj = {
          fields: 'name,id',
          filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
          order: 'name asc',
          limit: 5
        };
        if (query.term) {
          $scope.serviceObj.filter += ' and name like \'%' + query.term + '%\'';
        }
        Services.service_item.get($scope.serviceObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(serviceItemData);
          }
          angular.forEach(items, function (item, key) {
            serviceItemData.results.push({
              'text': item.name,
              'id': item.id
            });
            query.callback(serviceItemData);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.job.service_item.id) && $scope.job.service_item.id) {
          callback({
            'text': $scope.job.service_item.text,
            'id': $scope.job.service_item.id
          });
        }
      }
    };
    $scope.selectPayType = {
      query: function (query) {
        var data = { results: [] };
        $scope.payObj = {
          fields: 'name,id',
          filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
          order: 'name asc',
          limit: 5
        };
        if (query.term) {
          $scope.payObj.filter += ' and name like \'%' + query.term + '%\'';
        }
        Services.pay_type.get($scope.payObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            data.results.push({
              'text': item.name,
              'id': item.id
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.job.pay_type.id) && $scope.job.pay_type.id) {
          callback({
            'text': $scope.job.pay_type.text,
            'id': $scope.job.pay_type.id
          });
        }
      }
    };
    $scope.refreshSelectPrompt = function (name) {
      $scope.promptObj = {
        fields: 'prompt_name,id,prompt_text,prompt_answers',
        filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
        'order': 'id asc',
        limit: 5
      };
      if (name) {
        $scope.promptObj.filter += ' and prompt_name  like \'%' + name + '%\'';
      }
      Services.customPromptService.get($scope.promptObj, function (remoteData) {
        $scope.prompts = [];
        angular.forEach(remoteData.record, function (item, key) {
          $scope.prompts.push({
            'text': item.prompt_name,
            'id': item.id,
            'prompt_text': item.prompt_text,
            'prompt_answers': item.prompt_answers
          });
        });
      });
    };
    /*  $scope.getTimezone = function(val) {

                return Services.getTimeZones(val).then(function(res) {
                    var timezone = [];
                    angular.forEach(res.data.record, function(item) {
                        timezone.push(item.timezone);
                    });
                    return timezone;
                });
            };*/
    /* $scope.getmyTimezone = function(val) {
                Services.employeeZips.get({
                    filter: "Zip ='" + val + "'",
                    fields: "timezone",
                    limit: 1
                }, function(remoteData) {
                    if (remoteData.record.length > 0) {
                        $scope.job.timezone = remoteData.record[0].timezone;
                        $scope.showZipError = false;
                    } else {
                        $scope.showZipError = true;
                        $timeout(function() {
                            $scope.showZipError = false;
                        }, 6000);
                        $scope.job.timezone = "";
                    }


                });

            };*/
    $scope.preventNext = function (keyEvent) {
      if (keyEvent.which === 13) {
        keyEvent.preventDefault();
      }
    };
    $scope.jobManagePrev = function (step) {
      if (step == 'location') {
        $scope.jobSteps.schedule = false;
        $scope.jobSteps.location = false;
        $scope.jobSteps.basic = true;
        $scope.jobSteps.advanced = false;
        $scope.jobSteps.customPrompt = false;
      }
      if (step == 'advanced') {
        $scope.jobSteps.schedule = false;
        $scope.jobSteps.location = true;
        $scope.jobSteps.basic = false;
        $scope.jobSteps.advanced = false;
        $scope.jobSteps.customPrompt = false;
      }
      if (step == 'schedule') {
        $scope.jobSteps.location = false;
        $scope.jobSteps.schedule = false;
        $scope.jobSteps.advanced = true;
        $scope.jobSteps.basic = false;
        $scope.jobSteps.customPrompt = false;
      }
      if (step == 'notes') {
        $scope.jobSteps.location = false;
        $scope.jobSteps.schedule = false;
        $scope.jobSteps.advanced = true;
        $scope.jobSteps.notes = false;
        $scope.jobSteps.customPrompt = false;
      }
      if (step == 'customPrompt') {
        $scope.jobSteps.location = false;
        $scope.jobSteps.schedule = false;
        $scope.jobSteps.advanced = false;
        $scope.jobSteps.notes = true;
        $scope.jobSteps.customPrompt = false;
      }
    };
    /* $scope.getZipDetail = function() {
                if (!angular.isUndefined($scope.job.zip)) {
                    if ($scope.job.zip.length == 5) {

                        Services.employeeZips.get({
                            filter: "Zip ='" + $scope.job.zip + "'",
                            fields: "timezone,primary_city,state,county",
                            limit: 1
                        }, function(remoteData) {

                            if (remoteData.record.length > 0) {
                                $scope.job.city = remoteData.record[0].primary_city;
                                $scope.job.state = remoteData.record[0].state;
                                $scope.job.county = remoteData.record[0].county;
                                $scope.job.timezone = remoteData.record[0].timezone;
                                $scope.showZipError = false;
                            } else {
                                $scope.showZipError = true;
                                $timeout(function() {
                                    $scope.showZipError = false;
                                }, 6000);
                                $scope.job.city = "";
                                $scope.job.state = "";
                                $scope.job.county = "";
                                $scope.job.timezone = "";
                            }

                        });
                    }
                }
            };*/
    $scope.cancelJob = function () {
      $state.go('ctApp.jobs');
    };
    $scope.getJobDetail();
  }
]).controller('MapBoxJobCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  '$sce',
  function ($scope, Services, $modalInstance, $sce) {
    var itemDetail = Services.getModelTempVar();
    var split_url;
    Services.setModelTempVar('');
    $scope.mapurl = itemDetail.url;
    $scope.title = itemDetail.job_address1;
    $scope.county = itemDetail.county;
    $scope.long = itemDetail.long_lat.long;
    $scope.lat = itemDetail.long_lat.lat;
    $scope.job_state = itemDetail.state;
    if ($scope.mapurl) {
      split_url = $scope.mapurl.split('?');
      $scope.fullMapUrl = 'https://maps.google.com/maps?q=' + split_url[1] + '&output=embed';
      $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.fullMapUrl);
    }
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
      document.getElementById('jobMapId').src = $scope.fullMapUrl;
    };
  }
]).controller('viewJobCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    $scope.job_id = '';
    $scope.job = '';
    $scope.job_code = Services.getModelTempVar();
    Services.setModelTempVar();
    Services.jobService.get({
      'filter': 'job_code =\'' + $scope.job_code + '\' and agency_id = ' + Services.getAgencyID(),
      'limit': 1
    }, function (response) {
      $scope.job = response.record[0];
      $scope.job_id = $scope.job.id;
    });
    Services.jobauthorizationService.get({
      fields: 'id,payor_detail,skill_detail,acitivity_detail,authorization_start_date,authorization_end_date,total_hours,status',
      filter: 'job=\'' + $scope.job_code + '\''
    }, function (data) {
      if (data.record) {
        $scope.job_authorization = data.record;
      }
    });
    $scope.ok = function () {
      if ($scope.job_id) {
        $modalInstance.close($scope.job_id);
      }
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('changeStatusCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var id = Services.getModelTempVar();
    Services.setModelTempVar();
    $scope.all = function () {
      $modalInstance.close(id);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);