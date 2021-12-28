const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 128,
    },
    sid:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 128,
    },
    password: {
        type: String,
        required: true,
        min: 8, 
        max: 2048,
    },
    date: {
        type:String,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);
