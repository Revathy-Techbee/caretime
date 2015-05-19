angular.module('access.forgotPassword', ['ui.router']).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('access.forgotPassword', {
      url: '/forgotPassword/:empId',
      views: {
        'accessNested': {
          controller: 'ForgotPasswordCtrl',
          templateUrl: 'access/forgotPassword/forgotPassword.tpl.html'
        }
      },
      data: {
        pageTitle: 'Forgot Password',
        access: access.public
      }
    });
  }
]).controller('ForgotPasswordCtrl', [
  '$scope',
  'Services',
  '$state',
  '$timeout',
  '$http',
  '$localStorage',
  '$rootScope',
  function ($scope, Services, $state, $timeout, $http, $localStorage, $rootScope) {
    $scope.savedisable = 0;
    $scope.agencyName = $rootScope.dfAgencyNameVariable;
    $scope.$on('AgencyNameVariable', function () {
      $scope.agencyName = $rootScope.dfAgencyNameVariable;
    });
    $scope.forgotPassword = function () {
      Services.signinService.get({
        fields: 'user_email,id',
        filter: 'user_name=\'' + $scope.username + '\' and status > 0'
      }, function (data) {
        if (data.record.length === 0) {
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Username doesnt exist';
          jQuery('.forgotPwd .ng-invalid').addClass('ng-dirty');
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        } else {
          $scope.savedisable = 1;
          $scope.user_email = data.record[0].user_email;
          $scope.user_id = data.record[0].id;
          var Emailmessage = '';
          Emailmessage = '<b>Hi ' + $scope.username + ',</b><br>';
          Emailmessage += '<br /><br />' + $localStorage.agencyDetails.agency_name + '  is sending you this email so that you may reset your password.  Please click on the link below to reset your password.';
          Emailmessage += '<br /><br />Please note that upon clicking the link below, you will be able to create a password. Your password must be 8 characters, with one upper case and one number.';
          Emailmessage += '<br /><br />Please click on the Activation link below';
          Emailmessage += '<br />' + '<a href="' + Services.appUrl + '#/access/' + Services.serviceName + '/resetPassword/' + $scope.user_id + '">Activation</a>';
          Emailmessage += '<br /><br />Thanks';
          Emailmessage += '<br />Caretime Support Team';
          Emailmessage += '<br />Please visit our Knowledge Center for helpful tips on how to use the system. <a href="https://caretime.zendesk.com/hc/en-us" title="Caretime Zendesk" >https://caretime.zendesk.com/hc/en-us</a>';
          $http({
            method: 'POST',
            url: Services.mailUrl,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              'subject': 'Password Reset',
              'to': $scope.user_email,
              'comment': Emailmessage
            }
          }).success(function (data, status, headers, config) {
            $scope.signinDBField = {};
            $scope.signinDBField.ForgotpwdStatus = 0;
            $scope.signinDBField.ForgotpwdOn = moment().utc().format('YYYY-MM-DD HH:mm');
            Services.signinService.update({ id: $scope.user_id }, $scope.signinDBField, function (data) {
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'success';
              $scope.ErrorMsg = 'Reset link sent your mail sucessfully !!!';
              $timeout(function () {
                $scope.showerrorMsg = false;
                $state.go('access.signin');
              }, 4000);
            });
          }).error(function (data, status, headers, config) {
            $scope.signinDBField = {};
            $scope.signinDBField.ForgotpwdStatus = 0;
            $scope.signinDBField.ForgotpwdOn = moment().utc().format('YYYY-MM-DD HH:mm');
            Services.signinService.update({ id: $scope.user_id }, $scope.signinDBField, function (data) {
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'success';
              $scope.ErrorMsg = 'Reset link sent your mail sucessfully !!!';
              $timeout(function () {
                $scope.showerrorMsg = false;
                $state.go('access.signin');
              }, 4000);
            });
          });
        }
      });
    };
  }
]);