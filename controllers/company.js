const router = require("express").Router();
const Company = require("../models/Company")
const verify = require("../middlewares/verifyToken")
router.put('/edit', verify.companyVerification ,async (req,res) =>{
   const company = await Company.findByIdAndUpdate(req.user._id,{
    name: req.body.name,
    location: req.body.location,
    phone: req.body.phone,
    email: req.body.email,
   },{new:true})
   if(!company) return res.sendStatus(400);
   res.status(200).send(company)
})

module.exports = router