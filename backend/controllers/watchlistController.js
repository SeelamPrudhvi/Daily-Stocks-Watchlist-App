const axios = require("axios");
const Stock = require("../models/Stock");

const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

exports.getWatchlist = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error });
  }
};

exports.addStock = async (req, res) => {
  const { symbol, name } = req.body;
  try {
    const existing = await Stock.findOne({ symbol });
    if (existing)
      return res.status(400).json({ message: "Stock already in watchlist" });

    const stock = new Stock({ symbol, name });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error adding stock", error });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stock", error });
  }
};

exports.getStockQuote = async (req, res) => {
  const { symbol } = req.params;
  try {
    const { data } = await axios.get(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const quote = data["Global Quote"];
    if (!quote) return res.status(404).json({ message: "Stock not found" });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock quote", error });
  }
};
