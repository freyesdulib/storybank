'use strict';

require('dotenv').load();

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport'),
    logger = require('./config/logger')();

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express(db);

// Configure the Passport middleware
passport = passport();

logger.info('Story bank application starting...');

// Use the Express application instance to listen to the designated port
app.listen(process.env.APP_PORT);

// Log the server status to the console
console.log('Story bank application running at http://' + process.env.APP_HOST + ':' + process.env.APP_PORT + ' in ' + process.env.NODE_ENV + ' mode.');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;