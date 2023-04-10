require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../db/connection");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.Auth_Token;

    // verifying user
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    const userEmail = verifyUser.email;

    // geting user
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      userEmail,
    ]);

    req.user = user.rows;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = authMiddleware;
