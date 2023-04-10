const { user, password, port, database, host } = require("../../dbconfig");

const Pool = require("pg").Pool;

const pool = new Pool({
  user,
  host,
  password,
  port,
  database,
});

module.exports = pool;
