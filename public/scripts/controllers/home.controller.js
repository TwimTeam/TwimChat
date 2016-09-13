'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/home.view.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', [
        '$scope',
        function ($scope) {

        }
    ]);