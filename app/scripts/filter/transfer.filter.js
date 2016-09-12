'use strict';

angular.module('r360DemoApp')
    .filter('transferCount', function(){
        return function (amount) {

            var result = "";

            if (amount < 3) result = "Direktverbindung";
                else result = (amount - 2) + " Mal umsteigen";

            return result;

        };
    });
