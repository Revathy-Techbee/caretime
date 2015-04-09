/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('app.admin', [
  'ui.router',
  'admin.agency',
  'admin.updatePassword'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('admin', {
      url: '/admin/:agencyService',
      views: {
        'main': {
          controller: 'AdminCtrl',
          templateUrl: 'admin/admin.tpl.html'
        }
      },
      data: {
        pageTitle: 'Electronic Timecards',
        access: access.public
      }
    });  // Schedule;
  }
]).controller('AdminCtrl', [
  '$scope',
  'Auth',
  function ($scope, Auth) {
    $scope.currentUser = Auth.user();
    $scope.labels = {};
  }
]).controller('AdminheaderController', [
  '$scope',
  'Auth',
  'Services',
  function ($scope, Auth, Services) {
    $scope.username = Auth.user.username;
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
  }
]);