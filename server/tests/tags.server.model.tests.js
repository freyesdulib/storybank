'use strict';

// Load the test dependencies
var app = require('../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Tags = mongoose.model('Tags');

// Define global variables
var user, tag;

describe('Tags Model Unit Tests:', function () {
    // Define a pre-tests function
    before(function (done) {

        user = new User({
            firstName: 'Test',
            lastName: 'User',
            displayName: 'Test User',
            email: 'test.user@test.com',
            username: 'testuser',
            password: 'testpassword'
        });

        user.save(function () {
            tag = new Tags({
                name: 'myTag',
                description: 'My test description',
                creator: user._id
            });

            done();
        });
    });

    describe('Testing the save method', function () {

        it('Should be able to save without problems', function () {
            tag.save(function (err) {
                should.not.exist(err);
            });
        });

        it('Should not be able to save an tag without a value', function () {
            tag.name = '';

            tag.save(function (err) {
                should.exist(err);
            });
        });
    });

    describe('Testing the find method', function () {

        it('Should be able to retrieve records without problems', function () {

            Tags.find()
                .select('name description')
                .exec(function (err, results) {
                    //console.log(results);
                    // TODO: test JSON payload
                    should.not.exist(err);
                });
        });
    });

    describe('Testing the findById method', function () {

        it('Should be able to retrieve record by id without problems', function () {

            Tags.findById(tag._id)
                .exec(function (err, result) {

                    // TODO: test JSON payload
                    //console.log(result);
                    should.not.exist(err);

                });
        });
    });

    after(function (done) {
        // Clean the database
        Tags.remove(function () {
            User.remove(function () {
                done();
            });
        });
    });

});