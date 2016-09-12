'use strict';

angular.module('r360DemoApp')
    .filter('secToMin', function() {
        return function (seconds) {
            return Math.floor(seconds / 60);
        };
    });
