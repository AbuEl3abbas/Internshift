const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    location: {
        type: String, 
        required: false,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
    publisher: {
        type: String, 
        required: true,

    },
    phone: {
        type: String, 
        required: false,
        
    },
    email: {
        type: String, 
        required: true,

    },
    companyId: {
        type: String, 
    }

    });

    module.exports = mongoose.model('Post',postSchema);