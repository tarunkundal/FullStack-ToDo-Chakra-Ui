require("dotenv").config();

const dbDetails = {
  user: "postgres",
  host: "localhost",
  password: process.env.DBPASSWORD,
  port: 5432,
  database: "todo-app",
};

module.exports = dbDetails;
