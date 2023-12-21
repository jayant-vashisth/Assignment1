const { Router } = require("express");
const {
  getCardStatus,
  generateNewCard,
} = require("../controllers/cardStatusController");

const router = Router();

router.get("/get_card_status", getCardStatus);
router.get("/generate_new_card", generateNewCard);

module.exports = router;
