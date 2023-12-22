const fs = require("fs");
const csv = require("csv-parser");
const CardStatus = require("../models/CardStatus");
const User = require("../models/Users");

const importCSVData = async (filePath) => {
  //This function reads the data from the CSV file and add it to the database
  try {
    const fileStream = fs.createReadStream(filePath);
    const parser = fileStream.pipe(csv());

    for await (const row of parser) {
      
      let user = await User.findOne({ cardId: row["Card ID"] });

      let phoneNumber;

      if ("User contact" in row) {
        phoneNumber = row["User contact"];
      } else if ("User Mobile" in row) {
        phoneNumber = row["User Mobile"];
      }

      // If the user doesn't exist, create a new user in the User collection for better data structuring
      if (!user) {
        user = await User.create({
          cardId: row["Card ID"],
          phoneNo: phoneNumber.replace(/["']/g, "").replace(/^0+/, ""), //This replaces all the leading 0 or "" from the phone no.
          firstName: row.firstName,
          lastName: row.lastName,
        });
      }

      // we are using cardId to check wheter that data exists or not
      const filter = { cardId: row["Card ID"] };

      let status; //This is to add the status if by chance status or comment (considering both to be same) is not mentioned in the CSV file
      if (filePath.includes("Pickup")) {
        status = row.Comment ? row.Comment : "Pickedup";
      } else if (filePath.includes("Delivery exceptions")) {
        status = row.Comment ? row.Comment : "Delivery Retry Attempted";
      } else if (filePath.includes("Delivered")) {
        status = row.Comment ? row.Comment : "Delivered";
      } else if (filePath.includes("Returned")) {
        status = row.Comment ? row.Comment : "Returned";
      }

      // If the document is already present in the database then we'll be updating it's status, timestamp based on latest data present in the CSV
      const updateDocument = {
        $set: {
          status: status,
          timestamp: row.Timestamp,
          user: user._id,
        },
      };

      //Upsert is used to update the document if it already exists otherwise it will create a new document
      const options = { upsert: true };

      await CardStatus.collection.updateOne(filter, updateDocument, options);
    }
  } catch (error) {
    console.error(
      `Error importing data into ${CardStatus.collection.name} collection:`,
      error
    );
  }
};

module.exports = importCSVData;
