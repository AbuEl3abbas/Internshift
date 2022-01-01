const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: String,
  },
  companyId: {
    type: String,
  },
  postId: {
    type: String,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
