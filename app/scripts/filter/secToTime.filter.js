'use strict';

angular.module('r360DemoApp')
    .filter('secToTime', function(){
        return function (seconds) {

            var minutes = (seconds / 60).toFixed(0);
            var hours   = Math.floor((minutes / 60)) ;

            minutes = minutes - hours * 60;
            var timeString = "";

            if (hours != 0) timeString += (hours % 24 + ":");
            else timeString += ("00:");

            if ( minutes == 0 ) minutes = "00"
            else if ( minutes < 10 ) minutes = "0" + minutes;

            timeString += minutes;
            // timeString += (minutes + " Uhr");

            return timeString;
        };
    });
