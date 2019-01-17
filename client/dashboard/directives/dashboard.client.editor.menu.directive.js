'use strict';

(function () {

    var dashboardEditorMenu = function () {
        return {
            scope: {
                user: "@user"
            },
            restrict: 'E',
            templateUrl: 'dashboard/views/dashboard.client.editor.menu.view.html'
        };
    };

    angular.module('dashboard').directive('dashboardEditorMenu', dashboardEditorMenu);

}());