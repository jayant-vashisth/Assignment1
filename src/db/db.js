const mongoose = require("mongoose");

const connectToDatabase = async () => {          //This function is used to connect to database
  mongoose
    .connect(process.env.DATABASE_HOST)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  connectToDatabase,
};
