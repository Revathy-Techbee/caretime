
angular.module('access.signUp', [
    'ui.router'

])

    .config(['$stateProvider', function config($stateProvider) {
        var access = routingConfig.accessLevels;
        $stateProvider .state('access.signup', {
            url: '/signup',
            views: {
                "accessNested": {
                    controller: 'SignUpCtrl',
                    templateUrl: 'access/sign-up/sign-up.tpl.html'
                }
            },
            data:{ pageTitle: 'Sign In', access: access.public }
        });

    }])
    .controller("SignUpCtrl", ["$scope", "$rootScope", "$http", "Services", "$state", "$timeout",
        function ($scope, $rootScope, $http, Services, $state, $timeout) {
            $scope.user = {};
            $scope.show_form_loader=false;
            $scope.showError = function(msg, error_class){
                $scope.showerrorMsg = true;
                $scope.ErrorClass   = error_class || "danger";
                $scope.ErrorMsg     = msg || "Please provide valid credentials.";
                $scope.show_form_loader=false;
                //angular.element(".general .ng-invalid").addClass("ng-dirty");
                $timeout(function(){
                    $scope.showerrorMsg = false;
                },3000);
            };
            $scope.signup_user = function(user){
                $scope.show_form_loader = true;
                if($scope.signUpForm.$valid){
                    $scope.signinDBField				= {};
                    $scope.signinDBField.user_name		= $scope.user.user_name;
                    $scope.signinDBField.user_password	= $scope.user.user_password2;
                    $scope.signinDBField.user_email		= $scope.user.user_email;
                    $scope.signinDBField.created_on 	= new Date();

                    Services.signinService.get({filter:"user_email='"+$scope.user.user_email+"'"},function(data){
                        //console.log(data.record.length);
                        if(data.record.length>=1){
                            $scope.showError("User is already exist.");
                            return false;
                        }else{
                            Services.signinService.save($scope.signinDBField, function (data) {
                                var userid = data.id;
                                $http({method: 'POST', url: Services.mailUrl, headers: {'Content-Type': 'application/x-www-form-urlencoded'}, data: {
                                    'comment':'<b>Your are registerd successfully.</b><br>	<p>Click the below link to activate your Account,<br> <a href="'+Services.appUrl+'#/access/'+Services.serviceName+'/activate/'+userid+'">Click Here to Activate Your Account</a>',
                                    'subject': 'Caretime User Registeration',
                                    'to': $scope.user.user_email} }).
                                    success(function(data, status, headers, config) {
                                        ///console.log(status);
                                    });
                                $scope.showError("User Successfully Registered, Activate Your Account from your email !!!", "success");
                                $timeout(function(){
                                    $state.go("access.signin");
                                },4000);

                            });
                        }
                    });

                }else{

                    $scope.showError();
                    return false;
                }

            };

        }]);