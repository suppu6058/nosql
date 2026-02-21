require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const countryRoutes = require("./routes/countryRoutes");

// 👇 STEP 6 – LOGGER HERE
const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "logs/error.log" })
  ]
});

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/country", countryRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log(err);
    logger.error(err.message);  // 👈 log DB error
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});