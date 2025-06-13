import axios from "axios";

const BASE_URL = "http://localhost:5000/api/watchlist"; // 🔁 Replace with IP if using physical device

export const getWatchlist = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addStock = async (symbol, name) => {
  const res = await axios.post(BASE_URL, { symbol, name });
  return res.data;
};

export const deleteStock = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

export const getStockQuote = async (symbol) => {
  const res = await axios.get(`${BASE_URL}/quote/${symbol}`);
  return res.data;
};
