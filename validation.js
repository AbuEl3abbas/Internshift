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


module.exports.studentRegisterValidation = studentRegisterValidation;