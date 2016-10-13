'use strict';

angular.module('r360DemoApp')
    .directive('travelPlan', function() {
        return {
            restrict: 'E',
            templateUrl: './templates/travelPlan.html',
            controllerAs : 'travelPlan',
            controller : 'TravelPlanCtrl'
        };
    });

