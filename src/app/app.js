 var temvar='';
  var temmapvar='';
  var globalAgency;
  var Zonedatail;
angular.module('app', [
    'templates-app',
    'templates-common',
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngCookies',
    'ngStorage',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'ngSanitize',
    'ui.select',
	'ui.calendar',
    'wj',
    'infinite-scroll',
    'pascalprecht.translate',
    'ui.utils',
    'datePicker',
    'ngAutocomplete',
    'angularMapbox',
    //'ngCsv'
    'app.utils',
    'app.Auth',
    'app.access',
    'app.ctApp',
    'app.admin',
    'ctApp.alertLog'
])

    
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', "uiSelectConfig","$locationProvider",
        function myAppConfig($stateProvider, $urlRouterProvider, $httpProvider, uiSelectConfig, $locationProvider) {
            uiSelectConfig.theme = 'select2';
            $httpProvider.defaults.headers.common["FROM-ANGULAR"] = "true";
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
            $httpProvider.defaults.headers.patch = {};
            $httpProvider.defaults.useXDomain = true;
            
             $httpProvider.interceptors.push("httpInterceptor");

            delete $httpProvider.defaults.headers.common['X-Requested-With'];

           // $locationProvider.html5Mode(true);
          /* $locationProvider.html5Mode({
              enabled: true,
              requireBase: true
            });*/
            $urlRouterProvider.otherwise('/access/caretime/signin');
            
        } ])


    .factory("httpInterceptor", ["$q",function ($q) {
        return {
            'request': function (config) {
                
                return config;
            },
            'requestError': function (rejection) {
                
                return $q.reject(rejection);
            },
            'response': function (response) {
              
                return response;
            },
            'responseError': function (rejection) {
                if(rejection.status==403 && rejection.statusText=='Forbidden'){
                     window.location.reload();
                }
                return $q.reject(rejection);
            }
        };
    }])



    .run(['$rootScope', '$cookies', '$state', '$http', 'Auth','Services', function run ($rootScope, $cookies, $state, $http, Auth,Services) {
        // For CSRF token compatibility with Django
        
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
       // $scope.dfAgencyNameVariable="test";
        $rootScope.dfAuthVariable = Services.dflogin();
        $rootScope.dfAuthVariable.success(function(data){
          $http.defaults.headers.common['X-DreamFactory-Session-Token'] = data.session_id;
          $rootScope.dfAgencyNameVariable =Services.getAgencyName();
                  $rootScope.dfAgencyNameVariable.success(function(data){
                    if(data.record.length==1)
                    {
                        $rootScope.dfAgencyNameVariable=data.record[0].agency_name;
                        $rootScope.$broadcast('AgencyNameVariable');
                    }

                  });
        });

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (!Auth.authorize(toState.data.access)) { //if not authorize to access the route
                $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                event.preventDefault();

                if (fromState.url === '^') {
                    if (Auth.isLoggedIn()) {
                       // $state.go('ctApp.mainDashboard');
                       $state.go("ctApp.mainDashboard", {
                                agencyService: Services.serviceName
                            });
                    } else {
                        $rootScope.error = null;
                        //$state.go('access.signin');
                        $state.go("access.signin", {
                                agencyService: Services.serviceName
                            });
                    }
                }
            } else {

                if (Auth.isLoggedIn()) {
                  
                } else {
                 
                    $rootScope.error = null;
                    
                }
            }
        });
    }])
    .controller('AppCtrl', ['$scope','$rootScope', '$translate', '$localStorage', '$window', 'Services','Auth','$state',
        function AppCtrl(  $scope, $rootScope,   $translate,   $localStorage,   $window, Services,Auth,$state ) {

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = "CARETIME | " + toState.data.pageTitle;
                }
            });
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            //isIE && angular.element($window.document.body).addClass('ie');
            if(isIE){
                angular.element($window.document.body).addClass('ie');
            }
            if(isSmartDevice( $window ) ){
                angular.element($window.document.body).addClass('smart');
            }
            //isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'Caretime',
                version: '1.1.1',
                // for chart colors agencyDetail
                color: {
                    primary: '#7266ba',
                    info:    '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger:  '#f05050',
                    light:   '#e8eff0',
                    dark:    '#3a3f51',
                    black:   '#1c2b36'
                },
                      
                settings:{"themeID":"10","navbarHeaderColor":"bg-black","navbarCollapseColor":"bg-black","asideColor":"bg-white b-r","headerFixed":true,"asideFixed":false,"asideFolded":false}/* {
                 themeID: 1,
                 navbarHeaderColor: 'bg-black',
                 navbarCollapseColor: 'bg-white-only',
                 asideColor: 'bg-black',
                 headerFixed: true,
                 asideFixed: false,
                 asideFolded: false
                 }*/
            };

           
            // save settings to local storage
            if ( angular.isDefined($localStorage.settings) ) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $localStorage.timezone   = 'America/New_York';// by muni need to be dynamic
            $scope.$watch('app.settings', function(){ $localStorage.settings = $scope.app.settings; }, true);

            // angular translate
            $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            $scope.setLang = function(langKey) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
            };
            $scope.logOut = function(){
                Auth.logout();
                //$state.go('access.signin');
                $state.go("access.signin", {
                                agencyService: Services.serviceName
                            });
                };
                $scope.currentUser = Auth.user();

            function isSmartDevice( $window )
            {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

        } ])
    .factory('Services', ['$resource', "$http","$location", function($resource, $http,$location) {
         var fullpath=($location.$$path).split("/");
      
        var baseurl = "http://dreamfactory.caretimetest.bitnamiapp.com/";
        //var baseurl = "https://securecaretime.us/";
     
       // var serviceName = "caretime"; //"caretimebluesaki";
       var serviceName = fullpath[2];
        var appName = "caretime";
        var globalLimit = 10;
        globalAgency = 1;
        var time = new Date();
        var globaltime = "";
       
        var appUrl = "http://caretimetest.bitnamiapp.com";
        //var appUrl = "https://securecaretime.us/caretime/index.html";

        return{
            baseurl :baseurl,
            serviceName :serviceName,
            appName :appName,
            currentpath:'/files',
            uploadListingPath:'caretime/uploads/',
            //mailUrl:'https://securecaretime.us/mailcodes/mailgun/mail.php',
            mailUrl:'http://caretimetest.bitnamiapp.com/mailcodes/mailgun/mail.php',
            appUrl : appUrl,
            //globalAgency : globalAgency,
            globalLimit : globalLimit,
            globaltime : globaltime,
            time : time,
            //siteurl: "https://securecaretime.us/caretime/index.html",
            siteurl: "http://caretimetest.bitnamiapp.com",
           timezoneKey:"K9A8OQROG3QQ", //Timezone key

           
           /* getZoneList :  function getZoneList()        {
                var zone_list = $http.get(baseurl + '/rest/' + serviceName + '/agency_zones/?app_name=' + appName + '&fields=*&limit=' + globalLimit + '&order=id desc&include_count=true');
                return zone_list;
            },
            getZoneFilter : function getZoneFilter(){
                var zone_filter = $http.get(baseurl + '/rest/' + serviceName + '/_schema/agency_zones/?app_name=' + appName);
                return zone_filter;
            },
            */
            getZoneDetail : function getZoneDetail(zone_id){
                return $http.get(baseurl + '/rest/' + serviceName + '/agency_zones/?app_name=' + appName + '&fields=*&filter=id=' + zone_id + '&include_count=true');
            },
            getIVRDefault : function getIVRDefault(){
                return $http.get(baseurl + '/rest/' + serviceName + '/agency_detail/?app_name=' + appName + '&fields=*&order=id desc&include_count=true&limit=1');
            },
            getTimeZones : function getTimeZones(val){
                return $http.get(baseurl+'/rest/'+serviceName+'/agency_zip/?app_name='+appName+'&fields=timezone&filter=timezone like "%'+val+'%" and status>0 and agency_id='+globalAgency+' group by timezone&limit=5', {
                    params: { }
                });
            },
             
            
            //lat,long,timestamp
            /*getTopFilterOptions : function getTopFilterOptions (val ){
                return $http.get(baseurl+'/rest/'+serviceName+'/_schema/agency_zones/?app_name='+appName+'', {
                    params: { }
                });
            },
            getjobFilter : function getjobFilter(){
                var job_filter = $http.get(baseurl + '/rest/' + serviceName + '/_schema/agency_jobs/?app_name=' + appName);
                return job_filter;
            },
                getemployeeFilter : function getemployeeFilter(){
                var job_filter = $http.get(baseurl + '/rest/' + serviceName + '/_schema/agency_employees/?app_name=' + appName);
                return job_filter;
            },
           getjobauthorization : function getjobauthorization(val){
                return $http.get(baseurl + '/rest/' + serviceName + '/job_authorization/?app_name=' + appName + '&fields=*&filter=job=' + val + '&order=id desc&include_count=true');
            },*/
             setModelTempVar : function setModelTempVar(val){
                temvar=val;
            },
            getModelTempVar : function getModelTempVar(){
               return temvar;
            },
             setModelMapView : function setModelMapView(val){
                temmapvar=val;
            },
            getModelMapView : function getModelMapView(){
               return temmapvar;
            },
            /*getInactivityEmp : function getInactivityEmp(filterObj){
            return $http.post(baseurl + '/rest/' + serviceName + '/agency_employees/?app_name='+appName,{
                           
                            "filter":filterObj.filter,
                             headers: {
                                'X-Http-Method': 'GET'
                            }
                            

                        });

            
              // return InactivityEmpDetails;
            },*/
            setAgencyID : function(val){
                globalAgency = val;
            },
            getAgencyID : function(){
               return globalAgency;
            },
             setEmpZoneDetail : function(zoneCode){
               
               Zonedatail=$http.get(baseurl + '/rest/' + serviceName + '/agency_zones/?app_name=' + appName + '&fields=id,zone_name,zone_code&filter=zone_code=' + zoneCode + '&limit=1');
                return Zonedatail;

               

            },
             getEmpZoneDetail : function(){
             return Zonedatail;
            },
            dflogin : function(){

            return $http.get(baseurl + '/rest/'+serviceName+'/tasks?app_name='+appName,{

            });
            },
            getAgencyName : function(){

            return $http.get(baseurl + '/rest/'+serviceName+'/agency_detail?app_name='+appName+'&fields=agency_name',{

            });
            },
            employeeService: $resource(baseurl+'/rest/'+serviceName+'/agency_employees/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            employeeZones  : $resource(baseurl+'/rest/'+serviceName+'/agency_zones/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            employeeZips   : $resource(baseurl+'/rest/'+serviceName+'/agency_zip/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            employeeSchema : $resource(baseurl+'/rest/'+serviceName+'/_schema/agency_employees/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            agencyDetail   : $resource(baseurl+'/rest/'+serviceName+'/agency_detail/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            jobService	   : $resource(baseurl+'/rest/'+serviceName+'/agency_jobs/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            
            signinService  : $resource(baseurl+'/rest/'+serviceName+'/signin/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),           

            service_item   : $resource(baseurl+'/rest/'+serviceName+'/service_item/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            pay_type   	   : $resource(baseurl+'/rest/'+serviceName+'/pay_type/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            shiftService   : $resource(baseurl+'/rest/'+serviceName+'/job_shifts/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            shiftRecurService   : $resource(baseurl+'/rest/'+serviceName+'/job_shifts/:shift_code/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            timeLog        : $resource(baseurl+'/rest/'+serviceName+'/time_log/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            tempSerive     : $resource('http://54.201.48.144/api/ping', null, {'update': { method:'PUT' }}),
            jobAuthorizedPhones: $resource(baseurl+'/rest/'+serviceName+'/job_authorized_phones/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            employeeCertificates   : $resource(baseurl+'/rest/'+serviceName+'/employee_certificates/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            agencyPayclass:  $resource(baseurl+'/rest/'+serviceName+'/agency_pay_class/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            employeeActivitiesService	   : $resource(baseurl+'/rest/'+serviceName+'/employee_activities/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            customPromptService  : $resource(baseurl+'/rest/'+serviceName+'/custom_prompt/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            auth_payorsService : $resource(baseurl+'/rest/'+serviceName+'/auth_payors/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            auth_activityService : $resource(baseurl+'/rest/'+serviceName+'/auth_activity/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            auth_skillsService : $resource(baseurl+'/rest/'+serviceName+'/auth_skills/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            jobauthorizationService : $resource(baseurl+'/rest/'+serviceName+'/job_authorization/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            ivr_promt_detailService  : $resource(baseurl+'/rest/'+serviceName+'/ivr_promt_detail/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }},{'delete': { method:'DELETE' }}),
            log_details: $resource(baseurl+'/rest/'+serviceName+'/:dbname/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
            jobTask : $resource(baseurl+'/rest/'+serviceName+'/job_task/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
             jobObservation : $resource(baseurl+'/rest/'+serviceName+'/job_observations/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
             observationsName: $resource(baseurl+'/rest/'+serviceName+'/observations/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
             tasksName: $resource(baseurl+'/rest/'+serviceName+'/tasks2/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
             alertService: $resource(baseurl+'/rest/'+serviceName+'/alerts/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
             updateEmployeeActivities : $resource(baseurl+'/rest/'+serviceName+'/employee_activities/:ref_id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),
             userLog          : $resource(baseurl+'/rest/'+serviceName+'/user_log/:id/?app_name='+appName+'&fields=*', null, {'update': { method:'PUT' }}),





        };
    }]);