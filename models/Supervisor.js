const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    },
});

module.exports = mongoose.model("Supervisor", supervisorSchema);
