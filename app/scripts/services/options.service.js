'use strict';

angular.module('r360DemoApp')
  .service('Options', ['ENV', function (ENV) {

        var now = new Date();
        var hour = now.getHours();
        var minute = (now.getMinutes() + (5 - now.getMinutes() % 5)) % 60;

        if (minute === 0) {
            hour++;
        }
        if (hour === 24) {
            hour = 0;
        }

        var self = {
            "areaID": "germany",
            "cityID" : undefined,  // legacy
            "travelTime": 30,
            "travelTimeRangeID": 0,
            "travelDistanceRangeID": 0,
            "travelType": "bike",
            "travelDistance": 5000,
            "edgeWeight": "time",
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
            "timingMarkers" : [],
            "maxTimingTargetMarkers" : 1000,
            "groups" : [],
            "intersection": "union",
            "strokeWidth": 30,
            "extendWidth": 500,
            "backgroundColor": 'black',
            "backgroundOpacity": 0,
            "minPolygonHoleSize": 10000000,
            "customURL" : undefined,
            "placesLimit" : 100,
            "transition" : true,
            "zoomAllTheTime": true,
            "mapstyle" : "light",
            "showAdvanced" : (ENV.name === "development" ? true : false),
            "debugMode" : (ENV.name === "development" ? true : false),
            "elevation" : true,
            "reverse" : false,
            "frameDuration" : 18000,
            "congestion": false
        };

        return self;

  }]);
