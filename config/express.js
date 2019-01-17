'use strict';

// Load the module dependencies
var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    passport = require('passport'),
    FileStreamRotator = require('file-stream-rotator');

// Define the Express configuration method
module.exports = function (db) {
    // Create a new Express application instance
    var app = express();

    // Create a new HTTP server
    var server = http.createServer(app);

    // Create a new Socket.io server
    var io = socketio.listen(server);

    var morganLogs = 'logs/access';
    fs.existsSync(morganLogs) || fs.mkdirSync(morganLogs);

    var accessLogStream = FileStreamRotator.getStream({
        filename: morganLogs + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false
    });

    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(morgan('combined', {stream: accessLogStream}));

    // Configure the MongoDB session storage
    var mongoStore = new MongoStore({
        db: db.connection.db
    });

    // Configure the 'session' middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    // Set the application view engine and 'views' folder
    app.set('views', './server/views');
    app.set('view engine', 'ejs');

    // Configure the flash messages middleware
    app.use(flash());

    // Configure the Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Load the routing files
    fs.readdirSync('./server/routes').forEach(function (file) {
        if (file.substr(-3) === '.js') {
            require('../server/routes/' + file)(app);
        }
    });

    // Configure static file serving
    app.use(express.static('./client'));

    // Load the Socket.io configuration
    require('./socketio')(server, io, mongoStore);

    // Return the Server instance
    return server;
};