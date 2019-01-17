'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Stories = mongoose.model('Stories'),
    Archive = mongoose.model('Archive'),
    logger = require('../../config/logger')();

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {

    var story = new Stories(req.body);

    story.creator = req.user;

    story.save(function (err) {

        if (err) {

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(story);
        }
    });
};

exports.list = function (req, res) {

    Stories.find()
        .populate('creator', 'firstName lastName fullName')
        .exec(function (err, results) {
            if (err) {

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(results);
            }
        });
};

exports.read = function (req, res) {
    res.json(req.story);
};

exports.update = function (req, res) {

    var story = req.story;

    story.title = req.body.title;
    story.story = req.body.story;
    story.author = req.body.author;
    story.tags = req.body.tags;
    story.relatedLinks = req.body.relatedLinks;
    story.status = req.body.status;
    story.increment();

    story.save(function (err) {
        if (err) {

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(story);
        }
    });
};

exports.delete = function (req, res) {

    var story = req.story;

    if (story.status === 'final') {

        var archive = new Archive(req.story);

        archive.save(function (err) {
            if (err) {

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            }
        });

    }

    story.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(story);
        }
    });
};

exports.storyByID = function (req, res, next, id) {

    Stories.findById(id).populate('creator', 'firstName lastName fullName').exec(function (err, story) {
        if (err) {
            return next(err);
        }

        if (!story) {
            return next(new Error('Failed to load story record ' + id));
        }

        req.story = story;

        next();
    });
};

exports.hasAuthorization = function (req, res, next) {

    if (req.story.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }

    next();
};