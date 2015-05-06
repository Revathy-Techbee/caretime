/*
updated by muniraj 11 dec
*/
angular.module('ctApp.agency', [
    'ui.router'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;

    $stateProvider.state('ctApp.AddUpdateAgency', {
        url: '/AddUpdateAgency/:agencyId',
        views: {
            "appNested": {
                controller: 'AddUpdateAgencyCtrl',
                templateUrl: 'ct-app/agency/add-update-agency.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit',
            access: access.agencyDetail
        }
    });

}])

.controller("AddUpdateAgencyCtrl", ["$scope", "Services", "$state", "$modal", "HelperService", "$stateParams", "$localStorage", "$timeout", "$rootScope",
function($scope, Services, $state, $modal, HelperService, $stateParams, $localStorage, $timeout, $rootScope) {


    $scope.mymapVariable = {};
    $scope.agency = {};
    $scope.agency.long_lat = {};
    $scope.empSteps = {};
    $scope.agency.zoneCode = 4;
    $scope.agency.employeeCode = 4;
    $scope.agency.jobCode = 4;
    $scope.agency.notify_interval = "15";
    //$scope.agency.country="United States";

    if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) {
        Services.agencyDetail.get({
            id: $stateParams.agencyId
        }, function(data) {
            $scope.agency = {};
            $scope.agency.payclasses = [];
            $scope.agency.payclassesMax = 3;
            $scope.agencyDBField = data;
            $scope.agency.agency_name = $scope.agencyDBField.agency_name;
            $scope.agency.agency_id = $scope.agencyDBField.id;
            $scope.agency.contact_name = $scope.agencyDBField.contact_name;
            $scope.agency.primary_address1 = $scope.agencyDBField.primary_address1;
            $scope.agency.primary_address2 = $scope.agencyDBField.primary_address2;
            $scope.agency.primary_city = $scope.agencyDBField.primary_city;
            $scope.agency.primary_county = $scope.agencyDBField.primary_county;
            $scope.agency.primary_state = $scope.agencyDBField.primary_state;
            $scope.agency.primary_zip = $scope.agencyDBField.primary_zip;
            $scope.agency.country     = ($scope.agencyDBField.country)?$scope.agencyDBField.country:"United States";
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

            $scope.agency.pay_period = $scope.agencyDBField.pay_period;
            $scope.agency.work_week = $scope.agencyDBField.work_week;
            $scope.agency.notify_interval = $scope.agencyDBField.notify_interval;
            $scope.agency.editedOn = HelperService.convertUTCtoMytimeZone($scope.agencyDBField.edited_on);
            $scope.agency.edited_by = $scope.agencyDBField.edited_by;
            $scope.agency.created_on = HelperService.convertUTCtoMytimeZone($scope.agencyDBField.created_on);
            $scope.agency.created_by = $scope.agencyDBField.created_by;
            /*
            $scope.generateAgencyCode = function(lastIdDB) {

                var temp = lastIdDB;
                return "1" + ('000' + temp).slice(-4);

            };
            $scope.agency.agency_id = $scope.generateAgencyCode($scope.agencyDBField.id);
            */
        });

    } else {
        $scope.agency = {};
        $scope.agency.payclassesMax = 3;
        $scope.agency.payclasses = [{
            name: "",
            payrate: "",
            otpayrate: "",
            status: "1"
        }];
        $scope.agency.payclasses.addshow = -1;
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
            //$scope.empSteps.payclass = true;
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
            //   $scope.agencyDBField.agency_id 				= $scope.agency.id;
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
            $scope.agencyDBField.country               = $scope.agency.country;

            $scope.agencyDBField.labels = JSON.stringify($scope.agency.labels);
            $scope.agencyDBField.ivr_greetings = $scope.agency.ivr_greetings;
            $scope.agencyDBField.ivr_number = $scope.agency.ivr_number;

            $scope.agencyDBField.config_zone_code = $scope.agency.config_zone_code;
            $scope.agencyDBField.config_employee_code = $scope.agency.config_employee_code;
            $scope.agencyDBField.config_job_code = $scope.agency.config_job_code;

            $scope.agencyDBField.agency_pay_class = angular.toJson($scope.agency.payclasses);
            // console.log($scope.agencyDBField.agency_pay_class);
            $scope.agencyDBField.pay_period = $scope.agency.pay_period;
            $scope.agencyDBField.work_week = $scope.agency.work_week;
            $scope.agencyDBField.notify_interval = $scope.agency.notify_interval;



            if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) { // means it is in edit state 
                //	console.log("muni",$localStorage);
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

            Services.agencyDetail.get({
                field:"id",
                filter: "id='" + $stateParams.agencyId + "'"
            }, function(data) {

                if (data.record.length < 1) {
                    //console.log($scope.employeeDBField);

                    Services.agencyDetail.save($scope.agencyDBField, function(data) {

                        $scope.showerrorMsg = true;
                        $scope.ErrorClass = "success";
                        $scope.ErrorMsg = "Agency sucessfully added !!!";
                        $timeout(function() {
                            $scope.showerrorMsg = false;
                            $state.go("ctApp.AddUpdateAgency");
                        }, 3000);

                    });

                } else {

                    if (!angular.isUndefined($stateParams.agencyId) && $stateParams.agencyId) { // means it is in edit state 

                        Services.agencyDetail.update({
                            id: $stateParams.agencyId
                        }, $scope.agencyDBField, function(data) {
                            /* Edited by Lavanya Fot Logger Details*/

                            $scope.logger = {};
                            $scope.logger.userid = $localStorage.user_info.user_id;
                            $scope.logger.username = $localStorage.user_info.username;
                            $scope.logger.useremail = $localStorage.user_info.email;
                            $scope.logger.agencyid = data.id;
                            $scope.logger.activity = 'Update "' + data.id + '" record by ' + $localStorage.user_info.username;
                            $scope.logger.timestamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");
                            $scope.logger.timestamp_ref = moment().utc();

                            Services.log_details.save({
                                dbname: 'log_agency'
                            }, $scope.logger, function(data) {

                            });
                            $scope.showerrorMsg = true;
                            $scope.ErrorClass = "success";
                            $scope.ErrorMsg = "Agency detail edited sucessfully !!!";
                            $scope.agency.edited_on = HelperService.convertUTCtoMytimeZone(data.edited_on);
                            //console.log(data);
                            $timeout(function() {
                                $scope.showerrorMsg = false;
                                $state.go("ctApp.AddUpdateAgency");
                                $scope.empSteps.configuration = false;
                                $scope.empSteps.payclass = false;
                                $scope.empSteps.general = true;
                            }, 3000);

                        });
                        return false;
                    }
                    $scope.showerrorMsg = true;
                    $scope.ErrorClass = "danger";
                    $scope.ErrorMsg = "Agency is already added !!!";
                    jQuery(".general .ng-invalid").addClass("ng-dirty");
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                        //$state.go("app.employees");
                    }, 3000);

                    return false;

                }

            });


        }

        //console.log($scope.employeeDBField);
    };

    $scope.previous_state = function() {
        //console.log($rootScope.$previousState);
        if (!angular.isUndefined($rootScope.$previousState)) {
            var prev = $rootScope.$previousState.name;
            if (prev !== "") {
                $state.go(prev);
            }
        }

    };


    $scope.getmyTimezone = function(lat, lng) {
            if (lat && lng) {
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

    //$scope.$watch('agency.primary_address1', function(newValue, oldValue) {
    $scope.$on('place_changed', function(event, newValue) {
        var street_number = "";
        var street = "";
        var city = "";
        var state = "";
        var zip = "";
        var county = "";
        var country = "";

        //if(newValue !=oldValue){
        $scope.mymapVariable = newValue;
        if (newValue) {
            // $scope.mymapVariable	=	mapvar;
            if ($scope.mymapVariable.address_components) {
                //console.log($scope.mymapVariable.address_components);
                //if($scope.mymapVariable.address_components.length > 6){
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
                //	 jQuery("#Autocomplete2").val($scope.agency.primary_address1);
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
                    $scope.agency.long_lat.lat =$scope.mymapVariable.geometry.location.lat();
                    $scope.getmyTimezone($scope.agency.long_lat.lat, $scope.agency.long_lat.long);
                }

                //}
            }


        }

    });

    $scope.mapView = function(mapurl) {
        Services.setModelTempVar(mapurl);
        $scope.modalInstance = $modal.open({
            templateUrl: 'ct-app/agency/mapDetailView.tpl.html',
            controller: "MapBoxAgencyCtrl"


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

]).controller("MapBoxAgencyCtrl", ["$scope", "Services", "$modalInstance", "$sce", function($scope, Services, $modalInstance, $sce) {
        var itemDetail = Services.getModelTempVar();
        Services.setModelTempVar('');
        $scope.mapurl = itemDetail.url;
        $scope.title = itemDetail.primary_address1;
        $scope.county = itemDetail.primary_county;
        $scope.long = itemDetail.long_lat.long;
        $scope.lat = itemDetail.long_lat.lat;
        $scope.primary_state = itemDetail.primary_state;
        if($scope.mapurl)
        {
            split_url = ($scope.mapurl).split("?");
        $scope.fullMapUrl = "https://maps.google.com/maps?q=" + split_url[1] + "&output=embed";

        $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.fullMapUrl);
        }
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            document.getElementById('jobMapId').src = $scope.fullMapUrl;

        };

    }


]);