const router = require("express").Router();
const Student = require("../models/Student");
const Company = require("../models/Company");
const Post = require("../models/Post");
const Application = require("../models/Application");
const verify = require("../middlewares/verifyToken");
const { applyValidation } = require("../middlewares/validation");

router.post("/apply", verify.studentVerification, async (req, res) => {
  //validation required

  const validation = applyValidation(req.body);

  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    //Checking if company is in database to collect its info

    const company = await Company.findOne({ email: req.body.email });
    if (!company) {
      return res.status(400).send("company not found");
    }

    //Checking if student is in database to collect his info

    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(400).send("student not found");
    }

    //Checking if post is in database to collect its info

    const post = await Post.findById(req.body.postId);
    if (!post) {
      return res.status(400).send("post not found");
    }


    //checking if the student already applied to the post

    var isApplied = false;
    if (
      (await Application.findOne({ studentId: student.id })) &&
      (await Application.findOne({ postId: post.id }))
    ) {
      isApplied = true;
    } else {
      isApplied = false;
    }
    if (isApplied) return res.sendStatus(403);

    //saving application in the database

    const application = new Application({
      studentId: student._id,
      companyId: company._id,
      postId: post._id,
    });

    try {
      await application.save();
      res.status(200).send(application);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.get("/postsByCompany", verify.companyVerification, async (req, res) => {
  const companyApplications = await Application.find({
    companyId: req.user._id,
  });
  if (!companyApplications) return res.sendStatus(400);

  for (let i = 0; i < companyApplications.length; i++) {
    console.log({
      post: await Post.find({ _id: companyApplications[i].postId }),
      student: await Student.find(
        { _id: companyApplications[i].studentId },
        "-password"
      ),
    });
  }

  res.sendStatus(200);
  /*
  students = [];

  for (let i = 0; i < companyApplications.length; i++) {
    for (let j = 0; j < companyApplications.length; j++) {
      const studentId = companyApplications[i].postId;
      var student = await Post.findOne({ studentId: studentId });
      students.push(student);
    }
  }

  res.send(students);*/
});

module.exports = router;
