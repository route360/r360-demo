'use strict';

angular.module('r360DemoApp')
    .filter('formatMeter', function(){
        return function (kilometer) {

            var approxMeters = (kilometer || 0).toFixed(3);
            if ( approxMeters < 1000 ) return Math.round(approxMeters/10)*10 + "m";
            else {

                var approxKilometer = Math.round(approxMeters/10)*10;
                return approxKilometer / 1000 + "km";
            }
        };
    });
