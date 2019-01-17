'use strict';

(function () {

    var dashboardMenu = function () {
        return {
            scope: {
                user: "@user"
            },
            restrict: 'E',
            templateUrl: 'dashboard/views/dashboard.client.menu.view.html'
        };
    };

    angular.module('dashboard').directive('dashboardMenu', dashboardMenu);

}());