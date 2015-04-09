angular.module('ctApp.mapReport', [
    'ui.router',
    'wj'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.mapReport', {
        url: '/mapReport',
        views: {
            "appNested": {
                controller: 'MapReportCtrl',
                templateUrl: 'ct-app/reports/mapReport/mapReport.tpl.html'
            }
        },
        data: {
            pageTitle: 'Map Report',
            access: access.mapReport
        }
    });

}])

.controller("MapReportCtrl", ["$scope", "$rootScope", "Services", "HelperService", "$timeout","$localStorage", function($scope, $rootScope, Services, HelperService, $timeout,$localStorage) {

    $scope.sortType = "asc";
    $scope.sortme = false;

    $scope.reportFilters = {};
    $scope.reportFilters.job = '';
    $scope.reportFilters.zone = null;
     if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
}
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
    $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");

    $scope.defaultJobIndex = 0;
    $scope.jobLocations = {};
    $scope.jobsMapList = [];
    $scope.logMapList = [];

    $scope.ctmapBaseLat = 36.982371;
    $scope.ctmapBaseLon = -76.631066;

    $scope.jobsMapListSelected = [];
    $scope.geojsonData = {
        "type": "FeatureCollection",
        "features": []
    };
    var filterQuery;

    $scope.searchAlert = true;
   // $scope.longitude = -77.57968699999998;
   // $scope.lattitude = 36.636016;
   // $scope.zoom = 14;
   // $scope.filterState = {};
  //  $scope.filterState.text = "";

    $scope.getRecords = function() {
        $scope.searchAlert = true;
        $scope.jobLocations = "";
       // $scope.testingpp = [];
        $scope.logMapList = [];
        $scope.newdetails = {};
        $scope.jobsMapList = [];
        $scope.jobsMapListSelected = [];
        $scope.logMapListOrg=[];
        $scope.ctmapBaseLat = 36.982371;
        $scope.ctmapBaseLon = -76.631066;
        $scope.directionsLayer.removeLayer($scope.directionsLayer.originMarker);
        $scope.directionsLayer.removeLayer($scope.directionsLayer.destinationMarker);

        if ($scope.reportFilters.startDate && $scope.reportFilters.endDate) {

            if (Date.parse($scope.reportFilters.startDate) > Date.parse($scope.reportFilters.endDate)) {
                $scope.showerrorMsg = true;
                $scope.error_msg = "Invalid Date";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }
        } else {
            $scope.showerrorMsg = true;
            $scope.error_msg = "Please Select Date";
            $timeout(function() {
                $scope.showerrorMsg = false;
            }, 3000);
            return false;
        }

        if (!$scope.reportFilters.job || $scope.reportFilters.job.id === "") {
            
            $scope.showerrorMsg = true;
            $scope.error_msg = "Please use the required filters";
            $timeout(function() {
                $scope.showerrorMsg = false;
            }, 3000);

            return false;

        } else {

            filterQuery = {
               "fields": "job_name,job_code,job_address1,job_city,job_state,job_zip,long_lat",
                "filter": "id = '" + $scope.reportFilters.job.id + "' and status > 0",
                "order": "id desc",
                "include_count": true
            };

            Services.jobService.get(filterQuery, function(data) {
                //$scope.jobPlace = [];
               // $scope.farmersMarkets = [];
                $scope.coords = {};
                $scope.coords.long = "";
                $scope.coords.lat = "";
                $scope.jobsMapList = [];
                $scope.JobDetailList = data.record;

                angular.forEach(data.record, function(item) {

                    $scope.coords = (item.long_lat) ? JSON.parse(item.long_lat) : "";
                    if (!angular.isUndefined($scope.coords.long)) {

                        $scope.ctmapBaseLat = $scope.coords.lat;
                        $scope.ctmapBaseLon = $scope.coords.long;
                        var buildMapJobData = {};
                        buildMapJobData = {
                            "nature": "jobs",
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    $scope.coords.long,
                                    $scope.coords.lat
                                ]
                            },
                            "properties": {
                                "name": item.job_name,
                                "code": item.job_code,
                                "address1": item.job_address1,
                                "city": item.job_city,
                                "state": item.job_state,
                                "zip": item.job_zip,
                                "marker-color": "#000000",
                                "marker-size": "medium",
                            }
                        };
                        $scope.jobsMapList.push(buildMapJobData);
                    }
                });


                $scope.jobLocations = $scope.jobsMapList;
                if ($scope.jobLocations && $scope.jobLocations.length > 0) {
                    $scope.searchAlert = false;
                    $scope.updateTableData();
                } else {
                    $scope.directionsLayer.removeLayer($scope.directionsLayer.originMarker);
                    $scope.directionsLayer.removeLayer($scope.directionsLayer.destinationMarker);
                    $scope.pushMapDatas();
                    alert("Geo Coordinates not found for this Job");


                }
                $scope.newdetails = {};
                $rootScope.$broadcast('empty-routes');
            });
        }
    };

    $scope.clearSearch = function() {
        $scope.reportFilters.zone = null;
         if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
}
        $scope.reportFilters.job = '';
        $scope.searchAlert = true;
        $scope.jobLocations = "";
       // $scope.testingpp = [];
        $scope.logMapList = [];
        $scope.newdetails = {};
        $scope.jobsMapList = [];
        $scope.logMapListOrg=[];
        $scope.jobsMapListSelected = [];
        $scope.ctmapBaseLat = 36.982371;
        $scope.ctmapBaseLon = -76.631066;
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");

        $scope.directionsLayer.removeLayer($scope.directionsLayer.originMarker);
        $scope.directionsLayer.removeLayer($scope.directionsLayer.destinationMarker);

        $scope.pushMapDatas();

    };

    $scope.pushMapDatas = function() {
        $scope.geojsonData.features = [];

        if ($scope.jobsMapList.length > 0) {
            $scope.jobsMapListSelected = $scope.jobsMapList[$scope.defaultJobIndex];

            $scope.geojsonData.features.push($scope.jobsMapListSelected);

            if ($scope.directions.getOrigin()) {
                if ($scope.directions.getDestination()) {
                    $scope.directionsLayer.removeLayer($scope.directionsLayer.destinationMarker);
                }

            }

            angular.forEach($scope.logMapListOrg, function(item) {
                $scope.geojsonData.features.push(item);
            });
        } else {

            $scope.geojsonData.features = [];
        }
        $scope.loadData();
    };

    $scope.setMapActive = function setMapActive(el) {
        var siblings = listings.getElementsByTagName('div');
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = siblings[i].className.replace(/active/, '').replace(/\s\s*$/, '');
        }
        el.className += ' active';
    };

    $scope.callMap = function() {

        $scope.ctmap = {};



        L.mapbox.accessToken = 'pk.eyJ1IjoicmFqaXZwZXJlcmEiLCJhIjoieXJCdTNqNCJ9.yJ8QUKYss4WEM8zxqTHq0Q';
        $scope.ctmap = L.mapbox.map('map', 'rajivperera.jo4glk0p', {
            zoomControl: true
        });
        $scope.ctmap.setView([$scope.ctmapBaseLat, $scope.ctmapBaseLon], 8);
        $scope.ctmap.attributionControl.setPosition('bottomleft');


        $scope.directions = L.mapbox.directions();

        $scope.directionsLayer = L.mapbox.directions.layer($scope.directions)
            .addTo($scope.ctmap);


        $scope.directionsLayer.originMarker = L.marker([0, 0], {
            draggable: false,
            icon: L.mapbox.marker.icon({
                'marker-size': 'large',
                'marker-color': '#000',
                'marker-symbol': 'j'
            })
        });

        $scope.directionsLayer.destinationMarker = L.marker([0, 0], {
            draggable: false,
            icon: L.mapbox.marker.icon({
                'marker-size': 'large',
                //'marker-color': '#1B0A2A',
                'marker-symbol': 'l'
            })
        });



        var directionsInputControl = L.mapbox.directions.inputControl('inputs', $scope.directions)
            .addTo($scope.ctmap);


           $scope.directions.on('origin', function(e) {

            })
            .on('destination', function(e) {

            })
            .on('load', function(e) {
                $scope.currRoutes = e.routes;
                $scope.newCurrJE = {};
                $scope.newCurrJE.job = $scope.currentJE.job;
                $scope.newCurrJE.employee = [];

                angular.forEach($scope.currentJE.employee, function(item) {
                    var emp = {};
                    emp = item;
                    if (item.id == $scope.currEmpLeafId) {
                        emp.route = {};
                        if (e.routes[0] && e.routes[0].summary) {
                            emp.route.summary = e.routes[0].summary;
                            emp.route.distdur = $scope.imperial(e.routes[0].distance) + ', ' + $scope.duration(e.routes[0].duration);
                        }

                    }
                    $scope.newCurrJE.employee.push(emp);
                });
                if ($scope.newCurrJE.employee.length > 0) {
                    $rootScope.$broadcast('update-routes');
                }
            });

        $scope.$on('update-routes', function(event, args) {
            $scope.newdetails = $scope.newCurrJE;
            $scope.newdetails.employee.reverse();
            $scope.$apply();
        });

        $scope.$on('empty-routes', function(event, args) {
            $scope.newdetails = [];
            $scope.newCurrJE = {};
            $scope.newCurrJE.job = {};
            $scope.newCurrJE.employee = [];
            $scope.currentJE = {};
            $scope.currentJE.job = {};
            $scope.currentJE.employee = [];
            $scope.currentJEentry = [];
        });

        $scope.ctmap.on('click', function(e) {

            $scope.directions.setOrigin(undefined);
            $scope.directions.setDestination(undefined);
            return false;

        });

        var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', $scope.directions)
            .addTo($scope.ctmap);

        var directionsRoutesControl = L.mapbox.directions.routesControl('routes', $scope.directions)
            .addTo($scope.ctmap);

        var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', $scope.directions)
            .addTo($scope.ctmap);

        var test = [];
        $scope.ctmap.featureLayer.setGeoJSON([]);
        $scope.ctmap.on('ready', $scope.loadData);
    };

    $scope.currentJE = {};
    $scope.currentJE.job = {};
    $scope.currentJE.employee = [];
    $scope.currentJEentry = [];

    $scope.loadData = function() {
        var popup;
        $scope.logMapList = [];
        $scope.ctmap.setView([$scope.ctmapBaseLat, $scope.ctmapBaseLon], 8);
        $scope.ctmap.featureLayer.setGeoJSON($scope.geojsonData);
        var locations = $scope.ctmap.featureLayer;
        locations.eachLayer(function(locale) {
            var prop = locale.feature.properties;

            if (locale.feature.nature == "jobs") {
                if ($scope.directions.getOrigin()) {
                    $scope.directionsLayer.removeLayer($scope.directionsLayer.originMarker);
                }
                $scope.directions.setOrigin(locale.getLatLng());

                popup = '<h3>Job: ' + prop.name + '</h3><div>' + prop.address1 + ', ' + prop.state + ', ' + prop.zip;
            }

            if (locale.feature.nature == "log") {
                var empVar = {};
                empVar.properties = locale.feature.properties;
                empVar.leafletid = locale._leaflet_id;
                $scope.logMapList.push(empVar);
                popup = '<h3>Job: ' + prop.jobcode + ' Employee - ' + prop.empcode + '</h3><div>' + prop.timestamp + ', ' + prop.logtype;

            }

            if (prop.crossStreet) {
                popup += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
            }
            popup += '</div>';

            // Marker interaction
            locale.on('click', function(e) {
                $scope.currEmpLeafId = e.target._leaflet_id;
                $scope.ctmap.panTo(locale.getLatLng());
                if (locale.feature.nature == 'jobs') {
                    if ($scope.directions.getOrigin()) {
                        $scope.directionsLayer.removeLayer($scope.directionsLayer.originMarker);
                    }
                    $scope.directions.setOrigin(locale.getLatLng());

                    if ($scope.directions.getDestination()) {
                        $scope.directions.query();
                    }

                    if ($scope.currentJE.job.id && $scope.currentJE.job.id != locale._leaflet_id) {
                        $scope.currentJE.job = {
                            id: locale._leaflet_id,
                            properties: locale.feature.properties
                        };
                        $scope.currentJE.employee = [];
                        $scope.currentJEentry = [];
                    } else {
                        $scope.currentJE.job = {
                            id: locale._leaflet_id,
                            properties: locale.feature.properties
                        };
                    }


                } else {
                    if ($scope.directions.getOrigin()) {
                        if ($scope.directions.getDestination()) {
                            $scope.directionsLayer.removeLayer($scope.directionsLayer.destinationMarker);
                        }

                        $scope.directions.setDestination(locale.getLatLng());
                        $scope.directions.query();
                    }
                    if ($.inArray(locale._leaflet_id, $scope.currentJEentry) == -1) {
                        var emp = {
                            id: locale._leaflet_id,
                            properties: locale.feature.properties
                        };
                        $scope.currentJE.employee.push(emp);
                        $scope.currentJEentry.push(locale._leaflet_id);
                    }
                }
            });
            locale.bindPopup(popup);
            locale.on('mouseover', function(e) {
                locale.openPopup(popup);
            });

            locale.on('mouseout', function(e) {
                locale.closePopup(popup);
            });
        });
    };




    /* -------------------- mapbox direction -------------------- */
    $scope.format = function(waypoint) {
        if (!waypoint) {
            return '';
        } else if (waypoint.properties.name) {
            return waypoint.properties.name;
        } else if (waypoint.geometry.coordinates) {
            var precision = Math.max(0, Math.ceil(Math.log($scope.ctmap.getZoom()) / Math.LN2));
            return waypoint.geometry.coordinates[0].toFixed(precision) + ', ' +
                waypoint.geometry.coordinates[1].toFixed(precision);
        } else {
            return waypoint.properties.query || '';
        }
    };

    $scope.imperial = function(m) {
        var mi = m / 1609.344;
        if (mi >= 100) {
            return mi.toFixed(0) + ' mi';
        }
        if (mi >= 10) {
            return mi.toFixed(1) + ' mi';
        }
        if (mi >= 0.1) {
            return mi.toFixed(2) + ' mi';
        }
        return (mi * 5280).toFixed(0) + ' ft';
    };

    $scope.duration = function(s) {
        var m = Math.floor(s / 60),
            h = Math.floor(m / 60);
        s %= 60;
        m %= 60;
        if (h === 0 && m === 0) {
            return s + ' s';
        }
        if (h === 0) {
            return m + ' min';
        } {
            return h + ' h ' + m + ' min';
        }
    };

    /* -------------------- mapbox direction ends -------------------- */

   /* $scope.showPopUpJob = function(index, leafid) {
        var locale = {};
        locale = $scope.ctmap.featureLayer.getLayer(leafid);
        $scope.defaultJobIndex = index;
        if ($scope.currentJE.job.id && $scope.currentJE.job.id != locale._leaflet_id) {
            $scope.currentJE.job = {
                id: locale._leaflet_id,
                properties: locale.feature.properties
            };
            $scope.currentJE.employee = [];
            $scope.currentJEentry = [];
        } else {
            $scope.currentJE.job = {
                id: locale._leaflet_id,
                properties: locale.feature.properties
            };
        }
        $scope.pushMapDatas();
    };*/
    $scope.showPopUp = function(index) {
        var locale = {};
        locale = $scope.ctmap.featureLayer.getLayer(index);
        $scope.currEmpLeafId = index;

        if (locale.feature.nature == 'jobs') {
            if ($scope.directions.getOrigin()) {
                $scope.directionsLayer.removeLayer($scope.directionsLayer.originMarker);
            }
            $scope.directions.setOrigin(locale.getLatLng());

            if ($scope.directions.getDestination()) {
                $scope.directions.query();
            }

            if ($scope.currentJE.job.id && $scope.currentJE.job.id != locale._leaflet_id) {
                $scope.currentJE.job = {
                    id: locale._leaflet_id,
                    properties: locale.feature.properties
                };
                $scope.currentJE.employee = [];
                $scope.currentJEentry = [];
            } else {
                $scope.currentJE.job = {
                    id: locale._leaflet_id,
                    properties: locale.feature.properties
                };
            }


        } else {
            if ($scope.directions.getOrigin()) {
                if ($scope.directions.getDestination()) {
                    $scope.directionsLayer.removeLayer($scope.directionsLayer.destinationMarker);
                }

                $scope.directions.setDestination(locale.getLatLng());
                $scope.directions.query();

                if ($.inArray(locale._leaflet_id, $scope.currentJEentry) == -1) {
                    var emp = {
                        id: locale._leaflet_id,
                        properties: locale.feature.properties
                    };
                    $scope.currentJE.employee.push(emp);
                    $scope.currentJEentry.push(locale._leaflet_id);
                }
            }

        }
        $scope.ctmap.setView(locale.getLatLng(), 8);
        locale.openPopup();
        return false;
    };

    $scope.callMap();
        $scope.$watch('reportFilters.zone', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.reportFilters.job = '';

            }


        });
    $scope.selectZone = {
        multiple: true,
        query: function(query) {
            var data = {
                results: []
            };

            $scope.reportFilters.job = '';
             $scope.zoneObj = {
                        fields: "zone_name,zone_code,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'zone_name asc',
                        limit: 5
            };
            if (query.term) {
                $scope.zoneObj.filter += " and zone_name like '%" + query.term + "%'";
            }
            Services.employeeZones.get($scope.zoneObj, function(remoteData) {
                items = remoteData.record;
                if (items.length < 1) {
                    query.callback(data);
                }
                angular.forEach(items, function(item, key) {
                    data.results.push({
                        "text": item.zone_name,
                        "id": item.id,
                        "code": item.zone_code
                    });
                    query.callback(data);
                });

            });

        },
        initSelection: function(element, callback) {}
    };
    $scope.selectJob = {
        query: function(query) {
            var data = {
                results: []
            };

            $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
            $scope.zone_id = $scope.zone_nameid.Code;
            $scope.zone_name = $scope.zone_nameid.Code_Name;
            $scope.jobObj = {
                fields: "id,job_name,job_code",
                filter: "job_zone in(" + $scope.zone_id + ") and status > 0 and agency_id = " + Services.getAgencyID(),
                order: "job_name asc",
                limit: 5
            };
            if (query.term) {
                $scope.jobObj.filter += " and (job_name like '%" + query.term + "%')";
            }
            Services.jobService.get($scope.jobObj, function(remoteData) {
                items = remoteData.record;
                if (items.length < 1) {
                    query.callback(data);
                }
                angular.forEach(items, function(item, key) {
                    data.results.push({
                        "text": item.job_name,
                        "id": item.id,
                        "code": item.job_code
                    });
                    query.callback(data);
                });

            });
        },
        initSelection: function(element, callback) {}

    };


    $scope.sortMe = function(fieldName, thisClass) {

        jQuery(".sortable i").addClass("fa-sort");
        jQuery(".sortable i").removeClass("fa-sort-desc");
        jQuery(".sortable i").removeClass("fa-sort-up");
        $scope.sortme = true;
        $scope.sortField = fieldName;


        if ($scope.sortType == "asc") {
            $scope.sortType = "desc";
            jQuery("." + thisClass + " i").removeClass("fa-sort");
            jQuery("." + thisClass + " i").removeClass("fa-sort-up");
            jQuery("." + thisClass + " i").addClass("fa-sort-desc");
        } else if ($scope.sortType == "desc") {
            $scope.sortType = "asc";
            jQuery("." + thisClass + " i").removeClass("fa-sort");
            jQuery("." + thisClass + " i").removeClass("fa-sort-desc");
            jQuery("." + thisClass + " i").addClass("fa-sort-up");
        }

        $scope.newdetails = {};
        var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
        var filterObj = {
            'fields': 'employee_code,long_lat,location_smart,log_type,id,job_code,timestamp',
            'limit': $scope.call_limit,
            'include_count': true,
            'order': $scope.sortField + ' ' + $scope.sortType,
            'filter': "timestamp >='" + fdate + "' and timestamp <='" + ldate + "' and (long_lat<>'' or location_smart<>'') and   Job_code = '" + $scope.reportFilters.job.code + "' and agency_id = " + Services.getAgencyID() 
        };
        
         Services.timeLog.get(filterObj, function(data) {
            if (data.meta.count > 0) {

                $scope.empNameList = {};
                $scope.empCode = HelperService.getAsArray(data.record, "employee_code");

                $scope.empFilterObj = {
                    'include_count': true,
                    'fields': 'first_name,last_name,access_code',
                    'filter': 'access_code  IN (' + $scope.empCode + ')  and agency_id = ' + Services.getAgencyID()
                };
                Services.employeeService.get($scope.empFilterObj, function(employeenameresult) {

                    angular.forEach(employeenameresult.record, function(value, key) {
                        if (value.access_code) {
                            $scope.empNameList[value.access_code] = value.last_name + ', ' + value.first_name + ' (' + value.access_code + ')';
                        }
                    });

                    // $scope.employeePlace = [];
                    $scope.timelogcoords = {};
                    $scope.timelogcoords.long = "";
                    $scope.timelogcoords.lat = "";
                    angular.forEach(data.record, function(item) {
                        coords = false;
                        if (item.long_lat) {
                            color = (item.log_type == 1 ? "#1C3F00" : "#0000FF");
                            $scope.timelogcoords = (item.long_lat) ? JSON.parse(item.long_lat) : "";
                            coords = true;
                        } else {
                            color = (item.log_type == 1 ? "#A0C33A" : "#23B7E5");
                            location_smart = (item.location_smart) ? JSON.parse(item.location_smart) : "";
                            if (!angular.isUndefined(location_smart.success) && location_smart.success) {
                                $scope.timelogcoords.long = location_smart.geoAddress.coordinates[0];
                                $scope.timelogcoords.lat = location_smart.geoAddress.coordinates[1];
                                coords = true;
                            }


                        }
                        if (coords) {

                            //console.log(color);
                            var buildMaplogData = {};
                            buildMaplogData = {
                                "nature": "log",
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        $scope.timelogcoords.long,
                                        $scope.timelogcoords.lat
                                    ]
                                },
                                "properties": {
                                    "id": item.id,
                                    "jobcode": $scope.reportFilters.job.text + ' (' + item.job_code + ')',
                                    "empcode": $scope.empNameList[item.employee_code],
                                    "timestamp": HelperService.formatingDate(item.timestamp,$localStorage.user_info.country),
                                    "logtype": HelperService.logType(item.log_type),
                                    "location": "https://www.google.com/maps?q=" + $scope.timelogcoords.lat + "," + $scope.timelogcoords.long,
                                    "marker-color": color,
                                    "marker-size": "medium",
                                }
                            };
                            $scope.logMapList.push(buildMaplogData);
                        }
                    });
                    $scope.logMapListOrg = $scope.logMapList;
                    $scope.pushMapDatas();
                });
            } else {
                $scope.pushMapDatas();

            }
        });
        $rootScope.$broadcast('empty-routes');
    };


    $scope.updateTableData = function(isFilter) { // on limit change
        var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
        var filterObj = {
            'fields': 'employee_code,long_lat,location_smart,log_type,id,job_code,timestamp',
            'limit': $scope.call_limit,
            'include_count': true,
            'order': 'id desc',
            'filter': "timestamp >='" + fdate + "' and timestamp <='" + ldate + "' and (long_lat<>'' or location_smart<>'') and   Job_code = '" + $scope.reportFilters.job.code + "' and agency_id = " + Services.getAgencyID() 
        };
        
        Services.timeLog.get(filterObj, function(data) {
            if (data.meta.count > 0) {

                $scope.empNameList = {};
                $scope.empCode = HelperService.getAsArray(data.record, "employee_code");

                $scope.empFilterObj = {
                    'include_count': true,
                    'fields': 'first_name,last_name,access_code',
                    'filter': 'access_code  IN (' + $scope.empCode + ')  and agency_id = ' + Services.getAgencyID()
                };
                
                Services.employeeService.get($scope.empFilterObj, function(employeenameresult) {

                    angular.forEach(employeenameresult.record, function(value, key) {
                        if (value.access_code) {
                            $scope.empNameList[value.access_code] = value.last_name + ', ' + value.first_name + ' (' + value.access_code + ')';
                        }
                    });

                    // $scope.employeePlace = [];
                    $scope.timelogcoords = {};
                    $scope.timelogcoords.long = "";
                    $scope.timelogcoords.lat = "";
                    angular.forEach(data.record, function(item) {
                        coords = false;
                        if (item.long_lat) {
                            color = (item.log_type == 1 ? "#1C3F00" : "#0000FF");
                            $scope.timelogcoords = (item.long_lat) ? JSON.parse(item.long_lat) : "";
                            coords = true;
                        } else {
                            color = (item.log_type == 1 ? "#A0C33A" : "#23B7E5");
                            location_smart = (item.location_smart) ? JSON.parse(item.location_smart) : "";
                            if (!angular.isUndefined(location_smart.success) && location_smart.success) {
                                $scope.timelogcoords.long = location_smart.geoAddress.coordinates[0];
                                $scope.timelogcoords.lat = location_smart.geoAddress.coordinates[1];
                                coords = true;
                            }


                        }
                        if (coords) {

                            //console.log(color);
                            var buildMaplogData = {};
                            buildMaplogData = {
                                "nature": "log",
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        $scope.timelogcoords.long,
                                        $scope.timelogcoords.lat
                                    ]
                                },
                                "properties": {
                                    "id": item.id,
                                    "jobcode": $scope.reportFilters.job.text + ' (' + item.job_code + ')',
                                    "empcode": $scope.empNameList[item.employee_code],
                                    "timestamp": HelperService.formatingDate(item.timestamp,$localStorage.user_info.country),
                                    "logtype": HelperService.logType(item.log_type),
                                    "location": "https://www.google.com/maps?q=" + $scope.timelogcoords.lat + "," + $scope.timelogcoords.long,
                                    "marker-color": color,
                                    "marker-size": "medium",
                                }
                            };
                            $scope.logMapList.push(buildMaplogData);
                        }
                    });
                    $scope.logMapListOrg = $scope.logMapList;
                    $scope.pushMapDatas();
                });
            } else {
                $scope.pushMapDatas();

            }
        });

    };

}]);