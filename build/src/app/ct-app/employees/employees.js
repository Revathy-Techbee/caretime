angular.module('ctApp.employees', [
  'ui.router',
  'ui.select2',
  'ui.jq'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.employees', {
      url: '/employees',
      views: {
        'appNested': {
          controller: 'EmployeesCtrl',
          templateUrl: 'ct-app/employees/employees.tpl.html'
        }
      },
      data: {
        pageTitle: 'Employees',
        access: access.employees
      }
    }).state('ctApp.addUpdateEmployee', {
      url: '/employee/:employeeId',
      views: {
        'appNested': {
          controller: 'AddUpdateEmployeeCtrl',
          templateUrl: 'ct-app/employees/add-update-employee.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Employee',
        access: access.employees
      }
    }).state('ctApp.dashboardEmployee', {
      url: '/employee/dashboard/:employeeId',
      views: {
        'appNested': {
          controller: 'DashboardEmployeeCtrl',
          templateUrl: 'ct-app/employees/employee-dashboard.tpl.html'
        }
      },
      data: {
        pageTitle: 'Dashboard Employee',
        access: access.employees
      }
    });
  }
]).controller('EmployeesCtrl', [
  '$scope',
  'Services',
  '$state',
  'HelperService',
  '$modal',
  '$localStorage',
  function ($scope, Services, $state, HelperService, $modal, $localStorage) {
    var user_roles = routingConfig.accessLevels;
    var searchtx, res, format_date;
    $scope.config = {
      general: {
        searchtxt: '',
        filterStatus: '',
        filterDBField: ''
      },
      page_size: 15,
      loaded_all_records: false,
      show_employees_loader: true
    };
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
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'access_code';
    $scope.sortType = 'desc';
    $scope.employeeDetailList = [];
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
      },
      {
        id: '2',
        name: 'Terminated'
      }
    ];
    /* $scope.employeeSearchOptionUnsorted = [];
            $scope.getemployeeFilters = function() {
                Services.getemployeeFilter().then(function(resp) {
                    angular.forEach(resp.data.field, function(item, index) {
                        $scope.employeeSearchOptionUnsorted.push({
                            id: item.name,
                            name: item.label
                        });
                    });
                    if ($scope.employeeSearchOptionUnsorted.length > 0) {
                        $scope.employeeSearchOption = HelperService.arr.multisort($scope.employeeSearchOptionUnsorted, ['name'], ['ASC']);
                    }
                });
            };
            $scope.getemployeeFilters();
            */
    $scope.employeeSearchOption = [
      {
        id: 'access_code',
        name: 'Employee Code'
      },
      {
        id: 'first_name',
        name: 'First Name'
      },
      {
        id: 'last_name',
        name: 'Last Name'
      },
      {
        id: 'birth_date',
        name: 'Birth Date'
      },
      {
        id: 'username',
        name: 'User Name'
      }
    ];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_employees_loader = true;
      $scope.filterObj = {
        fields: 'access_code,last_clocked_in_date,last_scheduled_date,first_name,last_name,primary_city,primary_state,zone_detail,status,id',
        limit: $scope.config.page_size,
        include_count: true,
        offset: $scope.employeeDetailList.length,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '' && $scope.config.general.filterDBField.id) {
        searchtxt = $scope.config.general.searchtxt;
        if ($scope.config.general.filterDBField.id == 'birth_date' || $scope.config.general.filterDBField.id == 'hire_date') {
          res = searchtxt.split('-');
          format_date = res[0] + '/' + res[1] + '/' + res[2];
          searchtxt = moment(format_date).format('YYYY-MM-DD');
        }
        $scope.filterObj.filter = $scope.filterObj.filter + '  and  (' + $scope.config.general.filterDBField.id + ' like "%' + searchtxt + '%")';
      } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and (first_name like "%' + $scope.config.general.searchtxt + '%" or last_name like "%' + $scope.config.general.searchtxt + '%" or username like "%' + $scope.config.general.searchtxt + '%" or zone_id like "%' + $scope.config.general.searchtxt + '%" or primary_city like "%' + $scope.config.general.searchtxt + '%" or primary_state like "%' + $scope.config.general.searchtxt + '%" or zone_detail like "%' + $scope.config.general.searchtxt + '%")';
      }
      if (!angular.isUndefined($scope.config.general.filterStatus.id) && $scope.config.general.filterStatus.id != 'all') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and status = ' + $scope.config.general.filterStatus.id;
      }
      /* if($localStorage.user_info.iszone_code)
                {
                    $scope.filterObj.filter = $scope.filterObj.filter +' and zone_id='+$localStorage.user_info.zone_code;
                }*/
      if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && $scope.config.general.zone[0].id !== 'all') {
        $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
        $scope.filterObj.filter += ' and zone_id in(' + $scope.zone_id + ')';
      }
      Services.employeeService.get($scope.filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.employeeDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_employees_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.employeeDetailList = [];
      $scope.config.show_employees_loader = true;
      $scope.filterObj = {
        fields: 'access_code,last_clocked_in_date,last_scheduled_date,first_name,last_name,primary_city,primary_state,zone_detail,status,id',
        limit: $scope.config.page_size,
        include_count: true,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '' && $scope.config.general.filterDBField.id) {
        searchtxt = $scope.config.general.searchtxt;
        if ($scope.config.general.filterDBField.id == 'birth_date' || $scope.config.general.filterDBField.id == 'hire_date') {
          res = searchtxt.split('-');
          format_date = res[0] + '/' + res[1] + '/' + res[2];
          searchtxt = moment(format_date).format('YYYY-MM-DD');
        }
        $scope.filterObj.filter = $scope.filterObj.filter + ' and ' + $scope.config.general.filterDBField.id + ' like "%' + searchtxt + '%"';
      } else if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and first_name like "%' + $scope.config.general.searchtxt + '%" or last_name like "%' + $scope.config.general.searchtxt + '%" or username like "%' + $scope.config.general.searchtxt + '%" or zone_id like "%' + $scope.config.general.searchtxt + '%" or primary_city like "%' + $scope.config.general.searchtxt + '%" or primary_state like "%' + $scope.config.general.searchtxt + '%" or zone_detail like "%' + $scope.config.general.searchtxt + '%"';
      }
      /* if($localStorage.user_info.iszone_code)
                {
                    $scope.filterObj.filter = $scope.filterObj.filter +' and zone_id='+$localStorage.user_info.zone_code;
                }*/
      if (!angular.isUndefined($scope.config.general.filterStatus.id) && $scope.config.general.filterStatus.id != 'all') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and status = ' + $scope.config.general.filterStatus.id;
      }
      if ($scope.config.general.zone !== null && !angular.isUndefined($scope.config.general.zone[0]) && !angular.isUndefined($scope.config.general.zone[0].id) && $scope.config.general.zone[0].id !== 'all') {
        $scope.zone_id = HelperService.getAsArray($scope.config.general.zone, 'code');
        $scope.filterObj.filter += ' and zone_id in(' + $scope.zone_id + ')';
      }
      Services.employeeService.get($scope.filterObj, function (data) {
        $scope.employeeDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_employees_loader = false;
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
      $state.go('ctApp.addUpdateEmployee', { employeeId: id });
    };
    $scope.enableView = function (id) {
      Services.setModelTempVar(id);
      $scope.modalInstance = $modal.open({
        templateUrl: 'ct-app/employees/view-employee.tpl.html',
        controller: 'viewEmployeeCtrl',
        size: 'lg'
      });
      $scope.modalInstance.result.then(function (selectedItem) {
        $scope.enableEditView(selectedItem);
      }, function () {
      });
    };
    $scope.enableDashboard = function (id) {
      $state.go('ctApp.dashboardEmployee', { employeeId: id });
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
]).controller('AddUpdateEmployeeCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  '$modal',
  '$sce',
  '$window',
  '$http',
  '$rootScope',
  'Auth',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage, $modal, $sce, $window, $http, $rootScope, Auth) {
    $scope.employee = {};
    /* if (Auth.isAdmin()) {
            $scope.islevelAccess = true;
        } else {
            $scope.islevelAccess = false;
        }*/
    $scope.islevelAccess = false;
    if ($localStorage.user_info.user_type == '1' || $localStorage.user_info.user_type == '9') {
      $scope.islevelAccess = true;
    }
    $scope.savedisable = 0;
    $scope.timezonedata = 0;
    $scope.updateCertificates = false;
    $scope.employee.level = '8';
    $scope.generateEmpcode_count = 0;
    $scope.employee.clockOutSafeguardHours = 16;
    $scope.employee_id = $stateParams.employeeId;
    $scope.employee.communication = {};
    $scope.employee.track_location = 0;
    //$scope.employee.country="United States";
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.employee.zone = {
          'text': res.data.record[0]['zone_name'],
          'id': res.data.record[0]['zone_code']
        };
      });
    }
    $scope.changeSafeguard = function () {
      if ($scope.employee.clockOutSafeguardHours < 0 || $scope.employee.clockOutSafeguardHours > 24) {
        $scope.employee.clockOutSafeguardHours = 16;
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Clock OUT Safeguard should be within 24 hours !!!';
        jQuery('.general .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
    };
    $scope.getEmployeeDetail = function () {
      if (!angular.isUndefined($stateParams.employeeId) && $stateParams.employeeId) {
        $scope.employee_id = $stateParams.employeeId;
        //Revathy 
        /*if (Auth.isAdmin()) {
                    $scope.islevelAccess = true;
                } else {
                    $scope.islevelAccess = false;
                }
                */
        if ($localStorage.user_info.user_type == '1' || $localStorage.user_info.user_type == '9') {
          $scope.islevelAccess = true;
        }
        $scope.pageTitle = 'Update';
        $scope.updateCertificates = true;
        Services.employeeService.get({ 'filter': 'id=\'' + $scope.employee_id + '\'' }, function (resp) {
          $scope.employeeDBField = resp.record[0];
          Services.setModelTempVar({
            'id': $stateParams.employeeId,
            'code': $scope.employeeDBField.access_code
          });
          $scope.employee.id = $scope.employeeDBField.id;
          $scope.employee.accesscode = $scope.employeeDBField.access_code;
          $scope.employee.agency_id = $scope.employeeDBField.agency_id;
          $scope.employee.zone = $scope.employeeDBField.zone_detail ? JSON.parse($scope.employeeDBField.zone_detail) : '';
          $scope.employee.firstname = $scope.employeeDBField.first_name;
          $scope.employee.lastname = $scope.employeeDBField.last_name;
          $scope.employee.email = $scope.employeeDBField.email;
          $scope.employee.language = $scope.employeeDBField.language ? JSON.parse($scope.employeeDBField.language) : '';
          $scope.employee.level = $scope.employeeDBField.is_supervisor;
          $scope.employee.skill = $scope.employeeDBField.skill_detail ? JSON.parse($scope.employeeDBField.skill_detail) : '';
          $scope.employee.curStatus = $scope.employeeDBField.status;
          $scope.employee.address1 = $scope.employeeDBField.primary_address1;
          $scope.employee.address2 = $scope.employeeDBField.primary_address2;
          $scope.employee.city = $scope.employeeDBField.primary_city;
          $scope.employee.state = $scope.employeeDBField.primary_state;
          $scope.employee.zip = $scope.employeeDBField.primary_zip;
          $scope.employee.workphone = $scope.employeeDBField.primary_phone;
          $scope.employee.county = $scope.employeeDBField.primary_county;
          $scope.employee.country = $scope.employeeDBField.country ? $scope.employeeDBField.country : 'United States';
          $scope.employee.timezone = $scope.employeeDBField.primary_timezone;
          $scope.employee.Secphone = $scope.employeeDBField.secondary_phone ? JSON.parse($scope.employeeDBField.secondary_phone) : '';
          $scope.employee.hiredate = $scope.employeeDBField.hire_date ? moment($scope.employeeDBField.hire_date).format('YYYY-MM-DD') : '';
          $scope.employee.birthdate = $scope.employeeDBField.birth_date ? moment($scope.employeeDBField.birth_date).format('YYYY-MM-DD') : '';
          $scope.employee.payrate = $scope.employeeDBField.pay_rate;
          $scope.employee.username = $scope.employeeDBField.username;
          $scope.employee.clock_out_safe = $scope.employeeDBField.clock_out_safe;
          $scope.employee.clockOutSafeguardHours = $scope.employeeDBField.clock_out_safe_hour;
          $scope.employee.notes = $scope.employeeDBField.notes;
          $scope.employee.externalCode = $scope.employeeDBField.external_code ? JSON.parse($scope.employeeDBField.external_code) : '';
          $scope.employee.communication = $scope.employeeDBField.preferred_communication ? JSON.parse($scope.employeeDBField.preferred_communication) : '';
          $scope.employee.editedOn = HelperService.convertUTCtoMytimeZone($scope.employeeDBField.edited_on);
          $scope.employee.url = $scope.employeeDBField.map_url;
          $scope.employee.payclass = $scope.employeeDBField.pay_class ? JSON.parse($scope.employeeDBField.pay_class) : '';
          $scope.employee.editedOn = HelperService.convertUTCtoMytimeZone($scope.employeeDBField.edited_on);
          $scope.employee.edited_by = $scope.employeeDBField.edited_by;
          $scope.employee.created_on = HelperService.converttimeZone($scope.employeeDBField.created_on);
          $scope.employee.created_by = $scope.employeeDBField.created_by;
          $scope.employee.long_lat = $scope.employeeDBField.long_lat ? JSON.parse($scope.employeeDBField.long_lat) : '';
          // $scope.getTimezonecheck($scope.employee.timezone);
          $scope.employee.last_scheduled = HelperService.converttimeZone($scope.employeeDBField.last_scheduled_date);
          $scope.employee.last_clockedin = HelperService.converttimeZone($scope.employeeDBField.last_clocked_in_date);
          $scope.employee.agency_empid = $scope.employeeDBField.agency_empid;
          $scope.employee.track_location = $scope.employeeDBField.track_location ? $scope.employeeDBField.track_location : 0;
          $scope.employee.certificatesMax = 3;
          $scope.indexCount = 0;
          $scope.employee.certificatesaddshow = -1;
          $scope.initialLoadRel = 0;
          if ($scope.employeeDBField.certificates !== '') {
            $scope.employee.certificates = angular.fromJson($scope.employeeDBField.certificates);
            var count = 0;
            for (var animal in $scope.employee.certificates) {
              if ($scope.employee.certificates.hasOwnProperty(animal)) {
                count++;
              }
            }
            $scope.employee.certificatesaddshow = count - 2;
            if ($.isEmptyObject($scope.employee.certificates)) {
              $scope.employee.certificates = [{
                  name: '',
                  ctdate: '',
                  renewaldate: '',
                  notes: '',
                  files: {}
                }];
            }
          } else {
            $scope.updateCertificates = false;
            //  $scope.updateEMPID = $stateParams.employeeId;
            $scope.employee.certificates = {};
            $scope.employee.certificates[0] = {
              name: '',
              ctdate: '',
              renewaldate: '',
              notes: '',
              files: {}
            };
            $scope.currentpath = Services.currentpath;
            // $scope.CurrentServer = "http://dreamfactory.caretime.bitnamiapp.com:80";
            //$scope.CurrentServer = Services.baseurl;
            // $scope.uploadPathPartial = '/files/applications/caretime/';
            // $scope.uploadListingPath = '/files/applications/caretime/uploads/';
            $scope.uploadListingPath = '/' + Services.uploadListingPath;
            var path = $scope.uploadListingPath + $scope.employee.accesscode + '/?force=true';
            $.ajax({
              dataType: 'json',
              beforeSend: function (xhr) {
                xhr.setRequestHeader('X-HTTP-Method', 'DELETE');
              },
              url: Services.baseurl + '/rest' + path,
              data: 'app_name=caretime&method=DELETE',
              cache: false,
              async: false,
              type: 'POST',
              success: function (response) {
              },
              error: function (response) {
              }
            });
            $scope.appName = 'caretime';
          }
        });
      } else {
        $scope.employee.curStatus = 1;
        $scope.employee.language = ['English'];
        $scope.employee.certificatesMax = 3;
        $scope.employeeadded = false;
        $scope.mymapVariable = {};
        $scope.employee.long_lat = {};
        $scope.pageTitle = 'Add New';
        $scope.empSteps = {
          general: true,
          personal: false,
          advanced: false,
          certification: false,
          authorization: false
        };
        $scope.employee.certificates = {};
        $scope.employee.certificates[0] = {
          name: '',
          ctdate: '',
          renewaldate: '',
          notes: '',
          files: {}
        };
        $scope.employee.certificatesaddshow = -1;
        $scope.indexCount = 0;
        $scope.initialLoadRel = 0;  /*
                $scope.currentpath = '/files';
                $scope.CurrentServer = "http://dreamfactory.caretime.bitnamiapp.com:80";
               // $scope.uploadPathPartial = '/files/applications/caretime/';
                $scope.uploadListingPath = '/files/applications/caretime/uploads/';
                */
                                    /*
                    $scope.currentpath = Services.currentpath;
                    $scope.CurrentServer = Services.baseurl;
                    $scope.uploadListingPath = '/' + Services.uploadListingPath;

                    $scope.appName = "caretime";


                    $scope.employee.certificatesaddshow = -1;
                    */
      }
      $scope.showLoading = false;
    };
    $scope.addCertificate = function (index, key, event) {
      if ($scope.employee.certificatesMax != index) {
        $scope.employee.certificatesaddshow = index;
      }
      index++;
      $scope.indexCount = parseInt(key) + 1;
      $scope.employee.certificates[$scope.indexCount] = {
        name: '',
        ctdate: '',
        renewaldate: '',
        notes: '',
        files: {}
      };
    };
    $scope.getPath = function (index) {
      return 'uploads_' + index;
    };
    $scope.removeCertificate = function (index) {
      $scope.employee.certificatesaddshow = $scope.employee.certificatesaddshow - 1;
      delete $scope.employee.certificates[index];
      var path = '/' + Services.uploadListingPath + $scope.employee.accesscode + '/certificates_' + index + '/?force=true';
      $.ajax({
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-HTTP-Method', 'DELETE');
        },
        url: Services.baseurl + '/rest' + path,
        data: 'app_name=caretime&method=DELETE',
        cache: false,
        async: false,
        type: 'POST',
        success: function (response) {
        },
        error: function (response) {
        }
      });
      $scope.$broadcast('certificate-remove');
    };
    $scope.downloadCurrFile = function (target) {
      window.open(Services.baseurl + Services.currentpath + '/' + target, '_blank', '');
      return false;
    };
    $scope.deleteCurrFile = function (currFile, index, anchorkey) {
      $scope.initialLoadPath = '/' + Services.uploadListingPath + $scope.employee.accesscode + '/certificates_' + index + '/';
      // $scope.initialLoadRel = index;
      var fileToDel = {};
      fileToDel.file = [];
      fileToDel.file[0] = { path: currFile.path };
      // $scope.fileToDel = fileToDel;
      // $scope.currFile = currFile;
      $scope.modalLoading = false;
      Services.setModelTempVar({
        'fileToDel': fileToDel,
        'initialLoadPath': $scope.initialLoadPath
      });
      var modalInstance = $modal.open({
          templateUrl: 'UPDdeleteModalContent.html',
          controller: 'UPDdeleteCtrl'
        });
    };
    $scope.empSteps = {};
    $scope.userexist = 0;
    if ($scope.employeeadded === true) {
      $scope.empSteps = {
        general: false,
        personal: false,
        advanced: false,
        certification: true,
        authorization: false
      };
      $scope.employeeadded = false;
      $scope.empSteps.certification = true;
    }
    //console.log($scope.employee.level);
    $scope.employeeManage = function (step, submit) {
      $scope.showerrorMsg = false;
      if (step == 'general') {
        if (angular.isUndefined($scope.employee.firstname) || angular.isUndefined($scope.employee.lastname) || angular.isUndefined($scope.employee.username) || angular.isUndefined($scope.employee.zone) || !$scope.employee.firstname || !$scope.employee.lastname || !$scope.employee.username || !$scope.employee.zone) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Required field is missing !!!';
          jQuery('.general .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
        if (submit === false) {
          $scope.save_employeeDetail();
        } else {
          $scope.empSteps.personal = true;
        }
      }
      if (step == 'personal') {
        if (!$scope.employee.timezone || !$scope.employee.workphone || !$scope.employee.birthdate) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Required field is missing !!!';
          jQuery('.personal .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
        if (submit === false) {
          $scope.save_employeeDetail();
        } else {
          $scope.empSteps.advanced = true;
        }  /*  Services.employeeZips.get({
                    filter: "timezone like '" + $scope.employee.timezone + "' and status > 0",
                    limit: 5
                }, function(remoteData) {
                    if (remoteData.record.length > 0) {
                        if (submit === false) {
                            $scope.save_employeeDetail();
                        } else {
                            $scope.empSteps.advanced = true;
                        }
                    } else {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Enter Valid Timezone!!!";
                        jQuery(".personal .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    }


                });*/
      }
      if (step == 'advanced') {
        $scope.savedisable = 1;
        if (submit === false) {
          $scope.savedisable = 1;
          $scope.save_employeeDetail();
        } else {
          if (!angular.isUndefined($scope.employee_id) && $scope.employee_id) {
            $scope.empSteps.certification = true;
          } else {
            $scope.empSteps.authorization = true;
          }
        }  /*   Services.employeeZips.get({
                    filter: "timezone like '" + $scope.employee.timezone + "' and status > 0",
                    limit: 5
                }, function(remoteData) {
                    if (remoteData.record.length > 0) {
                        if (submit === false) {
                            $scope.savedisable = 1;
                            $scope.save_employeeDetail();

                        } else {
                            if (!angular.isUndefined($scope.employee_id) && $scope.employee_id) {
                                $scope.empSteps.certification = true;


                            } else {
                                $scope.empSteps.authorization = true;

                            }

                        }
                    } else {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Enter Valid Timezone!!!";
                        jQuery(".personal .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    }


                });*/
      }
      if (step == 'certification') {
        $scope.savedisable = 1;
        if (submit === false) {
          $scope.save_employeeDetail();
        } else {
          $scope.empSteps.authorization = true;
        }  /*

                Services.employeeZips.get({
                    filter: "timezone like '" + $scope.employee.timezone + "'",
                    fields: "timezone",
                    limit: 1
                }, function(remoteData) {
                    if (remoteData.record.length > 0) {
                        $scope.savedisable = 1;
                        if (submit === false) {
                            $scope.save_employeeDetail();
                        } else {
                            $scope.empSteps.authorization = true;

                        }
                    } else {
                        $scope.savedisable = 0;
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        $scope.ErrorMsg = "Enter Valid Timezone!!!";
                        jQuery(".personal .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);
                        return false;
                    }


                });*/
      }
      if (step == 'authorization') {
        if (!$scope.employee.timezone) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Timezone is required !!!';
          jQuery('.personal .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        } else {
          $scope.save_employeeDetail();
        }
      }
    };
    $scope.save_employeeDetail = function () {
      $scope.savedisable = 1;
      var flag = 1;
      $scope.employeeDBField = {};
      $scope.employeeDBField.access_code = $scope.employee.accesscode;
      $scope.employeeDBField.agency_id = Services.getAgencyID();
      $scope.employeeDBField.zone_id = $scope.employee.zone.id;
      $scope.employeeDBField.zone_detail = JSON.stringify($scope.employee.zone);
      $scope.employeeDBField.map_url = $scope.employee.url;
      $scope.employeeDBField.long_lat = JSON.stringify($scope.employee.long_lat);
      $scope.employeeDBField.first_name = $scope.employee.firstname;
      $scope.employeeDBField.last_name = $scope.employee.lastname;
      $scope.employeeDBField.username = $scope.employee.username;
      $scope.employeeDBField.email = $scope.employee.email;
      $scope.employeeDBField.language = JSON.stringify($scope.employee.language);
      $scope.employeeDBField.is_supervisor = $scope.employee.level;
      $scope.employeeDBField.status = $scope.employee.curStatus;
      $scope.employeeDBField.primary_address1 = $scope.employee.address1;
      $scope.employeeDBField.primary_address2 = $scope.employee.address2;
      $scope.employeeDBField.primary_city = $scope.employee.city;
      $scope.employeeDBField.primary_state = $scope.employee.state;
      $scope.employeeDBField.primary_zip = $scope.employee.zip;
      $scope.employeeDBField.primary_county = $scope.employee.county;
      $scope.employeeDBField.country = $scope.employee.country;
      $scope.employeeDBField.primary_timezone = $scope.employee.timezone;
      $scope.employeeDBField.primary_phone = $scope.employee.workphone;
      $scope.employeeDBField.secondary_phone = JSON.stringify($scope.employee.Secphone);
      $scope.employeeDBField.hire_date = $scope.employee.hiredate ? moment($scope.employee.hiredate).format('YYYY-MM-DD') : '';
      $scope.employeeDBField.birth_date = $scope.employee.birthdate ? moment($scope.employee.birthdate).format('YYYY-MM-DD') : '';
      $scope.employeeDBField.pay_rate = $scope.employee.payrate;
      $scope.employeeDBField.pay_class = JSON.stringify($scope.employee.payclass);
      $scope.employeeDBField.preferred_communication = JSON.stringify($scope.employee.communication);
      if ($scope.employee.skill) {
        $scope.employeeDBField.skill_detail = JSON.stringify($scope.employee.skill);
        $scope.employeeDBField.skill_id = JSON.stringify($scope.employee.skill.id);
      }
      $scope.employeeDBField.certificates = JSON.stringify(angular.fromJson(angular.toJson($scope.employee.certificates)));
      if (!angular.isUndefined($stateParams.employeeId) && $stateParams.employeeId) {
        // means it is in edit state 
        $scope.employeeDBField.edited_on = moment().utc();
        $scope.employeeDBField.edited_by = JSON.stringify({
          'username': $localStorage.user_info.username,
          'firstname': $localStorage.user_info.first_name,
          'lastname': $localStorage.user_info.last_name,
          'user_id': $localStorage.user_info.user_id
        });
      } else {
        $scope.employeeDBField.created_on = moment().utc().format('YYYY-MM-DD HH:mm');
        $scope.employeeDBField.created_by = JSON.stringify({
          'username': $localStorage.user_info.username,
          'firstname': $localStorage.user_info.first_name,
          'lastname': $localStorage.user_info.last_name,
          'user_id': $localStorage.user_info.user_id
        });
      }
      $scope.employeeDBField.clock_out_safe = $scope.employee.clock_out_safe;
      $scope.employeeDBField.clock_out_safe_hour = $scope.employee.clockOutSafeguardHours;
      $scope.employeeDBField.notes = $scope.employee.notes;
      $scope.employeeDBField.external_code = JSON.stringify($scope.employee.externalCode);
      $scope.employeeDBField.preferred_communication = JSON.stringify($scope.employee.communication);
      $scope.employeeDBField.agency_empid = $scope.employee.agency_empid;
      $scope.employeeDBField.track_location = $scope.employee.track_location;
      if ($scope.updateCertificates === true) {
      } else {
        $scope.employeeDBField.access_code = '';
        $scope.employeeDBField.username = '';
      }
      if (typeof $scope.employee.communication !== 'undefined') {
        if ($scope.employee.communication.isVoice) {
          if (!$scope.employee.communication.voice) {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = ' Voice Message is required !!!';
            jQuery('.personal .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        }
        if ($scope.employee.communication.isText) {
          if (!$scope.employee.communication.text) {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Text/SMS is required !!!';
            jQuery('.personal .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        }
        if ($scope.employee.communication.isEmail) {
          if (typeof $scope.employee.communication.email === 'undefined') {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Enter Valid Email !!!';
            jQuery('.personal .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else if (!$scope.employee.communication.email) {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Email is required !!!';
            jQuery('.personal .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        }
      }
      if ($scope.employeeDBField.hire_date && $scope.employeeDBField.birth_date) {
        if (moment($scope.employeeDBField.hire_date).unix() <= moment($scope.employeeDBField.birth_date).unix()) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Hire Date must be less than the Birthday';
          jQuery('.personal .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
      }
      angular.forEach($scope.employee.certificates, function (item, key) {
        if (item.ctdate && item.renewaldate) {
          if (moment(item.renewaldate).unix() <= moment(item.ctdate).unix()) {
            flag = 0;
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Certificate Date must be less than the Renewal Date';
            jQuery('.personal .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        }
      });
      if (flag == 1) {
        /*
                if ($scope.employeeDBField.primary_zip) {

                    Services.employeeZips.get({
                        field:"id",
                        filter: "Zip ='" + $scope.employeeDBField.primary_zip + "' and status > 0",
                        limit: 1
                    }, function(remoteData) {

                        if (remoteData.record.length > 0) {
                            $scope.checkEmpAgencyID();

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
                    $scope.checkEmpAgencyID();
                }
                */
        $scope.checkEmpAgencyID();
      }
    };
    $scope.checkEmpAgencyID = function () {
      if ($scope.employeeDBField.agency_empid) {
        EmpAgencyObj = {
          fields: 'id',
          filter: 'agency_empid=\'' + $scope.employeeDBField.agency_empid + '\' and agency_id = ' + Services.getAgencyID()
        };
        if ($scope.employee_id) {
          EmpAgencyObj.filter = EmpAgencyObj.filter + ' and id<>' + $scope.employee_id;
        }
        Services.employeeService.get(EmpAgencyObj, function (data) {
          if (data.record.length < 1) {
            $scope.saveUpdateEmployee();
          } else {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Agency Employee ID Already Exist!!!';
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        });
      } else {
        $scope.saveUpdateEmployee();
      }
    };
    $scope.saveUpdateEmployee = function () {
      if ($scope.updateCertificates) {
        if ($scope.employee_id) {
          Services.employeeService.update({ id: $scope.employee_id }, $scope.employeeDBField, function (data) {
            $scope.insertEmployeeCertificates();
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'success';
            $scope.ErrorMsg = 'Employee detail edited sucessfully !!!';
            $scope.employee.editedOn = data.edited_on;
            $timeout(function () {
              $scope.showerrorMsg = false;
              $state.go('ctApp.employees');
            }, 3000);
            return false;
          });
        }
      } else {
        $scope.getEmpcode();
        $scope.employeeDBField.username = $scope.generateUsernameRandom($scope.employeeDBField.access_code);
        Services.employeeService.get({
          fields: 'id',
          filter: 'access_code=\'' + $scope.employeeDBField.access_code + '\''
        }, function (data) {
          if (data.record.length < 1) {
            Services.employeeService.save($scope.employeeDBField, function (data) {
              $scope.employee.username = $scope.employeeDBField.username;
              $scope.showerrorMsg = true;
              $scope.updateCertificates = true;
              $scope.employee_id = data.id;
              $scope.ErrorClass = 'success';
              $scope.ErrorMsg = 'Employee sucessfully added with Access code(' + data.access_code + ') and Username (' + data.username + ') !!! ';
              $scope.employee.accesscode = data.access_code;
              $scope.employee.username = data.username;
              $timeout(function () {
                $scope.employeeadded = true;
                var currUpdPath = 'certificates_0';
                $scope.employee.accesscode = data.access_code;
                $scope.initialLoadPath = $scope.uploadListingPath + data.access_code + '/' + currUpdPath + '/';
                var path = $scope.uploadListingPath + $scope.employee.accesscode + '/?force=true';
                $.ajax({
                  dataType: 'json',
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-HTTP-Method', 'DELETE');
                  },
                  url: Services.baseurl + '/rest' + path,
                  data: 'app_name=caretime&method=DELETE',
                  cache: false,
                  async: false,
                  type: 'POST',
                  success: function (response) {
                    $scope.empSteps.certification = true;
                  },
                  error: function (response) {
                  }
                });
                $scope.showerrorMsg = false;
                $scope.empSteps.certification = true;
                $state.go('ctApp.employees');
              }, 3000);
            });
          } else {
            $scope.generateEmpcode_count++;
            if ($scope.generateEmpcode_count < 5) {
              $scope.getEmpcode();
              $scope.saveUpdateEmployee();
            } else {
              $scope.savedisable = 0;
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'danger';
              $scope.ErrorMsg = 'Conflict occur in employee code,try again if the problem persists please contact Administrator !!!';
              $timeout(function () {
                $scope.showerrorMsg = false;
              }, 3000);
              return false;
            }
          }
        });
      }
    };
    // coded by Revathy to get  Employee code 
    $scope.getEmpcode = function () {
      var characters = 0;
      if ($localStorage.configCode.employee) {
        getminimum = Math.pow(10, $localStorage.configCode.employee - 1);
        characters = Math.pow(10, $localStorage.configCode.employee) - getminimum;
      }
      $scope.employeeDBField.access_code = $window.Math.floor($window.Math.random() * characters) + getminimum;
    };
    $scope.sendAuthorization = function () {
      $scope.authorizedEmail = $scope.employee.email;
      if ($scope.authorizedEmail == null || jQuery('.authorization .ng-invalid').length > 0) {
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Enter Valid email !!!';
        jQuery('.authorization .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      } else {
        // console.log($localStorage.agencyDetails.agency_name);
        var Emailmessage = '';
        Emailmessage = 'Hi ' + $scope.employee.firstname + ':';
        Emailmessage += '<br /><br />' + $localStorage.agencyDetails.agency_name + ' is sending you this email so that you may register with Caretime.  In order to complete the registration process and login to your account, you must click on the link below.  Please make a note of your user name before you click on the link.';
        Emailmessage += '<br /><br /><strong>' + $scope.employee.username + '</strong>';
        Emailmessage += '<br /><br />Please note that upon clicking the link below, you will be able to create a password.  Your password must be 8 characters, with one upper case and one number.';
        Emailmessage += '<br /><br />Please click on the Activation link below';
        Emailmessage += '<br /><br />' + '<a href="' + Services.siteurl + '#/access/' + Services.serviceName + '/employeeLogin/' + $scope.employee.id + '/" title="Click here" > Activation </a>';
        Emailmessage += '<br /><br />Thanks';
        Emailmessage += '<br />Caretime Support Team';
        Emailmessage += '<br /><a href="mailto: support@caretime.us" title="" >support@caretime.us</a>';
        Emailmessage += '<br />Please visit our Knowledge Center for helpful tips on how to use the system.<a href="https://caretime.zendesk.com/hc/en-us" title="Caretime Zendesk">https://caretime.zendesk.com/hc/en-us</a>';
        $http({
          method: 'POST',
          url: Services.mailUrl,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            'subject': 'Invitation from ' + $localStorage.agencyDetails.agency_name + ' to Register with Caretime',
            'to': $scope.employee.email,
            'comment': Emailmessage
          }
        }).success(function (data, status, headers, config) {
          $scope.empDBField = {};
          $scope.empDBField.email = $scope.employee.email;
          Services.employeeService.update({ id: $scope.employee.id }, $scope.empDBField, function (data) {
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'success';
            $scope.ErrorMsg = 'Authorization Message Sent Sucessfully !!!';
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 4000);
          });
        }).error(function (data, status, headers, config) {
          $scope.empDBField = {};
          $scope.empDBField.email = $scope.employee.email;
          Services.employeeService.update({ id: $scope.employee.id }, $scope.empDBField, function (data) {
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'success';
            $scope.ErrorMsg = 'Authorization Message Sent Sucessfully !!!';
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 4000);
          });
        });
      }
    };
    $scope.insertEmployeeCertificates = function () {
      //insert in to employee_Certificates
      if (!angular.isUndefined($stateParams.employeeId) && $stateParams.employeeId) {
        $scope.deleteEmpCertificates = function () {
          Services.employeeCertificates.delete({ filter: 'employee_code=\'' + $scope.employee.accesscode + '\'' }, function (data) {
          });
        };
        $scope.deleteEmpCertificates();
      }
      $scope.employeeCertificates = [];
      angular.forEach($scope.employee.certificates, function (item, key) {
        $scope.employeeCertificates[key] = {};
        $scope.employeeCertificates[key].name = item.name;
        $scope.employeeCertificates[key].issue_date = item.ctdate;
        $scope.employeeCertificates[key].renewal_date = item.renewaldate;
        $scope.employeeCertificates[key].notes = item.notes;
        $scope.employeeCertificates[key].status = $scope.employee.curStatus;
        $scope.employeeCertificates[key].created_on = $scope.employee.created_on;
        $scope.employeeCertificates[key].edited_on = moment().utc();
        $scope.employeeCertificates[key].employee_code = $scope.employee.accesscode;
      });
      Services.employeeCertificates.save($scope.employeeCertificates, function (data) {
        $timeout(function () {
        }, 3000);
      });
    };
    /* $scope.getZipDetail = function() {

            if (!angular.isUndefined($scope.employee.zip)) {
                if ($scope.employee.zip.length == 5) {

                    Services.employeeZips.get({
                       filter: "Zip ='" + $scope.employee.zip + "'",
                        fields: "timezone,primary_city,state,county",
                        limit: 1
                    }, function(remoteData) {

                        if (remoteData.record.length > 0) {
                            $scope.employee.city = remoteData.record[0].primary_city;
                            $scope.employee.state = remoteData.record[0].state;
                            $scope.employee.county = remoteData.record[0].county;
                            $scope.employee.timezone = remoteData.record[0].timezone;


                            $scope.showZipError = false;
                        } else {
                            $scope.showZipError = true;
                            $timeout(function() {
                                $scope.showZipError = false;
                            }, 6000);
                            $scope.employee.city = "";
                            $scope.employee.state = "";
                            $scope.employee.county = "";
                            $scope.employee.timezone = "";
                        }

                    });
                }
            }
        };*/
    $scope.getmyTimezone = function (lat, lng) {
      if (lat && lng) {
        var tz = new TimeZoneDB();
        tz.getJSON({
          key: Services.timezoneKey,
          lat: lat,
          lng: lng
        }, function (data) {
          $scope.$apply(function () {
            $scope.employee.timezone = data.zoneName;
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
      if (newValue) {
        if ($scope.mymapVariable.address_components) {
          $scope.employee.timezone = '';
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
          $scope.employee.address1 = $scope.street_number + ' ' + $scope.street;
          $scope.employee.address2 = '';
          $scope.employee.city = $scope.city;
          $scope.employee.state = $scope.state;
          $scope.employee.zip = $scope.zip;
          $scope.employee.county = $scope.county;
          $scope.employee.country = $scope.country;
          if ($scope.mymapVariable.url) {
            $scope.employee.url = $scope.mymapVariable.url;
          }
          if ($scope.mymapVariable.geometry) {
            $scope.employee.long_lat = {};
            $scope.employee.long_lat.long = $scope.mymapVariable.geometry.location['D'];
            $scope.employee.long_lat.lat = $scope.mymapVariable.geometry.location['k'];
            $scope.getmyTimezone($scope.employee.long_lat.lat, $scope.employee.long_lat.long);
          }
        }
      }
    });
    $scope.mapView = function (mapurl) {
      Services.setModelTempVar(mapurl);
      var modalInstance = $modal.open({
          templateUrl: 'ct-app/employees/mapDetailView.tpl.html',
          controller: 'MapBoxEmployeeCtrl'
        });
    };
    $scope.generateUsername = function () {
      if (!angular.isUndefined($stateParams.employeeId) && $stateParams.employeeId) {
      } else {
        if (!angular.isUndefined($scope.employee.firstname) && !angular.isUndefined($scope.employee.lastname)) {
          $scope.employee.username = $scope.employee.firstname.substring(0, 3) + $scope.employee.lastname.substring(0, 3) + $window.Math.floor($window.Math.random() * 1000);
        }
      }
    };
    $scope.generateUsernameRandom = function (newcode) {
      if (!angular.isUndefined($scope.employee.firstname) && !angular.isUndefined($scope.employee.lastname)) {
        return $scope.employee.firstname.substring(0, 3) + $scope.employee.lastname.substring(0, 3) + newcode;
      }
    };
    $scope.cancelEmployee = function () {
      $state.go('ctApp.employees');
    };
    /*
        $scope.getmyTimezone = function(val) {
            Services.employeeZips.get({
                filter: "Zip ='" + val + "'",
                fields: "timezone",
                limit: 1
            }, function(remoteData) {
                if (remoteData.record.length > 0) {
                    $scope.employee.timezone = remoteData.record[0].timezone;

                    $scope.showZipError = false;
                } else {
                    $scope.showZipError = true;
                    $timeout(function() {
                        $scope.showZipError = false;
                    }, 6000);
                    $scope.employee.timezone = "";
                }


            });

        };
        */
    $scope.$watch('employee.zip', function (newValue, oldValue) {
      if (newValue != oldValue) {
        if (Object.prototype.toString.call(newValue) == '[object Object]') {
          $scope.employee.city = newValue.city;
          $scope.employee.state = newValue.state;
          $scope.employee.county = newValue.county;
          $scope.employee.timezone = newValue.timezone;
        }
      }
    });
    $scope.selectPayClass = {
      query: function (query) {
        var data = { results: [] };
        $scope.payClassObj = {
          fields: 'pay_class,id',
          filter: 'status>0 and agency_id = ' + Services.getAgencyID(),
          order: 'pay_class asc',
          limit: 5
        };
        if (query.term) {
          $scope.payClassObj.filter += ' and pay_class like \'%' + query.term + '%\'';
        }
        Services.agencyPayclass.get($scope.payClassObj, function (resultval) {
          if (resultval.record.length !== 0) {
            angular.forEach(resultval.record, function (item, key) {
              data.results.push({
                'text': item.pay_class,
                'id': item.id
              });
              query.callback(data);
            });
          } else {
            query.callback(data);
          }
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.employee.payclass) && !angular.isUndefined($scope.employee.payclass.id) && $scope.employee.payclass.id) {
          callback({
            'text': $scope.employee.payclass.text,
            'id': $scope.employee.payclass.id
          });
        }
      }
    };
    $scope.selectZone = {
      query: function (query) {
        var data = { results: [] };
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
              'id': item.zone_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.employee.zone) && !angular.isUndefined($scope.employee.zone.id) && $scope.employee.zone.id) {
          callback({
            'text': $scope.employee.zone.text,
            'id': $scope.employee.zone.id
          });
        }
      }
    };
    $scope.selectSkill = {
      query: function (query) {
        var skillData = { results: [] };
        $scope.skillObj = {
          fields: 'name,id',
          filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
          limit: 5
        };
        if (query.term) {
          $scope.skillObj.filter += ' and name like \'%' + query.term + '%\'';
        }
        Services.auth_skillsService.get($scope.skillObj, function (remoteData) {
          if (remoteData.record.length < 1) {
            query.callback(skillData);
          }
          angular.forEach(remoteData.record, function (item, key) {
            skillData.results.push({
              'text': item.name,
              'id': item.id
            });
            query.callback(skillData);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.employee.skill.id) && $scope.employee.skill.id) {
          callback({
            'text': $scope.employee.skill.text,
            'id': $scope.employee.skill.id
          });
        }
      }
    };
    /* $scope.getTimezonecheck = function(val) {
            Services.employeeZips.get({
                filter: "Zip ='" + val + "'",
                fields: "timezone",
                limit: 1
            }, function(res) {
                var timezone = [];
                angular.forEach(res.record, function(item) {
                    timezone.push(item.timezone);
                });
                return timezone;

            });
        };*/
    /*  $scope.getTimezone = function(val) {


            return Services.getTimeZones(val).then(function(res) {
                var timezone = [];
                angular.forEach(res.data.record, function(item) {
                    timezone.push(item.timezone);
                });
                return timezone;
            });




        };*/
    $scope.employeeManagePrev = function (step) {
      if (step == 'personal') {
        $scope.empSteps.general = true;
        $scope.empSteps.personal = false;
        $scope.empSteps.certification = false;
      }
      if (step == 'advanced') {
        $scope.empSteps.personal = true;
        $scope.empSteps.advanced = false;
        $scope.empSteps.certification = false;
      }
      if (step == 'certification') {
        $scope.empSteps.personal = false;
        $scope.empSteps.advanced = true;
        $scope.empSteps.certification = false;
      }
      if (step == 'authorization') {
        if ($scope.pageTitle == 'Add New') {
          $scope.empSteps.authorization = false;
          $scope.empSteps.advanced = true;
          $scope.empSteps.certification = false;
        } else {
          $scope.empSteps.authorization = false;
          $scope.empSteps.advanced = false;
          $scope.empSteps.certification = true;
        }
      }
    };
    $scope.getEmployeeDetail();
  }
]).controller('uploadMultipleCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$window',
  '$timeout',
  '$modal',
  '$element',
  'Services',
  function ($scope, $rootScope, $state, $window, $timeout, $modal, $element, Services) {
    $scope.current_Emp = Services.getModelTempVar();
    $scope.EmpAccesscode = $scope.current_Emp.code;
    $scope.uploadListingPath = '/' + Services.uploadListingPath;
    $scope.CurrentServer = Services.baseurl;
    $scope.init = function () {
      $timeout(function () {
        var currKey = $($element).parent().attr('rel');
        var currUpdPath = 'certificates_' + currKey;
        $rootScope.initialLoadRel = currKey;
        $rootScope.initialLoadPath = $scope.uploadListingPath + $scope.EmpAccesscode + '/' + currUpdPath + '/';
        $scope.fileListing = '';
        $scope.uploadedFiles = '';
        $scope.uploadErrorCont = '';
        $scope.uploadErrorMsg = '';
        //  if ($rootScope.updateCertificates === true) {
        $scope.loadListing($rootScope.initialLoadPath);
        //  }
        $scope.confirmDelete = false;
        $scope.renameFilename = '';
        $scope.fileCheckExist = true;
      });
    };
    $scope.importFile = function (event) {
      var filename = event.value;
      $rootScope.currUPDFile = filename;
      $rootScope.fileuploadCurrEvent = event;
      var uploadPathNew = $scope.uploadPathFinal;
      if ($rootScope.renameFilename && $rootScope.renameFilename !== '') {
        uploadPathNew = uploadPathNew + $rootScope.renameFilename + '.pdf';
        $rootScope.currUPDFile = $rootScope.renameFilename + '.pdf';
        $rootScope.renameFilename = '';
      }
      var params = 'app_name=' + Services.serviceName + '&include_folders=true&include_files=true';
      if ($scope.fileCheckExist) {
        params = params + '&check_exist=true';
      } else {
        params = params + '&check_exist=false';
        $scope.fileCheckExist = true;
      }
      if (filename.substr(filename.length - 4) != '.pdf') {
        $scope.uploadErrorCont = true;
        $scope.uploadErrorMsg = 'Only PDF allowed';
        alert('only PDF allowed');
        return false;
      }
      if (filename === '') {
        alert('Please specify a file to import.');
        return;
      }
      //Revathy Edit
      //$(event).closest("form").attr("action", "https://securecaretime.us/rest" + uploadPathNew + "?" + params);
      $(event).closest('form').attr('action', Services.baseurl + '/rest' + uploadPathNew + '?' + params);
      $(event).parent().addClass('disabled');
      $scope.downloadCont = false;
      $scope.updLoading = false;
      $(event).closest('form').submit();
      $('.showLoad_' + $scope.key).show();
      $('.uploadAnchor_' + $scope.key).attr('disabled', 'disabled');
      $timeout(function () {
        $rootScope.showLoading = false;
        $scope.init();
        $('.showLoad_' + $scope.key).hide();
      }, 4000);
    };
    $scope.isErrorString = function (responseText) {
      var result = null;
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (e) {
        }
      }
      return !!(result && result.error);
    };
    $scope.checkResults = function (iframe) {
      var str = $(iframe).contents().text();
      if (str && str.length > 0) {
        if ($scope.isErrorString(str)) {
          var response = {};
          response.responseText = str;  // alertErr(response);
        } else {
          $scope.generateLink(str);
        }
      }
    };
    $scope.iframeLoadedCallBack = function (event) {
      var frameTarget = $scope.frameTarget;
      var parsedStr;
      var scope;
      var str = $('#' + frameTarget).contents().text();
      if (str) {
        parsedStr = JSON.parse(str);
      }
      $('#' + frameTarget).contents().find('body').html('');
      if (parsedStr) {
        if (parsedStr.file && parsedStr.file.length > 0) {
          if ($scope.isErrorString(str)) {
            var response = {};
            response.responseText = str;  // alertErr(response);
          } else {
            $scope.updLoading = false;
            $scope.downloadCont = false;
            $('.uploadAnchor').removeAttr('disabled');
            $scope.reloadListing($rootScope.initialLoadPath);
            scope = angular.element($('.uploadCtrlCont')).scope();
            scope.$apply();
            $scope.updLoading = false;
            $scope.downloadCont = false;
          }
        }
        if (parsedStr.error && parsedStr.error.length > 0) {
          var existCheck = parsedStr.error[0].message;
          if (existCheck.search('already exists') >= 0) {
            var modalInstance = $modal.open({
                templateUrl: 'UPDfileExistModalContent.html',
                controller: function ($scope, $rootScope, $window, $timeout, $modal) {
                  $scope.overwriteOK = function () {
                    $rootScope.modalLoading = false;
                    $rootScope.$broadcast('overwrite-file');
                    $scope.$close('cancel');
                  };
                  $scope.overwriteCANCEL = function () {
                    $rootScope.modalLoading = false;
                    $scope.$close('cancel');
                  };
                  $scope.renameFILE = function () {
                    $rootScope.modalLoading = false;
                    var renameFilename = angular.element('#renameFilenameInp').val();
                    if (renameFilename !== '') {
                      $rootScope.$broadcast('rename-file', { filename: renameFilename });
                    } else {
                      return false;
                    }
                    $scope.$close('cancel');
                  };
                }
              });
            scope = angular.element($('.uploadCtrlCont')).scope();
            scope.$apply();
            $scope.updLoading = false;
            $scope.downloadCont = false;
          }
        }
      }
    };
    $scope.$on('overwrite-file', function (event, args) {
      var changeId = '#' + $rootScope.UPDcurrId;
      $scope.fileCheckExist = false;
      $(changeId).change();
    });
    $scope.$on('rename-file', function (event, args) {
      var changeId = '#' + $rootScope.UPDcurrId;
      $rootScope.renameFilename = args.filename;
      $(changeId).change();
    });
    $scope.reloadListing = function () {
      $scope.loadListing($rootScope.initialLoadPath);
    };
    $scope.loadListing = function (path) {
      path = $rootScope.initialLoadPath;
      $.ajax({
        dataType: 'json',
        url: $scope.CurrentServer + 'rest' + path,
        data: 'app_name=' + Services.serviceName + '&method=GET',
        async: false,
        success: function (response) {
          try {
            document.getSelection().removeAllRanges();
          } catch (e) {
          }
          var tmp = path.split('/');
          $scope.listingUI(response, tmp[1]);
        },
        error: function (response) {
          if (response && response.responseJSON) {
            var folderNotFoundError = response.responseJSON.error[0].message;
            if (folderNotFoundError.search('does not exist in storage') >= 0) {
              $.ajax({
                dataType: 'json',
                url: $scope.CurrentServer + 'rest' + path,
                data: 'app_name=' + Services.serviceName + '&method=POST',
                cache: false,
                async: false,
                type: 'POST',
                success: function (response) {
                  var pathe = $rootScope.initialLoadPath;
                  var tmp = pathe.split('/');
                  $scope.listingUI(response, tmp[1]);
                },
                error: function (response) {
                  if (response && response.responseJSON) {
                    var folderNotFoundError = response.responseJSON.error[0].message;
                    if (folderNotFoundError.search('does not exist in storage') >= 0) {
                    }
                  }
                }
              });
            }
          }
        }
      });
    };
    var cleanUpFunc = $scope.$on('reload-listing', function (event, args) {
        $scope.loadListing(args.reloadpath);
      });
    $scope.listingUI = function (json, svc) {
      if (json.file) {
        $scope.uploadedFiles = '';
        $scope.uploadedFiles = json.file;
        $rootScope.employee.certificates[$rootScope.initialLoadRel].files = json.file;
      }
    };
    var test = $scope.$on('delete-file-trigger', function (event, args) {
        var currFile = args.currFile;
        var fileToDel = {};
        fileToDel.file = [];
        fileToDel.file[0] = { path: currFile.path };
        $rootScope.fileToDel = fileToDel;
        $rootScope.currFile = currFile;
        $rootScope.modalLoading = false;
        $scope.uploadPathFinal = $scope.uploadPathFinal;
        var modalInstance = $modal.open({
            templateUrl: 'UPDdeleteModalContent.html',
            controller: function ($scope, $rootScope, $window, $timeout, $modal) {
              $scope.deleteOK = function () {
                $rootScope.modalLoading = true;
                $scope.modalLoading = true;
                data = JSON.stringify($rootScope.fileToDel);
                $scope.$close('cancel');
                $.ajax({
                  dataType: 'json',
                  type: 'POST',
                  url: $scope.CurrentServer + '/rest' + $rootScope.initialLoadPath + '/?app_name=admin&method=DELETE&force=true',
                  data: data,
                  cache: false,
                  async: false,
                  processData: false,
                  success: function (response) {
                    $rootScope.$emit('reload-listing', { reloadpath: $rootScope.initialLoadPath });
                  },
                  error: function (response) {
                    // alertErr(response);
                    $scope.$close('cancel');
                    $rootScope.$broadcast('reload-listing');
                  }
                });
              };
              $scope.deleteCANCEL = function () {
                $rootScope.modalLoading = false;
                $scope.$close('cancel');
              };
            }
          });
        return false;
      });
    $scope.$on('$destroy', test);
    $scope.fileUploadClick = function (event) {
      var uniqId = $(event.target).attr('rel');
      //UPDitem1
      var currKey = $(event.target).parent().parent().parent().attr('rel');
      //certificates key 0 
      var currUpdPath = 'certificates_' + currKey;
      $('.uploadHolder').find('.fileInput').remove();
      $rootScope.UPDcurrId = uniqId;
      var ancParent = $(event.target).parent();
      ancParent.find('.uploadHolder').append('<input id="' + uniqId + '" class="fileInput" name="files" type="file" data-ui-file-upload="" title="Choose File" custom-on-change="importFile" onchange="angular.element(this).scope().importFile(this);">');
      $timeout(function () {
        $scope.uploadPathFinal = $scope.uploadListingPath + $scope.EmpAccesscode + '/' + currUpdPath + '/';
        $rootScope.initialLoadPath = $scope.uploadPathFinal;
        $rootScope.initialLoadRel = currKey;
        $rootScope.indexCount = currKey;
        ancParent.find('.fileInput').click();
      });
    };
    $scope.init();
  }
]).controller('DashboardEmployeeCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  'HelperService',
  '$window',
  function ($scope, Services, $state, $stateParams, HelperService, $window) {
    $scope.employeeStateDetail = {};
    $scope.Config = {
      list: {
        itemperPage: 10,
        itemFrom: 1,
        preOffset: 0,
        currentPage: 1
      }
    };
    $scope.empConfig = {
      list: {
        itemperPage: 10,
        itemFrom: 1,
        preOffset: 0,
        currentPage: 1
      }
    };
    $scope.sortField = 'id';
    $scope.sortType = 'desc';
    $scope.empsortField = 'id';
    $scope.empsortType = 'desc';
    $scope.employeelogDetails = '';
    $scope.Config.list.nextOffset = $scope.Config.list.itemperPage;
    $scope.Config.list.itemTo = $scope.Config.list.itemperPage;
    if (!angular.isUndefined($stateParams.employeeId) && $stateParams.employeeId) {
      $scope.employee_id = $stateParams.employeeId;
      $scope.buildPagination = function (paginationCount) {
        var Temp = [];
        for (var i = 1; i <= paginationCount; i++) {
          Temp.push({
            offset: (i - 1) * $scope.Config.list.itemperPage,
            number: i
          });
        }
        return Temp;
      };
      $scope.getNextData = function (offset) {
        // on pagination
        filterObj = {
          'filter': 'employee_id=\'' + $scope.employee_id + '\' and agency_id = ' + Services.getAgencyID(),
          'limit': $scope.Config.list.itemperPage,
          'include_count': true,
          'offset': offset,
          'order': $scope.sortField + ' ' + $scope.sortType
        };
        Services.shiftService.get(filterObj, function (data) {
          $scope.Config.list.itemFrom = offset + 1;
          $scope.Config.list.itemTo = offset + $scope.Config.list.itemperPage;
          $scope.employeeshiftDetails = data.record;
          $scope.Config.list.preOffset = offset - $scope.Config.list.itemperPage;
          $scope.Config.list.nextOffset = offset + $scope.Config.list.itemperPage;
          $scope.Config.list.currentPage = offset / $scope.Config.list.itemperPage + 1;
        });
      };
      $scope.updateTableData = function () {
        // on limit change
        var filterObj;
        filterObj = {
          'filter': 'employee_id=\'' + $scope.employee_id + '\' and agency_id = ' + Services.getAgencyID(),
          'limit': $scope.Config.list.itemperPage,
          'include_count': true,
          'order': $scope.sortField + ' ' + $scope.sortType
        };
        Services.shiftService.get(filterObj, function (data) {
          $scope.employeeshiftDetails = data.record;
          $scope.Config.list.preOffset = 0;
          $scope.Config.list.nextOffset = $scope.Config.list.itemperPage;
          $scope.Config.list.itemTo = $scope.Config.list.itemperPage;
          $scope.Config.list.itemTotalCount = data.meta.count;
          $scope.Config.list.paginationCount = $window.Math.ceil($scope.Config.list.itemTotalCount / $scope.Config.list.itemperPage);
          $scope.Config.list.currentPage = 1;
          $scope.Config.list.pagination = $scope.buildPagination($scope.Config.list.paginationCount);
        });
      };
      $scope.sortMe = function (fieldName, thisClass) {
        jQuery('.sortable i').addClass('fa-sort');
        jQuery('.sortable i').removeClass('fa-sort-desc');
        jQuery('.sortable i').removeClass('fa-sort-up');
        $scope.sortme = true;
        $scope.sortField = fieldName;
        if ($scope.sortType == 'asc') {
          $scope.sortType = 'desc';
          jQuery('.' + thisClass + ' i').removeClass('fa-sort');
          jQuery('.' + thisClass + ' i').removeClass('fa-sort-up');
          jQuery('.' + thisClass + ' i').addClass('fa-sort-desc');
        } else if ($scope.sortType == 'desc') {
          $scope.sortType = 'asc';
          jQuery('.' + thisClass + ' i').removeClass('fa-sort');
          jQuery('.' + thisClass + ' i').removeClass('fa-sort-desc');
          jQuery('.' + thisClass + ' i').addClass('fa-sort-up');
        }
        $scope.updateTableData();
      };
      $scope.buildempPagination = function (paginationCount) {
        var empTemp = [];
        for (var i = 1; i <= paginationCount; i++) {
          empTemp.push({
            offset: (i - 1) * $scope.empConfig.list.itemperPage,
            number: i
          });
        }
        return empTemp;
      };
      $scope.getEmpNextData = function (offset) {
        // on pagination
        filterObj = {
          'filter': 'employee_code =\'' + $scope.employeecode + '\' and agency_id = ' + Services.getAgencyID(),
          'limit': $scope.empConfig.list.itemperPage,
          'include_count': true,
          'offset': offset,
          'order': $scope.empsortField + ' ' + $scope.empsortType
        };
        Services.employeeActivitiesService.get(filterObj, function (data) {
          $scope.empConfig.list.itemFrom = offset + 1;
          $scope.empConfig.list.itemTo = offset + $scope.empConfig.list.itemperPage;
          $scope.employeelogDetails = data.record;
          $scope.empConfig.list.preOffset = offset - $scope.empConfig.list.itemperPage;
          $scope.empConfig.list.nextOffset = offset + $scope.empConfig.list.itemperPage;
          $scope.empConfig.list.currentPage = offset / $scope.empConfig.list.itemperPage + 1;
        });
      };
      $scope.empUpdateTableData = function () {
        // on limit change
        var filterObj;
        filterObj = {
          'filter': 'employee_code =\'' + $scope.employeecode + '\' and agency_id = ' + Services.getAgencyID(),
          'limit': $scope.empConfig.list.itemperPage,
          'include_count': true,
          'order': $scope.empsortField + ' ' + $scope.empsortType
        };
        Services.employeeActivitiesService.get(filterObj, function (data) {
          $scope.employeelogDetails = data.record;
          $scope.empConfig.list.preOffset = 0;
          $scope.empConfig.list.nextOffset = $scope.empConfig.list.itemperPage;
          $scope.empConfig.list.itemTo = $scope.empConfig.list.itemperPage;
          $scope.empConfig.list.itemTotalCount = data.meta.count;
          $scope.empConfig.list.paginationCount = $window.Math.ceil($scope.empConfig.list.itemTotalCount / $scope.empConfig.list.itemperPage);
          $scope.empConfig.list.currentPage = 1;
          $scope.empConfig.list.pagination = $scope.buildPagination($scope.empConfig.list.paginationCount);
        });
      };
      $scope.empSortMe = function (fieldName, thisClass) {
        jQuery('.sortable i').addClass('fa-sort');
        jQuery('.sortable i').removeClass('fa-sort-desc');
        jQuery('.sortable i').removeClass('fa-sort-up');
        $scope.empsortme = true;
        $scope.empsortField = fieldName;
        if ($scope.empsortType == 'asc') {
          $scope.empsortType = 'desc';
          jQuery('.' + thisClass + ' i').removeClass('fa-sort');
          jQuery('.' + thisClass + ' i').removeClass('fa-sort-up');
          jQuery('.' + thisClass + ' i').addClass('fa-sort-desc');
        } else if ($scope.empsortType == 'desc') {
          $scope.empsortType = 'asc';
          jQuery('.' + thisClass + ' i').removeClass('fa-sort');
          jQuery('.' + thisClass + ' i').removeClass('fa-sort-desc');
          jQuery('.' + thisClass + ' i').addClass('fa-sort-up');
        }
        $scope.empUpdateTableData();
      };
      Services.employeeService.get({ 'filter': 'id=\'' + $scope.employee_id + '\'' }, function (resp) {
        $scope.employeeStateDetail = resp.record[0];
        $scope.employeecode = $scope.employeeStateDetail.access_code;
        $scope.empUpdateTableData();
      });
      $scope.updateTableData();
    }
  }
]).controller('MapBoxEmployeeCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  '$sce',
  function ($scope, Services, $modalInstance, $sce) {
    var itemDetail = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.mapurl = itemDetail.url;
    $scope.title = itemDetail.address1;
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
]).controller('viewEmployeeCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    $scope.employee = '';
    $scope.employee_id = '';
    $scope.emp_code = Services.getModelTempVar();
    Services.employeeService.get({
      'filter': 'access_code =\'' + $scope.emp_code + '\' and agency_id = ' + Services.getAgencyID(),
      'limit': 1
    }, function (response) {
      $scope.employee = response.record[0];
      if ($scope.employee.certificates) {
        $scope.employee.certificates = angular.fromJson($scope.employee.certificates);
      }
      $scope.employee_id = $scope.employee.id;
    });
    $scope.ok = function () {
      if ($scope.employee_id) {
        $modalInstance.close($scope.employee_id);
      }
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('UPDdeleteCtrl', [
  '$scope',
  'Services',
  function ($scope, Services) {
    $scope.deleteOK = function () {
      $scope.modalLoading = true;
      var tempModelval = Services.getModelTempVar();
      Services.setModelTempVar('');
      data = JSON.stringify(tempModelval.fileToDel);
      $scope.$close('cancel');
      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: Services.baseurl + '/rest' + tempModelval.initialLoadPath + '?app_name=' + Services.appName + '&method=DELETE&force=true',
        data: data,
        cache: false,
        async: false,
        processData: false,
        success: function (response) {
          $('.uploadAnchor_' + anchorkey).removeAttr('disabled');
          $scope.$broadcast('reload-listing', { reloadpath: $scope.initialLoadPath });
        },
        error: function (response) {
          //alertErr(response);
          $scope.$close('cancel');
          $scope.$broadcast('reload-listing');
        }
      });
    };
    $scope.deleteCANCEL = function () {
      $scope.modalLoading = false;
      $scope.$close('cancel');
    };
  }
]);