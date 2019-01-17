(function () {

    'use strict';

    var dashboardRoutes = function ($routeProvider) {
        $routeProvider.
            when('/signin', {
                templateUrl: 'dashboard/views/dashboard.signin.client.view.html'
            }).
            when('/stories', {
                templateUrl: 'stories/views/list-stories.client.view.html'
            }).
            otherwise({
                redirectTo: '/signin'
            });
    };

    angular.module('dashboard').config(['$routeProvider', dashboardRoutes]);

}());