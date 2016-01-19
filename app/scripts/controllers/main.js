'use strict';

/**
 * @ngdoc function
 * @name r360DemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the r360DemoApp
 */
angular.module('r360DemoApp')
  .controller('MainCtrl', function ($scope,$interval) {
  	$scope.pageClass = "main-page";

  	$scope.city = 0;

  	$scope.cities =  [
  	{
        "id"    : 0,
        "name"  : "Berlin/Brandenburg",
        "url"	: "images/berlin.jpg"
    }, {
        "id"    : 1,
        "name"  : "Norwegen",
        "url"	: "images/oslo.jpg"
    }, {
        "id"    : 2,
        "name": "France",
        "url"	: "images/paris.jpg"
    }, {
        "id"    : 3,
        "name": "British Columbia",
        "url"	: "images/vancouver.jpg"
    }, {
        "id"    : 4,
        "name": "Denmark",
        "url"	: "images/copenhagen.jpg"
    }, {
        "id"    : 5,
        "name": "Great Britain",
        "url"	: "images/london.jpg"
    }, {
        "id"    : 6,
        "name": "Switzerland",
        "url"	: "images/zurich.jpg"
    }, {
        "id"    : 7,
        "name": "Austria",
        "url"	: "images/vienna.jpg"
    }, {
        "id"    : 8,
        "name": "United States of America",
        "url"	: "images/newyork.jpg"
  	}];

  	$scope.timer = 0;
  	$scope.mode = 'determinate';
  	var timer1;
  	var timer2;

  	timer1 = $interval(function(){
  		if ($scope.city < $scope.cities.length-1) $scope.city++
  			else $scope.city = 0;
  		$scope.timer = 0;
  		$scope.mode = "";
  		$scope.mode = 'determinate';
  	},5000);

  	timer2 = $interval(function(){
  		$scope.timer++;
  	},50);

  	$scope.stopTheTimers = function() {
  		$interval.cancel(timer1);
  		$interval.cancel(timer2);
  		$scope.mode = '';
  	}

  })