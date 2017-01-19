'use strict';

angular.module('r360DemoApp')
    .controller('TravelPlanCtrl', ['$timeout', 'RoutesService', 'Options', function ($timeout, RoutesService, Options) {

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


        vm.getMarkerDescription= function (id) {
            var result = id + "";

            if (id.indexOf('source' > -1)) {
                Options.sourceMarkers.forEach(function(src) {
                    if (src.id === id)
                        result = src.description && src.description.title || '';
                });
            }

            if (id.indexOf('target' > -1)) {
                Options.targetMarkers.forEach(function(src) {
                    if (src.id === id)
                        result = src.description && src.description.title || '';
                });
            }

            return result;
        }
    }]);
