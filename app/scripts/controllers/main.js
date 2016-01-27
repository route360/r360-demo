'use strict';

/**
 * @ngdoc function
 * @name r360DemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the r360DemoApp
 */
angular.module('r360DemoApp')
  .controller('MainCtrl', function ($interval,$scope) {

    var vm = this;
  	$scope.pageClass = "main-page";

  	vm.city = "brandenburg";

  	vm.cities =  [
  	{
        "id"    :  "brandenburg",
        "name"  : "Berlin/Brandenburg",
        "url"	: "images/berlin.jpg"
    }, {
        "id"    : "norway",
        "name"  : "Norway",
        "url"	: "images/oslo.jpg"
    }, {
        "id"    : "france",
        "name": "France",
        "url"	: "images/paris.jpg"
    }, {
        "id"    : "canada",
        "name": "British Columbia",
        "url"	: "images/vancouver.jpg"
    }, {
        "id"    : "denmark",
        "name": "Denmark",
        "url"	: "images/copenhagen.jpg"
    }, {
        "id"    : "britishisles",
        "name": "British Isles",
        "url"	: "images/london.jpg"
    }, {
        "id"    : "switzerland",
        "name": "Switzerland",
        "url"	: "images/zurich.jpg"
    }, {
        "id"    : "austria",
        "name": "Austria",
        "url"	: "images/vienna.jpg"
    }, {
        "id"    : "newyork",
        "name"  : "United States of America",
        "url"	  : "images/newyork.jpg"
  	}, {
        "id"    : "italy",
        "name"  : "Italy",
        "url"   : "images/italy.jpg"
    }, {
        "id"    : "spain",
        "name"  : "Spain",
        "url"   : "images/spain.jpg"
    }, {
        "id"    : "portugal",
        "name"  : "Portugal",
        "url"   : "images/portugal.jpg"
    }];

  	vm.timer = 0;
  	vm.mode = 'determinate';
  	var timer1;
  	var timer2;
    var i = 0;

  	timer1 = $interval(function(){
  		if (i < vm.cities.length-1) {
        i++
        vm.city = vm.cities[i].id;
      }
  			else {
          i = 0;
          vm.city = 'brandenburg'
        };
  		vm.timer = 0;
  		vm.mode = 'determinate';
  	},5000);

  	timer2 = $interval(function(){
  		vm.timer++;
  	},50);

  	vm.stopTheTimers = function() {
  		$interval.cancel(timer1);
  		$interval.cancel(timer2);
  		vm.mode = '';
  	}

  })