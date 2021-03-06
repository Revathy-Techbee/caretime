angular.module('admin.updatePassword', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('admin.updatePassword', {
        url: '/updatePassword',
        views: {
            "appNested": {
                controller: 'adminUpdatePasswordCtrl',
                templateUrl: 'admin/updatePassword/updatePassword.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit Schedule',
            access: access.updatePassword
        }
    });

}])

.controller("adminUpdatePasswordCtrl", ["$scope", "Services", "$state","$timeout","$localStorage",
    function($scope, Services, $state,$timeout,$localStorage) {

        $scope.changePassword = function() {
            var re;
            var empLoginError = 0;
            var errorMsg = "";

            if ((angular.isUndefined($scope.password1)) || ($scope.password1 === "")) {
                empLoginError++;
                $scope.showerrorMsg = true;
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
                $scope.showerrorMsg = true;
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
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "danger";
                $scope.ErrorMsg = "Password does not match!";
                jQuery(".empLogin .ng-invalid").addClass("ng-dirty");
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }

            $scope.userDBField = {};
            $scope.userDBField.user_password = $scope.password2;
            var userId = $localStorage.user_info.user_id;
            Services.signinService.update({
                id: userId
            }, $scope.userDBField, function(data) {
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "success";
                $scope.ErrorMsg = "Your Password Updated Successfully !!!";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                    $state.go("admin.agency");
                }, 4000);

            });
        };
    }
]);