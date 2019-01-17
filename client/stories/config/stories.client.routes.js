(function () {

    'use strict';

    var storiesRoutes = function ($routeProvider) {

        var checkAuth = {
            'auth': function () {
                if (window.user === null) {
                    window.location = '#!/signin';
                }
            }
        };

        $routeProvider.
            when('/stories', {
                templateUrl: 'stories/views/list-stories.client.view.html',
                resolve: checkAuth
            }).
            when('/stories/create', {
                templateUrl: 'stories/views/create-stories.client.view.html',
                resolve: checkAuth
            }).
            when('/stories/:storyId', {
                templateUrl: 'stories/views/view-stories.client.view.html',
                resolve: checkAuth
            }).
            when('/stories/create/:storyId', {
                templateUrl: 'stories/views/create-stories.client.view.html',
                resolve: checkAuth
            }).
            when('/stories/:storyId/edit', {
                templateUrl: 'stories/views/edit-stories.client.view.html',
                resolve: checkAuth
            }).
            when('/stories/:storyId/status/draft', {
                templateUrl: 'stories/views/final-stories.client.view.html',
                resolve: checkAuth
            }).
            when('/stories/:storyId/status/final', {
                templateUrl: 'stories/views/draft-stories.client.view.html',
                resolve: checkAuth
            }).
            otherwise({
                redirectTo: '/signin'
            });
    };

    angular.module('stories').config(['$routeProvider', storiesRoutes]);

}());