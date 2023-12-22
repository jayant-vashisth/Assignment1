const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cardRouter = require("./src/routes/cardStatus");
const script = require("./src/scripts/script");
dotenv.config();
const { connectToDatabase } = require("./src/db/db");

const PORT =  5002;

app.use(cors());
app.use("/api/card", cardRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to port no. ${PORT}`);
});

connectToDatabase(); //This function is used to connect database to our backend
script(); //This script is used to update our database based on the latest data present in CSV files
