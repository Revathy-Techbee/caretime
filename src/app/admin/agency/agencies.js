angular.module('admin.agency', [
    'ui.router'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;

    $stateProvider.state('admin.agency', {
            url: '/agencies',
            views: {
                "appNested": {
                    controller: 'AdminAgencyCtrl',
                    templateUrl: 'admin/agency/agencies.tpl.html'
                }
            },
            data: {
                pageTitle: 'Admin Agency',
                access: access.adminAgency
            }
        })
        .state('admin.AddUpdateAgency', {
            url: '/AddUpdateAgency/:agencyId',
            views: {
                "appNested": {
                    controller: 'AddUpdateAdminAgencyCtrl',
                    templateUrl: 'admin/agency/add-update-agency.tpl.html'
                }
            },
            data: {
                pageTitle: 'Add/Edit',
                access: access.adminAgency
            }
        });

}])

.controller("AdminAgencyCtrl", ["$scope", "Services", "$state", "$modal", "$localStorage", "$timeout", "$http","HelperService",
    function($scope, Services, $state, $modal, $localStorage, $timeout, $http,HelperService) {
        $scope.empCountry = $localStorage.user_info.country;
        $scope.config = {
            general: {
                searchtxt: "",
                status: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_agencies_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "agency_name";
        $scope.sortType = "asc";
        $scope.agencyDetailList = [];
        $scope.statusSearchOption = [{
            id: "all",
            name: "All"
        }, {
            id: "1",
            name: "Active"
        }, {
            id: "0",
            name: "Inactive"
        }, {
            id: "2",
            name: "Trial"
        }];
        $scope.hidegeneratepwd=0;
        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_agencies_loader = true;
            $scope.filterObj = {
                fields: "id,agency_name,primary_city,primary_state,contact_name,created_on,last_logged_in,status,contact_email,fax",
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.agencyDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = 'agency_name like "%' + $scope.config.general.searchtxt + '%"';
            }
            if (!angular.isUndefined($scope.config.general.status.id) && ($scope.config.general.status.id != 'all')) {
                if (angular.isUndefined($scope.filterObj.filter)) {
                    $scope.filterObj.filter = 'status="' + $scope.config.general.status.id + '"';

                } else {
                    $scope.filterObj.filter += ' and status="' + $scope.config.general.status.id + '"';

                }
            }


            Services.agencyDetail.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.agencyDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_agencies_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.agencyDetailList = [];
            $scope.config.show_agencies_loader = true;
            $scope.filterObj = {
                fields: "id,agency_name,primary_city,primary_state,contact_name,created_on,last_logged_in,status,contact_email",
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = 'agency_name like "%' + $scope.config.general.searchtxt + '%"';
            }
            if (!angular.isUndefined($scope.config.general.status.id) && ($scope.config.general.status.id != 'all')) {
                if (angular.isUndefined($scope.filterObj.filter)) {
                    $scope.filterObj.filter = '  status="' + $scope.config.general.status.id + '"';

                } else {
                    $scope.filterObj.filter += ' and status="' + $scope.config.general.status.id + '"';

                }
            }
            Services.agencyDetail.get($scope.filterObj, function(data) {
                $scope.agencyDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_agencies_loader = false;
            });

        };

        $scope.applyProgramSort = function() {
            $scope.updateTableData();
        };

        $scope.clearSearch = function() {
            $scope.config.general.searchtxt = "";
            $scope.config.general.status = "";
            $scope.updateTableData();
        };


        $scope.enableEditView = function(id) {
            $state.go("admin.AddUpdateAgency", {
                agencyId: id
            });
        };
        $scope.enableView = function(id) {
            Services.setAgencyID(id);
            $state.go("ctApp.mainDashboard", {
                agencyService: Services.serviceName
            });

        };
        $scope.resendEmail = function(agencyDetail) {
            $scope.user_name = (agencyDetail.id + agencyDetail.contact_name).replace(/ /g, '');
            $scope.userFirstname=(agencyDetail.contact_name).split(' ');
            $scope.userFirstname=HelperService.capitalize($scope.userFirstname[0]);
            var Emailmessage = "";
            Emailmessage = 'Dear ' + $scope.userFirstname + ':';
            Emailmessage += '<br /><br />' + agencyDetail.agency_name + ' agency is now registered with Caretime.  In order to complete the registration process and login to your account, you must click on the link below.  Please make a note of your user name before you click on the link.';
            Emailmessage += '<br /><br /><strong>' + $scope.user_name + '</strong>';
            Emailmessage += '<br /><br />Please note that upon clicking the link below, you will be able to create a password.  Your password must be 8 characters, with one upper case and one number.';
            Emailmessage += '<br /><br />Please click on the Activation link below';
            Emailmessage += '<br /><br />' + '<a href="' + Services.siteurl + '#/access/' + Services.serviceName + '/employeeLogin/' + agencyDetail.contact_email + '/' + $scope.user_name + '" title="Click here" > Activation </a>';
            Emailmessage += '<br /><br />Thanks';
            Emailmessage += '<br />Caretime Support Team';
            Emailmessage += '<br /><a href="mailto: support@caretime.us" title="" >support@caretime.us</a>';
            Emailmessage += '<br />Please visit our Knowledge Center for helpful tips on how to use the system.<a href="https://caretime.zendesk.com/hc/en-us" title="Caretime Zendesk">https://caretime.zendesk.com/hc/en-us</a>';


            $http({
                method: 'POST',
                url: Services.mailUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    'subject': 'Invitation for ' + agencyDetail.agency_name + ' to Register with Caretime',
                    'to': agencyDetail.contact_email,
                    'comment': Emailmessage
                }
            }).
            success(function(data, status, headers, config) {
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "success";
                $scope.ErrorMsg = "Mail Sent Successfully !!!";
                $timeout(function() {
                    $scope.showerrorMsg = false;

                }, 3000);


            }).error(function(data, status, headers, config) {
                $scope.showerrorMsg = true;
                $scope.ErrorClass = "success";
                $scope.ErrorMsg = "Mail Sent Successfully !!!";
                $timeout(function() {
                    $scope.showerrorMsg = false;

                }, 3000);

            });



        };
        $scope.generatePassword = function(agencyDetail) {
            $scope.hidegeneratepwd=1;
            Services.signinService.get({
                filter: "user_email ='" + agencyDetail.contact_email + "' and user_type='1'"
            }, function(data) {
                if (data.record.length === 0) {
                    //console.log(agencyDetail);
                    $scope.username = (agencyDetail.id + agencyDetail.contact_name).replace(/ /g, '');
                    $scope.signinDBField = {};
                    $scope.signinDBField.user_name = $scope.username;
                    $scope.signinDBField.user_email = agencyDetail.contact_email;
                    $scope.signinDBField.created_on = moment.utc();
                    $scope.signinDBField.user_type = 1;
                    $scope.signinDBField.status = 1;
                    $scope.signinDBField.agency_id = agencyDetail.id;
                    $scope.signinDBField.user_password = $scope.username;
                    Services.signinService.save($scope.signinDBField, function(signindata) {
                       // scope.userFirstname=(agencyDetail.contact_name).split(' ');
                        $scope.userFirstname=HelperService.capitalize($localStorage.user_info.first_name);

                        Emailmessage = 'Dear ' + $scope.userFirstname + ':';
                        Emailmessage += '<br /><br />' + agencyDetail.agency_name + '  agency is now registered with Caretime. ';
                        Emailmessage += '<br /><br /><strong> LOGIN DETAILS  </strong><br /><br />';
                        Emailmessage += '<br /><br /><strong> Email : </strong>' + $scope.signinDBField.user_email + '<br /><br />';
                        Emailmessage += '<strong> User Name : </strong>' + $scope.signinDBField.user_name + '<br /><br />';
                        Emailmessage += '<strong> Password : </strong>' + $scope.signinDBField.user_password + '<br /><br />';


                        Emailmessage += '<br /><br />Thanks';
                        Emailmessage += '<br />Caretime Support Team';
                        Emailmessage += '<br /><a href="mailto: support@caretime.us" title="" >support@caretime.us</a>';
                        Emailmessage += '<br />Please visit our Knowledge Center for helpful tips on how to use the system.<a href="https://caretime.zendesk.com/hc/en-us" title="Caretime Zendesk">https://caretime.zendesk.com/hc/en-us</a>';



                        $http({
                            method: 'POST',
                            url: Services.mailUrl,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: {
                                'subject': 'Admin Login  for ' + agencyDetail.agency_name,
                                'to': $localStorage.user_info.email,
                                'comment': Emailmessage
                            }
                        }).
                        success(function(data, status, headers, config) {
                            /*$scope.showerrorMsg = true;
                            $scope.ErrorClass = "success";
                            $scope.ErrorMsg = "Mail Sent Successfully !!!";
                            $timeout(function() {
                                $scope.showerrorMsg = false;

                            }, 3000);
                            */
                            $scope.hidegeneratepwd=0;
                            $scope.modalInstance = $modal.open({
                                template: '<div class="modal-header"> <h3 class="modal-title">Temporary Password</h3></div><div class="modal-body"><span><b> Email : </b>' + $scope.signinDBField.user_email + '</span><br><span><b> User Name : </b>' + $scope.signinDBField.user_name + '</span><br><b> Password : </b>' + $scope.signinDBField.user_password + '</span><br></div>',
                                controller: "temporaryPwdctl"
                            });


                        }).error(function(data, status, headers, config) {
                            /*$scope.showerrorMsg = true;
                            $scope.ErrorClass = "success";
                            $scope.ErrorMsg = "Mail Sent Successfully !!!";
                           

                            $timeout(function() {
                                $scope.showerrorMsg = false;
                            }, 3000);*/
                            $scope.hidegeneratepwd=0;
                            $scope.modalInstance = $modal.open({
                                template: '<div class="modal-header"> <h3 class="modal-title">Temporary Password</h3></div><div class="modal-body"><span><b> Email : </b>' + $scope.signinDBField.user_email + '</span><br><span><b> User Name : </b>' + $scope.signinDBField.user_name + '</span><br><b> Password : </b>' + $scope.signinDBField.user_password + '</span><br></div>',
                                controller: "temporaryPwdctl"
                            });
                        });
                    });


                } else {
                    $scope.hidegeneratepwd=0;
                    $scope.modalInstance = $modal.open({
                        template: '<div class="modal-header"> <h3 class="modal-title">Error </h3></div><div class="modal-body"><span><b> User already exist </b></span><br></div>',
                        controller: "temporaryPwdctl"
                    });
                    /*
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "User already exist";
                    $timeout(function() {
                        $scope.showerrorMsg = false;

                    }, 4000);
                    */
                }
            });
        };



    }
])

