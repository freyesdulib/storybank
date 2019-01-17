(function () {

    'use strict';

    var tagList = function () {
        return {
            restrict: 'E',
            controller: 'StoriesController',
            controlerAs: 'storiesController',
            templateUrl: 'stories/views/tag-list.stories.client.view.html'
        };
    };

    angular.module('stories').directive('tagList', tagList);

}());