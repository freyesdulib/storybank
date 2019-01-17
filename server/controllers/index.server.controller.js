'use strict';

exports.render = function (req, res) {
    res.render('index', {
        title: 'University of Denver::Strategic Plan Story Bank',
        user: JSON.stringify(req.user),
        messages: req.flash('error') || req.flash('info')
    });
};