const importCSVData = require("./importCsvData");

const csvFiles = [
  { filePath: "data/Pickup.csv" },
  { filePath: "data/Delivery exceptions.csv" },
  { filePath: "data/Delivered.csv" },
  { filePath: "data/Returned.csv" },
];

const script = async () => {
  try {
    for (const csvFile of csvFiles) {      //This loop adds the data present in CSV file to the database using the function importCSVData
      await importCSVData(csvFile.filePath);
    }
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

module.exports = script;
