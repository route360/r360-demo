'use strict';

angular.module('r360DemoApp')
  .service('Options', [ function () {

        var now = new Date();
        var hour = now.getHours();
        var minute = (now.getMinutes() + (5 - now.getMinutes() % 5)) % 60;

        if (minute == 0) {
            hour++;
        };
        if (hour == 24) {
            hour = 0;
        };

        var self = {
            "areaID": "germany",
            "cityID" : undefined,  // legacy
            "travelTime": 30,
            "travelTimeRangeID": 0,
            "travelType": "bike",
            "queryDate": now,
            "queryTime": {
                "h": hour,
                "m": minute
            },
            "colorRangeID": 0,
            "mapProvider": "osm",
            "sourceMarkers": [],
            "maxSourceMarkers" : 3,
            "targetMarkers": [],
            "maxTargetMarkers" : 3,
            "groups" : [],
            "intersection": "union",
            "strokeWidth": 30,
            "extendWidth": 500,
            "backgroundColor": 'black',
            "backgroundOpacity": 0,
            "minPolygonHoleSize": 1000000,
            "placesLimit" : 100,
            "transition" : true,
            "mapstyle" : "light",
            "showAdvanced" : false
        };

        return self;

  }]);
