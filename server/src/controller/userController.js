require("dotenv").config();
const pool = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// for new registration
const register = async (req, res, next) => {
  try {
    const { email, password, created_at, name } = req.body;

    // validation
    if (!email || !password || !created_at || !name) {
      return res.status(404).json({ message: "Please enter all fields" });
    }

    const userExists = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (userExists.rowCount !== 0) {
      return res.status(409).json({ message: "User Already exists!" });
    }

    // password hashing
    const hashed_password = await bcrypt.hash(password.toString(), 10);

    // // generating auth token
    // const token = jwt.sign({ email }, process.env.SECRET_KEY);

    // // storing into cookie
    // res.cookie("Auth_Token", token, { httpOnly: true });

    const newUser = await pool.query(
      `INSERT INTO users (email, hashed_password, created_at,name) VALUES ($1,$2,$3,$4)  `,
      [email, hashed_password, created_at, name]
    );

    res.status(201).json({ message: "User registered Sucessfully!" });
  } catch (error) {
    res.json(error);
  }
};

// For login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ message: `Please enter both fields. ` });
    }

    const userExists = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (userExists.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "User donot exists. Please register!" });
    }

    // password verifying
    const hassed_Password = userExists.rows[0].hashed_password;
    const verifyPassword = await bcrypt.compare(
      password.toString(),
      hassed_Password
    );

    // generating auth token
    const token = jwt.sign({ email }, process.env.SECRET_KEY);

    // storing into cookie
    res.cookie("Auth_Token", token, { httpOnly: true });

    if (userExists.rowCount !== 0 && verifyPassword) {
      res.status(200).json(userExists.rows[0]);
      // console.log(req.user);
    } else {
      return res.status(403).json({
        message: "Email or Password is invalid. Please retry!",
      });
    }
  } catch (error) {
    res.json(error);
  }
};

// signout
const signout = async (req, res, next) => {
  try {
    // console.log(req.user);
    res.clearCookie("Auth_Token");

    // await req.user.save();
    res.status(200).json({ message: "Signout Sucessfully!" });
  } catch (error) {
    res.json(error);
  }
};

// for profile update
const profileUpdate = async (req, res) => {
  try {
    const { name, bio, phonenumber, gender, updated_at, email } = req.body;

    const updatedProfile = await pool.query(
      `UPDATE users SET name=$1,bio=$2,phonenumber=$3,gender=$4,updated_at=$5 WHERE email=$6 `,
      [name, bio, phonenumber, gender, updated_at, email]
    );

    if (updatedProfile.rowCount !== 0) {
      return res.status(202).json("Profile Updated Sucessfully!");
    } else {
      return res.status(400).json("Failed to update Profile!");
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { register, login, signout, profileUpdate };
