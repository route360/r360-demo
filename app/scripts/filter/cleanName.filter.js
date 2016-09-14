'use strict';

angular.module('r360DemoApp')
    .filter('cleanName', function () {
        return function (name) {

            if ( typeof name === 'undefined' ) return "UNDEFINED";

            name = name.trim().replace("(Berlin)", '');
            name = name.trim().replace("(Bln)", '');
            name = name.trim().replace(/\[.*\]$/g, '');
            name = name.trim().replace(/U{0-9}{1,2}$/g, '');

            return name;
        };
    });
