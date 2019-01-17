'use strict';

describe('Dashboard controller tests', function () {

    var $rootScope,
        $scope,
        $compile,
        $httpBackend,
        $controller,
        dashboardController;

    beforeEach(function () {
        module('retentionSchedule');
        module('dashboard');
    });

    beforeEach(function () {

        inject(function (_$httpBackend_, _$controller_, _$rootScope_, _$compile_) {

            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $scope = $rootScope.$new();

            dashboardController = $controller('DashboardController', {'$rootScope': $rootScope, '$scope': $scope});
        });

    });

    it('Canary in the coal mine.', function () {
        var users = ['David', 'Adam', 'Emily'];
        expect(users).toEqual(['David', 'Adam', 'Emily']);
    });

    /*
    it('Test Authentication Object', function(Authentication) {
        var User = Authentication;
        //expect(User.user);
    });
    */

});