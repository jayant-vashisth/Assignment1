const mongoose = require("mongoose");

const connectToDatabase = async () => {
  mongoose
    .connect(process.env.DATABASE_HOST)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  connectToDatabase,
};
