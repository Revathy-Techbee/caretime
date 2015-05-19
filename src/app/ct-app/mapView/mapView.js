angular.module('ctApp.mapView', [
    'ui.router',
    'ui.select2'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.mapView', {
        url: '/mapView',
        views: {
            "appNested": {
                controller: 'MapViewCtrl',
                templateUrl: 'ct-app/mapView/mapView.tpl.html'
            }
        },
        data: {
            pageTitle: 'MapView',
            access: access.mapView
        }
    });

}])
   
.controller("MapViewCtrl", ["$scope", "$rootScope", "Services", "$modal","$localStorage", function($scope, $rootScope, Services, $modal,$localStorage) {

	 $scope.sortType = "asc";
    $scope.sortme = false;
	 $scope.filterTerm='';
     if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.filterTerm={"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["zone_code"]};
            
        });
            
    }
	 $scope.filterJob = '';
	
    $scope.jobsortType = "asc";
    $scope.jobsortme = false;

    $scope.defaultJobIndex = 0;
    $scope.jobLocations = {};
    $scope.jobsMapList = [];
    $scope.empMapList = [];

    $scope.ctmapBaseLat = 36.982371;
    $scope.ctmapBaseLon = -76.631066;

    $scope.jobsMapListSelected = [];
    $scope.geojsonData = {
        "type": "FeatureCollection",
        "features": []
    };
    var filterQuery;

    $scope.searchAlert = true;
    $scope.longitude = -77.57968699999998;
    $scope.lattitude = 36.636016;
    $scope.zoom = 14;
    $scope.filterState = {};
    $scope.filterState.text = "";
 
    $scope.getRecords = function() {


        if (!$scope.filterJob || $scope.filterJob.id === "" ) {
            $scope.searchAlert = true;

        } else {

            filterQuery = {
                filter: "id = '" + $scope.filterJob.id + "' and status > 0 and agency_id = " + Services.getAgencyID(),
                "order": "id desc",
                "include_count": true
            };

            Services.jobService.get(filterQuery, function(data) {
                $scope.jobPlace = [];
                $scope.farmersMarkets = [];
                $scope.coords = {};
                $scope.coords.long = "";
                $scope.coords.lat = "";
                $scope.jobsMapList = [];
                $scope.JobDetailList = data.record;

                angular.forEach(data.record, function(item) {
                    try
                    {
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
                                    "marker-color": "#ff0000",
                                    "marker-size": "medium",
                                }
                            };
                            $scope.jobsMapList.push(buildMapJobData);
                        }
                    }
                    catch (e) {
                    
                    }
                });


                $scope.jobLocations = $scope.jobsMapList;
                if ($scope.jobLocations && $scope.jobLocations.length > 0) {
                    $scope.searchAlert = false;
                    $scope.updateTableData();
                } else {
                    alert("Geo Coordinates not found for this Job");
                }
                $scope.newdetails = {};
                $rootScope.$broadcast('empty-routes');
            });
        }
    };

    $scope.clearSearch = function() {
        $scope.filterTerm = '';
        if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.filterTerm={"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["zone_code"]};
            
        });
    }
        $scope.filterJob = '';
        $scope.searchAlert = true;
        $scope.employeePlace = "";
        $scope.jobLocations = "";
        $scope.testingpp = [];
        $scope.empMapList = [];
         $scope.newdetails = {};
        $scope.jobsMapList = [];

        $scope.jobsMapListSelected = [];
        $scope.ctmapBaseLat = 36.982371;
        $scope.ctmapBaseLon = -76.631066;

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

            angular.forEach($scope.empMapListOrg, function(item) {
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
 
        
      /*  L.mapbox.accessToken = 'pk.eyJ1IjoicmV2YXRoeXRlY2hiZWUiLCJhIjoiejhzYWFtYyJ9.fIp2rBpmfJXXBnWuHGWFbA';
        $scope.ctmap =L.mapbox.map('map', 'revathytechbee.kgfb40bk',*/
            
     /*   L.mapbox.accessToken = 'pk.eyJ1IjoiY2FyZXRpbWUiLCJhIjoiZDhjOXJzSSJ9.dI_TzE3cz_AJ5tKGLusMEQ';
        $scope.ctmap = L.mapbox.map('map', 'caretime.l2g9fo5i',*/

        L.mapbox.accessToken = 'pk.eyJ1IjoicmFqaXZwZXJlcmEiLCJhIjoieXJCdTNqNCJ9.yJ8QUKYss4WEM8zxqTHq0Q';
        $scope.ctmap = L.mapbox.map('map', 'rajivperera.jo4glk0p',
        {
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
                'marker-color': '#2E3B0B',
                'marker-symbol': 'j'
            })
        });

        $scope.directionsLayer.destinationMarker = L.marker([0, 0], {
            draggable: false,
            icon: L.mapbox.marker.icon({
                'marker-size': 'large',
                'marker-color': '#1B0A2A',
                'marker-symbol': 'e'
            })
        });



        var directionsInputControl = L.mapbox.directions.inputControl('inputs', $scope.directions)
            .addTo($scope.ctmap);


        $scope.directions.on('click', function(e) {

        });


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
        $scope.empMapList = [];
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

            if (locale.feature.nature == "employees") {
                var empVar = {};
                empVar.properties = locale.feature.properties;
                empVar.leafletid = locale._leaflet_id;
                $scope.empMapList.push(empVar);
                popup = '<h3>Employee: ' + prop.name + '</h3><div>' + prop.address1 + ', ' + prop.state + ', ' + prop.zip;
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

    $scope.addshift = function(empid) {
        $scope.addEvent($scope.filterTerm, $scope.filterJob, empid);

    };

    $scope.addEvent = function(zone, job, empid) {


        var shiftId = "";
        var shiftCode = "";
          Services.setModelMapView({
                "zone": zone,
                "job": job,
                "empid": {
                    "text": empid.properties.name,
                    "id": empid.properties.id,
                    "code": empid.properties.code
                }
            });

        $scope.modalInstance = $modal.open({
            templateUrl: 'ct-app/schedules/add-update-schedule.tpl.html',
            size: 'lg',
            controller: "AddUpdateScheduleCtrl"

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

    $scope.showPopUpJob = function(index, leafid) {
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
    };
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


            //$scope.currentJE.job = locale;
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

    $scope.selectOptions = {
        query: function(query) {
            var data = {
                results: []
            };
       	 $scope.filterJob = '';
         $scope.zoneObj = {
                        fields: "zone_name,zone_code",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'zone_name asc',
                        limit: 20
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
                        "id": item.zone_code
                    });
                    query.callback(data);
                });

            });
        },
         initSelection: function(element, callback) {
                if (!angular.isUndefined($scope.filterTerm) && !angular.isUndefined($scope.filterTerm.id) && $scope.filterTerm.id) {
                    return callback({
                        "text": $scope.filterTerm.text,
                        "id": $scope.filterTerm.id
                    });
                }
            }
    };


    $scope.selectJob = {
        query: function(query) {
            var data = {
                results: []
            };
            $scope.jobObj={
                             fields:"job_name,job_code,id",
                             filter: "status > 0  and job_zone =" + $scope.filterTerm.id +" and agency_id = " + Services.getAgencyID(),
                             order: 'job_name asc',
                             limit: 20
                        };
                        if(query.term)
                        {
                            $scope.jobObj.filter+=' and job_name like "%' + query.term + '%"';
                        }
            Services.jobService.get($scope.jobObj, function(remoteData) {
                items = remoteData.record;
                if (items.length < 1) {
                    query.callback(data);
                }

                angular.forEach(items, function(item, key) {
                    data.results.push({
                        "text": item.job_name + " - " + item.job_code,
                        "id": item.id
                    });
                    query.callback(data);
                });

            });
        },initSelection: function(element, callback) {
                
            }
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

        filterQuery = {
                fields:"first_name,last_name,access_code,primary_address1,primary_city,primary_state,primary_zip,primary_phone,long_lat,id",
                filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                "order": $scope.sortField + ' ' + $scope.sortType
            };

        if ($scope.filterState.text === "") {
          
                filterQuery.filter=filterQuery.filter +" and zone_id = '" + $scope.filterTerm.id + "'";
               
           
        } else {
            
                filterQuery.filter=filterQuery.filter +" and zone_id = '" + $scope.filterTerm.id + "' and primary_state ='" + $scope.filterState.text + "'";
               
        }

        Services.employeeService.get(filterQuery, function(data) {

            $scope.employeePlace = [];
            $scope.empcoords = {};
            $scope.empcoords.long = "";
            $scope.empcoords.lat = "";
            $scope.empMapList = [];
            angular.forEach(data.record, function(item) {
                try
                {
                    $scope.empcoords = (item.long_lat) ? JSON.parse(item.long_lat) : "";
                    if (!angular.isUndefined($scope.empcoords.long)) {
                        $scope.employeePlace.push({
                            name: item.last_name + ', ' + item.first_name,
                            code: item.access_code,
                            address1: item.primary_address1,
                            coords: $scope.empcoords,
                            city: item.primary_city,
                            state: item.primary_state,
                            zip: item.primary_zip,
                            phone: item.primary_phone
                        });
                        var buildMapEmpData = {};
                        buildMapEmpData = {
                            "nature": "employees",
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    $scope.empcoords.long,
                                    $scope.empcoords.lat
                                ]
                            },
                            "properties": {
                                "name": item.last_name + ', ' + item.first_name,
                                "code": item.access_code,
                                "id": item.id,
                                "address1": item.primary_address1,
                                "city": item.primary_city,
                                "state": item.primary_state,
                                "zip": item.primary_zip,
                                "marker-color": "#3333FF",
                                "marker-size": "medium",
                            }
                        };
                        $scope.empMapList.push(buildMapEmpData);
                    }
                }
                catch (e) {
                
                }
            });
        });
    };

    $scope.sortMejob = function(jobfieldName, thisClas) {

        jQuery(".sortab i").addClass("fa-sort");
        jQuery(".sortab i").removeClass("fa-sort-desc");
        jQuery(".sortab i").removeClass("fa-sort-up");
        $scope.jobsortme = true;
        $scope.jobsortField = jobfieldName;


        if ($scope.jobsortType == "asc") {
            $scope.jobsortType = "desc";
            jQuery("." + thisClas + " i").removeClass("fa-sort");
            jQuery("." + thisClas + " i").removeClass("fa-sort-up");
            jQuery("." + thisClas + " i").addClass("fa-sort-desc");
        } else if ($scope.jobsortType == "desc") {
            $scope.jobsortType = "asc";
            jQuery("." + thisClas + " i").removeClass("fa-sort");
            jQuery("." + thisClas + " i").removeClass("fa-sort-desc");
            jQuery("." + thisClas + " i").addClass("fa-sort-up");
        }
        filterQuery = {
                fields:"job_name,job_code,job_address1,job_state,job_city,job_zip,long_lat",
                filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                    "order": $scope.jobsortField + ' ' + $scope.jobsortType
                };

        if ($scope.filterState.text === "") {
            filterQuery.filter= filterQuery.filter +" and job_zone = '" + $scope.filterTerm.id + "'";
                    
        } else {
             filterQuery.filter= filterQuery.filter + " and job_zone = '" + $scope.filterTerm.id + "' and job_state ='" + $scope.filterState.text + "'";
               
        }
        Services.jobService.get(filterQuery, function(data) {
            $scope.jobPlace = [];
            $scope.coords = {};
            $scope.coords.long = "";
            $scope.coords.lat = "";
            $scope.jobsMapList = [];
            angular.forEach(data.record, function(item) {
                try
                {
                    $scope.coords = (item.long_lat) ? JSON.parse(item.long_lat) : "";
                    if (!angular.isUndefined($scope.coords.long)) {
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
                                "marker-color": "#ff0000",
                                "marker-size": "medium",
                            }
                        };
                        $scope.jobsMapList.push(buildMapJobData);
                    }
                }
                catch (e) {
                
                }
            });
        });



    };


    $scope.updateTableData = function(isFilter) { // on limit change

        var filterObj = {
                'fields':"id,access_code,first_name,last_name,long_lat,primary_address1,primary_city,primary_state,primary_zip,primary_phone",
                'filter': 'status=1 and agency_id = ' + Services.getAgencyID(),
                'include_count': true,
                'order': 'id desc'
            };
        if ($scope.filterState.text === "") {
            filterObj.filter=filterObj.filter +' and zone_id = "' + $scope.filterTerm.id + '"';
           
        } else {
            filterObj.filter=filterObj.filter + " and zone_id = '" + $scope.filterTerm.id + "' and primary_state ='" + $scope.filterState.text + "'";
                
            
        }

        Services.employeeService.get(filterObj, function(data) {
            $scope.employeeDetailList = data.record;

            $scope.employeePlace = [];
            $scope.empcoords = {};
            $scope.empcoords.long = "";
            $scope.empcoords.lat = "";
            angular.forEach(data.record, function(item) {
                try
                {
                    $scope.empcoords = (item.long_lat) ? JSON.parse(item.long_lat) : "";
                    if (!angular.isUndefined($scope.empcoords.long)) {
                         var buildMapEmpData = {};
                        buildMapEmpData = {
                            "nature": "employees",
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    $scope.empcoords.long,
                                    $scope.empcoords.lat
                                ]
                            },
                            "properties": {
                                "name": item.last_name + ', ' + item.first_name,
                                "code": item.access_code,
                                "id": item.id,
                                "address1": item.primary_address1,
                                "city": item.primary_city,
                                "state": item.primary_state,
                                "zip": item.primary_zip,
                                "marker-color": "#3333FF",
                                "marker-size": "medium",
                            }
                        };
                        $scope.empMapList.push(buildMapEmpData);
                    }
                }
                catch (e) {
                
                }
            });
            $scope.empMapListOrg = $scope.empMapList;
            $scope.pushMapDatas();
        });

    };

}]);