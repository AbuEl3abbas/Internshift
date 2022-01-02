const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);

function studentRegisterValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    email: Joi.string().email().min(6).max(256).required(),
    sid: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(data);
}

function companyRegisterValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    email: Joi.string().email().min(6).max(256).required(),
    location: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(8).max(1024).required(),
    phone: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(data);
}

function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(256).required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(data);
}

function newPostValidation(data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(60).required(),
    description: Joi.string().min(20).max(10000).required(),
  });

  return schema.validate(data);
}

function applyValidation(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(256).required(),
    postId: Joi.objectId().required(),
  });
  return schema.validate(data);
}

function studentAppliedValidation(data) {
  const schema = Joi.object({
    postId: Joi.objectId().required(),
  });

  return schema.validate(data);
}

module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.newPostValidation = newPostValidation;
module.exports.loginValidation = loginValidation;
module.exports.companyRegisterValidation = companyRegisterValidation;
module.exports.applyValidation = applyValidation;
module.exports.studentAppliedValidation = studentAppliedValidation;