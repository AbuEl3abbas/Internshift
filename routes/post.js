const Post = require("../models/Post");
const Company = require("../models/Company");
const Student = require("../models/Student");
const Application = require("../models/Application");
const router = require('express').Router();
const verify = require('../middlewares/verifyToken');
const {newPostValidation} = require('../middlewares/validation');


/*const cors = require("cors");


const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

// Routes Middlewares

router.use(cors(corsOptions));
*/

router.post("/find", async (req, res) => {
    const post = await Post.find({
      
      title: req.body.title,
      location: req.body.location,
    });  
    res.send(post);
  });

  
  router.post("/new", verify.companyVerification, async (req, res) => {
    const validation = newPostValidation(req.body);
  
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    } else {

      const company = await Company.findById(req.user._id);
      if (!company) return res.sendStatus(401);

      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        location: company.location,
        publisher: company.name,
        phone: company.phone,
        email: company.email
        });
  
      try {
        await post.save();
        res.send(post);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  });
  

  router.post('/apply',verify.studentVerification, async (req,res) => {
    
    //validation required

    const company = await Company.findOne({ email: req.body.email });
    if (!company) {
      return res.status(400).send("company not found");
    }


    const student = await Student.findById(req.user._id);
    if(!student) {
      return res.status(400).send("student not found");
    }

    const post = await Post.findById(req.body.postId);
    if(!post) {
      return res.status(400).send("post not found")
    }

  
    const application = new Application({
      studentId: student._id,
      companyId: company._id,
      postId: post._id
    });

    try{
      await application.save();
      res.send(200).send(application);
    }catch(err) {
      res.status(400).send(err);
    }





  });

  
  module.exports = router;