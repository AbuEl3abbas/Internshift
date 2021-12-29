const Post = require("../models/Post");
const router = require('express').Router();
const {newPostValidation} = require('../validation')
const corsFunction = require('../configs/cors');


// Routes Middlewares

router.use(corsFunction);


router.post("/find", async (req, res) => {
    const post = await Post.find({
      
      title: req.body.title,
      location: req.body.location,
    });  
    res.send(post);
  });
  
  
  
  router.post("/new", async (req, res) => {
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
        const savedUser = await post.save();
        res.send(savedUser);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  });
  
  
  module.exports = router;