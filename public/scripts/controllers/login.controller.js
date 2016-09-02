'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'templates/login.view.html',
            controller: 'LoginController'
        })
    }])
    .controller('LoginController', [
        '$scope',
        'userService',
        function($scope, userService) {
            $scope.login = function() {
                var username = $scope.username;
                var password = $scope.password;

                userService.login(username, password);
            }
        }
    ]);