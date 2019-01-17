'use strict';

var users = require('../../server/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    app.route('/api/users')
        .post(users.create)
        .get(users.list);

    app.route('/api/users/:userId')
        .get(users.read)
        .put(users.requiresLogin, users.update);
        //.delete(users.requiresLogin, users.hasAuthorization, users.delete);

    app.route('/signin')
        .post(passport.authenticate('local', {
            successRedirect: '/#!/stories',
            failureRedirect: '/#!/signin',
            failureFlash: true //'Authentication failed.
        }));

    app.get('/signout', users.signout);
    app.param('userId', users.userByID);
};