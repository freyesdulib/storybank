(function () {

    'use strict';

    var userRoutes = function ($routeProvider) {

        var checkAuth = {
            'auth': function () {
                if (window.user === null) {
                    window.location = '#!/signin';
                }
            }
        };

        $routeProvider.
            when('/users', {
                templateUrl: 'users/views/list-user.client.view.html',
                resolve: checkAuth
            }).
            when('/users/create', {
                templateUrl: 'users/views/create-user.client.view.html',
                resolve: checkAuth
            }).
            when('/users/:userId', {
                templateUrl: 'users/views/view-user.client.view.html',
                resolve: checkAuth
            }).
            when('/users/:userId/edit', {
                templateUrl: 'users/views/edit-user.client.view.html',
                resolve: checkAuth
            }).
            when('/users/:userId/status/inactive', {
                templateUrl: 'users/views/active-user.client.view.html',
                resolve: checkAuth
            }).
            when('/users/:userId/status/active', {
                templateUrl: 'users/views/inactive-user.client.view.html',
                resolve: checkAuth
            }).
            otherwise({
                redirectTo: '/signin'
            });
    };

    angular.module('users').config(['$routeProvider', userRoutes]);

}());