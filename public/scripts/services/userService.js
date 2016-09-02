'use strict';

angular.module('chat.services')
    .factory('userService', [
        '$http',
        '$location',
        function ($http, $location) {
            function register(username, password, email) {
                var requestBody = {username: username, password: password, email: email};

                $http.post('/api/users', requestBody).then(
                    function (success) {
                        //TODO: Notificate success
                        $location.path('/');
                    },
                    function (error) {
                        //TODO: Notificate fail
                    }
                );
            }

            function login(username, password) {
                var requestBody = {username: username, password: password};

                $http.post('/api/users/login', requestBody).then(
                    function (success) {
                        var authToken = success.data._authToken;
                        var username = success.data.username;

                        sessionStorage.setItem('authToken', authToken);
                        sessionStorage.setItem('username', username);
                        $location.path('/rooms');
                        //TODO: Notify ssuccess
                    },
                    function (error) {
                        //TODO: Notify error
                    }
                );
            }

            function hasCurrentUser() {
                return sessionStorage['username'] != undefined;
            }

            function getCurrentUser() {
                return {authToken: sessionStorage.getItem('authToken'), username: sessionStorage.getItem('username')};
            }

            function getCurrentRoom() {
                return sessionStorage['room'];
            }

            function getAuthorizationHeaders() {
                var headers = {};

                if (hasCurrentUser()) {
                    headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'User ' + sessionStorage.getItem('authToken')
                    };
                }
                else {
                    headers = {
                        'Content-Type': 'application/json'
                    };
                }

                return headers;
            }

            return {
                register: register,
                login: login,
                hasCurrentUser: hasCurrentUser,
                getCurrentUser: getCurrentUser,
                getCurrentRoom: getCurrentRoom,
                getAuthorizationHeaders: getAuthorizationHeaders
            }
        }
    ]);