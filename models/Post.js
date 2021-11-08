const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        min: 4,
        max: 60
    },
    location: {
        type: String, 
        required: false,
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
        
    },
    email: {
        type: String, 
        required: true,

    }

    });

    module.exports = mongoose.model('Post',postSchema);