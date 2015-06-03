/**
 * Created by Raza on 11/12/2014.
 */
angular.module('app.ctApp', [
  'ui.router',
  'ctApp.zones',
  'ctApp.payTypes',
  'ctApp.serviceItems',
  'ctApp.customPrompts',
  'ctApp.payors',
  'ctApp.activities',
  'ctApp.skills',
  'ctApp.payClasses',
  'ctApp.jobs',
  'ctApp.employees',
  'ctApp.schedules',
  'ctApp.timeCard',
  'ctApp.callLog',
  'ctApp.employeeActivity',
  'ctApp.customPrompt',
  'ctApp.employeeWeeklyHours',
  'ctApp.jobWeeklyHours',
  'ctApp.dailyHoursChart',
  'ctApp.accountActivities',
  'ctApp.activityReports',
  'ctApp.employeeTimecard',
  'ctApp.jobTimecard',
  'ctApp.scheduleReport',
  'ctApp.inactivityEmployee',
  'ctApp.jobNoSchedule',
  'ctApp.agency',
  'ctApp.authorizations',
  'ctApp.mapView',
  'ctApp.jobTimecard',
  'ctApp.mainDashboard',
  'ctApp.updatePassword',
  'ctApp.jobTask',
  'ctApp.jobObservation',
  'ctApp.tasks',
  'ctApp.observations',
  'ctApp.scheduleVsActuall',
  'ctApp.employeeList',
  'ctApp.jobList',
  'ctApp.authorizedVsActuall',
  'ctApp.mapReport',
  'ctApp.timecardExport',
  'ctApp.activityCodes',
  'ctApp.budgetVsActual',
  'ctApp.customPromptReport'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function config($stateProvider, $urlRouterProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp', {
      abstract: true,
      url: '/app/:agencyService',
      views: {
        'main': {
          controller: 'CtAppCtrl',
          templateUrl: 'ct-app/ct-app.tpl.html'
        }
      },
      data: {
        pageTitle: 'Application',
        access: access.public
      }
    });  /// $urlRouterProvider.otherwise('/app/dashboard');
  }
]).controller('CtAppCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'Auth',
  'Services',
  '$localStorage',
  function ($scope, $rootScope, $state, Auth, Services, $localStorage) {
    $scope.currentUser = Auth.user();
    $scope.labels = {};
    Services.agencyDetail.get({ id: Services.getAgencyID() }, function (remoteData) {
      //console.log(remoteData);
      //remoteData.record = [];
      //remoteData.record[0] = remoteData;
      if (remoteData.labels) {
        $scope.navLabels = JSON.parse(remoteData.labels);
        $scope.labels.Zones = $scope.navLabels.zones;
        $scope.labels.Jobs = $scope.navLabels.jobs;
        $scope.labels.Employees = $scope.navLabels.employees;
      }
      var agencyDetails = {};
      agencyDetails.id = remoteData.id;
      agencyDetails.agency_name = remoteData.agency_name;
      agencyDetails.timezone = remoteData.timezone;
      $localStorage.agencyDetails = agencyDetails;
      var configCode = {};
      configCode.employee = 4;
      configCode.job = 4;
      configCode.zone = 4;
      /*var payClass = [];
                payClass = JSON.parse(remoteData.record[0].agency_pay_class);
                $localStorage.payClass = [];
                if (payClass.length > 0){
                    $localStorage.payClass = payClass;
                }*/
      if (remoteData.config_employee_code) {
        configCode.employee = remoteData.config_employee_code;
      }
      if (remoteData.config_job_code) {
        configCode.job = remoteData.config_job_code;
      }
      if (remoteData.config_zone_code) {
        configCode.zone = remoteData.config_zone_code;
      }
      $localStorage.configCode = configCode;  //console.log($localStorage.configCode);
    });
  }
]).controller('headerController', [
  '$scope',
  'Auth',
  'Services',
  function ($scope, Auth, Services) {
    $scope.username = Auth.user.username;
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    Services.agencyDetail.get({ id: Services.getAgencyID() }, function (data) {
      $scope.agency_name = data.agency_name;
    });
  }
]).controller('NavCtrl', [
  '$scope',
  'Auth',
  'Services',
  function ($scope, Auth, Services) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.AgencyID = Services.getAgencyID();
    $scope.ServiceName = Services.serviceName;
  }
]);