(function () {

    'use strict';

    var tagsRoutes = function ($routeProvider) {

        var checkAuth = {
            'auth': function () {
                if (window.user === null) {
                    window.location = '#!/signin';
                }
            }
        };

        $routeProvider.
            when('/tags', {
                templateUrl: 'tags/views/list-tags.client.view.html',
                resolve: checkAuth
            }).
            when('/tags/create', {
                templateUrl: 'tags/views/create-tags.client.view.html',
                resolve: checkAuth
            }).
            when('/tags/:tagId', {
                templateUrl: 'tags/views/view-tags.client.view.html',
                resolve: checkAuth
            }).
            when('/tags/:tagId/edit', {
                templateUrl: 'tags/views/edit-tags.client.view.html',
                resolve: checkAuth
            }).
            otherwise({
                redirectTo: '/signin'
            });
    };

    angular.module('tags').config(['$routeProvider', tagsRoutes]);

}());