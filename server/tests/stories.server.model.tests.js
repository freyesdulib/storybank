'use strict';

// Load the test dependencies
var app = require('../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Stories = mongoose.model('Stories');

// Define global variables
var user, story;

describe('Stories Model Unit Tests:', function () {
    // Define a pre-tests function
    before(function (done) {
        // Create a new 'User' model instance
        user = new User({
            firstName: 'Test',
            lastName: 'User',
            displayName: 'Test User',
            email: 'test.user@test.com',
            username: 'testuser',
            password: 'testpassword'
        });

        // Save the new 'User' model instance
        // Save test schedule data
        user.save(function () {
            story = new Stories({
                title: 'My title',
                story: 'My story',
                tags: ['myTag0', 'myTag1'],
                relatedLinks: ['http://meow.com', 'http://woof.com'],
                user: user
            });

            done();
        });
    });

    // Test the 'Tags' model save method
    describe('Testing the save method', function () {

        it('Should be able to save without problems', function () {
            story.save(function (err) {
                should.not.exist(err);
            });
        });

        it('Should not be able to save a tag without a name', function () {
            story.title = '';

            story.save(function (err) {
                should.exist(err);
            });
        });
    });

    describe('Testing the find method', function () {

        it('Should be able to retrieve records without problems', function () {

            Stories.find()
                .exec(function (err, results) {
                    //console.log(results);
                    // TODO: test JSON payload
                    should.not.exist(err);
                });
        });
    });

    describe('Testing the findById method', function () {

        it('Should be able to retrieve record by id without problems', function () {

            Stories.findById(story._id)
                .exec(function (err, result) {

                // TODO: test JSON payload
                //console.log(result);
                should.not.exist(err);

            });
        });
    });

    after(function (done) {
        // Clean the database
        Stories.remove(function () {
            User.remove(function () {
                done();
            });
        });
    });
});