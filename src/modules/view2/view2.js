'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.dataManager', 'myApp.auth', 'ngResource'])

    .config(['$routeProvider', 'authProvider', function ($routeProvider, authProvider) {

        /**
         * Nella definizione delle route l'oggetto resolve è utilizzato per precaricare dei dati o per permettere l'accesso
         * alla route solo al verificarsi di determinate condizioni.
         *
         * La route associata verrà renderizzata solo quando le promise ritornate da tutte le funzioni definite nell'oggetto vengono risolte.
         * Se anche una sola delle promise viene rifiutata allora la route non verrà caricata.
         */
        $routeProvider.when('/view2', {
            templateUrl: 'modules/view2/view2.html',
            controller: 'View2Ctrl',
            resolve: {
                user: authProvider.isLoggedIn
            }
        });
    }])

    .controller('View2Ctrl', ["user", "$scope", "datamanager", "$resource", function (user, $scope, datamanager, $resource) {
        $scope.list = [];

        $scope.list = datamanager.getData();

        /*datamanager.getData().then(function(data){
         $scope.list = data;
         });*/

    }]);