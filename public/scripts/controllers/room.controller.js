'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rooms', {
            templateUrl: 'templates/rooms.view.html',
            controller: 'RoomController'
        });
    }])
    .controller('RoomController', [
        '$scope',
        '$http',
        '$location',
        'socketService',
        'userService',
        function ($scope, $http, $location, socketService, userService) {
            $scope.username = userService.getCurrentUser().username;
            //$("#mydiv div:first-child").after(newDiv);

            if (!userService.hasCurrentUser()) {
                $location.path('/login');
            }

            $scope.chatRooms = [];

            $http.get('/api/rooms', {headers: userService.getAuthorizationHeaders()}).then(function (success) {
                success.data.forEach(function (room) {
                    $scope.chatRooms.push(room.name);
                });
                //TODO: Notificate Success
            }, function (error) {
                //TODO: Notificate Error
            });

            $scope.joinRoom = function (room) {
                socketService.join(room);
                $location.path('/chat/' + room);
            };

            $scope.createRoom = function () {
                var room = $scope.room;
                if (room) {
                    $http({
                        method: 'POST',
                        url: '/api/rooms',
                        headers: userService.getAuthorizationHeaders(),
                        data: {name: room}
                    }).then(function (success) {
                        //TODO: Notificate Success
                        console.log("bullshit");
                    }, function (error) {
                        //TODO: Notificate error
                    });

                    $scope.joinRoom(room);
                }
            };
        }
    ]);