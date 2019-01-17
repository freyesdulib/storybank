'use strict';

describe('Tags controller tests', function () {

    var $rootScope,
        $scope,
        $compile,
        $httpBackend,
        $controller,
        scheduleController;

    beforeEach(function () {
        module('storyWell');
        module('tags');
    });

    beforeEach(function () {

        inject(function (_$httpBackend_, _$controller_, _$rootScope_, _$compile_) {

            $httpBackend = _$httpBackend_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $scope = $rootScope.$new();

            scheduleController = $controller('TagsController', {'$rootScope': $rootScope, '$scope': $scope});

        });
    });

    it('Canary in the coal mine.', function () {
        var users = ['David', 'Adam', 'Emily'];
        expect(users).toEqual(['David', 'Adam', 'Emily']);
    });

    it('Should have a find method that uses $resource to retrieve a list of tags', function (Tag) {

        var tag = new Tag({
            name: 'myTag',
            description: 'My tag description'
        });

        var testTag = [tag];

        // Define a request assertion
        $httpBackend.expectGET('api/tags').respond(testTag);

        // Call the controller's 'find' method
        tagsController.find();

        // Flush the mock HTTP results
        $httpBackend.flush();

        // Test the results
        expect(tagsController.tag).toEqualData(testTag);

    });

    it('Should have a findOne method that uses $resource to retreive a single of tag', function (Tag) {

        var testTag = new Tag({
            name: 'myTag',
            description: 'My tag description'
        });

        $routeParams.tagId = 'abcdef123456789012345678';

        // Define a request assertion
        $httpBackend.expectGET(/api\/tags\/([0-9a-fA-F]{24})$/).respond(testTag);

        // Call the controller's 'findOne' method
        tagsController.findOne();

        // Flush the mock HTTP results
        $httpBackend.flush();

        // Test the results
        expect(tagsController.tag).toEqualData(testTag);

    });
});