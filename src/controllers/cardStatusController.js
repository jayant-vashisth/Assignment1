const User = require("../models/Users");
const CardStatus = require("../models/CardStatus");

const getCardStatus = async (req, res) => {
  try {
    const { ph, cardId } = req.query;

    if (ph) {
      // If phone number is provided, find the user and then get the card status
      const user = await User.findOne({ phoneNo: ph });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const cardStatus = await CardStatus.findOne({ user: user._id });

      if (!cardStatus) {
        return res.status(404).json({ error: "Card status not found" });
      }
      
      res.status(200).json({
        cardId: user.cardId,
        phoneNo: user.phoneNo,
        status: cardStatus.cardId,
        timestamp: cardStatus.timestamp,
      });
    } else if (cardId) {
      // If cardId is provided, directly query the CardStatus collection
      const cardStatus = await CardStatus.findOne({ cardId: cardId });

      if (!cardStatus) {
        return res.status(404).json({ error: "Card status not found" });
      }

      res.status(200).json({
        cardId: cardStatus.cardId,
        status: cardStatus.status,
        timestamp: cardStatus.timestamp,
      });
    } else {
      // If neither phone number nor cardId is provided, return an error
      return res
        .status(400)
        .json({ error: "Either phone number or cardId must be provided" });
    }
  } catch (error) {
    console.error("Error retrieving card status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCardStatus,
};
