(function () {

    'use strict';

    var authentication = function () {

        this.user = window.user;

        return {
            user: this.user
        };
    };

    angular.module('users').factory('Authentication', [authentication]);

}());