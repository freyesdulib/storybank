'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagsSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'tag is a required field'
    },
    description: {
        type: String,
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Tags', TagsSchema);