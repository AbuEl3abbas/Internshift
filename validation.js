const Joi = require("Joi");

function studentRegisterValidation(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(128).required(),
        email: Joi.string().email().min(6).max(256).required(),
        sid: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(8).max(1028).required(),
    });
    return schema.validate(data); 
}

function companyRegisterValidation(data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(128).required(),
        email: Joi.string().email().min(6).max(256).required(),
        location: Joi.string().min(2).max(20).required(),
        password: Joi.string().min(8).max(1028).required(),
        phone:  Joi.string().min(10).max(10).required(),
    });
    return schema.validate(data); 
}

function newPostValidation(data) {

    const schema = Joi.object({
        title: Joi.string().max(60).required(),
        location: Joi.string().max(25),
        description: Joi.string().min(50).max(10000).required(),
        publisher: Joi.string().alphanum().min(2).max(50).required(),
        phone: Joi.string().min(10).max(10),
        email: Joi.string().email().required(),
      });

      return schema.validate(data);
      
}

module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.newPostValidation = newPostValidation;
module.exports.companyRegisterValidation = companyRegisterValidation;