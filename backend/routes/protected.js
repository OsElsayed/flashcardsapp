var router = require("express").Router();
var verify = require("./verfiyToken");
var User = require("../models/userModel");

router.get("/users", verify, async function(req, res, next) {
  let userlist = await User.find();
  res.send(userlist);
});

module.exports = router;
