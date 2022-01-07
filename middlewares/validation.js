const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);

function studentRegisterValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128).required(),
    email: Joi.string().email().min(6).max(256).required(),
    sid: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(1024).required(),
    gpa: Joi.number().max(4).greater(0).precision(1).required(),
    phone: Joi.string().min(10).max(10).required(),
    bio: Joi.string().min(10).max(100000).required()
  });
  return schema.validate(data);
}

function studentEditValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128),
    email: Joi.string().email().min(6).max(256),
    sid: Joi.string().min(4).max(20),
    gpa: Joi.number().max(4).greater(0).precision(1),
    phone: Joi.string().min(10).max(10),
    bio: Joi.string().min(10).max(100000)
  });
  return schema.validate(data);
}

function companyEditValidations(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(128),
    email: Joi.string().email().min(6).max(256),
    location: Joi.string().min(2).max(20),
    password: Joi.string().min(8).max(1024),
    phone: Joi.string().min(10).max(10)
  });
  return schema.validate(data)
}

function changePasswordValidations(data) {
  const schema = Joi.object({
    password: Joi.string().min(8).max(1024).required(),
  })
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
    description: Joi.string().min(20).max(100000).required(),
    expirationDate: Joi.date().greater('now').required(),
  });

  return schema.validate(data);
}

function deletePostValidation(data) {
  const schema = Joi.object({
    postId: Joi.objectId().required(),
  
  });
  return schema.validate(data);
}

function editPostValidation(data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(60),
    description: Joi.string().min(20).max(100000),
    postId: Joi.objectId().required()
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


function acceptRejectValidation(data) {
  const schema = Joi.object({
    postId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    companyId: Joi.objectId()
  })
  return schema.validate(data);
}

function bioEditValidation(data) {
  const schema = Joi.object({
    bio: Joi.string().min(10).max(100000).required(),
  })
  return schema.validate(data);
}

module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.newPostValidation = newPostValidation;
module.exports.loginValidation = loginValidation;
module.exports.companyRegisterValidation = companyRegisterValidation;
module.exports.applyValidation = applyValidation;
module.exports.studentAppliedValidation = studentAppliedValidation;
module.exports.acceptRejectValidation = acceptRejectValidation;
module.exports.editPostValidation = editPostValidation;
module.exports.deletePostValidation = deletePostValidation;
module.exports.bioEditValidation = bioEditValidation;
module.exports.studentEditValidation = studentEditValidation;
module.exports.changePasswordValidations = changePasswordValidations;
module.exports.companyEditValidations = companyEditValidations;