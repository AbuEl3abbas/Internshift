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
    date: {
        type:String,
        default: Date.now
    }
}
);

module.exports = mongoose.model('Student', studentSchema);
