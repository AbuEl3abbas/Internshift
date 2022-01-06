const router = require("express").Router();
const Student = require("../models/Student");
const Company = require("../models/Company");
const Supervisor = require("../models/Supervisor");
const verify = require("../middlewares/verifyToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  studentRegisterValidation,
  companyRegisterValidation,
  loginValidation,
} = require("../middlewares/validation");


 //Student account registration

router.post("/register/student", async (req, res) => {
  //Validation

  const validation = studentRegisterValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  //Checking if the user is already registered

  const emailExist = await Student.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).send("You are already registered");
  }

  //Hashing the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating new student account

  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    sid: req.body.sid,
    gpa: req.body.gpa,
    phone: req.body.phone,
    bio: req.body.bio,

  });
  try {
    const savedStudent = await student.save();
    res.json({ id: savedStudent._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Company account registration

router.post("/register/company", async (req, res) => {
  //Validation

  const validation = companyRegisterValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  //Checking if the user is already registered

  const emailExist = await Company.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("You are already registered");
  }

  //Hashing the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating new company account

  const company = new Company({
    name: req.body.name,
    location: req.body.location,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedCompany = await company.save();
    res.json({ id: savedCompany._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Student login

router.post("/login/student", async (req, res) => {
  //Validation

  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  //Checking if the user is already registered

  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return res.status(400).send("Email or Password is wrong");
  }

  //Checking if password is correct

  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password
  );
  if (!validPassword) {
    return res.status(400).send("Email or password is wrong");
  }

  //Create and assign a token

  const token = jwt.sign(
    { _id: student._id },
    process.env.STUDENT_TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

//company login

router.post("/login/company", async (req, res) => {
  //Validation

  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  //Checking if the user is already registered

  const company = await Company.findOne({ email: req.body.email });
  if (!company) {
    return res.status(400).send("Email or Password is wrong");
  }

  //Checking if password is correct

  const validPassword = await bcrypt.compare(
    req.body.password,
    company.password
  );
  if (!validPassword) {
    return res.status(400).send("Email or Password is wrong");
  }

  //Create and assign a token

  const token = jwt.sign(
    { _id: company._id },
    process.env.COMPANY_TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

router.post("/login/supervisor", async (req, res) => {
  //Validation

  const validation = loginValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  //Checking if the user is already registered

  const supervisor = await Supervisor.findOne({ email: req.body.email });
  if (!supervisor) {
    return res.status(400).send("Email or Password is wrong");
  }

  //Checking if password is correct

  const validPassword = await bcrypt.compare(
    req.body.password,
    supervisor.password
  );
  if (!validPassword) {
    return res.status(400).send("Email or Password is wrong");
  }

  //Create and assign a token

  const token = jwt.sign(
    { _id: supervisor._id },
    process.env.SUPERVISOR_TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

router.get('/student', verify.studentVerification , async (req, res) => {
  const student = await Student.findById(req.user._id);
  res.status(200).send(student);
})

router.get('/company', verify.companyVerification , async (req, res) => {
  const company = await Company.findById(req.user._id);
  res.status(200).send(company);
})

module.exports = router;
