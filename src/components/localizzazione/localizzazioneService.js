'use strict';
angular.module('myApp.localizzazione')
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