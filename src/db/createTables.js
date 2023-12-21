// createTables.js - Table creation functions
const { client } = require("./db");

const createUserDetailsTable = async () => {
  try {
    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS userDetails (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        phoneNo VARCHAR(15) NOT NULL,
        cardId VARCHAR(50) NOT NULL,
        date DATE NOT NULL
      );
    `);
    console.log("userDetails table created");
    return result;
  } catch (error) {
    console.error("Error creating userDetails table:", error);
    throw error;
  }
};

const createCardStatusTable = async () => {
  try {
    const result = await client.query(`
    CREATE TABLE IF NOT EXISTS cardStatus (
      id SERIAL PRIMARY KEY,
      cardId VARCHAR(255) NOT NULL,
      phoneNo VARCHAR(20) NOT NULL,
      status VARCHAR(255) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      comment TEXT
    );
    `);
    console.log("cardStatus table created");
    return result;
  } catch (error) {
    console.error("Error creating cardStatus table:", error);
    throw error;
  }
};

module.exports = {
  createUserDetailsTable,
  createCardStatusTable,
};
