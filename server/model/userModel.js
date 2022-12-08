const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.generateToken = function (role) {
  const token = jwt.sign(
    { id: this._id, firstName: this.firstName, role: role },
    process.env.JWT_SECRET
  );
  return token;
};
const User = mongoose.model("User", userSchema);

const validateUser = (User) => {
  const validationSchema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    role: Joi.string().required().label("Role"),
    phoneNumber: Joi.number().required().label("Phone Number"),
    password: Joi.string().required().min(3).label("Password"),
  });
  return validationSchema.validate(User);
};
exports.User = User;
exports.validate = validateUser;