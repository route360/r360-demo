'use strict';

angular.module('r360DemoApp')
    .filter('secToHoursMin', function () {
        return function (seconds) {

            var minutes = (seconds / 60).toFixed(0);
            var hours = Math.floor(minutes / 60);

            minutes = minutes - hours * 60;
            var timeString = "";

            if (hours != 0){
                timeString += (hours + " Std. ");
            }

            timeString += (minutes + " Min.");
            return timeString;
        }
    });
