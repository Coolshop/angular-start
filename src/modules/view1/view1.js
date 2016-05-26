'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', 'localizzazioneProvider', function($routeProvider, localizzazioneProvider) {
localizzazioneProvider.setLanguage("en");


  $routeProvider.when('/view1', {
    templateUrl: 'modules/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.factory('apiWrapperNoConfig', [function() {
  var username = "pippo";
  var password = "pluto";

  return {
    	getService1: function(){

    	},
    	getService2: function(){

    	}
    };
}])
.provider("apiWrapper", [function () {
    var username = "pippo";
	var password = "pluto";

    this.setUsername = function (username) {
        username = username;
    };
    this.setPassword = function (pwd) {
        password = pwd;
    };

    this.$get = [function() {

	  return {
	    	getService1: function(){

	    	},
	    	getService2: function(){

	    	}
	    };
	}];
}])
.controller('View1Ctrl', ["apiWrapperNoConfig", "apiWrapper", "$scope", "localizzazione", function(apiWrapperNoConfig, apiWrapper, $scope, localizzazione) {
	$scope.currentDate = new Date();
	$scope.listFilter = {
		name:"",
		surname:""
	};

	$scope.list = [{
		"name":localizzazione("Alessandro"),
		"surname":"Vidotto"
	},
	{
		"name":"Topolino",
		"surname":"Disney"
	},
	{
		"name":"Disney",
		"surname":"Topolina"
	}];
}])
.provider("localizzazione", [function () {
    var language = "it";

    this.setLanguage = function (lang) {
        language = lang;
    };

    this.$get = [function() {
		var strings = { 
			"it":{
		  		'view1.currentDate': 'Data corrente',
		  		'view1.filter.name': 'Nome',
		  		'view1.filter.surname': "Cognome"
		  	},
		  	"en":{
		  		'view1.currentDate': 'Current Date',
		  		'view1.filter.name': 'Name',
		  		'view1.filter.surname': "Surname"
		  	}
	  	}

	  return function(code, lang) {
    
	    return strings[lang || language][code] || code;
	  };
	}];
}])
.filter('localizzazione', ['localizzazione', function(localizzazione) {
  

  return localizzazione;
}]);








