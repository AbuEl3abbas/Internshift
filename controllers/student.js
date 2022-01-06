const router = require("express").Router();
const verify = require("../middlewares/verifyToken")
const Student = require('../models/Student');
const {bioEditValidation} = require("../middlewares/validation");

router.put('/bioEdit', verify.studentVerification , async (req, res) => {
    bioEditValidation(req.body);
    const updatedStudent = await Student.findByIdAndUpdate(req.user._id,{bio: req.body.bio})
    if(!updatedStudent) return res.sendStatus(400);
    res.send(updatedStudent);
});

module.exports = router;