.controller("AddUpdateAdminAgencyCtrl", ["$scope", "Services", "$state", "$modal", "HelperService", "$stateParams", "$localStorage", "$timeout", "$rootScope", "$http",
    function($scope, Services, $state, $modal, HelperService, $stateParams, $localStorage, $timeout, $rootScope, $http) {

        $scope.mymapVariable = {};
        $scope.agency = {};
        $scope.agency.long_lat = {};
        $scope.empSteps = {};
        $scope.agency.config_zone_code = 4;
        $scope.agency.config_employee_code = 4;
        $scope.agency.config_job_code = 4;
        $scope.agency.notify_interval = "15";
        $scope.agency.status = 1;
        $scope.agency.labels={};
        $scope.agency.labels.zones="ZONE";
        $scope.agency.labels.jobs="JOB";
        $scope.agency.labels.employees="EMPLOYEE";
        $scope.pageTitle = "Add New";
        /* $scope.agency.payclassesMax = 3;
         $scope.agency.payclasses = [{
             name: "",
             payrate: "",
             otpayrate: "",
             status: "1"
         }];
         $scope.agency.payclasses.addshow = -1;*/
        $scope.agency.work_week = 1;
        //$scope.agency.country="United States";

        if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) {
            Services.agencyDetail.get({
                id: $stateParams.agencyId
            }, function(data) {
                $scope.pageTitle = "Update";
                $scope.agency = {};
                //  $scope.agency.payclasses = [];
                //  $scope.agency.payclassesMax = 3;
                $scope.agencyDBField = data;
                $scope.agency.agency_name = $scope.agencyDBField.agency_name;
                $scope.agency.agency_id = $scope.agencyDBField.id;
                $scope.agency.contact_name = $scope.agencyDBField.contact_name;
                $scope.agency.primary_address1 = $scope.agencyDBField.primary_address1;
                $scope.agency.primary_address2 = $scope.agencyDBField.primary_address2;
                $scope.agency.primary_city = $scope.agencyDBField.primary_city;
                $scope.agency.primary_county = $scope.agencyDBField.primary_county;
                $scope.agency.country = ($scope.agencyDBField.country) ? $scope.agencyDBField.country : "United States";
                $scope.agency.primary_state = $scope.agencyDBField.primary_state;
                $scope.agency.primary_zip = $scope.agencyDBField.primary_zip;
                $scope.agency.contact_email = $scope.agencyDBField.contact_email;
                $scope.agency.contact_phone = $scope.agencyDBField.contact_phone;
                $scope.agency.telephone = $scope.agencyDBField.telephone;
                $scope.agency.fax = $scope.agencyDBField.fax;
                $scope.agency.timezone = $scope.agencyDBField.timezone;
                $scope.agency.daylight_time_format = JSON.parse($scope.agencyDBField.daylight_time_format);
                $scope.agency.enable_alert = JSON.parse($scope.agencyDBField.enable_alert);
                $scope.agency.external_code = ($scope.agencyDBField.external_code) ? JSON.parse($scope.agencyDBField.external_code) : "";
                $scope.agency.url = $scope.agencyDBField.map_url;
                $scope.agency.long_lat = JSON.parse($scope.agencyDBField.long_lat);
                $scope.agency.labels = JSON.parse($scope.agencyDBField.labels);
                $scope.agency.ivr_number = $scope.agencyDBField.ivr_number;
                $scope.agency.ivr_greetings = $scope.agencyDBField.ivr_greetings;
                $scope.agency.config_zone_code = parseInt($scope.agencyDBField.config_zone_code);
                $scope.agency.config_employee_code = parseInt($scope.agencyDBField.config_employee_code);
                $scope.agency.config_job_code = parseInt($scope.agencyDBField.config_job_code);
                $scope.agency.status = $scope.agencyDBField.status;
                $scope.agency.pay_period = $scope.agencyDBField.pay_period;
                $scope.agency.work_week = $scope.agencyDBField.work_week;
                $scope.agency.notify_interval = $scope.agencyDBField.notify_interval;
                $scope.agency.editedOn = HelperService.convertUTCtoMytimeZone($scope.agencyDBField.edited_on);
                $scope.agency.edited_by = $scope.agencyDBField.edited_by;
                $scope.agency.created_on = HelperService.convertUTCtoMytimeZone($scope.agencyDBField.created_on);
                $scope.agency.created_by = $scope.agencyDBField.created_by;
                $scope.agency.default_view = (($scope.agencyDBField.default_view)?$scope.agencyDBField.default_view:"0");
                $scope.agency.populateShift = ($scope.agencyDBField.populate_shift)?$scope.agencyDBField.populate_shift:"0";
               /* $scope.generateAgencyCode = function(lastIdDB) {

                    var temp = lastIdDB;
                    return "1" + ('000' + temp).slice(-4);

                };
                $scope.agency.agency_id = $scope.generateAgencyCode($scope.agencyDBField.id);
                */
            });

        }




        $scope.agencyManage = function(step) {
            if (step == 'general') {

                $scope.showerrorMsg = false;

                if (angular.isUndefined($scope.agency.agency_name) || angular.isUndefined($scope.agency.contact_name) || angular.isUndefined($scope.agency.primary_address1) || angular.isUndefined($scope.agency.primary_city) || angular.isUndefined($scope.agency.primary_state) || angular.isUndefined($scope.agency.primary_zip) || angular.isUndefined($scope.agency.contact_email)) {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Required field is missing !!!";
                    jQuery(".agency .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;

                }
                if (!($scope.agency.agency_name) || !($scope.agency.contact_name) || !($scope.agency.primary_address1) || !($scope.agency.primary_city) || !($scope.agency.primary_state) || !($scope.agency.primary_zip) || !($scope.agency.contact_email)) {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Required field is missing !!!";
                    jQuery(".agency .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }
                $scope.empSteps.configuration = true;
            }




            if (step == 'configuration') {

                if (!($scope.agency.ivr_number)) {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Required field is missing !!!";
                    jQuery(".configuration .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }

                if (jQuery(".configuration .ng-invalid").length > 0) {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Digit Min size 4, Max Size 6 !!!";
                    jQuery(".configuration .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;

                }
                $scope.agencyDBField = {};
                $scope.agencyDBField.agency_name = $scope.agency.agency_name;
                $scope.agencyDBField.contact_name = $scope.agency.contact_name;
                $scope.agencyDBField.primary_address1 = $scope.agency.primary_address1;
                $scope.agencyDBField.primary_address2 = $scope.agency.primary_address2;
                $scope.agencyDBField.primary_city = $scope.agency.primary_city;
                $scope.agencyDBField.primary_state = $scope.agency.primary_state;
                $scope.agencyDBField.primary_zip = $scope.agency.primary_zip;
                $scope.agencyDBField.contact_email = $scope.agency.contact_email;
                $scope.agencyDBField.contact_phone = $scope.agency.contact_phone;
                $scope.agencyDBField.telephone = $scope.agency.telephone;
                $scope.agencyDBField.fax = $scope.agency.fax;
                $scope.agencyDBField.timezone = $scope.agency.timezone;
                $scope.agencyDBField.daylight_time_format = JSON.stringify($scope.agency.daylight_time_format);
                $scope.agencyDBField.enable_alert = JSON.stringify($scope.agency.enable_alert);
                $scope.agencyDBField.external_code = JSON.stringify($scope.agency.external_code);

                $scope.agencyDBField.map_url = $scope.agency.url;
                $scope.agencyDBField.long_lat = JSON.stringify($scope.agency.long_lat);
                $scope.agencyDBField.primary_county = $scope.agency.primary_county;
                $scope.agencyDBField.country = $scope.agency.country;

                $scope.agencyDBField.labels = JSON.stringify($scope.agency.labels);
                $scope.agencyDBField.ivr_greetings = $scope.agency.ivr_greetings;
                $scope.agencyDBField.ivr_number = $scope.agency.ivr_number;

                $scope.agencyDBField.config_zone_code = $scope.agency.config_zone_code;
                $scope.agencyDBField.config_employee_code = $scope.agency.config_employee_code;
                $scope.agencyDBField.config_job_code = $scope.agency.config_job_code;

                //  $scope.agencyDBField.agency_pay_class = angular.toJson($scope.agency.payclasses);
                $scope.agencyDBField.pay_period = $scope.agency.pay_period;
                $scope.agencyDBField.work_week = $scope.agency.work_week;
                $scope.agencyDBField.notify_interval = $scope.agency.notify_interval;
                $scope.agencyDBField.status = $scope.agency.status;
                $scope.agencyDBField.default_view  = $scope.agency.default_view;
                $scope.agencyDBField.populate_shift = $scope.agency.populateShift;

                if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) { // means it is in edit state 
                    $scope.agencyDBField.edited_on = moment().utc();
                    $scope.agencyDBField.edited_by = JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                        "user_id": $localStorage.user_info.user_id
                    });

                } else {
                    $scope.agencyDBField.created_on = moment().utc();
                    $scope.agencyDBField.created_by = JSON.stringify({
                        "username": $localStorage.user_info.username,
                        "firstname": $localStorage.user_info.first_name,
                        "lastname": $localStorage.user_info.last_name,
                        "user_id": $localStorage.user_info.user_id
                    });

                }
                $scope.agencyDBField.external_code = JSON.stringify($scope.agency.external_code);
                filterObj = {
                    fields: "id,contact_email",
                    filter: "(contact_email='" + $scope.agency.contact_email + "' or ivr_number ='" + $scope.agency.ivr_number + "')"
                };
                if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) {
                    filterObj.filter = filterObj.filter + " and id!='" + $stateParams.agencyId + "'";
                }
                Services.agencyDetail.get(filterObj, function(data) {

                    if (data.record.length < 1) {
                        if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) { // means it is in edit state 

                            Services.agencyDetail.update({
                                id: $stateParams.agencyId
                            }, $scope.agencyDBField, function(data) {
                                /* Edited by Lavanya Fot Logger Details*/

                                $scope.logger = {};
                                $scope.logger.userid = $localStorage.user_info.user_id;
                                $scope.logger.user_detail = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                });
                                $scope.logger.action ="Update";
                                $scope.logger.agency_id = data.id;
                                $scope.logger.action_id =  data.id;
                                $scope.logger.action_table ="agency_detail";
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                Services.userLog.save({
                                }, $scope.logger, function(data) {

                                });

                                $scope.showerrorMsg = true;
                                $scope.ErrorClass = "success";
                                $scope.ErrorMsg = "Agency detail edited successfully !!!";
                                $scope.agency.edited_on = HelperService.convertUTCtoMytimeZone(data.edited_on);
                                //console.log(data);
                                $timeout(function() {
                                    $scope.showerrorMsg = false;
                                    $state.go("admin.agency");
                                    $scope.empSteps.configuration = false;
                                    $scope.empSteps.payclass = false;
                                    $scope.empSteps.general = true;
                                }, 3000);

                            });
                            return false;
                        } else {

                            //toMailId=$scope.agencyDBField.contact_email+','+$localStorage.user_info.email;
                            Services.agencyDetail.save($scope.agencyDBField, function(data) {

                                $scope.logger = {};
                                $scope.logger.userid = $localStorage.user_info.user_id;
                                $scope.logger.user_detail = JSON.stringify({
                                    "username": $localStorage.user_info.username,
                                    "firstname": $localStorage.user_info.first_name,
                                    "lastname": $localStorage.user_info.last_name,
                                });
                                $scope.logger.action ="Add";
                                $scope.logger.agency_id = data.id;
                                $scope.logger.action_id =  data.id;
                                $scope.logger.action_table ="agency_detail";
                                $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");

                                Services.userLog.save({
                                }, $scope.logger, function(data) {

                                });


                                $scope.signinDBField = {};
                                $scope.signinDBField.user_name = (data.id + $scope.agency.contact_name).replace(/ /g, '');
                                $scope.signinDBField.user_email = $scope.agency.contact_email;

                                $scope.sendMailOnCreate($scope.signinDBField.user_name, $scope.signinDBField.user_email,$scope.agencyDBField.contact_email,false);
                               


                            });
                        }

                    } else {

                        if (data.record[0].contact_email == $scope.agency.contact_email) {
                            $scope.ErrorMsg = "Contact Email is already added !!!";
                        } else {
                            $scope.ErrorMsg = "IVR Number is already added !!!";

                        }
                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "danger";
                        jQuery(".general .ng-invalid").addClass("ng-dirty");
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                        }, 3000);

                        return false;

                    }

                });


            }

        };
        $scope.sendMailOnCreate = function(username, email,sendmail,showmsg) {
            $scope.userFirstname=($scope.agency.contact_name).split(' ');
            $scope.userFirstname=HelperService.capitalize($scope.userFirstname[0]);

            var Emailmessage = "";
            Emailmessage = 'Dear ' + $scope.userFirstname + ':';
            Emailmessage += '<br /><br />' + $scope.agency.agency_name + ' agency is now registered with Caretime.  In order to complete the registration process and login to your account, you must click on the link below.  Please make a note of your user name before you click on the link.';
            Emailmessage += '<br /><br /><strong>' + username + '</strong>';
            Emailmessage += '<br /><br />Please note that upon clicking the link below, you will be able to create a password.  Your password must be 8 characters, with one upper case and one number.';
            Emailmessage += '<br /><br />Please click on the Activation link below';
            Emailmessage += '<br /><br />' + '<a href="' + Services.siteurl + '#/access/' + Services.serviceName + '/employeeLogin/' + email + '/' + username + '" title="Click here" > Activation </a>';
            Emailmessage += '<br /><br />Thanks';
            Emailmessage += '<br />Caretime Support Team';
            Emailmessage += '<br /><a href="mailto: support@caretime.us" title="" >support@caretime.us</a>';
            Emailmessage += '<br />Please visit our Knowledge Center for helpful tips on how to use the system.<a href="https://caretime.zendesk.com/hc/en-us" title="Caretime Zendesk">https://caretime.zendesk.com/hc/en-us</a>';

            $http({
                method: 'POST',
                url: Services.mailUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    'subject': 'Invitation for ' + $scope.agency.agency_name + ' to Register with Caretime',
                    'to':sendmail,
                    'comment': Emailmessage
                }
            }).
            success(function(data, status, headers, config) {
                if(showmsg)
                {
                    if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "success";
                    $scope.ErrorMsg = "Mail Sent Successfully !!!";
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                        $state.go("admin.agency");

                    }, 3000);
                }
                else
                {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "success";
                    $scope.ErrorMsg = "Agency successfully added !!!";
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                        $state.go("admin.agency");
                    }, 3000);

                }
                }
                else
                {
                    $scope.sendMailOnCreate(username, email,$localStorage.user_info.email,true);
                }
                

            }).error(function(data, status, headers, config) {
                if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "success";
                    $scope.ErrorMsg = "Mail Sent Successfully !!!";
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                        $state.go("admin.agency");

                    }, 3000);
                }
                else
                {
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "success";
                    $scope.ErrorMsg = "Agency successfully added !!!";
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                        $state.go("admin.agency");
                    }, 3000);

                }
            });



        };
        $scope.Resendemail = function() {
            $scope.signinDBField = {};
            $scope.signinDBField.user_name = ($stateParams.agencyId + $scope.agency.contact_name).replace(/ /g, '');
            $scope.signinDBField.user_email = $scope.agency.contact_email;
            $scope.sendMailOnCreate($scope.signinDBField.user_name, $scope.signinDBField.user_email,$scope.agencyDBField.contact_email,true);
           


        };
        $scope.previous_state = function() {
            $state.go("admin.agency");


        };


        $scope.getmyTimezone = function(lat, lng) {
            if (lat && lng) {

                /*
                Services.getTimeZone(lat, lng, function(data){

                    console.log(data);
                });*/

                var tz = new TimeZoneDB();
                tz.getJSON({
                    key: Services.timezoneKey,
                    lat: lat,
                    lng: lng
                }, function(data) {
                    $scope.$apply(function() {
                        $scope.agency.timezone = data.zoneName;
                    });
                });

            }
        };


        $scope.$on('place_changed', function(event, newValue) {
            var street_number = "";
            var street = "";
            var city = "";
            var state = "";
            var zip = "";
            var county = "";
            var country = "";

            $scope.mymapVariable = newValue;
            if (newValue) {
                if ($scope.mymapVariable.address_components) {

                    for (var i = 0; i < $scope.mymapVariable.address_components.length; i++) {
                        var addressType = $scope.mymapVariable.address_components[i].types[0];
                        if (addressType == "street_number") {
                            street_number = $scope.mymapVariable.address_components[i]["short_name"];

                        }
                        if (addressType == "route") {
                            street = $scope.mymapVariable.address_components[i]["short_name"];

                        }
                        if (addressType == "locality") {
                            city = $scope.mymapVariable.address_components[i]["short_name"];

                        }
                        if (addressType == "administrative_area_level_1") {
                            state = $scope.mymapVariable.address_components[i]["short_name"];

                        }
                        if (addressType == "administrative_area_level_2") {
                            county = $scope.mymapVariable.address_components[i]["short_name"];

                        }
                        if (addressType == "postal_code") {
                            zip = $scope.mymapVariable.address_components[i]["short_name"];

                        }
                        if (addressType == "country") {
                            country = $scope.mymapVariable.address_components[i]["long_name"];

                        }

                    }

                    $scope.agency.primary_address1 = street_number + ' ' + street;
                    $scope.agency.primary_address2 = "";
                    $scope.agency.primary_city = city;
                    $scope.agency.primary_state = state;
                    $scope.agency.primary_zip = zip;
                    $scope.agency.primary_county = county;
                    $scope.agency.country = country;

                    if ($scope.mymapVariable.url) {
                        $scope.agency.url = $scope.mymapVariable.url;
                    }


                    if ($scope.mymapVariable.geometry) {
                        $scope.agency.long_lat = {};
                        $scope.agency.long_lat.long = $scope.mymapVariable.geometry.location.lng();
                        $scope.agency.long_lat.lat = $scope.mymapVariable.geometry.location.lat();
                        $scope.getmyTimezone($scope.agency.long_lat.lat, $scope.agency.long_lat.long);
                    }


                }


            }

        });

        $scope.mapView = function(mapurl) {
            Services.setModelTempVar(mapurl);
            $scope.modalInstance = $modal.open({
                templateUrl: 'admin/agency/mapDetailView.tpl.html',
                controller: "MapBoxAdminAgencyCtrl"


            });




        };




        $scope.preventNext = function(keyEvent) {
            if (keyEvent.which === 13) {
                //$scope.empSteps.advanced = false;
                keyEvent.preventDefault();
            }

        };

        $scope.agencyManagePrev = function(step) {

            if (step == "configuration") {

                $scope.empSteps.general = true;
                $scope.empSteps.configuration = false;
                $scope.empSteps.payclass = false;

            }

            if (step == "payclass") {
                $scope.empSteps.general = true;
                $scope.empSteps.configuration = false;
                $scope.empSteps.payclass = false;

            }



        };




    }

])

.controller("MapBoxAdminAgencyCtrl", ["$scope", "Services", "$modalInstance", "$sce", function($scope, Services, $modalInstance, $sce) {
        var itemDetail = Services.getModelTempVar();
        Services.setModelTempVar('');
        $scope.mapurl = itemDetail.url;
        $scope.title = itemDetail.primary_address1;
        $scope.county = itemDetail.primary_county;
        $scope.long = itemDetail.long_lat.long;
        $scope.lat = itemDetail.long_lat.lat;
        $scope.primary_state = itemDetail.primary_state;
        if ($scope.mapurl) {
            split_url = ($scope.mapurl).split("?");
            $scope.fullMapUrl = "https://maps.google.com/maps?q=" + split_url[1] + "&output=embed";

            $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.fullMapUrl);
        }
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            document.getElementById('jobMapId').src = $scope.fullMapUrl;

        };

    }


])
.controller("temporaryPwdctl", ["$scope", "$timeout", "$modalInstance", function($scope, $timeout, $modalInstance) {
    $timeout(function() {
        $modalInstance.dismiss('cancel');

    }, 5000);

}
]);
