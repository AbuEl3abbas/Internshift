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

      for (const [key, value] of Object.entries(body)) {
        await Company.findByIdAndUpdate(req.user._id,{$set: `${key}: ${value}`})   

     }





   res.status(200).send(body);
})

module.exports = router