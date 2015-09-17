'use strict';

/**
 * @ngdoc overview
 * @name r360DemoApp
 * @description
 * # r360DemoApp
 *
 * Main module of the application.
 */
angular
  .module('r360DemoApp', [
    'ngAnimate',
    'ngRoute',
    'ngMaterial'
  ])
   .config(function ($mdThemingProvider,$routeProvider) {


   	$mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue-grey');

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })

        // map page
        .when('/map', {
            templateUrl: 'views/map.html',
            controller: 'MapCtrl'
        });
});
