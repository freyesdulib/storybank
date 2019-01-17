'use strict';

// Load the test dependencies
var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Stories = mongoose.model('Stories');

// Define global test variables
var user, story;

// Create an 'Stories' controller test suite
describe('Story Controller Unit Tests:', function () {
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
        user.save(function () {
            story = new Stories({
                title: 'My title',
                story: 'My story',
                tags: ['myTag0', 'myTag1'],
                relatedLinks: ['http://meow.com', 'http://woof.com'],
                user: user
            });

            story.save(function (err) {
                done();
            });
        });
    });

    // Test the 'Schedule' POST method
    /*
    describe('Testing the POST method', function () {
        it('Auth test...', function (done) {
            // Create a SuperTest request
            var userReq = request.agent();

            console.log(userReq);
            userReq(app)
                .post('/signin') // , schedule
                .send({username: 'testuser', password: 'testpassword'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {

                    //should.not.exist(err);
                    //res.body.should.be.an.Array;
                    //res.body.should.have.lengthOf(1);

                    done();
                });
        });
    });
    */

    // Test the 'Schedule' GET methods
    describe('Testing the GET methods', function () {
        it('Should be able to get the list of story records', function (done) {
            // Create a SuperTest request
            request(app).get('/api/stories')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {

                    should.not.exist(err);
                    res.body.should.be.an.Array;
                    res.body.should.have.lengthOf(1);

                    done();
                });
        });

        it('Should be able to get the specific story', function (done) {
            // Create a SuperTest request
            request(app).get('/api/stories/' + story.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {

                    should.not.exist(err);
                    /*
                    res.body.should.be.an.Object;
                    res.body.should.have.property('title', story.title);
                    res.body.should.have.property('story', story.story);
                    res.body.should.have.property('tags', story.tags);
                    res.body.should.have.property('relatedLinks', story.relatedLinks);
                    res.body.should.have.property('status', story.status);
                    */
                    done();
                });
        });
    });

    // Define a post-tests function
    after(function (done) {
        // Clean the database
        Stories.remove(function () {
            User.remove(function () {
                done();
            });
        });
    });

});