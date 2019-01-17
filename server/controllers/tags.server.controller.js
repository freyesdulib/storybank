'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Tags = mongoose.model('Tags');

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

    var tag = new Tags(req.body);

    tag.creator = req.user;

    tag.save(function (err) {
        if (err) {

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(tag);
        }
    });
};

exports.list = function (req, res) {

    Tags.find()
        .select('name description')
        .sort({'name': 1})
        .exec(function (err, tags) {
            if (err) {

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(tags);
            }
        });
};

exports.read = function (req, res) {
    res.json(req.tag);
};

exports.update = function (req, res) {

    var tag = req.tag;
    tag.name = req.body.name;
    tag.description = req.body.description;

    tag.save(function (err) {
        if (err) {

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(tag);
        }
    });
};

exports.delete = function (req, res) {

    var tag = req.tag;

    tag.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(tag);
        }
    });
};

exports.tagByID = function (req, res, next, id) {

    Tags.findById(id).populate('creator', 'firstName lastName fullName').exec(function (err, tag) {

        if (err) {
            return next(err);
        }

        if (!tag) {
            return next(new Error('Failed to load tag ' + id));
        }

        req.tag = tag;

        next();
    });
};

exports.hasAuthorization = function (req, res, next) {

    if (req.tag.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }

    next();
};