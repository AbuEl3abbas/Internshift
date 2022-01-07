const router = require("express").Router();
const Company = require("../models/Company");
const verify = require("../middlewares/verifyToken");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const {
  companyEditValidations,
  changePasswordValidations,
} = require("../middlewares/validation");

router.get("/", verify.companyVerification, async (req, res) => {
  const company = await Company.findById(req.user._id);
  res.status(200).send(company);
});

router.put("/edit", verify.companyVerification, async (req, res) => {
  const validation = companyEditValidations(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
  else {
    const company = await Company.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        location: req.body.location,
        phone: req.body.phone,
        email: req.body.email,
      },
      { new: true }
    );
    const post = await Post.updateMany(
      { companyId: req.user._id },
      {
        publisher: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
      }
    );
    if (!company || !post) return res.sendStatus(400);
    res.sendStatus(200);
  }
});

router.put("/password", verify.companyVerification, async (req, res) => {
  const validation = changePasswordValidations(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const company = await Company.findByIdAndUpdate(
      req.user._id,
      { password: hashedPassword },
      { new: true }
    );
    res.send(company).status(200);
  }
});

module.exports = router;
