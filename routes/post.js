const Post = require("../models/Post");
const Company = require("../models/Company");
const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const {
  newPostValidation,
  applyValidation,
} = require("../middlewares/validation");

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
      email: company.email,
    });

    try {
      await post.save();
      res.send(post);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});



module.exports = router;
