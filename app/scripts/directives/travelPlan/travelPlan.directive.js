'use strict';

angular.module('r360DemoApp')
    .directive('travelPlan', function() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/travelPlan/travelPlan.html',
            controllerAs : 'travelPlan',
            controller : 'TravelPlanCtrl'
        };
    });

