'use strict';

// Create the 'schedule' module E2E test suite
describe('Schedules E2E Tests:', function () {
    // Test the new schedule page
    describe('Create User View', function () {
        it('Should not be able to create a new article', function () {
            // Load the new article page
            browser.get('http://localhost:3000/#!/users/create');

            // Get the submit button
            element(by.css('input[type=submit]')).click();

            // Get the error message element
            element(by.binding('error')).getText().then(function (errorText) {
                // Check the error message text
                expect(errorText).toBe('User is not logged in');
            });
        });
    });
});