(function () {

    'use strict';

    var resource = function ($resource) {
        return $resource('api/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    };

    angular.module('users').factory('User', ['$resource', resource]);

}());