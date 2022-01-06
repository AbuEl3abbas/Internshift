const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    sid:{
        type: String,
        
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    gpa: {
        type: String,
    },    
    phone: {
        type: String,
    },
    bio : {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
}
);

module.exports = mongoose.model('Student', studentSchema);
