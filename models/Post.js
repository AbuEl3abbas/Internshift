const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        max: 60
    },
    location: {
        type: String, 
        required: false,
        max: 25
    },
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String, 
        required: true,
        min: 50,
        max: 10000
    },
    publisher: {
        type: String, 
        required: true,
        min: 2,
        max: 30,

    },
    phone: {
        type: String, 
        required: false,
        min: 10,
        max: 10,
        
    },
    email: {
        type: String, 
        required: true,

    }

    });

    module.exports = mongoose.model('Post',postSchema);