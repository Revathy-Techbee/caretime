angular.module('ctApp.observations', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.observations', {
      url: '/observations',
      views: {
        'appNested': {
          controller: 'ObservationsCtrl',
          templateUrl: 'ct-app/manageLists/observations/observations.tpl.html'
        }
      },
      data: {
        pageTitle: 'Observations',
        access: access.observations
      }
    }).state('ctApp.addUpdateObservation', {
      url: '/observation/:observationId',
      views: {
        'appNested': {
          controller: 'AddUpdateObservationCtrl',
          templateUrl: 'ct-app/manageLists/observations/add-update-observation.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Observation',
        access: access.observations
      }
    });
  }
]).controller('ObservationsCtrl', [
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
      show_observations_loader: true
    };
    $scope.disable_infinite_scroll = false;
    $scope.sortField = 'obv_name';
    $scope.sortType = 'asc';
    $scope.observationDetailList = [];
    $scope.getNextData = function (offset) {
      // on pagination
      if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
        return;
      }
      $scope.disable_infinite_scroll = true;
      $scope.config.show_observations_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        offset: $scope.observationDetailList.length,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and obv_name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.observationsName.get($scope.filterObj, function (data) {
        for (var i = 0; i < data.record.length; i++) {
          $scope.observationDetailList.push(data.record[i]);
        }
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        }
        $scope.disable_infinite_scroll = false;
        $scope.config.show_observations_loader = false;
      });
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      $scope.observationDetailList = [];
      $scope.config.show_observations_loader = true;
      $scope.filterObj = {
        limit: $scope.config.page_size,
        include_count: true,
        order: $scope.sortField + ' ' + $scope.sortType,
        filter: 'agency_id=' + Services.getAgencyID()
      };
      if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
        $scope.filterObj.filter = $scope.filterObj.filter + ' and obv_name like "%' + $scope.config.general.searchtxt + '%"';
      }
      Services.observationsName.get($scope.filterObj, function (data) {
        $scope.observationDetailList = data.record;
        if (data.record.length < $scope.config.page_size) {
          $scope.config.loaded_all_records = true;
        } else {
          $scope.config.loaded_all_records = false;
        }
        $scope.config.show_observations_loader = false;
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
      $state.go('ctApp.addUpdateObservation', { observationId: id });
    };
    $scope.enableDelete = function (id) {
      Services.setModelTempVar(id);
      $scope.modalInstance = $modal.open({
        template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Observation permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
        controller: 'DeleteObservationCtrl'
      });
      $scope.modalInstance.result.then(function (id) {
        Services.observationsName.delete({ filter: 'id=\'' + id + '\'' }, function (data) {
          $scope.updateTableData();
        });
      }, function () {
      });
    };
  }
]).controller('AddUpdateObservationCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {
    $scope.observation_id = $stateParams.observationId;
    $scope.observation = {};
    $scope.pageTitle = 'Add New';
    $scope.observationDBField = null;
    $scope.show_observation_form_loader = false;
    $scope.observation.status = 1;
    $scope.savedisable = 0;
    $scope.getObservationDetail = function () {
      if ($scope.observation_id) {
        $scope.pageTitle = 'Update';
        Services.observationsName.get({ 'filter': 'id=\'' + $scope.observation_id + '\'' }, function (resp) {
          $scope.observationDBField = resp.record[0];
          angular.extend($scope.observation, {
            name: $scope.observationDBField.obv_name,
            category: $scope.observationDBField.category,
            status: $scope.observationDBField.status,
            created_on: HelperService.converttimeZone($scope.observationDBField.created_date),
            editedOn: HelperService.converttimeZone($scope.observationDBField.modified_date)
          });
        });
      }
    };
    $scope.getObservationDetail();
    $scope.observationManage = function () {
      $scope.showerrorMsg = false;
      if ($scope.addUpdateObservationForm.$valid) {
        $scope.show_observation_form_loader = true;
        $scope.savedisable = 1;
        $scope.filterObj = {
          field: 'id',
          filter: 'obv_name="' + $scope.observation.name + '" and agency_id = ' + Services.getAgencyID()
        };
        if (!angular.isUndefined($scope.observation_id) && $scope.observation_id) {
          $scope.filterObj.filter += ' and id <>' + $scope.observation_id;
        }
        Services.observationsName.get($scope.filterObj, function (data) {
          if (data.record.length > 0) {
            $scope.show_observation_form_loader = false;
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Observation Alread Exist!!!';
            jQuery('.basic .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          } else {
            $scope.observationDBField = {
              obv_name: $scope.observation.name,
              status: $scope.observation.status,
              category: $scope.observation.category
            };
            if ($scope.observation_id) {
              // means it is in edit state
              $scope.observationDBField.modified_date = moment().utc();  /* $scope.observationDBField.edited_by = JSON.stringify({
                                    name: $localStorage.user_info.username,
                                    id: $localStorage.user_info.user_id
                                });
                            */
            } else {
              $scope.observationDBField.agency_id = Services.getAgencyID();
              $scope.observationDBField.created_date = moment().utc();
              $scope.observationDBField.modified_date = moment().utc();  /* $scope.observationDBField.created_by = JSON.stringify({
                                 name: $localStorage.user_info.username,
                                 id: $localStorage.user_info.user_id
                             });*/
            }
            if ($scope.observation_id) {
              Services.observationsName.update({ id: $stateParams.observationId }, $scope.observationDBField, function (data) {
                $scope.show_observation_form_loader = false;
                $scope.showMessageFunc('Observation detail edited sucessfully.', 'success', function () {
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.observations');
                  }, 3000);
                });
              });
            } else {
              Services.observationsName.save($scope.observationDBField, function (data) {
                $scope.showMessageFunc('New Observation added sucessfully.', 'success', function () {
                  $scope.show_observation_form_loader = false;
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.observations');
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
    $scope.cancelObservation = function () {
      $state.go('ctApp.observations');
    };
  }
]).controller('DeleteObservationCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var ObservationID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function () {
      $modalInstance.close(ObservationID);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);