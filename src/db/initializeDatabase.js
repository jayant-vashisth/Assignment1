const {
  createUserDetailsTable,
  createCardStatusTable,
} = require("./createTables");
const { connectToDatabase } = require("./db");

const initializeDatabase = async () => {
  try {
    await connectToDatabase();
    await createUserDetailsTable();
    await createCardStatusTable();
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
};

module.exports = initializeDatabase;
