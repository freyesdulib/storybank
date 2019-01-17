'use strict';

(function () {

    var resource = function ($resource) {
        return $resource('api/tags/:tagId', {
            tagId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    };

    angular.module('tags').factory('Tags', ['$resource', resource]);

}());