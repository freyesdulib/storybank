'use strict';

module.exports = {
    db: 'mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PWD + '@' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_STORAGE
};