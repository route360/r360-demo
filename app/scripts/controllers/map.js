'use strict';

/**
 * @ngdoc function
 * @name r360DemoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Map Controller of the r360DemoApp
 */
angular.module('r360DemoApp')
    .controller('MapCtrl', function($document,$scope,$route, $location, $routeParams, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, $http, $q, $mdToast, ENV) {

        var vm = this;
        var lastRelatedTarget;

        // init function
        function init() {

            vm.states = {
                "requestPending" : false,
                "init" : true,
                "urlModified" : false
            }

            $scope.pageClass = 'map-page';

            var now = new Date();
            var hour = now.getHours();
            var minute = (now.getMinutes() + (5 - now.getMinutes() % 5)) % 60;

            if (minute == 0) {
                hour++;
            };
            if (hour == 24) {
                hour = 0;
            };

            vm.options = {
                "areaID": "germany",
                "cityID" : undefined,  // legacy
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
                "extendWidth": 500,
                "backgroundColor": 'black',
                "backgroundOpacity": 0,
                "minPolygonHoleSize": 1000000,
                "placesLimit" : 100,
                "transition" : true,
                "mapstyle" : "light",
                "showAdvanced" : false
            };

            vm.prefs = {
                "cities": [{
                    "id"    : "germany",
                    "name"  : "Germany",
                    "latlng": [52.516221,13.386154],
                    "url"   : ENV.endpoints.germany
                }, {
                    "id"    : "australia",
                    "name"  : "Australia and New Zealand",
                    "latlng": [-33.8675, 151.2070],
                    "url"   : ENV.endpoints.australia
                }, {
                    "id"    : "sweden",
                    "name"  : "Sweden",
                    "latlng": [59.3293, 18.0686],
                    "url"   : ENV.endpoints.sweden
                }, {
                    "id"    : "norway",
                    "name"  : "Norway",
                    "latlng": [59.913041,10.740509],
                    "url"   : ENV.endpoints.norway
                }, {
                    "id"    : "france",
                    "name"  : "France",
                    "latlng": [48.8588589,2.3475569],
                    "url"   : ENV.endpoints.france
                }, {
                    "id"    : "britishcolumbia",
                    "name": "British Columbia",
                    "latlng": [49.260635,-123.115540],
                    "url"   : ENV.endpoints.britishcolumbia
                }, {
                    "id"    : "malaysia_singapore",
                    "name": "Malaysia, Singapore, Brunei",
                    "latlng": [1.290613,103.852386],
                    "url"   : ENV.endpoints.malaysia_singapore
                }, {
                    "id"    : "denmark",
                    "name"  : "Denmark",
                    "latlng": [55.688424,12.576599],
                    "url"   : ENV.endpoints.denmark
                }, {
                    "id"    : "britishisles",
                    "name"  : "British Isles",
                    "latlng": [51.506606,-0.128403],
                    "url"   : ENV.endpoints.britishisles
                }, {
                    "id"    : "switzerland",
                    "name"  : "Switzerland",
                    "latlng": [47.370455,8.538437],
                    "url"   : ENV.endpoints.switzerland
                }, {
                    "id"    : "austria",
                    "name": "Austria",
                    "latlng": [48.209117,16.369629],
                    "url"   : ENV.endpoints.austria
                }, {
                    "id"    : "newyork",
                    "name"  : "United States of America",
                    "latlng": [40.731129,-73.987427],
                    "url"   : ENV.endpoints.newyork
                }, {
                    "id"    : "italy",
                    "name"  : "Italy",
                    "latlng": [41.8945503,12.483081],
                    "url"   : ENV.endpoints.italy
                }, {
                    "id"    : "spain",
                    "name"  : "Spain",
                    "latlng": [40.472101, -3.682646],
                    "url"   : ENV.endpoints.spain
                }, {
                    "id"    : "portugal",
                    "name"  : "Portugal",
                    "latlng": [38.714109, -9.133373],
                    "url"   : ENV.endpoints.portugal
                }, {
                    "id"    : "czech_republic",
                    "name"  : "Czech Republic",
                    "latlng": [50.0833, 14.4167],
                    "url"   : ENV.endpoints.czech_republic
                }, {
                    "id"    : "south_america",
                    "name"  : "South America",
                    "latlng": [-22.9068, -43.1729],
                    "url"   : ENV.endpoints.south_america
                }, {
                    "id"    : "australia",
                    "name"  : "Australia",
                    "latlng": [-37.807332,144.957422],
                    "url"   : ENV.endpoints.australia
                }],
                "travelTypes": [{
                    "name": "Bike",
                    "icon": "md:bike",
                    "value": "bike",
                }, {
                    "name": "Walk",
                    "icon": "md:walk",
                    "value": "walk",
                }, {
                    "name": "Car",
                    "icon": "md:car",
                    "value": "car",
                }, {
                    "name": "Transit",
                    "icon": "md:train",
                    "value": "transit",
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
                    "colors": ["#142b66","#4525AB","#9527BC","#CE29A8","#DF2A5C","#F0572C"],
                    "opacities" : [1,1,1,1,1,1]
                    }, {
                    "name"  : "Greyscale",
                    "id"    : 2,
                    "colors": ["#d2d2d2","#b2b2b2","#999999","#777777","#555555","#333333"],
                    "opacities" : [1,0.8,0.6,0.4,0.2,0]
                    }, {
                    "name"  : "Inverse Mode (B/W)",
                    "id"    : 3,
                    "colors": ["#333"],
                    "opacities" : [1,1,1,1,1,1]
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
                }],
                "mapStyles" : [{
                    "name"  : "Light",
                    "value" : "light",
                    "url"   : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                }, {
                    "name"  : "Dark",
                    "value" : "dark",
                    "url"   : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                }]
            };

            parseUrl();

            r360.config.requestTimeout = 10000;
            r360.config.serviceUrl = getCity().url;
            if (angular.isDefined(vm.options.serviceKey))
                r360.config.serviceKey = vm.options.serviceKey;
            else
                r360.config.serviceKey = ENV.serviceKey;
            r360.config.i18n.language = "de";

            if (!angular.isDefined(vm.map)) {
                vm.map = L.map('map', {
                    zoomControl: false,
                    scrollWheelZoom: true,
                    contextmenu: true,
                    contextmenuWidth: 220,
                    contextmenuItems: [{
                        text: 'New Source',
                        callback: addSourceMarkerFromContext,
                        iconFa: 'fa-fw fa-plus'
                    }, {
                        text: 'New Target',
                        callback: addTargetMarkerFromContext,
                        iconFa: 'fa-fw fa-plus'
                    }]
                })
                .setActiveArea({
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0'
                })
                .setView(getCity().latlng, 13);

                L.control.scale({
                    metric: true,
                    imperial: false
                }).addTo(vm.map);


                var attribution = "<a href='https://cartodb.com/location-data-services/basemaps/' target='_blank'>© Cartodb © OpenStreetMap</a> | © <a href='https://developers.route360.net/#availability' target='_blank'>Transit Data</a> | developed by <a href='http://www.route360.net/de/' target='_blank'>Route360°</a>";

                var tileUrl = lookupObject(vm.prefs.mapStyles,'value',vm.options.mapstyle).url;

                if (isHidpi()) {
                    tileUrl = tileUrl.substring(0,tileUrl.length-4).concat('@2x.png');
                }

                /**
                 * Collection of all layer groups
                 * @type {Object}
                 */
                vm.layerGroups = {
                    tileLayer: L.tileLayer(tileUrl, {maxZoom: 18,attribution: attribution}).addTo(vm.map),
                    markerLayerGroup: L.featureGroup().addTo(vm.map),
                    routeLayerGroup: L.featureGroup().addTo(vm.map),
                    reachableLayerGroup: L.featureGroup().addTo(vm.map),
                    tempLayerGroup: L.featureGroup().addTo(vm.map),
                    polygonLayerGroup: r360.leafletPolygonLayer({extendWidthX: vm.options.extendWidth, extendWidthY: vm.options.extendWidth}).addTo(vm.map)
                };

            }

            vm.map.on("contextmenu.show", function(e) {
                lastRelatedTarget = e.relatedTarget;
            });

            addMarkersFromUrl();

            $timeout(function() { vm.states.init = false; }, 2000);
            $timeout(function() { showToast('Markers can be added by right-clicking on the map.','bottom right','OK') }, 3000);

        };

        function parseUrl() {
            /**
             * Parse GET parameters to options object
             * @param  {Object} $routeParams The GET parameters
             */
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
                        vm.options[index] = parseInt(value);
                        break;
                    case "areaID" :
                    case "travelType" :
                    case "intersection" :
                    case "serviceKey":
                        vm.options[index] = value;
                        break;
                    case "mapstyle" :
                        if (value.indexOf('mi.')>-1) {
                            vm.options[index] = 'light'
                        } else {
                            vm.options[index] = value;
                        }
                        break;
                    case "transition" :
                        vm.options[index] = (value === "true");
                    case "sources":
                    case "targets":
                        break;
                    default:
                        showToast('Parameter not valid');
                        break;
                }
            }

            // legacy ID support
            if (angular.isDefined(vm.options.cityID) && typeof vm.options.cityID === "number") {
                switch (vm.options.cityID) {
                    case 0:
                        vm.options.areaID = "berlin";
                        break;
                    case 1:
                        vm.options.areaID = "norway";
                        break;
                    case 2:
                        vm.options.areaID = "france";
                        break;
                    case 3:
                        vm.options.areaID = "canada";
                        break;
                    case 4:
                        vm.options.areaID = "denmark";
                        break;
                    case 5:
                        vm.options.areaID = "britishisles";
                        break;
                    case 6:
                        vm.options.areaID = "switzerland";
                        break;
                    case 7:
                        vm.options.areaID = "austria";
                        break;
                    case 8:
                        vm.options.areaID = "newyork";
                        break;
                }
            }

        }

        function addMarkersFromUrl() {


            removeAllMarkers();
            if(!angular.isDefined(getCity())) vm.options.areaID = "germany";

            // Check if sources are available in GET params
            if (angular.isDefined($routeParams.targets)) {
                parseAndAddMarkers($routeParams.targets, "target");
            }

            if (angular.isDefined($routeParams.sources)) {
                parseAndAddMarkers($routeParams.sources, "source");
                getPolygons(function() {getRoutes()});
            }

            if (!angular.isDefined($routeParams['sources']) && !angular.isDefined($routeParams['targets']) ) addMarker(getCity().latlng, 'source');
        }

        function isHidpi(){
            var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                    (min--moz-device-pixel-ratio: 1.5),\
                    (-o-min-device-pixel-ratio: 3/2),\
                    (min-resolution: 1.5dppx)";
            if (window.devicePixelRatio > 1)
                return true;
            if (window.matchMedia && window.matchMedia(mediaQuery).matches)
                return true;
            return false;
        }

        /**
         * Apply a different tile style to the map.
         */
        vm.updateTileStyle = updateTileStyle;
        function updateTileStyle() {
            var tileUrl = lookupObject(vm.prefs.mapStyles,'value',vm.options.mapstyle).url;

            if (isHidpi()) {
                tileUrl = tileUrl.substring(0,tileUrl.length-4).concat('@2x.png');
            }

            vm.layerGroups.tileLayer.setUrl(tileUrl);
            vm.layerGroups.tileLayer.redraw();
            $routeParams.mapstyle = vm.options.mapstyle;
            $route.updateParams($routeParams);
        }

        function getCity() {
            var result = undefined;
            vm.prefs.cities.forEach(function(city){
                if(city.id == vm.options.areaID) result = city;
            });
            return result;
        }

        vm.toggleOptions = toggleOptions;
        function toggleOptions() {
            if (!vm.states.init) slide(!vm.optsOpen);
            $mdSidenav('options').toggle();
        };

        function showToast(message,position,action) {
            if (!angular.isDefined(position)) var position = 'top right';

            if (angular.isDefined(action)) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position(position)
                        .hideDelay(5000)
                        .action(action)
                );
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position(position)
                        .hideDelay(3000)
                );
            }
        }

        /**
         * Helper function to change the city & service url
         */
        vm.flyTo = flyTo;
        function flyTo(areaID) {
            if (vm.states.init) {
                $timeout(function() { vm.states.init = false; });
            } else {
                $routeParams.areaID = areaID;
                $route.updateParams($routeParams);
                removeAllMarkers();
                r360.config.serviceUrl = getCity().url;
                vm.map.setView(getCity().latlng,10,{animate:true, duration: 1});
                addMarker(getCity().latlng,'source');
            }
        }

        function parseAndAddMarkers(string, type) {
            var array = string.split(";");
            array.forEach(function(elem,index,array){
                var coords = elem.split(",");
                coords[0] = parseFloat(coords[0]);
                coords[1] = parseFloat(coords[1]);
                addMarker(coords, type, false);
            });
        }

        /**
         * Helper functions to be used withing the leaflet context menu
         * @param {Object} e event
         */
        function addSourceMarkerFromContext(e) {
            addMarker(e.latlng, 'source');
        }
        function addTargetMarkerFromContext(e) {
            addMarker(e.latlng, 'target');
        }
        function removeMarkerFromContext(e) {
            removeMarker(lastRelatedTarget);
        }

        /**
         * Helper function for finding an object in an array
         * @param  {array} array The array to lookup
         * @param  {string} key   The key of the indicating attribute
         * @param  {string} value The corresponding value to match
         * @return {Object}       the desired object from the array
         */
        function lookupObject(array,key,value) {
            var lookup = {};
            for (var i = 0, len = array.length; i < len; i++) {
                lookup[array[i][key]] = array[i];
            }
            return lookup[value];
        }

        /**
         * General function fo add a new source or target marker on the map
         * @param {Array} coords The coordinates of the marker in lat,lng
         * @param {string} type Either 'source' or 'target'
         * @param {boolean} refresh Optional. If false, the getPolygons/getRoutes functions will not be trigerd. Default: true
         */
        function addMarker(coords, type, refresh) {

            if (typeof coords[0] != 'undefined' || typeof coords[1] != 'undefined')
                if (typeof coords.lat != 'undefined' || typeof coords.lng != 'undefined')
                    return;

            if (typeof coords.lat != 'undefined' && typeof coords.lng != 'undefined') {
                coords.lat = parseFloat(coords.lat.toFixed(6));
                coords.lng = parseFloat(coords.lng.toFixed(6));
            }

            if (typeof coords[0] != 'undefined' && typeof coords[1] != 'undefined') {
                coords[0] = parseFloat(coords[0].toFixed(6));
                coords[1] = parseFloat(coords[1].toFixed(6));
            }

            if (typeof refresh === 'undefined') { refresh = true; }

            var markerArray = undefined;
            var markerIcon = undefined;
            if (type != 'temp') var markerLayerGroup = vm.layerGroups.markerLayerGroup;
            else var markerLayerGroup = vm.layerGroups.tempLayerGroup;

            switch (type) {
                case 'source':
                    if (vm.options.sourceMarkers.length >= vm.options.maxSourceMarkers) {
                        showToast('Maximum number of source Markers reached (' + vm.options.maxSourceMarkers + ")");
                        return;
                    };
                    markerArray = vm.options.sourceMarkers;
                    markerIcon = L.icon({
                        iconUrl: './images/icons/marker_source.svg',
                        shadowUrl: './images/icons/shadow.png',
                        iconSize:     [28, 40],
                        shadowSize:   [28, 45],
                        iconAnchor:   [14, 40],
                        shadowAnchor: [2, 40],
                        popupAnchor:  [0, -43]
                    })
                    break;
                case 'target':
                    if (vm.options.targetMarkers.length >= vm.options.maxTargetMarkers) {
                        showToast('Maximum number of target Markers reached (' + vm.options.maxSourceMarkers + ")");
                        return;
                    };
                    markerArray = vm.options.targetMarkers;
                    markerIcon = L.icon({
                        iconUrl: './images/icons/marker_target.svg',
                        shadowUrl: './images/icons/shadow.png',
                        iconSize:     [28, 40],
                        shadowSize:   [28, 45],
                        iconAnchor:   [14, 40],
                        shadowAnchor: [2, 40],
                        popupAnchor:  [0, -43]
                    })
                    break;

                case 'temp' :
                    markerIcon = L.icon({
                        iconUrl: './images/icons/marker_temp.svg',
                        iconSize:     [15, 15],
                        iconAnchor:   [7.5, 7.5],
                        shadowAnchor: [4, 62],
                        popupAnchor:  [0, -10]
                    })
                    break;
                default:
                    console.log('addMarker error');
                    showToast('The Marker could not be added');
                    break;
            }

            if (type == 'temp') {

                var newMarker = L.marker(coords, {
                    icon: markerIcon,
                }).addTo(markerLayerGroup);

                var promise = reverseGeocode(coords);
                promise.then(function(properties){
                    var description = buildPlaceDescription(properties);
                    newMarker.bindPopup("<strong>" + description.title + "</strong>", {closeButton: false});

                    newMarker.openPopup();
                })

                vm.map.setView(coords,15);

            } else {

                var newMarker = L.marker(coords, {
                    draggable: true,
                    icon: markerIcon,
                    contextmenu: true,
                    contextmenuItems: [{
                        text: 'Delete Marker',
                        callback: removeMarkerFromContext,
                        index: 0,
                        iconFa: 'fa-fw fa-times'
                    }, {
                        separator: true,
                        index: 1
                    }]
                })
                .addTo(markerLayerGroup)
                //.addTo(vm.srcTrgLayer);

                newMarker.on('dragend', function() {
                    this._latlng.lat = this._latlng.lat.toFixed(6);
                    this._latlng.lng = this._latlng.lng.toFixed(6);
                    var promise = reverseGeocode(this._latlng);
                    promise.then(function(properties){
                        newMarker.description = buildPlaceDescription(properties);
                    })
                    getPolygons(function() {
                        getRoutes();
                    });
                    updateURL();
                })

                newMarker.on('click', function() {
                    if (!vm.optsOpen) vm.optsOpen;
                })

                markerArray.push(newMarker);

                if (refresh) {
                    updateURL();
                    getPolygons(function() {
                        getRoutes();
                    });
                }
                var promise = reverseGeocode(coords);
                promise.then(function(properties){
                    newMarker.description = buildPlaceDescription(properties);
                    // console.log(markerArray);
                })

            }
        }

        function reverseGeocode(coords) {

            var url = "";

            var deferred = $q.defer();

            if (typeof coords.lat != 'undefined' && typeof coords.lng != 'undefined')
                url = ENV.endpoints.geocoder + "reverse?lon=" + coords.lng + "&lat=" + coords.lat;

            if (typeof coords[0] != 'undefined' && typeof coords[1] != 'undefined')
                url = ENV.endpoints.geocoder + "reverse?lon=" + coords[1] + "&lat=" + coords[0];

            $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                // console.log(response);
                if (response.data.features.length > 0) {
                    var properties = response.data.features[0].properties;
                    if (typeof properties.name === 'undefined') {
                        properties.name = "";
                        if (typeof properties.street != 'undefined') properties.name += properties.street;
                        if (typeof properties.housenumber != 'undefined') properties.name += " " + properties.housenumber;
                    }
                }
                else {
                    properties = {
                        "name" : "Marker",
                        "city" : "",
                        "country" : ""
                    }
                }
                deferred.resolve(properties);
            }, function(response) {
                showToast("Reverse geocoding failed.");
            });

            return deferred.promise;
        }

        function buildPlaceDescription(obj) {

            var result = {
                title : "",
                meta1 : "",
                meta2 : "",
                full  : ""
            }

            var name = undefined;
            var adress1 = undefined;
            var adress2 = undefined;

            if (angular.isDefined(obj['name'])) {
                name = obj.name;
            }

            if (angular.isDefined(obj['street'])) {
                adress1 = obj.street;
                if (angular.isDefined(obj['housenumber'])){
                    adress1 += " " + obj.housenumber;
                }
            }

            if (angular.isDefined(obj['city'])){
                adress2 = obj.city;
                if ((angular.isDefined(obj['postcode']))) {
                    adress2 = obj.postcode + " " + adress2;
                }
                if ((angular.isDefined(obj['country']))) {
                    adress2 += ", " + obj.country;
                }
            } else {
                if ((angular.isDefined(obj['country']))) {
                    adress2 = obj.country;
                }
            }

            if (angular.isDefined(name)) {
                result.title = name;
                result.meta1 = adress1;
                result.meta2 = adress2;
            } else {
                result.title = adress1;
                result.meta1 = adress2;
            }

            result.full = result.title;
            if (result.meta1 != '' && angular.isDefined(result.meta1))  result.full += ", " +  result.meta1;
            if (result.meta2 != '' && angular.isDefined(result.meta2))  result.full += ", " +  result.meta2;

            return result;
        }

        /**
         * General function to remove a single marker from the map
         * @param  {object} marker Leaflet marker to be removed
         */
        vm.removeMarker = removeMarker;
        function removeMarker(marker) {

            vm.layerGroups.markerLayerGroup.removeLayer(marker);

            if (vm.options.sourceMarkers != undefined) {
                vm.options.sourceMarkers.forEach(function(elem, index, array) {
                    if (elem == marker) {
                        array.splice(index, 1);
                        console.log("source Marker deleted");
                    }
                })
            }

            if (vm.options.targetMarkers != []) {
                vm.options.targetMarkers.forEach(function(elem, index, array) {
                    if (elem == marker) {
                        array.splice(index, 1);
                        console.log("target Marker deleted");
                    }
                })
            }

            updateURL();

            getPolygons(function() {
              getRoutes();
            });
        }

        /**
         * Remove all Markers from the map
         */
        function removeAllMarkers() {
            vm.layerGroups.markerLayerGroup.clearLayers();
            vm.layerGroups.polygonLayerGroup.clearLayers();
            vm.layerGroups.routeLayerGroup.clearLayers();
            vm.layerGroups.tempLayerGroup.clearLayers();
            vm.options.sourceMarkers = [];
            vm.options.targetMarkers = [];
        }

        /**
         * Build an r360 TravelOptions object from scope.options
         * @return {r360.travelOptions} Returns an r360 TravelOptions object
         */
        function buildTravelOptions() {

            var travelOptions = r360.travelOptions();
            travelOptions.setServiceUrl(r360.config.serviceUrl);

            var travelTime = vm.options.travelTime * 60;
            var travelTimes=[];
            var defaultColors =[];

            vm.prefs.travelTimeRanges[vm.options.travelTimeRangeID].times.forEach(function(elem, index, array) {
                var dataSet = {};
                dataSet.time  = elem*60;
                dataSet.color = vm.prefs.colorRanges[vm.options.colorRangeID].colors[index];
                dataSet.opacity = vm.prefs.colorRanges[vm.options.colorRangeID].opacities[index];
                defaultColors.push(dataSet);
            })

            r360.config.defaultTravelTimeControlOptions.travelTimes=defaultColors;

            defaultColors.forEach(function(elem, index, array) {
                if (elem.time <= travelTime) {
                    travelTimes.push(elem.time);
                }
            })

            travelOptions.setTravelTimes(travelTimes);

            travelOptions.setTravelType(vm.options.travelType);

            vm.options.sourceMarkers.forEach(function(elem, index, array) {
                travelOptions.addSource(elem);
            })

            vm.options.targetMarkers.forEach(function(elem, index, array) {
                travelOptions.addTarget(elem);
            })

            travelOptions.extendWidthX = vm.options.extendWidth * 2;
            travelOptions.extendWidthY = vm.options.extendWidth * 2;

            if (vm.options.colorRangeID == 3) {
                vm.layerGroups.polygonLayerGroup.setInverse(true);
            } else {
                vm.layerGroups.polygonLayerGroup.setInverse(false);
            };

            travelOptions.backgroundColor = vm.options.backgroundColor;
            travelOptions.setIntersectionMode(vm.options.intersection);
            //travelOptions.setWaitControl(vm.waitControl);

            var rawDate = vm.options.queryDate; // @jan: month is zero based, so we have to add one
            // for the future: please use r360.Util.getDateXX and getTimeXX methods
            var date = String(rawDate.getFullYear()) + ('0' + String(rawDate.getMonth() + 1)).slice(-2) + ('0' + String(rawDate.getDate())).slice(-2);
            travelOptions.setDate(date);

            var rawTime = vm.options.queryTime;
            var time = rawTime.h * 3600 + rawTime.m * 60;

            travelOptions.setTime(time);
            travelOptions.setMinPolygonHoleSize(vm.options.minPolygonHoleSize);

            if (vm.travelType == 'car') travelOptions.setMinPolygonHoleSize(10000000);

            return travelOptions;
        }

        /**
         * Clear the polygon layer, request and draw new polgons
         */
        function getPolygons(callback) {

            vm.states.requestPending = true;

            if (vm.options.sourceMarkers.length == 0) {
                vm.layerGroups.polygonLayerGroup.clearLayers();
                vm.states.requestPending = false;
                if (angular.isDefined(callback)) callback();
                return;
            }

            var travelOptions = buildTravelOptions();

            r360.PolygonService.getTravelTimePolygons(travelOptions,

                function(polygons) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function(){
                            vm.layerGroups.polygonLayerGroup.clearAndAddLayers(polygons, true);
                            vm.states.requestPending = false;
                            if(angular.isDefined(callback)) callback();
                        });
                    } else {
                        vm.layerGroups.polygonLayerGroup.clearAndAddLayers(polygons, true);
                        vm.states.requestPending = false;
                        if(angular.isDefined(callback)) callback();
                    }
                },
                function(status,message) {

                    console.log(status);
                    console.log(message);

                    vm.states.requestPending = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#map')))
                        .clickOutsideToClose(true)
                        .title('Something went wrong')
                        .content(message)
                        .ariaLabel('Error Dialog')
                        .ok('Got it!')
                    );
                }
            );
        }

        vm.updateView = function updateView() {
            getPolygons;
            updateURL();
        }

        /**
         * Clear the route layer, request and draw new routes
         */
        function getRoutes(callback) {

            vm.states.requestPending = true;

            vm.layerGroups.routeLayerGroup.clearLayers();

            if (vm.options.targetMarkers.length == 0 || vm.options.sourceMarkers.length == 0) {
                vm.states.requestPending = false;
                if(angular.isDefined(callback)) callback();
                return;
            }
            //vm.srcTrgLayer.clearLayers();
            //vm.srcTrgLayer.addLayer(vm.source);
            //vm.srcTrgLayer.addLayer(vm.options.place.marker);

            var travelOptions = buildTravelOptions();

            r360.RouteService.getRoutes(travelOptions, function(routes) {

                vm.states.requestPending = false;

                routes.forEach(function(elem, index, array) {
                    r360.LeafletUtil.fadeIn(vm.layerGroups.routeLayerGroup, elem, 500, "travelDistance", {
                        color: "red",
                        haloColor: "#fff"
                    });
                })

                //vm.options.place.travelTime = routes[0].travelTime - 4 == vm.options.place.travelTime ? vm.options.place.travelTime - 4 : vm.options.place.travelTime;
                //vm.options.place.distance   = routes[0].getDistance().toFixed(3);

                // vm.map.fitBounds(vm.srcTrgLayer.getBounds(), { paddingBottomRight : [500, 0]});

                if (!$scope.$$phase) $scope.$apply();
                if (typeof callback !== 'undefined') callback();

            });
        }

        vm.autocomplete = [];
        vm.autocomplete.querySearch = querySearch;
        vm.autocomplete.selectedItemChange = selectedItemChange;
        vm.addAs = addAs;

        function selectedItemChange(item) {
            vm.layerGroups.tempLayerGroup.clearLayers();
            if (angular.isDefined(item)) addMarker([item.geometry.coordinates[1], item.geometry.coordinates[0]], 'temp');
        }

        function addAs(type) {
            if (angular.isDefined(vm.autocomplete.selectedItem) && vm.autocomplete.selectedItem) {
                addMarker([vm.autocomplete.selectedItem.geometry.coordinates[1], vm.autocomplete.selectedItem.geometry.coordinates[0]], type);
                vm.autocomplete.selectedItem = undefined;
            } else showToast('No place defined.');
        }

        function querySearch(query) {

            var center = vm.map.getCenter();
            var results = [];
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: ENV.endpoints.geocoder + "api/?q=" + query + "&lat=" + center.lat + "&lon=" + center.lng + "&limit=5"
            }).then(function(response) {
                results = response.data.features.map(function(result) {
                    result.value = result.properties.osm_id;
                    result.description = buildPlaceDescription(result.properties);
                    console.log(result.description);
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

            console.log(deferred.promise);
            return deferred.promise;
        }

        vm.getPlaces = getPlaces;
        function getPlaces() {
            vm.layerGroups.reachableLayerGroup.clearLayers();

            vm.options.requestPending = true;

            var bounds = vm.layerGroups.polygonLayerGroup.getBoundingBox4326();
            var SW = bounds.getSouthWest(), NE = bounds.getNorthEast();

            var types = []

            vm.prefs.pois.forEach(function(elem, index, array) {
                if (elem.selected) types.push(elem.value);
            });

            var params = [
                "lat="+vm.options.sourceMarkers[0].getLatLng().lat,
                "lng="+vm.options.sourceMarkers[0].getLatLng().lng,
                "radius=500",
                "northEast="+NE.lat+'|'+NE.lng,
                "southWest="+SW.lat+'|'+SW.lng,
                "timeout=10000",
                "types=" + types.join("&types=")
            ];

            $http.get("https://dev.route360.net/places/places?" + params.join("&")).then(function(response){

                var places = response.data;

                if ( types.length > 0 && places.length == 0 ) console.log("TODO implement notification");

                if ( places.length == 0 ) { vm.requestPending = false; return; }

                vm.options.groups = [];

                var travelOptions = r360.travelOptions();
                travelOptions.setTravelType(vm.options.travelType);
                travelOptions.addSource(vm.options.sourceMarkers[0]);
                travelOptions.setTargets(places);
                travelOptions.setTravelTimes([vm.options.travelTime*60]);
                var rawDate = vm.options.queryDate;
                var date = String(rawDate.getFullYear()) + ('0' + String(rawDate.getMonth())).slice(-2) + ('0' + String(rawDate.getDate())).slice(-2);
                travelOptions.setDate(date);
                var rawTime = vm.options.queryTime;
                var time = rawTime.h * 3600 + rawTime.m * 60;
                travelOptions.setTime(time);
                travelOptions.setMaxRoutingTime(vm.options.travelTime*60);


                // call the service
                r360.TimeService.getRouteTime(travelOptions, function(sources){

                    // get each target for the first source (only one source was supplied to the service)
                    _.each(sources[0].targets, function(target){

                        var place = _.find(places, function(place){ return place.id == target.id ; });
                        place.travelTime = target.travelTime;
                        if ( place.matchedPlaces.length == 0 ) place.matchedPlaces.push(place);

                        var  markerIcon = L.icon({
                            iconUrl: './images/icons/marker_source.svg',
                            shadowUrl: './images/icons/marker_shadow.svg',
                            iconSize:     [28, 40], // size of the icon
                            shadowSize:   [27, 18],
                            iconAnchor:   [14, 40], // point of the icon which will correspond to marker's location
                            shadowAnchor: [7, 14],  // the same for the shadow
                            popupAnchor:  [0, -43] // point from which the popup should open relative to the iconAnchor
                        })

                        // check if place is reachable
                        if ( place.travelTime > 0 && place.travelTime <= travelOptions.getMaxRoutingTime() ) {

                            if ( addPlaceToGroup(place) ) {

                                place.marker = L.marker([place.lat, place.lng], { icon: markerIcon, opacity : 1 })
                                    .addTo(vm.layerGroups.reachableLayerGroup);

                                place.marker.on('click', function(e){
                                    vm.highlight(place);
                                });
                            }
                        }
                    });

                    var errors = [];
                    vm.options.groups.forEach(function(group){ if ( _.has(group, 'error')) errors.push( group.key ); })

                    if ( errors.length > 0 ) {

                        var message;
                        if ( errors.length == 1 ) message = "Für den Objekttyp " + errors[0] + " wurden sehe viele Ergebnisse gefunden. Es werden daher nur die Top " + vm.options.placesLimit + " angezeigt!";
                        else message = "Für die Objekttypen '" + errors.join(', ') + "'' wurden sehe viele Ergebnisse gefunden. Es werden daher nur die Top " + vm.options.placesLimit + " angezeigt!";
                        // TODO notification
                    }

                    vm.options.requestPending = false;
                    //vm.buildGraphs(); TODO
                    //vm.buildTableParams(); TODO
                    //vm.showSearchOrResult(false); TODO
                    if ( !$scope.$$phase ) $scope.$apply();
                });
            });
        }

        function addPlaceToGroup(place){

            var inserted = false;

            vm.options.groups.forEach(function(group){
                // group was previously defined
                if ( group.key == place.type ) {

                    if ( group.data.length >= vm.options.placesLimit ) {

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
                vm.options.groups.push({ key : place.type, data : [place], tableParams : undefined });

            return !(_.has(place, 'error') && "too-many-objects" == place.error);
        }

        function highlight(place) {

            if (clickedMarker != null) { console.log("clickedMarker");clickedMarker.setIcon(vm.getIcon(place))};
            clickedMarker = place.marker;
            clickedMarker.setIcon(vm.getSelectIcon(place));

            vm.showSearchOrResult(false);

            if ( !vm.isSelected(place) ) {

                vm.groups.forEach(function(group){
                    if ( group.key == place.type ) group.open = true;
                    else group.open = false;
                });

                $timeout(function () {
                    var div = $("#"+place.type+"-place-" + place.id);
                    var offset = Math.floor( $(div).offset().top - $("#side-bar").offset().top - $(window).innerHeight()/2 + div.height()/2);
                    $("#pageslide").animate({ scrollTop: offset }, 500);
                }, 500);

                vm.options.place = place;
                vm.paintRoute();
            }
        }

        vm.focus = focus;
        function focus(marker,add) {
            if (add) {
                marker.bindPopup('<strong>' + marker.description.title + '</strong>', {closeButton: true, minWidth: 10});
                marker.openPopup();
            } else {
                marker.closePopup();
                marker.unbindPopup();
            }
        }

        function changeTravelTime(time) {
            if(vm.options.travelTime == time) return;
            vm.options.travelTime = time;
            getPolygons();
            updateURL();
        };

        vm.changeTravelTime = changeTravelTime;
        function changeTravelTimeRange() {

            var rngId = vm.options.travelTimeRangeID;

            var dist = 999999;
            var nextVal = 30;

            vm.prefs.travelTimeRanges[rngId].times.forEach(function(elem, index, array) {
                if (dist > Math.abs(elem - vm.options.travelTime)) {
                    dist = Math.abs(elem - vm.options.travelTime)
                    nextVal = elem;
                }
            });

            vm.options.travelTime = nextVal;
            if (!vm.states.init) getPolygons();
            updateURL();
        };

        function changeColorRange() {

            var colors = [];
            vm.prefs.travelTimeRanges[vm.options.travelTimeRangeID].times.forEach(function(elem, index, array) {
                var dataSet = {};
                dataSet.time  = elem*60;
                dataSet.color = vm.prefs.colorRanges[vm.options.colorRangeID].colors[index];
                dataSet.opacity = vm.prefs.colorRanges[vm.options.colorRangeID].opacities[index];
                colors.push(dataSet);
            })

            if (vm.options.colorRangeID == 3) {
                vm.layerGroups.polygonLayerGroup.setInverse(true);
            } else {
                vm.layerGroups.polygonLayerGroup.setInverse(false);
            };

            vm.layerGroups.polygonLayerGroup.setColors(colors);
            updateURL();
        };
        vm.changeColorRange = changeColorRange;

        vm.changeTravelTimeRange = changeTravelTimeRange;
        function changeTravelType(type) {

            if(vm.options.travelType == type) return;
            vm.options.travelType = type;
            vm.prefs.travelTypes.forEach(function(elem,index,array){
                if (elem['value'] == type) vm.options.travelTypeIcon = elem['icon'];
            });
            getPolygons();
            updateURL();

        };
        vm.changeTravelType = changeTravelType;

        function updateURL() {

            vm.states.urlModified = true;

            for (var index in vm.options) {
                switch (index) {
                    case 'sourceMarkers':
                        if (vm.options.sourceMarkers.length == 0)  {
                            // $routeParams.sources = null;
                            // $route.updateParams($routeParams);
                            $location.search("sources", null);
                            break;
                        }
                        var sources = [];
                        vm.options.sourceMarkers.forEach(function(elem,index,array){
                            sources.push(elem._latlng.lat + "," + elem._latlng.lng);
                        });
                        // $routeParams.sources = sources.join(";");
                        // $route.updateParams($routeParams);
                        $location.search("sources", sources.join(";"));
                        break;
                    case 'targetMarkers':
                        if (vm.options.targetMarkers.length == 0) {
                            // $routeParams.targets = null;
                            // $route.updateParams($routeParams);
                             $location.search("targets", null);
                            break;
                        };
                        var targets = [];
                        vm.options.targetMarkers.forEach(function(elem,index,array){
                            targets.push(elem._latlng.lat + "," + elem._latlng.lng);
                        });
                        $location.search("targets", targets.join(";"));
                        // $routeParams.targets = targets.join(";");
                        // $route.updateParams($routeParams);
                        break;
                    case 'areaID':
                    case 'travelTime':
                    case 'travelTimeRangeID':
                    case 'travelType':
                    case 'colorRangeID':
                    case 'intersection':
                    case 'transition':
                    case 'mapstyle':
                        if (angular.isDefined($routeParams[index]) && $routeParams[index] == vm.options[index]) break;
                        // $routeParams[index] = String(vm.options[index]);
                        // $route.updateParams($routeParams);
                        $location.search(index, String(vm.options[index]));
                        break;
                    default:
                        break;
                }
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        function slide(open) {

            if (open) {

                if (vm.options.transition) vm.map.panBy([-275, 0]);
                vm.map.setActiveArea({
                    position: 'absolute',
                    top: '0',
                    left: '550px',
                    right: '0',
                    bottom: '0'
                });

            } else {
                if (vm.options.transition) vm.map.panBy([275, 0]);
                vm.map.setActiveArea({
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0'
                });
            };
        }

        init();

        $scope.$on('$routeUpdate',function(e, current) {
            if (!vm.states.urlModified) {
                parseUrl();
                addMarkersFromUrl();
            } else {
                vm.states.urlModified = false;
            }
        });

    });
