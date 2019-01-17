'use strict';

module.exports = require('./env/' + process.env.NODE_ENV + '.js');
//module.exports = require('./mongodb.js');
//module.exports = require('./sessions.js');