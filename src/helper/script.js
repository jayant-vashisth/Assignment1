const importCSVData = require("./importCsvData");

const csvFiles = [
  { filePath: "data/Pickup.csv" },
  { filePath: "data/Delivery exceptions.csv" },
  { filePath: "data/Delivered.csv" },
  { filePath: "data/Returned.csv" },
];

const updateDataBase = async () => {
  try {
    for (const csvFile of csvFiles) {
      await importCSVData(csvFile.filePath);
    }

    console.log("Data import complete");
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

module.exports = updateDataBase;
