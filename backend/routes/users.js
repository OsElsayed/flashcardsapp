var express = require('express');
var router = express.Router();
let User = require('../models/userModel');

/* GET users listing. */
router.post('/signup', async function (req, res, next) {
  let user = new User({
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    password: req.body.password,
    role: 'normal'
  });

  let existUser = await User.find().findUserByEmail(req.body.email);
  if (existUser && existUser.email != null) {
    res.json({ success: 0, msg: 'User with this email Already exist' });
  }
  else {
    user.save(function (err) {
      if (err) {
        console.log(err);
        res.json({ success: 0, msg: 'an error has occured' });
      }
      else {
        console.log('user saved succesfully');
        res.json({ success: 1, msg: 'saved sucessfully' });
      }

    })
  }
});

module.exports = router;
