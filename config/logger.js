'use strict';

var bunyan = require('bunyan');
var bunyanLogs = 'logs/error';

var Log = bunyan.createLogger({
    name: 'CerberusJS',
    streams: [
        {
            level:'debug',
            stream: process.stdout
        },
        {
            type: 'rotating-file',
            level: 'info',
            path: bunyanLogs + '/cerberusjs-info.log',
            period: '1d',   // daily rotation
            count: 3        // keep 3 back copies
        },
        {
            type: 'rotating-file',
            level: 'error',
            path: bunyanLogs + '/cerberusjs-error.log',
            period: '1d',
            count: 3
        }
    ]
});

module.exports = function () {
    return Log;
};