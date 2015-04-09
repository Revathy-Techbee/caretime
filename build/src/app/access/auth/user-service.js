/**
 * Created with PyCharm.
 * User: Raza
 * Date: 3/23/14
 * Time: 2:31 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('app.Auth', []).factory('Auth', [
  '$http',
  '$cookies',
  '$cookieStore',
  '$window',
  '$localStorage',
  function AuthService($http, $cookies, $cookieStore, $window, $localStorage) {
    var accessLevels = routingConfig.accessLevels, userRoles = routingConfig.userRoles, currentUser = {
        username: '',
        role: userRoles.public,
        full_name: ''
      };
    //var user_roles = ['employee', 'administrator', 'supervisor', 'consumer'];
    var user_roles = [
        'Nursing',
        'Admin',
        'HR',
        'OfficeClerical',
        'OfficeMgr',
        'OnCall',
        'CorporateBillingDepartment',
        'Scheduler',
        'Basic',
        'SuperAdmin'
      ];
    /*if($localStorage.user_info){
                currentUser.role = userRoles[user_roles[$localStorage.user_info.user_type]];
                currentUser.username= currentUser.role.title;
            }*/
    function changeUser(user) {
      if (user === undefined) {
        user = currentUser;
        $localStorage.user_info = user;  //console.log(currentUser);
      }
      angular.extend(currentUser, user);  // currentUser.username = currentUser.role.title;
    }
    return {
      authorize: function (accessLevel, role) {
        if (role === undefined) {
          role = currentUser.role;
        }
        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function (user) {
        if (user === undefined) {
          user = currentUser;
        }
        //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title || user.role.title === userRoles.corporate.title;
        return _.contains(user_roles, user.role.title);
      },
      isAdmin: function () {
        if (currentUser.role.title == 'Admin') {
          return true;
        } else {
          return false;
        }
      },
      logout: function (success, error) {
        /* $http.post('api/user/authentication_logout/').success(function(){
                        $window.location.reload();
                    }).error(error);*/
        changeUser({
          username: '',
          role: userRoles.public,
          full_name: ''
        });
      },
      setUser: function (user, role_id) {
        user.role = userRoles[user_roles[parseInt(role_id, null)]];
        //user.username= user.role.title;
        currentUser = user;
        $localStorage.user_info = [];
        $localStorage.user_info = user;
        changeUser(user);
        //console.log(currentUser);
        //setFullName();
        return user;
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: function () {
        return currentUser;
      },
      ct_roles: user_roles
    };
  }
]).filter('userRoles', [function () {
    return function (role) {
      /// used this filter to only show the data display name...
      //var roles = ["", "Admin", "User", "corporate", "Corporate IT", "Manager", "IT", "Store Account"];
      var roles = [
          'Nursing',
          'Admin',
          'HR',
          'OfficeClerical',
          'OfficeMgr',
          'OnCall',
          'CorporateBillingDepartment',
          'Scheduler',
          'Basic',
          'SuperAdmin'
        ];
      return roles[role];
    };
  }]).directive('accessLevel', [
  'Auth',
  function (Auth) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var prevDisp = element.css('display'), userRole, accessLevel, negate;
        $scope.user = Auth.user();
        $scope.$watch('user', function (user) {
          if (user.role) {
            userRole = user.role;
          }
          updateCSS();
        }, true);
        attrs.$observe('accessLevel', function (al) {
          if (al) {
            accessLevel = $scope.$eval(al);
          }
          updateCSS();
        });
        function updateCSS() {
          if (userRole && accessLevel) {
            if (!Auth.authorize(accessLevel, userRole)) {
              element.css('display', 'none');
            } else {
              element.css('display', prevDisp);
            }
          }
        }
      }
    };
  }
]).directive('activeNav', [
  '$location',
  function ($location) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var anchor = element[0];
        if (element[0].tagName.toUpperCase() != 'A') {
          anchor = element.find('a')[0];
        }
        var path = anchor.href;
        scope.location = $location;
        scope.$watch('location.absUrl()', function (newPath) {
          path = normalizeUrl(path);
          newPath = normalizeUrl(newPath);
          if (path === newPath || attrs.activeNav === 'nestedTop' && newPath.indexOf(path) === 0) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });
      }
    };
    function normalizeUrl(url) {
      if (url[url.length - 1] !== '/') {
        url = url + '/';
      }
      return url;
    }
  }
]);