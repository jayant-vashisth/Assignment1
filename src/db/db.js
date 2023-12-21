const pg = require("pg");
const fs = require("fs");

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

const client = new pg.Client(config);

const connectToDatabase = () => {
  client.connect((err) => {
    if (err) throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
      if (err) throw err;

      console.log(result.rows[0].version);
      client.end(function (err) {
        if (err) throw err;
      });
    });
  });
};

module.exports = connectToDatabase;
