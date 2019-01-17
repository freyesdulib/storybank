'use strict';

(function () {
    angular.module('tags', [])
        .run(function ($http, $templateCache) {
            $http.get('tags/views/create-tags.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('tags/views/edit-tags.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('tags/views/list-tags.client.view.html', {
                cache: $templateCache
            });
        });
}());