'use strict';

/**
 * @ngdoc directive
 * @name r360DemoApp.directive:r360Rainbow
 * @description
 * # r360Rainbow
 */
angular.module('r360DemoApp')
  .directive('r360RainbowLocal', function () {
    return {
      restrict: 'E',
      templateUrl: './templates/r360-rainbow-template.html',
      scope: {
		  travelTime: '=',
		  travelTimeRange: '=',
		  colorRange: '='
		}
    };
  });
