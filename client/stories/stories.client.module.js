(function () {

    'use strict';

    angular.module('stories', [])
        .run(function ($http, $templateCache) {
            $http.get('stories/views/create-stories.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('stories/views/edit-stories.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('stories/views/list-stories.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('stories/views/final-stories.client.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('stories/views/stories.client.menu.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('stories/views/draft-stories.client.view.html', {
                cache: $templateCache
            });
        });
}());