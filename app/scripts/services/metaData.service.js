'use strict';

angular.module('r360DemoApp')
  .service('Meta', ['ENV','Options', '$http',function (ENV,Options,$http) {

        var self = {};

        self.data = {};

        self.fetchMetadata = function() {
            // Simple GET request example:
            $http({
              method: 'GET',
              url: ENV.endpoints[Options.areaID] + 'v1/metadata/network?key=' + ENV.serviceKey
            })
            .then(function (response) {
               self.data = response.data;
              })
            .catch(function (response) {
                console.log(response);
              });

        };

        return self;

  }]);
