(function () {

    'use strict';

    var storiesMenu = function () {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'stories/views/stories.client.menu.view.html'
        };
    };

    angular.module('stories').directive('storiesMenu', storiesMenu);

}());