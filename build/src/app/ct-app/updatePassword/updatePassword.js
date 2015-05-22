angular.module('ctApp.updatePassword', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.updatePassword', {
      url: '/updatePassword',
      views: {
        'appNested': {
          controller: 'UpdatePasswordCtrl',
          templateUrl: 'ct-app/updatePassword/updatePassword.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Schedule',
        access: access.updatePassword
      }
    });
  }
]).controller('UpdatePasswordCtrl', [
  '$scope',
  'Services',
  '$state',
  '$timeout',
  '$localStorage',
  function ($scope, Services, $state, $timeout, $localStorage) {
    $scope.changePassword = function () {
      var re;
      var empLoginError = 0;
      var errorMsg = '';
      if (angular.isUndefined($scope.password1) || $scope.password1 === '') {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Password field is required!';
        jQuery('.empLogin .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      re = /[0-9]/;
      if (!re.test($scope.password1)) {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Your password must contain 8 characters, one upper case and one number.  Please try again.';
        jQuery('.empLogin .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      re = /[A-Z]/;
      if (!re.test($scope.password1)) {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Your password must contain 8 characters, one upper case and one number.  Please try again.';
        jQuery('.empLogin .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if ($scope.password1 && $scope.password1.length < 8) {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Your password must contain 8 characters, one upper case and one number.  Please try again.';
        jQuery('.empLogin .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if (angular.isUndefined($scope.password2) || $scope.password2 === '') {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Confirm Password field is required!';
        jQuery('.empLogin .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if ($scope.password1 && $scope.password2 && $scope.password1 != $scope.password2) {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Password does not match!';
        jQuery('.empLogin .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      $scope.userDBField = {};
      $scope.userDBField.user_password = $scope.password2;
      var userId = $localStorage.user_info.user_id;
      Services.signinService.update({ id: userId }, $scope.userDBField, function (data) {
        $scope.logger = {};
        $scope.logger.userid = $localStorage.user_info.user_id;
        $scope.logger.user_detail = JSON.stringify({
          'username': $localStorage.user_info.username,
          'firstname': $localStorage.user_info.first_name,
          'lastname': $localStorage.user_info.last_name
        });
        $scope.logger.action = 'Update Password';
        $scope.logger.agency_id = Services.getAgencyID();
        $scope.logger.action_id = data.id;
        $scope.logger.action_table = 'signin';
        $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        Services.userLog.save({}, $scope.logger, function (data) {
        });
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'success';
        $scope.ErrorMsg = 'Your Password Updated Successfully !!!';
        $timeout(function () {
          $scope.showerrorMsg = false;
          $state.go('ctApp.mainDashboard');
        }, 4000);
      });
    };
  }
]);