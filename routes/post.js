const Post = require("../models/Post");
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
  
  
  
  router.post("/new", verify, async (req, res) => {
    const validation = newPostValidation(req.body);
  
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    } else {
      const post = new Post({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        publisher: req.body.publisher,
        phone: req.body.phone,
        email: req.body.email,
      });
  
      try {
        await post.save();
        res.send(req.user);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  });
  
  
  module.exports = router;