(function () {

    'use strict';

    // Set the main application name
    var mainApplicationModuleName = 'storyBank';
    var modules = ['ngResource',
                    'ngRoute',
                    'users',
                    'dashboard',
                    'stories',
                    'tags',
                    'flash',
                    'textAngular'];

    // Create the main application
    var mainApplicationModule = angular.module(mainApplicationModuleName, modules);

    // Configure the hashbang URLs using the $locationProvider services
    mainApplicationModule.config(['$locationProvider',
        function ($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

    // Manually bootstrap the AngularJS application
    angular.element(document).ready(function () {
        angular.bootstrap(document, [mainApplicationModuleName]);
    });

}());