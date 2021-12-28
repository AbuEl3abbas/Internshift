const router = require('express').Router();
const Student = require('../models/Student');
const Joi = require("Joi");


const studentRegistrationSchema = Joi.object({
    name: Joi.string().min(6).max(128).required(),
    email: Joi.string().email().min(6).max(256).required(),
    sid: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(1028).required(),
})

router.post('/register/student', async (req, res) => {

    const validation = studentRegistrationSchema.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
      } else {

    const user = new Student({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password,
        sid: req.body.sid,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
}
});

module.exports = router;