(function () {

    'use strict';

    angular.module('dashboard', [])
        .run(function ($http, $templateCache) {
            $http.get('dashboard/views/dashboard.client.menu.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('dashboard/views/dashboard.client.editor.menu.view.html', {
                cache: $templateCache
            });
        })
        .run(function ($http, $templateCache) {
            $http.get('dashboard/views/dashboard.signin.client.view.html', {
                cache: $templateCache
            });
        });
}());