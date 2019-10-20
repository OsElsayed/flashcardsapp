var express = require("express");
var bcrypt = require("bcryptjs");
var config = require("../config");
var router = express.Router();
let User = require("../models/userModel");

const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const schemaSignup = Joi.object({
  firstName: Joi.string()
    .min(1)
    .required(),
  lastName: Joi.string(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required(),
  role: Joi.string()
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

/* GET users listing. */
router.post("/signup", async function(req, res, next) {
  let userObj = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: "normal"
  });

  try {
    const validation = await schemaSignup.validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ success: 0, msg: err.details[0].message });
  }

  let existUser = await User.find().findUserByEmail(req.body.email);
  if (existUser && existUser.email != null) {
    //res.json({ success: 0, msg: "User with this email Already exist" });
    return res
      .status(400)
      .send({ success: 0, msg: "User with this email Already exist" });
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  userObj.password = hashPassword;

  userObj.save(function(err) {
    if (err) {
      console.log(err);
      //res.json({ success: 0, msg: 'an error has occured' });
      res.status(400).send({ success: 0, msg: "an error has occured" });
    } else {
      console.log("user saved succesfully");
      //req.json({ success: 1, msg: 'saved sucessfully' });
      res.status(200).send({ success: 1, msg: "saved sucessfully" });
    }
  });
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const validation = await schemaLogin.validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ success: 0, msg: err.details[0].message });
  }

  const errorMessage = {
    success: 0,
    msg: "Login Failed. Please check your user name or password."
  };

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send(errorMessage);

  try {
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(404).send(errorMessage);
  } catch (err) {
    res.status(404).send(errorMessage);
  }

  //Create and assign a token,
  const token = jwt.sign({ _id: user._id }, config.TOKEN_SECRET);
  res.header("auth-token", token);
  res.status(200).send({ success: 1, msg: "Logged in successfully." });
});

module.exports = router;
