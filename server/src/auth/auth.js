require("dotenv").config();
const jwt = require("jsonwebtoken");
const pool = require("../db/connection");

const auth = async (req, res) => {
  try {
    const token = req.cookies.Auth_Token;

    if (!token) {
      return res.status(401).json({ user: null, isAuthorised: false });
    }

    // verifying user
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    const userEmail = verifyUser.email;

    // geting user
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      userEmail,
    ]);

    req.user = user.rows;
    req.token = token;

    res.status(200).json({ user: user.rows[0], isAuthorised: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = auth;
