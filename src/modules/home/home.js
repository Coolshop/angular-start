'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ["auth", "$scope",function(auth, $scope) {
  $scope.user = auth.getUser() || {};
  $scope.loginStatus = auth.isLoggedIn();
  
  $scope.login = function(){
    var loginPromise = auth.login($scope.user.username, $scope.user.password);

    loginPromise.then(function successLogin(user){
        $scope.loginStatus = true;
    });
  }
}]);