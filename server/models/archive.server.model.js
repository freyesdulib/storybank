'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ArchiveSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'title is a required field'
    },
    story: {
        type: String,
        trim: true,
        required: 'story is a required field'
    },
    author: {
        type: String,
        trim: true
    },
    tags: {
        type: Array,
        trim: true
    },
    relatedLinks: {
        type: Array,
        trim: true
    },
    status: {
        type: String,
        default: 'draft'
    },
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Archive', ArchiveSchema);