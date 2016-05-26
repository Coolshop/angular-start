'use strict';

angular.module('myApp.localizzazione', [])
.config(['localizzazioneProvider',function(localizzazioneProvider){
	localizzazioneProvider.setLanguage("en");
}]);
