angular.module('ctApp.skills', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.skills', {
      url: '/skills',
      views: {
        'appNested': {
          controller: 'SkillsCtrl',
          templateUrl: 'ct-app/manageLists/skills/skills.tpl.html'
        }
      },
      data: {
        pageTitle: 'Skills',
        access: access.skills
      }
    }).state('ctApp.addUpdateSkill', {
      url: '/skill/:skillId',
      views: {
        'appNested': {
          controller: 'AddUpdateSkillCtrl',
          templateUrl: 'ct-app/manageLists/skills/add-update-skill.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Skill',
        access: access.skills
      }
    });
  }
]).controller('SkillsCtrl', [
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
      show_skills_loader: true
    };
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'name';
    $scope.sortType = 'asc';
    $scope.skillDetailList = [];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_skills_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        offset: $scope.skillDetailList.length,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.auth_skillsService.get($scope.filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.skillDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_skills_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.skillDetailList = [];
      $scope.config.show_skills_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.auth_skillsService.get($scope.filterObj, function (data) {
        $scope.skillDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_skills_loader = false;
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
      $state.go('ctApp.addUpdateSkill', { skillId: id });
    };
    $scope.enableDelete = function (id) {
      Services.setModelTempVar(id);
      $scope.modalInstance = $modal.open({
        template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Skill permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
        controller: 'DeleteSkillCtrl'
      });
      $scope.modalInstance.result.then(function (id) {
        Services.auth_skillsService.delete({ filter: 'id=\'' + id + '\'' }, function (data) {
          $scope.updateTableData();
        });
      }, function () {
      });
    };
  }
]).controller('AddUpdateSkillCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {
    $scope.skill_id = $stateParams.skillId;
    $scope.skill = {};
    $scope.pageTitle = 'Add New';
    $scope.skillDBField = null;
    $scope.show_skill_form_loader = false;
    $scope.skill.status = 1;
    $scope.savedisable = 0;
    $scope.getSkillDetail = function () {
      if ($scope.skill_id) {
        $scope.pageTitle = 'Update';
        Services.auth_skillsService.get({ 'filter': 'id=\'' + $scope.skill_id + '\'' }, function (resp) {
          $scope.skillDBField = resp.record[0];
          angular.extend($scope.skill, {
            name: $scope.skillDBField.name,
            status: $scope.skillDBField.status,
            created_on: HelperService.convertUTCtoMytimeZone($scope.skillDBField.created_on),
            created_by: $scope.skillDBField.created_by,
            editedOn: HelperService.convertUTCtoMytimeZone($scope.skillDBField.edited_on),
            edited_by: $scope.skillDBField.edited_by
          });
        });
      }
    };
    $scope.getSkillDetail();
    $scope.skillManage = function () {
      $scope.showerrorMsg = false;
      if ($scope.addUpdateSkillForm.$valid) {
        $scope.show_skill_form_loader = true;
        $scope.savedisable = 1;
        $scope.filterObj = {
          field: 'id',
          filter: 'name="' + $scope.skill.name + '" and agency_id = ' + Services.getAgencyID()
        };
        if (!angular.isUndefined($scope.skill_id) && $scope.skill_id) {
          $scope.filterObj.filter += ' and id <>' + $scope.skill_id;
        }
        Services.auth_skillsService.get($scope.filterObj, function (data) {
          if (data.record.length > 0) {
            $scope.show_skill_form_loader = false;
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Skill  Alread Exist!!!';
            jQuery('.basic .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else {
            $scope.skillDBField = {
              name: $scope.skill.name,
              status: $scope.skill.status
            };
            if ($scope.skill_id) {
              // means it is in edit state
              $scope.skillDBField.edited_on = moment().utc();
              $scope.skillDBField.edited_by = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              });
            } else {
              $scope.skillDBField.agency_id = Services.getAgencyID();
              $scope.skillDBField.created_on = moment().utc();
              $scope.skillDBField.created_by = JSON.stringify({
                'username': $localStorage.user_info.username,
                'firstname': $localStorage.user_info.first_name,
                'lastname': $localStorage.user_info.last_name,
                'user_id': $localStorage.user_info.user_id
              });
            }
            if ($scope.skill_id) {
              Services.auth_skillsService.update({ id: $stateParams.skillId }, $scope.skillDBField, function (data) {
                $scope.show_skill_form_loader = false;
                $scope.showMessageFunc('Skill detail edited sucessfully.', 'success', function () {
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.skills');
                  }, 3000);
                });
              });
            } else {
              Services.auth_skillsService.save($scope.skillDBField, function (data) {
                $scope.showMessageFunc('New Skill added sucessfully.', 'success', function () {
                  $scope.show_skill_form_loader = false;
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.skills');
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
    $scope.cancelSkill = function () {
      $state.go('ctApp.skills');
    };
  }
]).controller('DeleteSkillCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var SkillID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function () {
      $modalInstance.close(SkillID);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);