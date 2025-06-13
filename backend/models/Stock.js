const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
});

module.exports = mongoose.model("Stock", stockSchema);
