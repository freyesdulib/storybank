(function () {

    'use strict';

    var resource = function ($resource) {
        return $resource('api/stories/:storyId', {
            storyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    };

    angular.module('stories').factory('Stories', ['$resource', resource]);

}());