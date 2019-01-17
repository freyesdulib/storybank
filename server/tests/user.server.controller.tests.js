'use strict';

// Load the test dependencies
var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

// Define global test variables
var user;

describe('User Controller Unit Tests:', function () {
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
        user.save(function (err) {
            should.not.exist(err);
            done();
        });
    });

    describe('Testing the GET methods', function () {
        it('Should be able to get the list of user records', function (done) {
            // Create a SuperTest request
            request(app).get('/api/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {

                    console.log(res.body);
                    //should.not.exist(err);
                    //res.body.should.be.an.Array;
                    //res.body.should.have.lengthOf(1);

                    done();
                });
        });

        it('Should be able to get the specific user', function (done) {
            // Create a SuperTest request
            request(app).get('/api/users/' + user.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {

                    should.not.exist(err);
                    //res.body.should.be.an.Object;
                    //res.body.should.have.property('username', user.username);

                    done();
                });
        });
    });

    // Define a post-tests function
    after(function (done) {
        // Clean the database
        User.remove(function () {
            done();
        });
    });
});