(function () {

    'use strict';

    var tags = function () {
        return {
            restrict: 'E',
            controller: 'StoriesController',
            controlerAs: 'storiesController',
            templateUrl: 'stories/views/tags.stories.client.view.html'
        };
    };

    angular.module('stories').directive('tags', tags);

}());