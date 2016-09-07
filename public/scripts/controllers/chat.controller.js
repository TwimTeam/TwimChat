'use strict';

angular.module('chat.controllers')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/chat/:room', {
            templateUrl: 'templates/chat.view.html',
            controller: 'ChatController'
        });
    }])
    .controller('ChatController', [
        '$scope',
        '$routeParams',
        '$location',
        'socketService',
        'userService',
        function ($scope, $routeParams, $location, socketService, userService) {

            if(!userService.hasCurrentUser()) {
                $location.path('/login');
            }

            $scope.chatMessages = [];
            $scope.room = $routeParams.room;

            socketService.on('chatMessage', function (message) {
                $scope.chatMessages.push({content:message.content, isUser: message.user == userService.getCurrentUser().username, user: message.user});
                $scope.$apply();
                $('.message-history').scrollTop($('.message-history')[0].scrollHeight);
            });

            socketService.on('joinedRoom', function(user) {
                var message = user.username + " has joined the room.";
                $scope.chatMessages.push({content: message, isUser: false, user: null});
                $scope.$apply();
                $('.message-history').scrollTop($('.message-history')[0].scrollHeight);
            });

            socketService.on('leftRoom', function(user) {
                var message = user.username + " has left the room.";
                $scope.chatMessages.push({content: message, isUser: false, user: null});
                $scope.$apply();
                $('.message-history').scrollTop($('.message-history')[0].scrollHeight);
            });

            $scope.leaveRoom = function() {
                var args = {room: $scope.room, user: userService.getCurrentUser()};
                socketService.leave(args);
            };

            $scope.sendMessage = function () {
                var content = $scope.message;
                var sentMessage = {content: content, room: $scope.room, user: userService.getCurrentUser().username};

                if (content.length > 0) {
                    socketService.emit('chatMessage', sentMessage);
                    $scope.message = "";
                }
            };

            $scope.isUserMessage = function(message) {
                console.log(message);
            };

            $scope.submitKey = function ($event) {
                var keyCode = $event.which || $event.keyCode;
                if (keyCode === 13) {
                    $scope.sendMessage();
                }
            };
        }
    ]);