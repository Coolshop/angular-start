'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.dataManager','myApp.auth', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'modules/view2/view2.html',
    controller: 'View2Ctrl',
    resolve: {
    	user: authProvider.isLoggedIn
    }
  });
}])

.controller('View2Ctrl', ["user", "$scope", "datamanager", "$resource", function(user, $scope, datamanager, $resource) {
	$scope.list = [];
	
	$scope.list = datamanager.getData();

	/*datamanager.getData().then(function(data){
		$scope.list = data;
	});*/

}]);