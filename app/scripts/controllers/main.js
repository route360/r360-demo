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

  	vm.city = "germany";

  	vm.cities =  [
    {
        "id"    :  "australia",
        "name"  : "Australia and New Zealand",
        "url"	: "images/australia.jpg"
    }, {
        "id"    :  "germany",
        "name"  : "Germany",
        "url"	: "images/germany.jpg"
    }, {
        "id"    :  "malaysia_singapore",
        "name"  : "Malaysia, Singapore, Brunei",
        "url"	: "images/singapore.jpg"
    }, {
        "id"    : "norway",
        "name"  : "Norway",
        "url"	: "images/oslo.jpg"
    }, {
        "id"    : "france",
        "name": "France & Belgium",
        "url"	: "images/paris.jpg"
    }, {
        "id"    : "britishcolumbia",
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
        "name"  : "USA and Mexico",
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
    }, {
        "id"    : "czech_republic",
        "name"  : "Czech Republic",
        "url"   : "images/prague.jpg"
    }, {
        "id"    : "sweden",
        "name"  : "Sweden",
        "url"   : "images/sweden.jpg"
    }, {
        "id"    : "south_america",
        "name"  : "South America",
        "url"   : "images/rio.jpg"
    }, {
        "id"    : "quebec",
        "name"  : "Quebec",
        "url"   : "images/quebec.jpg"
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
          vm.city = 'germany'
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
