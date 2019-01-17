(function () {

    'use strict';

    var relatedLinks = function () {
        return {
            restrict: 'E',
            controller: 'StoriesController',
            controlerAs: 'storiesController',
            templateUrl: 'stories/views/related-links.stories.client.view.html'
        };
    };

    angular.module('stories').directive('relatedLinks', relatedLinks);

}());