'use strict';
angular.module('myApp.dataManager')
    .provider("datamanager", [function () {

        this.$get = ["$http", "auth", "$resource", function ($http, auth, $resource) {

            /**
             * Il servizio $resource è utilizzato per interagire facilmente con le risorse REST.
             * Dopo aver definito la risorsa si hanno a disposizione su quest'ultima alcuni metodi che rispecchiano le classiche chiamate REST:
             *  - get (richiesta GET si aspetta un oggeto in ritorno)
             *  - query (richiesta GET si aspetta un array in ritorno)
             *  - save (richiesta POST)
             * Mentre $http ritorna una promise (non utilizzabile direttmente nella view) i metodi di $resource tornano un oggetto, che può essere
             * utilizzato direttamente nella view, e verrà valorizzato automaticamente quando la richiesta AJAX va a buon fine.
             */
            var producListApi = $resource(
                "/data/:file.json?token=:token", {
                    token: "@token",
                    file: "@file"
                });

            return {
                getData: function getData() {
                    return producListApi.query({
                        "token": auth.getToken(),
                        "file": "productList"
                    }, function (data) {
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
                addItem: function (item) {

                }
            };
        }];
    }])