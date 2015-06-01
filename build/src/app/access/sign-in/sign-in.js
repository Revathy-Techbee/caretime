angular.module('access.signIn', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('access.signin', {
      url: '/signin',
      views: {
        'accessNested': {
          controller: 'SignInCtrl',
          templateUrl: 'access/sign-in/sign-in.tpl.html'
        }
      },
      data: {
        pageTitle: 'Sign In',
        access: access.public
      }
    });
  }
]).controller('SignInCtrl', [
  '$scope',
  '$rootScope',
  'Services',
  '$state',
  '$timeout',
  'Auth',
  function ($scope, $rootScope, Services, $state, $timeout, Auth) {
    $scope.user = {};
    $scope.agencyName = angular.isString($rootScope.dfAgencyNameVariable) ? $rootScope.dfAgencyNameVariable : '';
    //console.log($rootScope.dfAgencyNameVariable);
    $scope.$on('AgencyNameVariable', function () {
      // console.log($rootScope.dfAgencyNameVariable);
      $scope.agencyName = $rootScope.dfAgencyNameVariable;
    });
    // console.log($rootScope.newCache.get('current_user'));
    $scope.showError = function (msg, error_class) {
      $scope.showerrorMsg = true;
      $scope.ErrorClass = error_class || 'danger';
      $scope.ErrorMsg = msg || 'Please provide valid credentials.';
      //angular.element(".general .ng-invalid").addClass("ng-dirty");
      $timeout(function () {
        $scope.showerrorMsg = false;
      }, 3000);
    };
    $scope.signInUser = function (user) {
      $scope.showerrorMsg = false;
      $scope.show_form_loader = true;
      if ($scope.singInForm.$valid) {
        Services.signinService.get({ filter: '(user_email=\'' + $scope.user.user_email + '\' and user_password = \'' + $scope.user.user_password + '\' and status > 0) or (user_name=\'' + $scope.user.user_email + '\' and user_password = \'' + $scope.user.user_password + '\' and status > 0)' }, function (data) {
          if (data.record.length >= 1) {
            //authenticated user
            var login_agency_id = data.record[0]['agency_id'];
            var user_info = {
                'email': $scope.user.user_email,
                'username': data.record[0]['user_name'],
                'employee_id': data.record[0].employee_id,
                'employee_code': data.record[0].employee_code,
                'user_type': data.record[0].user_type,
                'user_id': data.record[0].id
              };
            if (data.record[0].agency_id) {
              Services.setAgencyID(data.record[0].agency_id);
            }
            var mix_identity = Services.serviceName + '_' + data.record[0].id;
            mixpanel.identify(mix_identity);
            mixpanel.people.set({
              '$email': $scope.user.user_email,
              '$last_login': new Date(),
              'User Type': data.record[0].user_type,
              'User Name': data.record[0]['user_name'],
              'Employee Code': data.record[0].employee_code,
              'Agency': Services.serviceName
            });
            var mix_logged_date = moment().format('MMM DD, YYYY hh:mm A');
            mixpanel.track('signin', {
              'Full Name': data.record[0]['user_name'],
              'logged in': mix_logged_date,
              'Agency': Services.serviceName
            });
            Services.employeeService.get({ filter: 'id=' + user_info.employee_id }, function (data) {
              if (data.record.length >= 1) {
                //authenticated user
                user_info.first_name = data.record[0]['first_name'];
                user_info.last_name = data.record[0]['last_name'];
                user_info.user_type = data.record[0]['is_supervisor'];
                user_info.zone_code = data.record[0]['zone_id'];
                user_info.country = data.record[0]['country'];
                Services.setEmpZoneDetail(data.record[0]['zone_id']);
                user_info.zone_detail = data.record[0]['zone_detail'] ? JSON.parse(data.record[0]['zone_detail']) : '';
                user_info.iszone_code = true;
              } else {
                user_info.first_name = user_info.username;
                user_info.iszone_code = false;
                user_info.country = '';
              }
              Auth.setUser(user_info, user_info.user_type);
              if (user_info.user_type == '9') {
                $state.go('admin.agency', { agencyService: Services.serviceName });
              } else {
                $state.go('ctApp.mainDashboard', { agencyService: Services.serviceName });
              }
            });
            $scope.show_form_loader = false;
            $scope.showerrorMsg = false;
            if (user_info.user_type == '9') {
              $state.go('admin.agency', { agencyService: Services.serviceName });
            } else {
              $state.go('ctApp.mainDashboard', { agencyService: Services.serviceName });
            }
            if (login_agency_id) {
              $scope.agencyDBField = {};
              $scope.agencyDBField.last_logged_in = moment().utc();
              Services.agencyDetail.update({ id: login_agency_id }, $scope.agencyDBField, function (updatedata) {
              });
            }
            $scope.logger = {};
            $scope.logger.userid = user_info.user_id;
            $scope.logger.user_detail = JSON.stringify({
              'username': user_info.username,
              'firstname': user_info.first_name,
              'lastname': user_info.last_name
            });
            $scope.logger.action = 'Login';
            $scope.logger.agency_id = login_agency_id;
            $scope.logger.action_id = user_info.user_id;
            $scope.logger.action_table = 'signin';
            $scope.logger.timestamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
            Services.userLog.save({}, $scope.logger, function (data) {
            });  /* $scope.show_form_loader = false;

                            $scope.showerrorMsg = false;
                             $state.go("admin.agency", {
                                agencyService: Services.serviceName
                            });
                           
                            $state.go("ctApp.mainDashboard", {
                                agencyService: Services.serviceName
                            });*/
          } else {
            //unathenticated user
            var error_msg = '';
            Services.signinService.get({ filter: '(user_email=\'' + $scope.user.user_email + '\') or (user_name=\'' + $scope.user.user_email + '\')' }, function (data) {
              if (data.record.length >= 1) {
                if (data.record[0].user_password != $scope.user.user_password) {
                  error_msg = 'Password does not match our records.  Please click Forget Password link to reset your password.';
                } else if (data.record[0].status === 0) {
                  error_msg = 'Your account is Inactive !!!';
                } else if (data.record[0].status > 1) {
                  error_msg = 'Your account is terminated !!!';
                }
              } else {
                error_msg = 'We could not find an account for you.  Please contact your organization\u2019s support staff to have an account created.';
              }
              $scope.show_form_loader = false;
              $scope.showError(error_msg, 'danger');
              return false;
            });
          }
        });  //alert("Saving");
      }
    };
  }
]);