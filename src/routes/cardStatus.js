const { Router } = require("express");
const {
  getCardStatus,
} = require("../controllers/cardStatusController");

const router = Router();

router.get("/get_card_status", getCardStatus);  

module.exports = router;
