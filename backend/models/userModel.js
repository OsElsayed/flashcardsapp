const mongoose = require("mongoose");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("#!myTotalySecretKey!#");

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  cards: [
    {
      cardname: String,
      front: String,
      back: String,
      type: String,
      priority: Number,
      hints: [
        {
          hint: String
        }
      ]
    }
  ]
});

userSchema.query.findUserByEmail = function(email) {
  return this.findOne({ email: email });
};

userSchema.query.findAll = function(email) {
  return this.find({});
};

module.exports = mongoose.model("User", userSchema);
