const mongoose = require('mongoose')

const pendingSchema = mongoose.Schema({
    studentId: {
      type: String,
    },
    companyId: {
      type: String,
    },
    postId: {
      type: String,
    },
    supervisorId: {
      type: String
  },
    date: {
      type: Date,
      default: Date.now()
    }
  });

module.exports = mongoose.model("Pending",pendingSchema);
