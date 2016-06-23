'use strict';
angular.module('myApp.dataManager')
  .provider("datamanager", [function () {

    this.$get = ["$http", "auth", "$resource", function($http, auth, $resource) {
	  var producListApi = $resource(
	  	"/data/:file.json?token=:token",{
	  	token:"@token",
	  	file:"@file"
	  });

      return {
	  		getData: function getData(){
	  			product = producListApi.get();

	  			return producListApi.query({
	  				"token":auth.getToken(),
	  				"file":"productList"
	  			}, function(data){
	  				data
	  			});
	  			/*
	  			return $http({
				    method: 'GET',
				    url: "/data/productList.json",
				    params:{
				      "token": auth.getToken()
				    }
				  }).then(function successCallback(response) {
				    return response.data;
				  }, function errorCallback(response) {
				     alert("Get data Error");
				  });
				*/
	  		},
	  		addItem: function(item){

	  		}
	  };
	}];
}])