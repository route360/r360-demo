'use strict';

angular.module('r360DemoApp')
    .filter('idToName', [ 'Options' , function(Options){
        return function (id) {

            var result = id + "";

            if (id.indexOf('source' > -1)) {
                Options.sourceMarkers.forEach(function(src) {
                    if (src.id == id)
                        result = src.description.title;
                })
            }

            if (id.indexOf('target' > -1)) {
                Options.targetMarkers.forEach(function(src) {
                    if (src.id == id)
                        result = src.description.title;
                })
            }

            return result;


        };
    }]);
