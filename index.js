const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cardRouter = require("./src/routes/cardStatus");
const app = express();
const { connectToDatabase } = require("./src/db/db");
const updateDataBase = require("./src/helper/script");

const PORT = 5000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hi my name is jayant vashisth</h1>");
});

app.use("/api/card", cardRouter);

app.listen(PORT, () => {
  console.log(`Listening to port no. ${PORT}`);
});

connectToDatabase();
updateDataBase();
