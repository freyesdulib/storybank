(function () {

    'use strict';

    angular.module('users', [])
        .run(function ($http, $templateCache) {
            $http.get('users/views/active-user.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('users/views/create-user.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('users/views/edit-user.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('users/views/inactive-user.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('users/views/list-user.client.view.html', {
                cache: $templateCache
            });
        });
}());