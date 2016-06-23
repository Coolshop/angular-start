'use strict';
angular.module('myApp.auth')
    /**
     * I provider vengono utilizzati per rendere i servizi configurabili.
     * Sono iniettabili solamente nella parte di config dell'applicazione o all'interno di altri provider.
     *
     */
    .provider("auth", [function () {
        var token = null;
        var user = null;

        this.isLoggedIn = ["$q", function isLoggedInProvider($q) {
            var defer = $q.defer();
            if (user) {
                defer.resolve(user);
            } else {
                defer.reject();
            }
            return defer.promise;
        }];

        this.$get = ["$http", function ($http) {

            /**
             * L'oggetto o la funzione ritornati rappresentano il servizio vero e proprio.
             * Questo è iniettabile in qualunque controller, servizio, run dell'applicazione, funzione di resolve
             */
            return {
                login: function login(username, password) {
                    return $http({
                        method: 'GET',
                        url: "http://fakebk.staging.coolshop.it/login.php",
                        params: {
                            "username": username,
                            "password": password
                        }
                    }).then(function successCallback(response) {
                        token = response.data.token;
                        user = response.data.user;
                        return user;
                    }, function errorCallback(response) {
                        alert("Auth Error");
                    });
                },
                isLoggedIn: function isLoggedIn() {
                    return user ? true : false;
                },
                getUser: function isLoggedIn() {
                    return user;
                },
                getToken: function getToken() {
                    return token;
                }
            };
        }];
    }])