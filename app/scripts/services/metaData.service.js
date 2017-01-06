'use strict';

angular.module('r360DemoApp')
  .service('Meta', ['ENV','Options', '$http',function (ENV,Options,$http) {

        var self = {};

        self.data = {};

        function kebabToSnake(object,key) {
          var kebabKey = key.replace("_","-");
          var snakeKey = key.replace("-","_");

          if (!angular.isDefined(object[snakeKey])) {
            object[snakeKey] = object[kebabKey];
          }

        }

        function YYYYMMDDtoDate(number) {
          var string;
          if (typeof number !== 'string') string = number.toString();
          else string = number;
          if (string.length<8) return;
          var year = parseInt(string.substr(0,4));
          var month = parseInt(string.substr(4,2));
          var day = parseInt(string.substr(6,2));
          return new Date(year, month, day);
        }

        self.fetchMetadata = function() {
            // Simple GET request example:
            return $http({
              method: 'GET',
              url: ENV.endpoints[Options.areaID] + 'v1/metadata/network?key=' + ENV.serviceKey
            })
            .then(function (response) {
               self.data = response.data;
               kebabToSnake(self.data.transit,'min-date');
               kebabToSnake(self.data.transit,'max-date');
               self.data.transit.min_date = new YYYYMMDDtoDate(self.data.transit.min_date);
               self.data.transit.max_date = new YYYYMMDDtoDate(self.data.transit.max_date);
              })
            .catch(function (response) {
                console.log(response);
              });

        };

        return self;

  }]);
