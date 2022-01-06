const router = require("express").Router();
const Company = require("../models/Company")
const verify = require("../middlewares/verifyToken")
router.put('/edit', verify.companyVerification ,async (req,res) =>{
    var body = new Object();
    body = req.body
    Object.keys(body).forEach(key => {
        if (body[key] === null) {
          delete body[key];
        }
      });

    const company = await Company.findByIdAndUpdate(req.user._id,{$set: {body}})
    if(!company) return res.sendStatus(400)
    res.sendStatus(200);
})

module.exports = router