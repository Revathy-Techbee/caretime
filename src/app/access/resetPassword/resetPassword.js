angular.module('access.resetPassword', [
    'ui.router'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('access.resetPassword', {
        url: '/resetPassword/:userID',
        views: {
            "accessNested": {
                controller: 'ResetPasswordCtrl',
                templateUrl: 'access/resetPassword/resetPassword.tpl.html'
            }
        },
        data: {
            pageTitle: 'Forgot Password',
            access: access.public
        }
    });

}])

.controller("ResetPasswordCtrl", ["$scope", "Services", "$state", "$timeout", "$http","$stateParams","$rootScope",
    function($scope, Services, $state, $timeout, $http,$stateParams,$rootScope) {
        $timeout(function() {
        $scope.agencyName = $rootScope.dfAgencyNameVariable;

        $scope.$on('AgencyNameVariable', function() {
        $scope.agencyName = $rootScope.dfAgencyNameVariable;

        });          
                
        $scope.userID=$stateParams.userID;
        Services.signinService.get({
            fields: "ForgotpwdStatus,ForgotpwdOn",
            filter: "id='" + $scope.userID + "'"
        }, function(data) {
            $scope.ForgotpwdStatus = data.record[0]["ForgotpwdStatus"];
            $scope.ForgotpwdOn = data.record[0]["ForgotpwdOn"];
             $scope.savedisable = 0;
            $scope.expire_date = moment($scope.ForgotpwdOn).add(24, 'hours').format("YYYY-MM-DD HH:mm"); 
            
            if($scope.ForgotpwdStatus===1)
            {
                 $scope.savedisable = 1;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Password Already Reseted";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                    $state.go("access.signin");
                }, 3000);
                return false;
            }
            if (moment($scope.expire_date).isBefore(moment().utc().format('YYYY-MM-DD HH:mm')))  
            {
               
                 $scope.savedisable = 1;
                 $scope.showerrorMsg = true;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Link Expired";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                    $state.go("access.forgotPassword");
                }, 3000);
                return false;
            }

        });
        }, 2000);

        $scope.resetPassword = function() {
            var re;
            var empLoginError = 0;
            var errorMsg = "";
             $scope.savedisable = 1;
            if ((angular.isUndefined($scope.password1)) || ($scope.password1 === "")) {
                empLoginError++;
                $scope.showerrorMsg = true;
                 $scope.savedisable = 0;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Password field is required!";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }
            re = /[0-9]/;
            if (!re.test($scope.password1)) {
                empLoginError++;
                $scope.showerrorMsg = true;
                  $scope.savedisable = 0;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Your password must contain 8 characters, one upper case and one number.  Please try again.";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }
            re = /[A-Z]/;
            if (!re.test($scope.password1)) {
                empLoginError++;
                $scope.showerrorMsg = true;
                  $scope.savedisable = 0;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Your password must contain 8 characters, one upper case and one number.  Please try again.";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

            if ($scope.password1 && $scope.password1.length < 8) {
                empLoginError++;
                $scope.showerrorMsg = true;
                  $scope.savedisable = 0;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Your password must contain 8 characters, one upper case and one number.  Please try again.";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

            if ((angular.isUndefined($scope.password2)) || ($scope.password2 === "")) {
                empLoginError++;
                $scope.showerrorMsg = true;  $scope.savedisable = 0;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Confirm Password field is required!";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

            if ($scope.password1 && $scope.password2 && ($scope.password1 != $scope.password2)) {
                empLoginError++;
                $scope.showerrorMsg = true;  $scope.savedisable = 0;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Password does not match!";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

            $scope.userDBField = {};
            $scope.userDBField.ForgotpwdStatus = 1;
            $scope.userDBField.user_password = $scope.password2;
            var userId = $scope.userID;
            Services.signinService.update({
                id: userId
            }, $scope.userDBField, function(data) {
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "success";
                $scope.ErrorMsg = "Your Password Updated Successfully !!!";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                     $state.go("access.signin");
                }, 4000);

            });
        };


    }
]);