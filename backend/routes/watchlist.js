const express = require("express");
const router = express.Router();
const {
  getWatchlist,
  addStock,
  deleteStock,
  getStockQuote,
} = require("../controllers/watchlistController");

router.get("/", getWatchlist);
router.post("/", addStock);
router.delete("/:id", deleteStock);
router.get("/quote/:symbol", getStockQuote);

module.exports = router;
