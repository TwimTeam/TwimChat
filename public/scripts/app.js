'use strict';

angular.module('chat.services', []);
angular.module('chat.controllers', ['ngRoute', 'chat.services']);

angular.module('chat',
    [
        'ngRoute',
        'chat.services',
        'chat.controllers'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]
    );