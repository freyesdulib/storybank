'use strict';

describe('Schedule controller tests', function () {

    var $rootScope,
        $scope,
        $compile,
        $httpBackend,
        $controller,
        scheduleController;

    beforeEach(function () {
        module('retentionSchedule');
        module('schedule');
    });

    beforeEach(function () {

        inject(function (_$httpBackend_, _$controller_, _$rootScope_, _$compile_) {

            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $scope = $rootScope.$new();

            scheduleController = $controller('ScheduleController', {'$rootScope': $rootScope, '$scope': $scope});

        });
    });

    it('Canary in the coal mine.', function () {
        var users = ['David', 'Adam', 'Emily'];
        expect(users).toEqual(['David', 'Adam', 'Emily']);
    });

    it('Should have a find method that uses $resource to retrieve a list of schedules', function (Schedule) {

        var sampleSchedule = new Schedule({
            recordcode: 'A MEAN test',
            recordname: 'MEAN rocks!',
            recorddescription: 'test',
            recordcategory: 'test',
            keywords: [{name: 'meow'}]
        });

        var sampleSchedule = [sampleSchedule];

        // Define a request assertion
        $httpBackend.expectGET('api/schedule').respond(sampleSchedule);

        // Call the controller's 'find' method
        scheduleController.find();

        // Flush the mock HTTP results
        $httpBackend.flush();

        // Test the results
        expect(scheduleController.schedule).toEqualData(sampleSchedule);

    });

    it('Should have a findOne method that uses $resource to retreive a single of schedule', function (Schedule) {

        var sampleSchedule = new Schedule({
            recordcode: 'A MEAN test',
            recordname: 'MEAN rocks!',
            recorddescription: 'test',
            recordcategory: 'test',
            keywords: [{name: 'meow'}]
        });

        $routeParams.scheduleId = 'abcdef123456789012345678';

        // Define a request assertion
        $httpBackend.expectGET(/api\/schedule\/([0-9a-fA-F]{24})$/).respond(sampleSchedule);

        // Call the controller's 'findOne' method
        scheduleController.findOne();

        // Flush the mock HTTP results
        $httpBackend.flush();

        // Test the results
        expect(scheduleController.schedule).toEqualData(sampleSchedule);

    });
});