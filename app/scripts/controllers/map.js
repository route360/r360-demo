'use strict';

/**
 * @ngdoc function
 * @name r360DemoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Map Controller of the r360DemoApp
 */
angular.module('r360DemoApp')
    .controller('MapCtrl', function($scope, $routeParams, $location, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, $http, $q, $mdToast) {

        // ------------
        // GENERAL SETUP
        // ------------
        $scope.pageClass = 'map-page';

        // ------------
        // CONTROLS SETUP
        // ------------

        $scope.togglePrefs = buildToggler('prefs');
        $scope.toggleOptions = buildToggler('options');

        $scope.prefsOpen = false;
        $scope.optsOpen = false;

        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID).toggle()
            }, 100);
            return debounceFn;
        };

        function showToast(message) {
            $mdToast.show(
              $mdToast.simple()
                .content(message)
                .position('top right')
                .hideDelay(3000)
            );
        }

        // ------------
        // R360 SETUP
        // ------------

        var now = new Date();
        var hour = now.getHours();
        var minute = (now.getMinutes() + (5 - now.getMinutes() % 5)) % 60;

        if (minute == 0) {
            hour++
        };
        if (hour == 24) {
            hour = 0
        };

        $scope.options = {
            "cityID": 0,
            "travelTime": 30,
            "travelTimeRangeID": 0,
            "travelType": "bike",
            "queryDate": now,
            "queryTime": {
                "h": hour,
                "m": minute
            },
            "colorRangeID": 0,
            "mapProvider": "osm",
            "sourceMarkers": [],
            "maxSourceMarkers" : 3,
            "targetMarkers": [],
            "maxTargetMarkers" : 3,
            "groups" : [],
            "intersection": "union",
            "strokeWidth": 30,
            "extendWidth": 100,
            "backgroundColor": 'black',
            "backgroundOpacity": 0,
            "offset": {
                "x": 0,
                "y": 0
            },
            "minPolygonHoleSize": 1000000,
            "placesLimit" : 100,
        };

        $scope.prefs = {
            "cities": [{
                "id"    : 0,
                "name"  : "Berlin",
                "latlng": [52.516389, 13.377778],
                "url"   : "https://api.route360.net/api_dev/",

            }, {
                "id"    : 1,
                "name"  : "Oslo",
                "latlng": [59.8938549,10.7851165],
                "url"   : "https://api1-eu.route360.net/norway/"
            }, {
                "id"    : 2,
                "name": "Paris",
                "latlng": [48.8588589,2.3475569],
                "url"   : "https://api2-eu.route360.net/france/"
            }, {
                "id"    : 3,
                "name": "Vancouver",
                "latlng": [49.2561267,-123.1239135],
                "url"   : "https://api-us.route360.net/canada/"
            }, {
                "id"    : 4,
                "name": "Copenhagen",
                "latlng": [55.6712674,12.5608388],
                "url"   : "https://api1-eu.route360.net/denmark/"
            }, {
                "id"    : 5,
                "name": "London",
                "latlng": [51.5286416,-0.1015987],
                "url"   : "https://api1-eu.route360.net/britishisles/"
            }, {
                "id"    : 6,
                "name": "Zurich",
                "latlng": [47.377455,8.536715],
                "url"   : "https://api2-eu.route360.net/switzerland/"
            }, {
                "id"    : 7,
                "name": "Vienna",
                "latlng": [48.2206849,16.3800599],
                "url"   : "https://api2-eu.route360.net/austria/"
            }, {
                "id"    : 8,
                "name": "New York",
                "latlng": [40.7033127,-73.979681],
                "url"   : "https://api-us.route360.net/na_northeast/"
            }],
            "travelTypes": [{
                "name": "Bike",
                "icon": "fa-bicycle",
                "value": "bike",
                "preselected": true
            }, {
                "name": "Walk",
                "icon": "fa-male",
                "value": "walk",
                "preselected": false
            }, {
                "name": "Car",
                "icon": "fa-car",
                "value": "car",
                "preselected": false
            }, {
                "name": "Transit",
                "icon": "fa-bus",
                "value": "transit",
                "preselected": false
            }],
            "queryTimeRange": {
                "hour": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                "minute": [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
            },
            "mapProviderList": [{
                "name": "OpenStreetMaps",
                "value": "osm"
            }, {
                "name": "Google Maps",
                "value": "google"
            }],
            "intersectionTypes": [{
                "name": "Union",
                "value": "union"
            }, {
                "name": "Intersection",
                "value": "intersection"
            }, {
                "name": "Average",
                "value": "average"
            }, ],
            "travelTimeRanges" : [{
                "name" : "5 Min - 30 Min",
                "id"   : 0,
                "times": [5,10,15,20,25,30]
                }, {
                "name" : "10 Min - 60 Min",
                "id"   : 1,
                "times": [10,20,30,40,50,60]
                }, {
                "name" : "20 Min - 120 Min",
                "id"   : 2,
                "times": [20,40,60,80,100,120]
                }
            ], 
            "colorRanges" : [{
                "name"  : "Green to Red",
                "id"    : 0,
                "colors": ["#006837","#39B54A","#8CC63F","#F7931E","#F15A24","#C1272D"],
                "opacities" : [1,1,1,1,1,1]
                }, {
                "name"  : "Colorblind",
                "id"    : 1,
                "colors": ["#23419A","#4525AB","#9527BC","#CE29A8","#DF2A5C","#F0572C"],
                "opacities" : [1,1,1,1,1,1]
                }, {
                "name"  : "Black and White",
                "id"    : 2,
                "colors": ["#d2d2d2","#b2b2b2","#999999","#777777","#555555","#333333"],
                "opacities" : [1,0.8,0.6,0.4,0.2,0]
                }, {
                "name"  : "Inverse Mode",
                "id"    : 3,
                "colors": ["#d2d2d2","#b2b2b2","#999999","#777777","#555555","#333333"],
                "opacities" : [0,0,0,0,0,0]
                }
            ],
            "pois" : [{
                "name"  : "Supermarkets",
                "value" : "osm:shop='supermarket'",
                "icon"  : "",
                "selected" : false
            }, {
                "name"  : "ATMs",
                "value" : "osm:amenity='atm'",
                "icon"  : "",
                "selected" : false
            }, {
                "name"  : "Restaurants",
                "value" : "osm:amenity='restaurant'",
                "icon"  : "",
                "selected" : false
            }]
        };

        $scope.states = {
            "requestPending" : false
        }

        // Update Options from GET Params

        for(var index in $routeParams) {

            var value = $routeParams[index];

            switch (index) {
                case "cityID" :
                case "travelTime" :
                case "travelTimeRangeID" :
                case "colorRangeID" :
                case "mapProvider" :
                case "maxSourceMarkers" :
                case "maxTargetMarkers" :
                case "strokeWidth" :
                case "extendWidth" :
                case "backgroundColor" :
                case "backgroundOpacity" :
                case "minPolygonHoleSize" :
                case "placesLimit" :
                    $scope.options[index] = parseInt(value);
                    break;
                case "travelType" :
                case "intersection" :
                    $scope.options[index] = value;
                    break;
                case "sources":
                case "targets":
                    break;
                default:
                    showToast('Parameter not valid');
                    break;
            }
        }

        r360.config.requestTimeout = 10000;
        r360.config.serviceUrl = $scope.prefs.cities[$scope.options.cityID].url;
        r360.config.serviceKey = "OOWOFUK3OPHLQTA8H5JD";
        r360.config.i18n.language = "de";


        $scope.map = L.map('map', {
            zoomControl: false,
            scrollWheelZoom: true,
            contextmenu: true,
            contextmenuWidth: 140,
            contextmenuItems: [{
                text: 'New Source',
                callback: addSourceMarkerFromContext,
                iconFa: 'fa-home'
            }, {
                text: 'New Target',
                callback: addTargetMarkerFromContext,
                iconFa: 'fa-star'
            }]
        }).setView($scope.prefs.cities[$scope.options.cityID].latlng, 13);
        var attribution = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox © OpenStreetMap</a> | ÖPNV Daten © <a href='http://www.vbb.de/de/index.html' target='_blank'>VBB</a> | developed by <a href='http://www.route360.net/de/' target='_blank'>Route360°</a>";
        L.tileLayer('https://a.tiles.mapbox.com/v3/mi.0ad4304c/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: attribution
        }).addTo($scope.map);
        L.control.scale({
            metric: true,
            imperial: false
        }).addTo($scope.map);

        var lastRelatedTarget;

        $scope.map.on("contextmenu.show", function(e) {
            lastRelatedTarget = e.relatedTarget;
        });

        $scope.layerGroups = {
            markerLayerGroup: L.featureGroup().addTo($scope.map),
            routeLayerGroup: L.featureGroup().addTo($scope.map),
            reachableLayerGroup: L.featureGroup().addTo($scope.map),
            polygonLayerGroup: r360.leafletPolygonLayer().addTo($scope.map)
        };

        // parse URL params to options object

        if (typeof $routeParams['sources'] != 'undefined') {
            var array = $routeParams['sources'].split(";");
            array.forEach(function(elem,index,array){
                var coords = elem.split(",");
                coords[0] = parseFloat(coords[0]);
                coords[1] = parseFloat(coords[1]);
                addMarker(coords, 'source', false);
            });

            getPolygons();
        }

        if (typeof $routeParams['targets'] != 'undefined' && $routeParams['targets'] instanceof Array) {
            var array = $routeParams['targets'].split(";");
            console.log(array);
            array.forEach(function(elem,index,array){
                var coords = elem.split(",");
                coords[0] = parseFloat(coords[0]);
                coords[1] = parseFloat(coords[1]);
                addMarker(coords, 'target', false);
            });

            getRoutes();
        }

        if (typeof $routeParams['sources'] === 'undefined' && typeof $routeParams['targets'] === 'undefined' ) addMarker($scope.prefs.cities[$scope.options.cityID].latlng, 'source');

        $scope.flyTo = flyTo;

        function flyTo(cityID) {
            $location.search('cityID', cityID);
            removeAllMarkers();
            r360.config.serviceUrl = $scope.prefs.cities[cityID].url;
            $scope.map.setView($scope.prefs.cities[cityID].latlng,10,{animate:true, duration: 1});
            addMarker($scope.prefs.cities[cityID].latlng,'source');
        }

        function addSourceMarkerFromContext(e) {
            addMarker(e.latlng, 'source');
        }

        function addTargetMarkerFromContext(e) {
            addMarker(e.latlng, 'target');
        }

        function addMarker(coords, type, refresh) {

            if (typeof refresh === 'undefined') { refresh = true; }

            var markerArray = undefined;
            var markerIcon = undefined;
            var markerLayerGroup = $scope.layerGroups.markerLayerGroup;

            switch (type) {
                case 'source':
                    if ($scope.options.sourceMarkers.length >= $scope.options.maxSourceMarkers) {
                        showToast('Maximum number of source Markers reached (' + $scope.options.maxSourceMarkers + ")");
                        return;
                    };
                    markerArray = $scope.options.sourceMarkers;
                    markerIcon = L.AwesomeMarkers.icon({
                        icon: 'fa fa-home',
                        prefix: 'fa',
                        markerColor: 'blue'
                    })
                    break;
                case 'target':
                    if ($scope.options.targetMarkers.length >= $scope.options.maxTargetMarkers) {
                        showToast('Maximum number of target Markers reached (' + $scope.options.maxSourceMarkers + ")");
                        return;
                    };
                    markerArray = $scope.options.targetMarkers;
                    markerIcon = L.AwesomeMarkers.icon({
                        icon: 'fa fa-star',
                        prefix: 'fa',
                        markerColor: 'red'
                    })
                    break;
                default:
                    console.log('addMarker error');
                    showToast('The Marker could not be added');
                    break;
            }

            var newMarker = L.marker(coords, {
                    draggable: true,
                    icon: markerIcon,
                    contextmenu: true,
                    contextmenuItems: [{
                        text: 'Delete Marker',
                        callback: removeMarkerFromContext,
                        index: 0,
                        iconFa: 'fa-times-circle'
                    }, {
                        separator: true,
                        index: 1
                    }]
                })
                .addTo(markerLayerGroup)
                //.addTo($scope.srcTrgLayer);

            newMarker.on('dragend', function() {
                getPolygons();
                getRoutes();
                updateURL();
            })

            markerArray.push(newMarker);
            updateURL();
            if (refresh) {
                getPolygons();
                getRoutes();
            }
        }

        $scope.removeMarker = removeMarker;

        function removeMarker(marker) {

            $scope.layerGroups.markerLayerGroup.removeLayer(marker);

            if ($scope.options.sourceMarkers != undefined) {
                $scope.options.sourceMarkers.forEach(function(elem, index, array) {
                    if (elem == marker) {
                        array.splice(index, 1);
                        console.log("source Marker deleted");
                    }
                })
            }

            if ($scope.options.targetMarkers != []) {
                $scope.options.targetMarkers.forEach(function(elem, index, array) {
                    if (elem == marker) {
                        array.splice(index, 1);
                        console.log("target Marker deleted");
                    }
                })
            }

            getPolygons();
            getRoutes();

        }

        function removeMarkerFromContext(e) {
            removeMarker(lastRelatedTarget);
        }

        function removeAllMarkers() {
            $scope.layerGroups.markerLayerGroup.clearLayers();
            $scope.options.sourceMarkers = [];
            $scope.options.targetMarkers = [];
            getPolygons();
            getRoutes();
        }

        function buildTravelOptions() {

            var travelTime = $scope.options.travelTime * 60;
            var travelTimes=[];
            var defaultColors =[];

            $scope.prefs.travelTimeRanges[$scope.options.travelTimeRangeID].times.forEach(function(elem, index, array) {
                var dataSet = {};
                dataSet.time  = elem*60;
                dataSet.color = $scope.prefs.colorRanges[$scope.options.colorRangeID].colors[index];
                dataSet.opacity = $scope.prefs.colorRanges[$scope.options.colorRangeID].opacities[index];
                defaultColors.push(dataSet);
            })

            r360.config.defaultTravelTimeControlOptions.travelTimes=defaultColors;

            defaultColors.forEach(function(elem, index, array) {
                if (elem.time <= travelTime) {
                    travelTimes.push(elem.time);
                }
            })

            var travelOptions = r360.travelOptions();

            travelOptions.setTravelTimes(travelTimes);

            travelOptions.setTravelType($scope.options.travelType);

            $scope.options.sourceMarkers.forEach(function(elem, index, array) {
                elem.id = r360.Util.generateId();
                travelOptions.addSource(elem);
            })

            $scope.options.targetMarkers.forEach(function(elem, index, array) {
                travelOptions.addTarget(elem);
            })

            travelOptions.extendWidthX = $scope.options.extendWidth * 2;
            travelOptions.extendWidthY = $scope.options.extendWidth * 2;


            if ($scope.options.colorRangeID == 3) {
                r360.config.defaultPolygonLayerOptions.backgroundColor = 'black';
                r360.config.defaultPolygonLayerOptions.backgroundOpacity = 0.3;
            } else {
                r360.config.defaultPolygonLayerOptions.backgroundOpacity = 0;
            };

            travelOptions.backgroundColor = $scope.options.backgroundColor;

            r360.config.defaultTravelTimeControlOptions.offset = $scope.options.offset;

            travelOptions.setIntersectionMode($scope.options.intersection);
            //travelOptions.setWaitControl($scope.waitControl);

            var rawDate = $scope.options.queryDate;
            var date = String(rawDate.getFullYear()) + ('0' + String(rawDate.getMonth())).slice(-2) + ('0' + String(rawDate.getDate())).slice(-2);
            travelOptions.setDate(date);

            var rawTime = $scope.options.queryTime;
            var time = rawTime.h * 3600 + rawTime.m * 60;

            travelOptions.setTime(time);
            travelOptions.setMinPolygonHoleSize($scope.options.minPolygonHoleSize);

            if ($scope.travelType == 'car') travelOptions.setMinPolygonHoleSize(10000000);

            return travelOptions;
        }

        function getPolygons() {

            $scope.states.requestPending = true;

            if ($scope.options.sourceMarkers.length == 0) {
                $scope.layerGroups.polygonLayerGroup.clearLayers();
                return;
            }

            var travelOptions = buildTravelOptions();

            r360.PolygonService.getTravelTimePolygons(travelOptions,

                function(polygons) {
                    $scope.layerGroups.polygonLayerGroup.clearAndAddLayers(polygons, true);
                    if ($scope.prefsOpen || $scope.optsOpen) {
                        panMap([275, 0]);
                    };
                    $scope.states.requestPending = false;
                    $scope.$apply();
                },
                function(status,message) {
                    $scope.states.requestPending = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#map')))
                        .clickOutsideToClose(true)
                        .title('Something went wrong (Status ' + status + ')' )
                        .content(message + '\nPlease try Again later')
                        .ariaLabel('Error Dialog')
                        .ok('Got it!')
                    );
                }
            );
        }

        function getRoutes(callback) {

            $scope.layerGroups.routeLayerGroup.clearLayers();

            if ($scope.options.targetMarkers.length == 0) {
                $scope.layerGroups.polygonLayerGroup.clearLayers();
                return;
            }
            //$scope.srcTrgLayer.clearLayers();
            //$scope.srcTrgLayer.addLayer($scope.source);
            //$scope.srcTrgLayer.addLayer($scope.options.place.marker);

            var travelOptions = buildTravelOptions();

            r360.RouteService.getRoutes(travelOptions, function(routes) {

                routes.forEach(function(elem, index, array) {
                    r360.LeafletUtil.fadeIn($scope.layerGroups.routeLayerGroup, elem, 500, "travelDistance", {
                        color: "red",
                        haloColor: "#ffffff"
                    });
                })

                //$scope.options.place.travelTime = routes[0].travelTime - 4 == $scope.options.place.travelTime ? $scope.options.place.travelTime - 4 : $scope.options.place.travelTime;
                //$scope.options.place.distance   = routes[0].getDistance().toFixed(3);

                // $scope.map.fitBounds($scope.srcTrgLayer.getBounds(), { paddingBottomRight : [500, 0]});

                if (!$scope.$$phase) $scope.$apply();
                if (typeof callback !== 'undefined') callback();
            });
        }

        $scope.autocomplete = [];
        $scope.autocomplete.querySearch = querySearch;
        $scope.addAs = addAs;
        $scope.addAsTarget = addAs('target');

        function addAs(type) {
            if (typeof $scope.autocomplete.selectedItem !== 'undefined') addMarker([$scope.autocomplete.selectedItem.geometry.coordinates[1], $scope.autocomplete.selectedItem.geometry.coordinates[0]], type);
        }

        function querySearch(query) {

            var center = $scope.map.getCenter();
            var results = [];
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: "http://photon.komoot.de/api/?q=" + query + "&lat=" + center.lat + "&lon=" + center.lng + "&limit=5"
            }).then(function(response) {
                results = response.data.features.map(function(result) {
                    result.value = result.properties.osm_id;
                    return result;
                });
                deferred.resolve(results);
            }, function(response) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#map')))
                    .clickOutsideToClose(true)
                    .title('Something went wrong')
                    .content('Please try Again later')
                    .ariaLabel('Alert Dialog')
                    .ok('Got it!')
                );
            });

            return deferred.promise;

        }

        $scope.getPlaces = getPlaces;

        function getPlaces() {
            $scope.layerGroups.reachableLayerGroup.clearLayers();

            $scope.options.requestPending = true;

            var bounds = $scope.layerGroups.polygonLayerGroup.getBoundingBox4326();
            var SW = bounds.getSouthWest(), NE = bounds.getNorthEast();

            var types = []

            $scope.prefs.pois.forEach(function(elem, index, array) {
                if (elem.selected) types.push(elem.value);
            });

            var params = [
                "lat="+$scope.options.sourceMarkers[0].getLatLng().lat,
                "lng="+$scope.options.sourceMarkers[0].getLatLng().lng,
                "radius=500",
                "northEast="+NE.lat+'|'+NE.lng,
                "southWest="+SW.lat+'|'+SW.lng,
                "timeout=10000",
                "types=" + types.join("&types=")
            ];

            $http.get("http://dev.route360.net/places/places?" + params.join("&")).then(function(response){

                var places = response.data;

                if ( types.length > 0 && places.length == 0 ) console.log("TODO implement notification");

                if ( places.length == 0 ) { $scope.requestPending = false; return; }

                $scope.options.groups = [];

                var travelOptions = r360.travelOptions();
                travelOptions.setTravelType($scope.options.travelType);
                travelOptions.addSource($scope.options.sourceMarkers[0]);
                travelOptions.setTargets(places);
                travelOptions.setTravelTimes([$scope.options.travelTime*60]);
                var rawDate = $scope.options.queryDate;
                var date = String(rawDate.getFullYear()) + ('0' + String(rawDate.getMonth())).slice(-2) + ('0' + String(rawDate.getDate())).slice(-2);
                travelOptions.setDate(date);
                var rawTime = $scope.options.queryTime;
                var time = rawTime.h * 3600 + rawTime.m * 60;
                travelOptions.setTime(time);
                travelOptions.setMaxRoutingTime($scope.options.travelTime*60);


                // call the service
                r360.TimeService.getRouteTime(travelOptions, function(sources){

                    // get each target for the first source (only one source was supplied to the service)
                    _.each(sources[0].targets, function(target){

                        var place = _.find(places, function(place){ return place.id == target.id ; }); 
                        place.travelTime = target.travelTime;
                        if ( place.matchedPlaces.length == 0 ) place.matchedPlaces.push(place);

                        var markerIcon = L.AwesomeMarkers.icon({
                            icon: 'fa fa-star',
                            prefix: 'fa',
                            markerColor: 'yellow'
                        })

                        // check if place is reachable
                        if ( place.travelTime > 0 && place.travelTime <= travelOptions.getMaxRoutingTime() ) {

                            if ( addPlaceToGroup(place) ) {

                                place.marker = L.marker([place.lat, place.lng], { icon: markerIcon, opacity : 1 })
                                    .addTo($scope.layerGroups.reachableLayerGroup);

                                place.marker.on('click', function(e){
                                    $scope.highlight(place);
                                });
                            }
                        }
                    });

                    var errors = [];
                    $scope.options.groups.forEach(function(group){ if ( _.has(group, 'error')) errors.push( group.key ); })

                    if ( errors.length > 0 ) {

                        var message;
                        if ( errors.length == 1 ) message = "Für den Objekttyp " + errors[0] + " wurden sehe viele Ergebnisse gefunden. Es werden daher nur die Top " + $scope.options.placesLimit + " angezeigt!";
                        else message = "Für die Objekttypen '" + errors.join(', ') + "'' wurden sehe viele Ergebnisse gefunden. Es werden daher nur die Top " + $scope.options.placesLimit + " angezeigt!";
                        // TODO notification
                    }

                    $scope.options.requestPending = false;
                    //$scope.buildGraphs(); TODO
                    //$scope.buildTableParams(); TODO
                    //$scope.showSearchOrResult(false); TODO
                    if ( !$scope.$$phase ) $scope.$apply();
                });
            });
        }

        function addPlaceToGroup(place){

            var inserted = false;

            $scope.options.groups.forEach(function(group){
                // group was previously defined
                if ( group.key == place.type ) { 

                    if ( group.data.length >= $scope.options.placesLimit ) {

                        place.error = "too-many-objects";
                        group.error = "too-many-objects";
                    }   
                    else {

                        group.data.push(place); 
                        inserted = true;
                    } 
                }
            });

            // group has not yet been initialized
            if ( !inserted && !place.error ) 
                $scope.options.groups.push({ key : place.type, data : [place], tableParams : undefined });

            return !(_.has(place, 'error') && "too-many-objects" == place.error);
        }

        function highlight(place) {

            if (clickedMarker != null) { console.log("clickedMarker");clickedMarker.setIcon($scope.getIcon(place))};
            clickedMarker = place.marker;
            clickedMarker.setIcon($scope.getSelectIcon(place));

            $scope.showSearchOrResult(false);

            if ( !$scope.isSelected(place) ) {

                $scope.groups.forEach(function(group){
                    if ( group.key == place.type ) group.open = true;
                    else group.open = false;
                });

                $timeout(function () {
                    var div = $("#"+place.type+"-place-" + place.id);
                    var offset = Math.floor( $(div).offset().top - $("#side-bar").offset().top - $(window).innerHeight()/2 + div.height()/2);
                    $("#pageslide").animate({ scrollTop: offset }, 500);
                }, 500);

                $scope.options.place = place;
                $scope.paintRoute();
            }
        }

        function focus(place,add) {
            if (add) {
                $(place.marker._icon).addClass('focused');
            } else {
                $(place.marker._icon).removeClass('focused');
            }
        }



        $scope.$watch('options.travelTimeRangeID', function(newVal) {

            var dist = 999999;
            var nextVal = 30;

            $scope.prefs.travelTimeRanges[newVal].times.forEach(function(elem, index, array) {
                if (dist > Math.abs(elem - $scope.options.travelTime)) {
                    dist = Math.abs(elem - $scope.options.travelTime)
                    nextVal = elem;
                }
            });

            $scope.options.travelTime = nextVal;
        });

        $scope.$watchCollection('options', function() {
            updateURL();
            getPolygons();
            getRoutes();
        });


        function updateURL() {

            for (var index in $scope.options) {
                switch (index) {
                    case 'sourceMarkers':
                        if ($scope.options.sourceMarkers.length == 0) break;
                        var sources = [];
                        $scope.options.sourceMarkers.forEach(function(elem,index,array){
                            sources.push(elem._latlng.lat + "," + elem._latlng.lng);
                        });
                        $location.search("sources", sources.join(";"));
                        break;
                    case 'targetMarkers': 
                        if ($scope.options.targetMarkers.length == 0) break;
                        var targets = [];
                        $scope.options.targetMarkers.forEach(function(elem,index,array){
                            targets.push(elem._latlng.lat + "," + elem._latlng.lng);
                        });
                        $location.search("targets", targets.join(";"));
                        break;
                    case 'queryDate':
                    case 'queryTime':
                    case 'extendWidth':
                    case 'strokeWidth':
                    case 'minPolygonHoleSize':
                    case 'placesLimit':
                    case 'offset':
                    case 'mapProvider':
                    case 'backgroundColor' :
                    case 'backgroundOpacity' :
                        break;
                    default:
                        $location.search(index, $scope.options[index]);
                        break;
                }
            }

        }

        $scope.$watch('prefsOpen', function(newVal) {
            if (newVal) {
                panMap([275, 0]);
                //document.getElementById('map').style.margin = "0 0 0 550px"; TODO
            } else {
                panMap([-275, 0]);
                //document.getElementById('map').style.margin = "0";
            };
            // if (!$scope.prefsOpen && optionsStateChanged) {
            //     getPolygons();
            //     getRoutes();
            //     optionsStateChanged = false;
            // }
        });

        $scope.$watch('optsOpen', function(newVal) {
            if (newVal) {
                panMap([275, 0]);
            } else {
                panMap([-275, 0]);
            };
        });

        function panMap(offset) {

            var centerPoint = $scope.map.getSize().divideBy(2);
            var targetPoint = centerPoint.subtract(offset);
            var targetLatLng = $scope.map.containerPointToLatLng(targetPoint);
            $scope.map.setView(targetLatLng);

        }


    });