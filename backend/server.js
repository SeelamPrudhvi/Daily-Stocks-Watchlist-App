const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const watchlistRoutes = require("./routes/watchlist");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/api/watchlist", watchlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
