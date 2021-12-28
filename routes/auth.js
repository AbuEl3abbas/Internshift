const router = require('express').Router();
const Student = require('../models/Student');
const {studentRegisterValidation} = require('../validation');


router.post('/register/student', async (req, res) => {


    //Validation 

    const validation = studentRegisterValidation(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    
    
    //Checking if the user is already registered

    const emailExist = await Student.findOne({email: req.body.email});

    if(emailExist) {
        return res.status(400).send("You are already registered");
    }



    //creating new user

    const student = new Student({
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

});



router.post('/register/company', async (req, res) => {

    
    //Validation 

    const validation = studentRegisterValidation(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    
    
    //Checking if the user is already registered

    const emailExist = await Student.findOne({email: req.body.email});

    if(emailExist) {
        return res.status(400).send("You are already registered");
    }



    //creating new user

    const student = new Student({
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

});


module.exports = router;