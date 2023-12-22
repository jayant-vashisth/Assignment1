const fs = require("fs");
const csv = require("csv-parser");
const CardStatus = require("../models/CardStatus");
const User = require("../models/Users");

const importCSVData = async (filePath) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const parser = fileStream.pipe(csv());

    for await (const row of parser) {
      let user = await User.findOne({ cardId: row.cardId });
      // If the user doesn't exist, create a new user
      if (!user) {
        user = await User.create({
          cardId: row.cardId,
          phoneNo: row.phoneNo,
          firstName: row.firstName,
          lastName: row.lastName,
        });
      }

      // Specify the criteria to check if the document with the given cardId exists
      const filter = { cardId: row.cardId };

      let status;
      if (filePath.includes("Pickup")) {
        status = row.comment ? row.comment : "Pickedup";
      } else if (filePath.includes("Delivery exceptions")) {
        status = row.comment ? row.comment : "Delivery Retry Attempted";
      } else if (filePath.includes("Delivered")) {
        status = row.comment ? row.comment : "Delivered";
      } else if (filePath.includes("Returned")) {
        status = row.comment ? row.comment : "Returned";
      }

      // Create the update document based on the row data
      const updateDocument = {
        $set: {
          status: status,
          timestamp: row.timestamp,
          user: user._id,
        },
      };

  
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
