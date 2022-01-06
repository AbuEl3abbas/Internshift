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

router.put('/edit', verify.studentVerification, async (req, res) => {
    
    // validation required

    var body = new Object();
    body = req.body
    Object.keys(body).forEach(key => {
        if (body[key] === null) {
          delete body[key];
        }
      });

      console.log(req.user._id)
    const student = await Student.findByIdAndUpdate(req.user._id,{$set: {body}})

    if(!student) return res.sendStatus(400)
    res.sendStatus(200);

})

module.exports = router;
