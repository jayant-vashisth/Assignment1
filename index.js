const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const connectToDatabase = require("./src/db/db");

const PORT = 5000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hi my name is jayant vashisth</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening to port no. ${PORT}`);
});

connectToDatabase();
