'use strict';

var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function (err) {

    var message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;

            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

exports.create = function (req, res) {

    var user = new User(req.body);

    user.provider = 'local';
    user.password = 'Un1v3rs1ty0fD3nv3r'; // pswd check occurs at ldap level

    user.save(function (err) {
        if (err) {

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

exports.list = function (req, res) {

    User.find()
        .select('lastName firstName email username role status')
        .sort('lastName')
        .exec(function (err, users) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(users);
            }
        });
};

exports.read = function (req, res) {
    res.json(req.user);
};

exports.update = function (req, res) {

    var user = req.user;

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.role = req.body.role;
    user.status = req.body.status;

    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

exports.delete = function (req, res) {

    req.user = null;
    var user = req.user;

    user.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(user);
        }
    });
};

exports.userByID = function (req, res, next, id) {

    User.findById(id)
        .select('firstName lastName email username role status')
        .exec(function (err, user) {

            if (err) return next(err);
            if (!user) return next(new Error('Failed to load user ' + id));

            req.user = user;

            next();
        });
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/#!/signin');
};

exports.requiresLogin = function (req, res, next) {

    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    next();
};