const mongoose = require('mongoose')

const internshipSchema = mongoose.Schema({
    studentId: {
      type: String,
    },
    companyId: {
      type: String,
    },
    postId: {
      type: String,
    },
    adminId: {
        type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  });

module.exports = mongoose.model("Internship",internshipSchema);
