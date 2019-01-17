'use strict';

// Load the module dependencies
var users = require('../../server/controllers/users.server.controller'),
    tags = require('../../server/controllers/tags.server.controller');

module.exports = function (app) {

    app.route('/api/tags')
        .get(tags.list)
        .post(users.requiresLogin, tags.create);

    app.route('/api/tags/:tagId')
        .get(tags.read)
        .put(users.requiresLogin, tags.update)  // tags.hasAuthorization,
        .delete(users.requiresLogin, tags.delete);  // tags.hasAuthorization,

    app.param('tagId', tags.tagByID);
};