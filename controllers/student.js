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

router.put('/edit', verify.studentVerification ,async (req, res) => {
    
    // validation required
/*
    var body = new Object();
    body = req.body
    Object.keys(body).forEach(key => {
        if (body[key] === null) {
          delete body[key];
        }
      });

      for (const [key, value] of Object.entries(body)) {
         await Student.findByIdAndUpdate(req.user._id,{$set: `${key}: ${value}`})   

      }





    res.status(200).send(body);
*/
      const data = req.body;
      const student = await Student.findByIdAndUpdate(req.user._id,{data});

      if(!student){
        return res.sendStatus(400);
      }
      res.status(200).send(student);
})

module.exports = router;
