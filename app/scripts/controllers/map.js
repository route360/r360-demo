'use strict';

/**
 * @ngdoc function
 * @name r360DemoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Map Controller of the r360DemoApp
 */
angular.module('r360DemoApp')
  .controller('MapCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, $http, $q) {

  	// ------------
  	// GENERAL SETUP
  	// ------------
  	$scope.pageClass = 'map-page';

  	// ------------
  	// CONTROLS SETUP
  	// ------------

    $scope.togglePrefs = buildToggler('prefs');
    $scope.toggleOptions = buildToggler('options');

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },100);
      return debounceFn;
    };

  	// ------------
  	// R360 SETUP
  	// ------------

  	var now = new Date();
		var hour = now.getHours();
		var minute = (now.getMinutes() + (5 - now.getMinutes() % 5)) % 60;

		if (minute == 0) {hour++};
		if (hour == 24) {hour = 0};


  	$scope.options = {
				"city" 							: "berlin",
		  	"travelTime" 				: 20,
		  	"travelTimeRange"		: { "min" : 5 , "max" : 30, "step" : 5},
				"travelType" 				: "bike",
		  	"queryDate"					: now,
		  	"queryTime" 				: {"h" : hour, "m": minute},
		  	"color"							: true,
		  	"mapProvider" 			: "osm",
		  	"sourceMarkers"			: [],
		  	"targetMarkers"			: [],
		  	"intersection"			: "union",
		  	"strokeWidth"				: 30,
		  	"extendWidth"				: 100,
		  	"backgroundColor" 	: 'black',
		  	"backgroundOpacity"	: 0,
		  	"offset"						: {"x" : 0, "y" : 0},
		  	"minPolygonHoleSize": 1000000
  	};

  	$scope.prefs = {
	  	  "cities" : [
	  	  	{"name" : "Berlin", "value" : "berlin"},
					{"name" : "Oslo", "value" : "oslo"},
					{"name" : "Paris", "value" : "paris"},
					{"name" : "Vancouver", "value" : "vancouver"}
	  	  ],
	  		"travelTypes" : [
	  			{ "name" : "Bike", "icon" : "fa-bicycle", "value":"bike", "preselected": true},
	  			{ "name" : "Walk", "icon" : "fa-male", "value":"walk", "preselected": false},
	  			{ "name" : "Car", "icon" : "fa-car", "value":"car", "preselected": false},
	  			{ "name" : "Transit", "icon" : "fa-bus", "value":"transit", "preselected": false}
	  		],
	  		"queryTimeRange" :{
	  			"hour" : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
	  			"minute" : [0,5,10,15,20,25,30,35,40,45,50,55]
	  		},
	  		"mapProviderList" : [
	  			{ "name": "OpenStreetMaps", "value" : "osm"},
	  			{ "name": "OpenStreetMaps", "value" : "google"}
	  		],
	  		"intersectionTypes" : [
	  			{"name": "Union", "value": "union"},
	  			{"name": "Intersection", "value": "intersection"},
	  			{"name": "Average", "value": "average"},
	  		]
	  };


  	r360.config.requestTimeout = 10000;
  	r360.config.serviceUrl = "https://api.route360.net/api_dev/";
  	r360.config.serviceKey = "OOWOFUK3OPHLQTA8H5JD";
    r360.config.i18n.language = "de";

    $scope.map = L.map('map', {
    	zoomControl : false,
    	scrollWheelZoom : true,
    	contextmenu: true,
	    contextmenuWidth: 140,
	    contextmenuItems: [
	    		{
		        text: 'New Source',
		        callback: addSourceMarkerFromContext,
		        iconFa: 'fa-home'
	    		},
	    		{
	    			text: 'New Target',
		        callback: addTargetMarkerFromContext,
		        iconFa: 'fa-star'
	    		}
	    ]
    	}).setView([52.516389, 13.377778], 13);
    var attribution ="<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox © OpenStreetMap</a> | ÖPNV Daten © <a href='http://www.vbb.de/de/index.html' target='_blank'>VBB</a> | developed by <a href='http://www.route360.net/de/' target='_blank'>Route360°</a>";
    L.tileLayer('https://a.tiles.mapbox.com/v3/mi.0ad4304c/{z}/{x}/{y}.png', { maxZoom: 18, attribution: attribution }).addTo($scope.map);
    L.control.scale({ metric : true, imperial : false }).addTo($scope.map);

    var lastRelatedTarget;

    $scope.map.on("contextmenu.show", function(e){
		  lastRelatedTarget = e.relatedTarget;
		});

    $scope.layerGroups = {
  		markerLayerGroup : L.featureGroup().addTo($scope.map),
  		routeLayerGroup : L.featureGroup().addTo($scope.map),
  		reachableLayerGroup : L.featureGroup().addTo($scope.map),
  		polygonLayerGroup : r360.leafletPolygonLayer().addTo($scope.map)
  	};

  	addMarker([52.516389, 13.377778],'source');

  	function addSourceMarkerFromContext(e) {
    	addMarker(e.latlng,'source');
    }

    function addTargetMarkerFromContext(e) {
    	addMarker(e.latlng,'target');
    }

    function addMarker(coords,type) {

    	var markerArray = undefined;
    	var markerIcon = undefined;
    	var markerLayerGroup = $scope.layerGroups.markerLayerGroup;

    	switch(type) {
			    case 'source':
			        markerArray = $scope.options.sourceMarkers;
			        markerIcon = L.AwesomeMarkers.icon({ icon: 'fa fa-home', prefix : 'fa', markerColor: 'blue' })
			        break;
			    case 'target':
			        markerArray = $scope.options.targetMarkers;
			        markerIcon = L.AwesomeMarkers.icon({ icon: 'fa fa-star', prefix : 'fa', markerColor: 'red' })
			        break;
			    default:
			    	console.log('addMarker error');
							break;
			}

    	var newMarker = L.marker(coords, { 
    							draggable : true , 
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
                }]})
                .addTo(markerLayerGroup)
                //.addTo($scope.srcTrgLayer);

      newMarker.on('dragend',function(){
      	getPolygons();
      	getRoutes();
      })

    	markerArray.push(newMarker);

    	getPolygons();
      getRoutes();
    }

    $scope.removeMarker = removeMarker;

    function removeMarker(marker) {

    	$scope.layerGroups.markerLayerGroup.removeLayer(marker);

    	if ($scope.options.sourceMarkers != undefined) {
	    	$scope.options.sourceMarkers.forEach(function(elem,index,array){
	    		if (elem == marker) {
	    			array.splice(index,1);
	    			console.log("source Marker deleted");
	    		}
	    	})
    	}

    	if ($scope.options.targetMarkers != []) {
	    	$scope.options.targetMarkers.forEach(function(elem,index,array){
	    		if (elem == marker) {
	    			array.splice(index,1);
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

    function buildTravelOptoions() {

    	var travelTimes = [];
      var travelTime = $scope.options.travelTime*60;
      var travelTimeRange = $scope.options.travelTimeRange;
      for ( ; travelTime >= travelTimeRange.min*60 ; travelTime = travelTime - travelTimeRange.step*60)
          travelTimes.push(travelTime);

    	var travelOptions = r360.travelOptions();

    	travelOptions.setTravelType($scope.options.travelType);

    	$scope.options.sourceMarkers.forEach(function(elem,index,array){
    		travelOptions.addSource(elem);
    	})

    	$scope.options.targetMarkers.forEach(function(elem,index,array){
    		travelOptions.addTarget(elem);
    	})

    	travelOptions.extendWidthX = $scope.options.extendWidth*2;
    	travelOptions.extendWidthY = $scope.options.extendWidth*2;

    	travelOptions.backgroundColor = $scope.options.backgroundColor;
    	travelOptions.backgroundOpacity = $scope.options.backgroundOpacity;

    	travelOptions.offset = $scope.options.offset;

    	travelOptions.setIntersectionMode($scope.options.intersection);
      travelOptions.setTravelTimes(travelTimes);
      //travelOptions.setWaitControl($scope.waitControl);

      var rawDate = $scope.options.queryDate;
      var date = String(rawDate.getFullYear()) + ('0' + String(rawDate.getMonth())).slice(-2) + ('0' + String(rawDate.getDate())).slice(-2);
      travelOptions.setDate(date);

      var rawTime = $scope.options.queryTime;
      var time = rawTime.h*3600 + rawTime.m*60;

      travelOptions.setTime(time);
      travelOptions.setMinPolygonHoleSize($scope.options.minPolygonHoleSize);

      if ($scope.travelType == 'car') travelOptions.setMinPolygonHoleSize(10000000);
    	
    	return travelOptions;
    }

    function getPolygons() {

    	if ($scope.options.sourceMarkers.length == 0) {
    		$scope.layerGroups.polygonLayerGroup.clearLayers();
    		return;
    	}

    	var travelOptions = buildTravelOptoions();

      r360.PolygonService.getTravelTimePolygons(travelOptions,

	    	function(polygons){
	          $scope.layerGroups.polygonLayerGroup.clearAndAddLayers(polygons, true);
	          //$scope.getPlaces();
	      },
	      function(error) {
	          $mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#map')))
				        .clickOutsideToClose(true)
				        .title('Something went wrong')
				        .content('Please try Again later')
				        .ariaLabel('Alert Dialog')
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
      //$scope.srcTrgLayer.addLayer($scope.place.marker);

      var travelOptions = buildTravelOptoions();

      r360.RouteService.getRoutes(travelOptions, function(routes) {

      		routes.forEach(function(elem,index,array){
      			r360.LeafletUtil.fadeIn($scope.layerGroups.routeLayerGroup, elem, 500, "travelDistance", { color : "red", haloColor : "#ffffff" });
      		})

          //$scope.place.travelTime = routes[0].travelTime - 4 == $scope.place.travelTime ? $scope.place.travelTime - 4 : $scope.place.travelTime;
          //$scope.place.distance   = routes[0].getDistance().toFixed(3);

          // $scope.map.fitBounds($scope.srcTrgLayer.getBounds(), { paddingBottomRight : [500, 0]});

          if ( !$scope.$$phase ) $scope.$apply();
          if ( typeof callback !== 'undefined' ) callback();
      });
    }

    $scope.autocomplete = [];
    $scope.autocomplete.querySearch = querySearch;
    $scope.addAs = addAs;
    $scope.addAsTarget = addAs('target');

    function addAs(type) {
    	if (typeof $scope.autocomplete.selectedItem !== 'undefined') addMarker([$scope.autocomplete.selectedItem.geometry.coordinates[1],$scope.autocomplete.selectedItem.geometry.coordinates[0]], type);
    }

    function querySearch (query) {

    	var center = $scope.map.getCenter();
    	var results = [];
    	var deferred = $q.defer();

    	$http({
    		method: 'GET',
    		url 	: "http://photon.komoot.de/api/?q=" + query + "&lat=" + center.lat + "&lon=" + center.lng + "&limit=5"
    	}).then(function(response){
    		results = response.data.features.map( function (result) {
        	result.value = result.properties.osm_id;
        	console.log(result);
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

	  var optionsStateChanged = false;

	  $scope.$watchCollection('options', function() {
	  	optionsStateChanged = true;
	  });

	  $scope.$watchCollection('options.travelTimeRange', function() {
	  	optionsStateChanged = true;
	  });

	  $scope.$watch('prefsOpen', function() {
       if (!$scope.prefsOpen && optionsStateChanged) {
       	 getPolygons();
       	 getRoutes();
       	 optionsStateChanged = false;
       }
   });

});