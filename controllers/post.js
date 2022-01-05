const Post = require("../models/Post");
const Company = require("../models/Company");
const Pending = require("../models/Pending")
const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const Application = require("../models/Application");
const {
  newPostValidation,
  editPostValidation,
  deletePostValidation
} = require("../middlewares/validation");

router.post("/find", async (req, res) => {

  const searchRegex = new RegExp(req.body.title, 'i');

  const post = await Post.find({$or: [{
    title: searchRegex,},
    {description: searchRegex}],

  }).and({location: req.body.location});
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
      companyId: company._id,
      expirationDate: req.body.expirationDate,
    });

    try {
      await post.save();
      res.send(post);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

router.post('/delete', verify.companyVerification, async (req, res) => {
  const validation = deletePostValidation(req.body);

  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    await Post.findOneAndDelete({_id: req.body.postId,companyId: req.user._id})
    await Application.findOneAndDelete({postId: req.body.postId, companyId: req.user._id})
    await Pending.findOneAndDelete({postId: req.body.postId, companyId: req.user._id})
    res.sendStatus(201);
  }
});

router.get("/postsByCompany", verify.companyVerification, async (req, res) => {
  const companiesPosts = await Post.find({ companyId: req.user._id });
  if (companiesPosts.length === 0)
    return res.status(400).send("no posts posted yet");
  res.status(200).send(companiesPosts);
});

router.get("/all", async (req, res) => {
  res.send(await Post.find({}));
});

router.get("/internship", verify.studentVerification, async (req, res) => {

    const pendings = await Pending.find({supervisorId: {$exists: true, $ne: null}});

    if (pendings.length === 0)
    return res.status(204).send("no accepted internships yet");

    var post = [];
    
    for (let i = 0; i < pendings.length; i++) {
      const pending = pendings[i];
      pending.post = await Post.findOne({ _id: pending.postId });

      post.push(pending.post)
    }
    res.status(200).send(post);


  
});

router.put("/edit", verify.companyVerification, async (req, res) => {
  const validation = editPostValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    const title = req.body.title;
    const description = req.body.description;

    if (title && description) {
      const post = await Post.findOneAndUpdate(
        { _id: req.body.postId, companyId: req.user._id },
        { title: title, description: description }
      );
      res.status(200).send(post);
    } else if (title && !description) {
      const post = await Post.findByIdAndUpdate(req.body.postId, {
        title: title,
      });
      res.status(200).send(post);
    } else if (!title && description) {
      const post = await Post.findByIdAndUpdate(req.body.postId, {
        description: description,
      });
      res.status(200).send(post);
    } else {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
