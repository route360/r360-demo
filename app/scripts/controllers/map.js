'use strict';

/**
 * @ngdoc function
 * @name r360DemoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the r360DemoApp
 */
angular.module('r360DemoApp')
  .controller('MapCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {

  	// ------------
  	// GENERAL SETUP
  	// ------------
  	$scope.pageClass = 'map-page'

  	// ------------
  	// CONTROLS SETUP
  	// ------------

    $scope.toggleMenu = buildToggler();
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler() {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav("options")
              .toggle()
              .then(function () {
                $log.debug("toggle is done");
              });
          },200);
      return debounceFn;
    }
  	// ------------
  	// R360 SETUP
  	// ------------
  	$scope.travelDate = '20150717';
    $scope.travelTime = (3600 * 17) + '';

    $scope.source = undefined;

    $scope.map = L.map('map', {zoomControl : false, scrollWheelZoom : true }).setView([52.516389, 13.377778], 13);
    // attribution to give credit to OSM map data and VBB for public transportation 
    var attribution ="<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox © OpenStreetMap</a> | ÖPNV Daten © <a href='http://www.vbb.de/de/index.html' target='_blank'>VBB</a> | developed by <a href='http://www.route360.net/de/' target='_blank'>Route360°</a>";
    // initialising the base map. To change the base map just change following lines as described by cloudmade, mapbox etc..
    L.tileLayer('http://a.tiles.mapbox.com/v3/mi.94c056dc/{z}/{x}/{y}.png', { maxZoom: 18, attribution: attribution }).addTo($scope.map);
    L.control.scale({ metric : true, imperial : false }).addTo($scope.map);

  	})

		.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
		  $scope.close = function () {
		    $mdSidenav('options').close()
		      .then(function () {
		        $log.debug("close RIGHT is done");
		      });
		  };
		})

		.controller('ControlsCtrl', function ($scope, $timeout, $mdSidenav, $log) {

			var now = new Date();
			var hour = now.getHours();
			var minute = (now.getMinutes() + (5 - now.getMinutes() % 5)) % 60;

			if (minute == 0) {hour++};
			if (hour == 24) {hour = 0};

		  $scope.options = {
		  		"city" : "berlin",
		  	  "cities" : [
		  	  	{"name" : "Berlin", "value" : "berlin"},
						{"name" : "Oslo", "value" : "oslo"},
						{"name" : "Paris", "value" : "paris"},
						{"name" : "Vancouver", "value" : "vancouver"}
		  	  ],
		  		"travelTimes" : { "min" : 5 , "max" : 30, "step" : 5},
		  		"travelTime" : 10,
		  		"travelTypes" : [
		  			{ "name" : "Bike", "icon" : "fa-bicycle", "value":"bike", "preselected": true},
		  			{ "name" : "Walk", "icon" : "fa-male", "value":"walk", "preselected": false},
		  			{ "name" : "Car", "icon" : "fa-car", "value":"car", "preselected": false},
		  			{ "name" : "Transit", "icon" : "fa-bus", "value":"transit", "preselected": false}
		  		],
		  		"travleType" 	: "bike",
		  		"travelDate" 	: now,
		  		"color"				: true,
		  		"travelDateTime" : {
		  			"hour" : hour, 
		  			"minute" : minute
		  		},
		  		"travelDateTimeRange" :{
		  			"hour" : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		  			"minute" : [0,5,10,15,20,25,30,35,40,45,50,55]
		  		},
		  		"mapProvider" : "osm",
		  		"mapProviderList" : [
		  			{ "value" : "osm", "name": "OpenStreetMaps" },
		  			{ "value" : "google", "name" : "Google" }
		  		]
		  };

		})

