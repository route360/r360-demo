'use strict';

angular.module('r360DemoApp')
    .filter('transferCount', function(){
        return function (amount) {

            var result = "";

            var times = amount - 2;

            if (times < 1) result = "direct connection";
                else {
                    result = "change " + times;
                    result += times > 1 ? " times" : " time";
                }

            return result;

        };
    });
