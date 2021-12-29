const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
    
    },
    location: {
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now()
    },
    phone: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

module.exports = mongoose.model("Company",companySchema);