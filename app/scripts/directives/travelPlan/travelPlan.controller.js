'use strict';

angular.module('r360DemoApp')
    .controller('TravelPlanCtrl', ['$timeout', 'RoutesService', function ($timeout, RoutesService) {

        var vm = this;

        vm.routesService = RoutesService;

        vm.isLoading = false;

        vm.isNotTransfer = function(element) {
           return element.travelTime === 0 ? false : true;
        };

        vm.showPlan = function(route) {
            if (!route.show) {
                RoutesService.routes.forEach(function(r) {
                    r.show = false;
                })
                route.show = true;
            } else {
                route.show = false;
            }
        }


    }]);
