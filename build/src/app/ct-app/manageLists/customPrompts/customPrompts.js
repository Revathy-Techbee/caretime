angular.module('ctApp.customPrompts', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.customPrompts', {
      url: '/customPrompts',
      views: {
        'appNested': {
          controller: 'CustomPromptsCtrl',
          templateUrl: 'ct-app/manageLists/customPrompts/customPrompts.tpl.html'
        }
      },
      data: {
        pageTitle: 'CustomPrompts',
        access: access.customPrompts
      }
    }).state('ctApp.addUpdateCustomPrompt', {
      url: '/customPrompt/:customPromptId',
      views: {
        'appNested': {
          controller: 'AddUpdateCustomPromptCtrl',
          templateUrl: 'ct-app/manageLists/customPrompts/add-update-customPrompt.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit CustomPrompt',
        access: access.customPrompts
      }
    });
  }
]).controller('CustomPromptsCtrl', [
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
      show_customPrompts_loader: true
    };
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'prompt_name';
    $scope.sortType = 'asc';
    $scope.customPromptDetailList = [];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_customPrompts_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        offset: $scope.customPromptDetailList.length,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and prompt_name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.customPromptService.get($scope.filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.customPromptDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_customPrompts_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.customPromptDetailList = [];
      $scope.config.show_customPrompts_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and prompt_name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.customPromptService.get($scope.filterObj, function (data) {
        $scope.customPromptDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_customPrompts_loader = false;
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
      $state.go('ctApp.addUpdateCustomPrompt', { customPromptId: id });
    };
    $scope.enableDelete = function (id) {
      Services.setModelTempVar(id);
      $scope.modalInstance = $modal.open({
        template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Custom Prompt permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
        controller: 'DeleteCustomPromptCtrl'
      });
      $scope.modalInstance.result.then(function (id) {
        Services.customPromptService.delete({ filter: 'id=\'' + id + '\'' }, function (data) {
          $scope.updateTableData();
        });
      }, function () {
      });
    };
  }
]).controller('AddUpdateCustomPromptCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {
    $scope.customPrompt_id = $stateParams.customPromptId;
    $scope.customPrompt = {};
    $scope.pageTitle = 'Add New';
    $scope.customPromptDBField = null;
    $scope.show_customPrompt_form_loader = false;
    $scope.customPrompt.status = 1;
    $scope.savedisable = 0;
    $scope.getCustomPromptDetail = function () {
      if ($scope.customPrompt_id) {
        $scope.pageTitle = 'Update';
        Services.customPromptService.get({ 'filter': 'id=\'' + $scope.customPrompt_id + '\'' }, function (resp) {
          $scope.customPromptDBField = resp.record[0];
          angular.extend($scope.customPrompt, {
            prompt_name: $scope.customPromptDBField.prompt_name,
            prompt_text: $scope.customPromptDBField.prompt_text,
            prompt_answers: JSON.parse($scope.customPromptDBField.prompt_answers),
            status: $scope.customPromptDBField.status,
            created_on: HelperService.convertUTCtoMytimeZone($scope.customPromptDBField.created_on),
            created_by: $scope.customPromptDBField.created_by,
            updated_on: HelperService.convertUTCtoMytimeZone($scope.customPromptDBField.updated_on),
            edited_by: $scope.customPromptDBField.edited_by
          });
        });
      }
    };
    $scope.getCustomPromptDetail();
    $scope.customPromptManage = function () {
      $scope.showerrorMsg = false;
      if ($scope.addUpdateCustomPromptForm.$valid) {
        $scope.show_customPrompt_form_loader = true;
        $scope.savedisable = 1;
        $scope.filterObj = {
          field: 'id',
          filter: 'prompt_name="' + $scope.customPrompt.prompt_name + '" and agency_id = ' + Services.getAgencyID()
        };
        if (!angular.isUndefined($scope.customPrompt_id) && $scope.customPrompt_id) {
          $scope.filterObj.filter += ' and id <>' + $scope.customPrompt_id;
        }
        Services.customPromptService.get($scope.filterObj, function (data) {
          if (data.record.length > 0) {
            $scope.show_customPrompt_form_loader = false;
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Custom Prompt Alread Exist!!!';
            jQuery('.basic .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else {
            $scope.customPromptDBField = {
              prompt_name: $scope.customPrompt.prompt_name,
              prompt_text: $scope.customPrompt.prompt_text,
              prompt_answers: JSON.stringify($scope.customPrompt.prompt_answers),
              status: $scope.customPrompt.status
            };
            if ($scope.customPrompt_id) {
              // means it is in edit state
              $scope.customPromptDBField.updated_on = moment().utc();
              $scope.customPromptDBField.edited_by = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              });
            } else {
              $scope.customPromptDBField.agency_id = Services.getAgencyID();
              $scope.customPromptDBField.created_on = moment().utc();
              $scope.customPromptDBField.created_by = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              });
            }
            if ($scope.customPrompt_id) {
              Services.customPromptService.update({ id: $stateParams.customPromptId }, $scope.customPromptDBField, function (data) {
                $scope.show_customPrompt_form_loader = false;
                $scope.showMessageFunc('Custom Prompt detail edited sucessfully.', 'success', function () {
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.customPrompts');
                  }, 3000);
                });
              });
            } else {
              Services.customPromptService.save($scope.customPromptDBField, function (data) {
                $scope.showMessageFunc('New Custom Prompt added sucessfully.', 'success', function () {
                  $scope.show_customPrompt_form_loader = false;
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.customPrompts');
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
    $scope.cancelCustomPrompt = function () {
      $state.go('ctApp.customPrompts');
    };
  }
]).controller('DeleteCustomPromptCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var CustomPromptID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function () {
      $modalInstance.close(CustomPromptID);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);