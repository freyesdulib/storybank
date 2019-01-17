(function () {

    'use strict';

    var DashboardController = function (Authentication) {

        var vm = this;
        vm.authentication = Authentication;
    };

    DashboardController.$inject = ['Authentication'];
    angular.module('dashboard').controller('DashboardController', DashboardController);

}());