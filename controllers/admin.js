const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const Pending = require("../models/Pending");
const Internship = require("../models/Internship");
const { acceptRejectValidation } = require("../middlewares/validation");

router.post("/accept", verify.adminVerification, async (req, res) => {
  const validation = acceptRejectValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    const acceptedPending = await Pending.findOneAndDelete({
      studentId: req.body.studentId,
      postId: req.body.postId,
    });

    if (!acceptedPending) return res.sendStatus(400);

    const internship = new Internship({
      studentId: acceptedPending.studentId,
      postId: acceptedPending.postId,
    });

    try {
      res.status(200).send(await internship.save());
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.delete("/reject", verify.adminVerification, async (req, res) => {
  const validation = acceptRejectValidation(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  } else {
    const rejectedPending = await Pending.findOneAndDelete({
      studentId: req.body.studentId,
      postId: req.body.postId,
    });

    if (!rejectedPending) return res.sendStatus(400);
    res.status(200).send(rejectedPending)
  }
});

module.exports = router;
