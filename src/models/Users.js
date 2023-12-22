const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
