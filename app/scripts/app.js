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
    'ngMaterial',
    'config'
  ])
   .config(function ($mdIconProvider,$mdThemingProvider,$routeProvider,$locationProvider) {


   	$mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('red');

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl as main'
        })

        // map page
        .when('/map', {
            templateUrl: 'views/map.html',
            controller: 'MapCtrl as map',
            reloadOnSearch: false
        });

        r360.config.requestTimeout = 30000;

    // $locationProvider.html5Mode(true);

    $mdIconProvider
        //.iconSet('action', '../styles/icons/action-icons.svg', 24)
        //.iconSet('alert', '../styles/icons/alert-icons.svg', 24)
        //.iconSet('av', '../styles/icons/av-icons.svg', 24)
        //.iconSet('communication', '../styles/icons/communication-icons.svg', 24)
        //.iconSet('content', '../styles/icons/content-icons.svg', 24)
        //.iconSet('device', '../styles/icons/device-icons.svg', 24)
        //.iconSet('editor', '../styles/icons/editor-icons.svg', 24)
        //.iconSet('file', '../styles/icons/file-icons.svg', 24)
        //.iconSet('hardware', '../styles/icons/hardware-icons.svg', 24)
        //.iconSet('icons', '../styles/icons/icons-icons.svg', 24)
        //.iconSet('image', '../styles/icons/image-icons.svg', 24)
        //.iconSet('maps', '../styles/icons/maps-icons.svg', 24)
        .iconSet('md', './images/icons/mdi-icons.svg', 24)
        //.iconSet('navigation', '../styles/icons/navigation-icons.svg', 24)
        //.iconSet('notification', '../styles/icons/notification-icons.svg', 24)
        //.iconSet('social', '../styles/icons/social-icons.svg', 24)
        //.iconSet('toggle', '../styles/icons/toggle-icons.svg', 24)
});
