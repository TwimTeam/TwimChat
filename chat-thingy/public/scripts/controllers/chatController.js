'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat/:room', {
            templateUrl: 'templates/chat.html',
            controller: 'ChatController'
        });
    }])
    .controller('ChatController', [
        '$scope',
        '$routeParams',
        '$location',
        'socketService',
        function ($scope, $routeParams, $location, socketService) {
            $scope.chatMessages = [];
            var room = $routeParams.room;
            socketService.validateSocketInRoom(room);

            socket.on('inRoomValidationResult', function(result) {
                if(!result) {
                    $location.path('/rooms');
                }
            });


            socketService.on('chatMessage', function (message) {
                $scope.chatMessages.push(message);
                $scope.$apply();
                $('.message-history').scrollTop($('.message-history')[0].scrollHeight);
            });

            $scope.sendMessage = function () {
                var content = $scope.message;
                var sentMessage = {content: content, room: room};

                if (content.length > 0) {
                    socketService.emit('chatMessage', sentMessage);
                    $scope.message = "";
                }
            };

            $scope.submitKey = function ($event) {
                var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    $scope.sendMessage();
                }
            };
        }
    ]);