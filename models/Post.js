const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
    },
    description: {
        type: String, 
    },
    location: {
        type: String, 
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
    publisher: {
        type: String, 

    },
    phone: {
        type: String, 
        
    },
    email: {
        type: String, 

    },
    companyId: {
        type: String, 
    }

    });

    module.exports = mongoose.model('Post',postSchema);