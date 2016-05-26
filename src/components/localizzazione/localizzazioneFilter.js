'use strict';

angular.module('myApp.localizzazione')

.filter('localizzazione', ['localizzazione', function(localizzazione) {
  
  return localizzazione;
}]);