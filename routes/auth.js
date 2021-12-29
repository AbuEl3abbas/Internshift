const router = require('express').Router();
const Student = require('../models/Student');
const Company = require('../models/Company');
const {studentRegisterValidation} = require('../validation');
const {companyRegisterValidation} = require('../validation');
const cors = require("cors");


const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

// Routes Middlewares

router.use(cors(corsOptions));



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
        const savedStudent = await student.save();
        res.send(savedStudent);
    }catch(err){
        res.status(400).send(err);
    }

});



router.post('/register/company', async (req, res) => {


    const validation = companyRegisterValidation(req.body);
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message);
    }


    const emailExist = await Company.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send("email already registered");
    }

    
    const company = new Company({
        name: req.body.name, 
        location: req.body.location,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        const savedCompany = await company.save();
        res.send(savedCompany);
    }catch(err){
        res.status(400).send(err);
    }


    

});


module.exports = router;
