'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ["$http",function($http) {
  $http({
    method: 'GET',
    url: "http://fakebk.staging.coolshop.it/login.php",
    params:{
      "username":"ale",
      "password":""
    }
  }).then(function successCallback(response) {
    alert("OK");
  }, function errorCallback(response) {
    alert("AJAX ERROR");
  });
}]);