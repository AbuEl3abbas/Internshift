const router = require("express").Router();
const verify = require("../middlewares/verifyToken")
const Student = require('../models/Student');
const bcrypt = require('bcrypt')
const {bioEditValidation,studentEditValidation,changePasswordValidations} = require("../middlewares/validation");

router.put('/bioEdit', verify.studentVerification , async (req, res) => {
    const validation = bioEditValidation(req.body);
    if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
    else{
    const updatedStudent = await Student.findByIdAndUpdate(req.user._id,{bio: req.body.bio})
    if(!updatedStudent) return res.sendStatus(400);
    res.send(updatedStudent);
    }
});

router.put('/edit', verify.studentVerification ,async (req, res) => {
    
    const validation = studentEditValidation(req.body)
    if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
    else{

    const student = await Student.findByIdAndUpdate(req.user._id,{
    name: req.body.name,
    email: req.body.email,
    sid: req.body.sid,
    gpa: req.body.gpa,
    phone: req.body.phone,
    bio: req.body.bio,

    },{new: true});

    if(!student){
      return res.sendStatus(400);
    }
    res.sendStatus(200);
  }
})

router.put('/password', verify.studentVerification, async (req, res) => {

  const validation = changePasswordValidations(req.body)
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
    else{

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const student = await Student.findByIdAndUpdate(req.user._id,{password: hashedPassword},{new: true});
  res.send(student).status(200);
    }
  
})

module.exports = router;
