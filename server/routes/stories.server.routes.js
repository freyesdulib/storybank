'use strict';

// Load the module dependencies
var users = require('../../server/controllers/users.server.controller'),
    stories = require('../../server/controllers/stories.server.controller');

module.exports = function (app) {

    app.route('/api/stories')
        .get(stories.list)
        .post(users.requiresLogin, stories.create);

    app.route('/api/stories/:storyId')
        .get(stories.read)
        .put(users.requiresLogin, stories.update) //stories.hasAuthorization
        .delete(users.requiresLogin, stories.delete); //stories.hasAuthorization

    app.route('/api/status/:storyId')
        .put(users.requiresLogin, stories.update); // stories.hasAuthorization

    app.param('storyId', stories.storyByID);
};