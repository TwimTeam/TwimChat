'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rooms', {
            templateUrl: 'templates/rooms.html',
            controller: 'RoomController'
        });
    }])
    .controller('RoomController', [
        '$scope',
        '$location',
        'socketService',
        function ($scope, $location, socketService) {
            $scope.chatRooms = [];
            $scope.chatRooms.push('Room1');
            $scope.chatRooms.push('Room2');

            $scope.joinRoom = function(room) {
                socketService.join(room);
                console.log(room);
                $location.path('/chat/' + room);
            };

            $scope.createRoom = function(room) {
                $scope.chatRooms.push($scope.room);
                $scope.room = '';
            }
        }
    ]);