var express = require('express');
var router = express.Router();
let User = require('../models/userModel');

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let userlist = await User.find();
  res.send(userlist);
});

// sign up route
router.post('/signup', async function (req, res, next) {
  let user = new User({
    firstName: req.body.first,
    lastName: req.body.last,
    email: req.body.email,
    password: req.body.password,
    role: 'normal',
    status: true
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

// find user by id and push new card to cards array
router.put('/update', async function (req, res, next) {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      success: 0, msg: "user content can not be empty"
    });
  }
  // Find and update user with the request body
  User.findByIdAndUpdate(req.body._id, {
    $push: { "cards": req.body.cards[0] }
  }, { "new": true, "upsert": true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          success: 0, msg: "User not found with _id " + req.body._id
        });
      }
      //
      res.send({ success: 1, msg: "", user: user });
    }).catch(err => {
      return res.status(500).send({
        success: 0, msg: "Something wrong updating user with _id " + req.body._id
      });
    });

});
module.exports = router;
