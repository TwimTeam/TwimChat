'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'templates/register.view.html',
            controller: 'RegisterController'
        })
    }])
    .controller('RegisterController', [
        '$scope',
        'userService',
        function($scope, userService) {
            $scope.register = function() {
                var username = $scope.username;
                var password = $scope.password;
                var email = $scope.email;

                userService.register(username, password, email);
            }
        }
    ]);