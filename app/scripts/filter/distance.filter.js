'use strict';

angular.module('r360DemoApp')
    .filter('distance', function () {
        return function (input) {

            if (input >= 1000) {
               return (input/1000).toFixed(2) + 'km';
            } else {
               return input + 'm';
            }

        };
    });
