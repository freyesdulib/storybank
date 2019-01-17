'use strict';

// Set the 'development' environment configuration object
module.exports = {
    db: 'mongodb://' + process.env.MONGODB_USER + '@' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_STORAGE,
    sessionSecret: process.env.SESSION_KEY
};