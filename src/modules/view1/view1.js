'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/view1', {
    templateUrl: 'modules/view1/view1.html',
    controller: 'View1Ctrl',
    resolve: {
    	userData: function($q, $http, $timeout, localStorage){
    		var deferred = $q.defer();

    		$http({
			  method: 'GET',
			  url: "/data/userData.json"
			}).then(function successCallback(response) {
				$timeout(function() {
					deferred.resolve(response.data);
					//localStorage.setData("user",response.data);
				}, 5000);
			}, function errorCallback(response) {
				alert("AJAX ERROR");
			});

			return deferred.promise;
    	}
    }
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
.provider("localStorage", [function () {
    var prefix = "myStorage_";
    this.setPrefix = function (str) {
        prefix = str;
    };

    this.$get = [function() {
      var dataStore = {};

	  return {
	    	getData: function(key){
	    		//return JSON.parse(localStorage.getItem(key));
	    		return dataStore[key];
	    	},
	    	setData: function(key, value){
	    		//localStorage.setItem(key, angular.toJson(value));
	    		dataStore[key] = value;
	    	}
	    };
	}];
}])
.run(["localStorage", "$http", "$timeout", function(localStorage, $http, $timeout){
	
}])
.controller('View1Ctrl', ["apiWrapperNoConfig", "localStorage", "$scope", "localizzazione", "$http", "userData", function(apiWrapperNoConfig, localStorage, $scope, localizzazione, $http, userData) {
	$scope.userData = userData;
	

	$scope.login = function(){
		$http({
		  method: 'GET',
		  url: "/data/loginData.json"
		}).then(function successCallback(response) {
			localStorage.setData("user",response.data);
			$scope.userData = response.data;
		}, function errorCallback(response) {
			alert("AJAX ERROR");
		});
	}



	$scope.currentDate = new Date();
	$scope.listFilter = {
		name:"",
		surname:""
	};

	$scope.tables = localStorage.getData("tables");

	$scope.esempio = "Ci sono";
}])
.directive('myCustomDirective', ["$http", function($http) {
  return {
    //template: '<div style="color:red">Sono un template</div>'
    restrict: 'EA',
    scope:{
    	dataUrl:'=datasource'
    },
    templateUrl: 'modules/view1/directiveTemplate.html',
    controller: function($scope){
    	$scope.header = [];
    	$scope.search = {};
    	$scope.dataSource = [];
    	$http({
		  method: 'GET',
		  url: angular.isString($scope.dataUrl) ? $scope.dataUrl : "/errore"
		}).then(function successCallback(response) {
			$scope.dataSource = response.data;

			if($scope.dataSource && $scope.dataSource.length){
	    		angular.forEach($scope.dataSource[0], function(val, key){
	    			$scope.header.push(key);
	    		});
	    	}
		}, function errorCallback(response) {
			alert("AJAX ERROR");
		});
    }
  };
}]);








