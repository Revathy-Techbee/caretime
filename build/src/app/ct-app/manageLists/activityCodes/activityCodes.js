angular.module('ctApp.activityCodes', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.activityCodes', {
      url: '/activityCodes',
      views: {
        'appNested': {
          controller: 'ActivityCodesCtrl',
          templateUrl: 'ct-app/manageLists/activityCodes/activityCodes.tpl.html'
        }
      },
      data: {
        pageTitle: 'ActivityCodes',
        access: access.activityCodes
      }
    }).state('ctApp.addUpdateActivityCode', {
      url: '/activityCode/:activityCodeId',
      views: {
        'appNested': {
          controller: 'AddUpdateActivityCodeCtrl',
          templateUrl: 'ct-app/manageLists/activityCodes/add-update-activityCode.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit ActivityCode',
        access: access.activityCodes
      }
    });
  }
]).controller('ActivityCodesCtrl', [
  '$scope',
  'Services',
  '$state',
  '$modal',
  '$localStorage',
  function ($scope, Services, $state, $modal, $localStorage) {
    $scope.config = {
      general: { searchtxt: '' },
      page_size: 15,
      loaded_all_records: false,
      show_activityCodes_loader: true
    };
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'name';
    $scope.sortType = 'asc';
    $scope.activityCodeDetailList = [];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_activityCodes_loader = true;
      var filterObj = {
          limit: $scope.config.page_size,
          include_count: true,
          offset: $scope.activityCodeDetailList.length,
          order: $scope.sortField + ' ' + $scope.sortType,
          filter: 'agency_id=' + Services.getAgencyID()
        };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        filterObj.filter = filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.activity_code.get(filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.activityCodeDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_activityCodes_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.activityCodeDetailList = [];
      $scope.config.show_activityCodes_loader = true;
      var filterObj = {
          limit: $scope.config.page_size,
          include_count: true,
          order: $scope.sortField + ' ' + $scope.sortType,
          filter: 'agency_id=' + Services.getAgencyID()
        };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        filterObj.filter = filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.activity_code.get(filterObj, function (data) {
        $scope.activityCodeDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_activityCodes_loader = false;
      });
    };
    $scope.applyProgramSort = function () {
      $scope.updateTableData();
    };
    $scope.clearSearch = function () {
      $scope.config.general.searchtxt = '';
      $scope.updateTableData();
    };
    $scope.enableEditView = function (id) {
      $state.go('ctApp.addUpdateActivityCode', { activityCodeId: id });
    };
    $scope.enableDelete = function (id) {
      Services.setModelTempVar(id);
      var modalInstance = $modal.open({
          template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Activity Code permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
          controller: 'DeleteActivityCodeCtrl'
        });
      modalInstance.result.then(function (id) {
        Services.activity_code.delete({ filter: 'id=\'' + id + '\'' }, function (data) {
          $scope.logger = {};
          $scope.logger.userid = $localStorage.user_info.user_id;
          $scope.logger.user_detail = JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name
          });
          $scope.logger.action = 'Delete';
          $scope.logger.agency_id = Services.getAgencyID();
          $scope.logger.action_id = id;
          $scope.logger.action_table = 'activity_code';
          $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
          Services.userLog.save({}, $scope.logger, function (data) {
          });
          $scope.updateTableData();
        });
      }, function () {
      });
    };
  }
]).controller('AddUpdateActivityCodeCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {
    $scope.activityCode_id = $stateParams.activityCodeId;
    $scope.activityCode = {};
    $scope.pageTitle = 'Add New';
    $scope.activityCodeDBField = null;
    $scope.show_activityCode_form_loader = false;
    $scope.activityCode.status = 1;
    $scope.activityCode.billed = 1;
    $scope.savedisable = 0;
    $scope.getActivityCodeDetail = function () {
      if ($scope.activityCode_id) {
        $scope.pageTitle = 'Update';
        Services.activity_code.get({ 'filter': 'id=\'' + $scope.activityCode_id + '\'' }, function (resp) {
          $scope.activityCodeDBField = resp.record[0];
          angular.extend($scope.activityCode, {
            code: $scope.activityCodeDBField.code,
            name: $scope.activityCodeDBField.name,
            description: $scope.activityCodeDBField.description,
            status: $scope.activityCodeDBField.status,
            billed: $scope.activityCodeDBField.billed,
            created_on: HelperService.convertUTCtoMytimeZone($scope.activityCodeDBField.created_on),
            created_by: $scope.activityCodeDBField.created_by,
            editedOn: HelperService.convertUTCtoMytimeZone($scope.activityCodeDBField.edited_on),
            edited_by: $scope.activityCodeDBField.edited_by
          });
        });
      }
    };
    $scope.getActivityCodeDetail();
    $scope.activityCodeManage = function () {
      $scope.showerrorMsg = false;
      if ($scope.activityCode.code > 0) {
        if ($scope.addUpdateActivityCodeForm.$valid) {
          $scope.show_activityCode_form_loader = true;
          $scope.savedisable = 1;
          $scope.filterObj = {
            field: 'id',
            filter: '(name="' + $scope.activityCode.name + '"  or code ="' + $scope.activityCode.code + '") and  agency_id = ' + Services.getAgencyID()
          };
          if (!angular.isUndefined($scope.activityCode_id) && $scope.activityCode_id) {
            $scope.filterObj.filter += ' and id <>' + $scope.activityCode_id;
          }
          Services.activity_code.get($scope.filterObj, function (data) {
            if (data.record.length > 0) {
              if (data.record[0].code == $scope.activityCode.code) {
                $scope.show_activityCode_form_loader = false;
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'danger';
                $scope.ErrorMsg = 'Activity Code Alread Exist!!!';
                jQuery('.basic .ng-invalid').addClass('ng-dirty');
                $timeout(function () {
                  $scope.showerrorMsg = false;
                }, 3000);
                return false;
              } else {
                $scope.show_activityCode_form_loader = false;
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'danger';
                $scope.ErrorMsg = 'Activity Name Alread Exist!!!';
                jQuery('.basic .ng-invalid').addClass('ng-dirty');
                $timeout(function () {
                  $scope.showerrorMsg = false;
                }, 3000);
              }
              return false;
            } else {
              $scope.activityCodeDBField = {
                code: $scope.activityCode.code,
                name: $scope.activityCode.name,
                description: $scope.activityCode.description,
                billed: $scope.activityCode.billed,
                status: $scope.activityCode.status,
                agency_id: Services.getAgencyID()
              };
              if ($scope.activityCode_id) {
                // means it is in edit state
                $scope.activityCodeDBField.edited_on = moment().utc();
                $scope.activityCodeDBField.edited_by = JSON.stringify({
                  'username': $localStorage.user_info.username,
                  'firstname': $localStorage.user_info.first_name,
                  'lastname': $localStorage.user_info.last_name,
                  'user_id': $localStorage.user_info.user_id
                });
              } else {
                $scope.activityCodeDBField.agency_id = Services.getAgencyID();
                $scope.activityCodeDBField.created_on = moment().utc();
                $scope.activityCodeDBField.created_by = JSON.stringify({
                  'username': $localStorage.user_info.username,
                  'firstname': $localStorage.user_info.first_name,
                  'lastname': $localStorage.user_info.last_name,
                  'user_id': $localStorage.user_info.user_id
                });
              }
              if ($scope.activityCode_id) {
                Services.activity_code.update({ id: $stateParams.activityCodeId }, $scope.activityCodeDBField, function (data) {
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
                  $scope.logger.action_table = 'activity_code';
                  $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                  Services.userLog.save({}, $scope.logger, function (data) {
                  });
                  $scope.show_activityCode_form_loader = false;
                  showMessageFunc('ActivityCode detail edited successfully.', 'success', function () {
                    $timeout(function () {
                      $scope.showerrorMsg = false;
                      $state.go('ctApp.activityCodes');
                    }, 3000);
                  });
                });
              } else {
                Services.activity_code.save($scope.activityCodeDBField, function (data) {
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
                  $scope.logger.action_table = 'activity_code';
                  $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                  Services.userLog.save({}, $scope.logger, function (data) {
                  });
                  showMessageFunc('New ActivityCode added successfully.', 'success', function () {
                    $scope.show_activityCode_form_loader = false;
                    $timeout(function () {
                      $scope.showerrorMsg = false;
                      $state.go('ctApp.activityCodes');
                    }, 3000);
                  });
                });
              }
            }
          });
        }
      } else {
        $scope.show_activityCode_form_loader = false;
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Activity code must be greater then 0 !!!';
        jQuery('.basic .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
    };
    var showMessageFunc = function (error_msg, error_class, callback) {
      $scope.ErrorMsg = error_msg || 'Operation was successfull.';
      $scope.ErrorClass = error_class || 'success';
      if (callback) {
        callback();
      } else {
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
      }
      $scope.showerrorMsg = true;
    };
    $scope.cancelActivityCode = function () {
      $state.go('ctApp.activityCodes');
    };
  }
]).controller('DeleteActivityCodeCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var ActivityCodeID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function () {
      $modalInstance.close(ActivityCodeID);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);