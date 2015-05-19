angular.module('access.employeeLogin', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('access.employeeLogin', {
      url: '/employeeLogin/:empId/:username',
      views: {
        'accessNested': {
          controller: 'EmployeeLoginCtrl',
          templateUrl: 'access/employeeLogin/employeeLogin.tpl.html'
        }
      },
      data: {
        pageTitle: 'Employees Login',
        access: access.public
      }
    });
  }
]).controller('EmployeeLoginCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  'Services',
  '$state',
  '$timeout',
  '$stateParams',
  function ($scope, $rootScope, $http, Services, $state, $timeout, $stateParams) {
    $scope.updateuser = false;
    $scope.agencyName = $rootScope.dfAgencyNameVariable;
    $scope.$on('AgencyNameVariable', function () {
      $scope.agencyName = $rootScope.dfAgencyNameVariable;
    });
    $timeout(function () {
      // console.log($stateParams);
      if (!angular.isUndefined($stateParams.username) && $stateParams.username) {
        // $scope.username = $stateParams.username;
        $scope.username = $stateParams.empId;
        $scope.updateuser = true;
      } else {
        Services.employeeService.get({
          fields: 'username,access_code,is_supervisor,email,agency_id',
          filter: 'id=\'' + $stateParams.empId + '\''
        }, function (data) {
          $scope.employeeName = data.record[0].username;
          $scope.employeeCode = data.record[0].access_code;
          $scope.employeeLevel = data.record[0].is_supervisor;
          $scope.username = $scope.employeeName;
          $scope.email = data.record[0].email;
          $scope.agency_id = data.record[0].agency_id;
        });
      }
    }, 2000);
    $scope.empDBField = {};
    $scope.employeeLogin = function () {
      var empLoginError = 0;
      var errorMsg = '';
      var re;
      if (angular.isUndefined($scope.username) || $scope.username === '') {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Username is required!';
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if (angular.isUndefined($scope.password1) || $scope.password1 === '') {
        empLoginError++;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'danger';
        $scope.ErrorMsg = 'Password field is required!';
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
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
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
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
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
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
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
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
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
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
        jQuery('.signup .ng-invalid').addClass('ng-dirty');
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if ($scope.updateuser) {
        Services.signinService.get({ filter: 'user_email =\'' + $stateParams.empId + '\' and user_type=\'1\'' }, function (data) {
          if (data.record.length === 0) {
            Services.agencyDetail.get({ filter: 'contact_email =\'' + $stateParams.empId + '\'' }, function (data) {
              if (data.record.length > 0) {
                $scope.signinDBField = {};
                $scope.signinDBField.user_name = $stateParams.username;
                $scope.signinDBField.user_email = $stateParams.empId;
                $scope.signinDBField.created_on = moment.utc();
                $scope.signinDBField.user_type = 1;
                $scope.signinDBField.status = 1;
                $scope.signinDBField.agency_id = data.record[0].id;
                $scope.signinDBField.user_password = $scope.password2;
                Services.signinService.save($scope.signinDBField, function (signindata) {
                  $scope.showerrorMsg = true;
                  $scope.ErrorClass = 'success';
                  $scope.ErrorMsg = 'You have Set Password Successfully, redirecting to login page...';
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('access.signin', { msg: 'Admin created' });
                  }, 4000);
                });
              } else {
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'danger';
                $scope.ErrorMsg = 'Invalid User';
                $timeout(function () {
                  $scope.showerrorMsg = false;
                  $state.go('access.signin', { msg: 'Invalid User' });
                }, 4000);
              }
            });
          } else {
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'User already exist, redirecting to login page...';
            $timeout(function () {
              $scope.showerrorMsg = false;
              $state.go('access.signin', { msg: 'Invalid User' });
            }, 4000);
          }
        });
      } else {
        $scope.empDBField.agency_id = $scope.agency_id;
        $scope.empDBField.user_type = $scope.employeeLevel;
        $scope.empDBField.user_name = $scope.username;
        $scope.empDBField.user_password = $scope.password2;
        $scope.empDBField.status = 1;
        $scope.empDBField.employee_id = $stateParams.empId;
        $scope.empDBField.employee_code = $scope.employeeCode;
        $scope.empDBField.user_email = $scope.email;
        $scope.empDBField.created_on = moment().utc();
        Services.signinService.get({ filter: 'user_name=\'' + $scope.username + '\'' }, function (data) {
          if (data.record.length >= 1) {
            $scope.showerrorMsg = true;
            //console.log('exists');
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'User already exist, redirecting to login page...';
            $timeout(function () {
              $scope.showerrorMsg = false;
              $state.go('access.signin', { msg: 'emp exist' });
            }, 3000);
            return false;
          } else {
            $scope.showerrorMsg = false;
            Services.signinService.save($scope.empDBField, function (data) {
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'success';
              $scope.ErrorMsg = 'You have Set Password Successfully, redirecting to login page...';
              $timeout(function () {
                $scope.showerrorMsg = false;
                $state.go('access.signin', { msg: 'emp created' });
              }, 4000);
            });
          }
        });
      }
    };
  }
]);