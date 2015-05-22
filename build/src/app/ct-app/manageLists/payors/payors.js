angular.module('ctApp.payors', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.payors', {
      url: '/payors',
      views: {
        'appNested': {
          controller: 'PayorsCtrl',
          templateUrl: 'ct-app/manageLists/payors/payors.tpl.html'
        }
      },
      data: {
        pageTitle: 'Payors',
        access: access.payors
      }
    }).state('ctApp.addUpdatePayor', {
      url: '/payor/:payorId',
      views: {
        'appNested': {
          controller: 'AddUpdatePayorCtrl',
          templateUrl: 'ct-app/manageLists/payors/add-update-payor.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Payor',
        access: access.payors
      }
    });
  }
]).controller('PayorsCtrl', [
  '$scope',
  'Services',
  '$state',
  '$modal',
  '$localStorage',
  function ($scope, Services, $state, $modal, $localStorage) {
    $scope.empCountry = $localStorage.user_info.country;
    $scope.config = {
      general: { searchtxt: '' },
      page_size: 15,
      loaded_all_records: false,
      show_payors_loader: true
    };
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'name';
    $scope.sortType = 'asc';
    $scope.payorDetailList = [];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_payors_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        offset: $scope.payorDetailList.length,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.auth_payorsService.get($scope.filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.payorDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_payors_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.payorDetailList = [];
      $scope.config.show_payors_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.auth_payorsService.get($scope.filterObj, function (data) {
        $scope.payorDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_payors_loader = false;
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
      $state.go('ctApp.addUpdatePayor', { payorId: id });
    };
    $scope.enableDelete = function (id) {
      Services.setModelTempVar(id);
      $scope.modalInstance = $modal.open({
        template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Payor permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
        controller: 'DeletePayorCtrl'
      });
      $scope.modalInstance.result.then(function (id) {
        Services.auth_payorsService.delete({ filter: 'id=\'' + id + '\'' }, function (data) {
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
          $scope.logger.action_table = 'auth_payors';
          $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
          Services.userLog.save({}, $scope.logger, function (data) {
          });
          $scope.updateTableData();
        });
      }, function () {
      });
    };
  }
]).controller('AddUpdatePayorCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {
    $scope.payor_id = $stateParams.payorId;
    $scope.payor = {};
    $scope.pageTitle = 'Add New';
    $scope.payorDBField = null;
    $scope.show_payor_form_loader = false;
    $scope.payor.status = 1;
    $scope.savedisable = 0;
    $scope.getPayorDetail = function () {
      if ($scope.payor_id) {
        $scope.pageTitle = 'Update';
        Services.auth_payorsService.get({ 'filter': 'id=\'' + $scope.payor_id + '\'' }, function (resp) {
          $scope.payorDBField = resp.record[0];
          angular.extend($scope.payor, {
            name: $scope.payorDBField.name,
            status: $scope.payorDBField.status,
            created_on: HelperService.convertUTCtoMytimeZone($scope.payorDBField.created_on),
            created_by: $scope.payorDBField.created_by,
            editedOn: HelperService.convertUTCtoMytimeZone($scope.payorDBField.edited_on),
            edited_by: $scope.payorDBField.edited_by
          });
        });
      }
    };
    $scope.getPayorDetail();
    $scope.payorManage = function () {
      $scope.showerrorMsg = false;
      if ($scope.addUpdatePayorForm.$valid) {
        $scope.show_payor_form_loader = true;
        $scope.savedisable = 1;
        $scope.filterObj = {
          field: 'id',
          filter: 'name="' + $scope.payor.name + '" and agency_id = ' + Services.getAgencyID()
        };
        if (!angular.isUndefined($scope.payor_id) && $scope.payor_id) {
          $scope.filterObj.filter += ' and id <>' + $scope.payor_id;
        }
        Services.auth_payorsService.get($scope.filterObj, function (data) {
          if (data.record.length > 0) {
            $scope.show_payor_form_loader = false;
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Payor Alread Exist!!!';
            jQuery('.basic .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else {
            $scope.payorDBField = {
              name: $scope.payor.name,
              status: $scope.payor.status
            };
            if ($scope.payor_id) {
              // means it is in edit state
              $scope.payorDBField.edited_on = moment().utc();
              $scope.payorDBField.edited_by = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              });
            } else {
              $scope.payorDBField.agency_id = Services.getAgencyID();
              $scope.payorDBField.created_on = moment().utc();
              $scope.payorDBField.created_by = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              });
            }
            if ($scope.payor_id) {
              Services.auth_payorsService.update({ id: $stateParams.payorId }, $scope.payorDBField, function (data) {
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
                $scope.logger.action_table = 'auth_payors';
                $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                Services.userLog.save({}, $scope.logger, function (data) {
                });
                $scope.show_payor_form_loader = false;
                $scope.showMessageFunc('Payor detail edited successfully.', 'success', function () {
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.payors');
                  }, 3000);
                });
              });
            } else {
              Services.auth_payorsService.save($scope.payorDBField, function (data) {
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
                $scope.logger.action_table = 'auth_payors';
                $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
                Services.userLog.save({}, $scope.logger, function (data) {
                });
                $scope.showMessageFunc('New Payor added successfully.', 'success', function () {
                  $scope.show_payor_form_loader = false;
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.payors');
                  }, 3000);
                });
              });
            }
          }
        });
      }
    };
    $scope.showMessageFunc = function (error_msg, error_class, callback) {
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
    $scope.cancelPayor = function () {
      $state.go('ctApp.payors');
    };
  }
]).controller('DeletePayorCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var PayorID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function () {
      $modalInstance.close(PayorID);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);