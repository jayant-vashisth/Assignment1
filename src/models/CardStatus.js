const mongoose = require("mongoose");

const cardStatusSchema = mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
  },
  cardStatus: {
    type: String,
  },
  comment: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("CardStatus", cardStatusSchema);
