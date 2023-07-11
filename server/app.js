require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const pool = require("./src/db/connection");

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:3000",
    origin: '*' 
  })
);

// connection
pool.connect();

// routes
const todoRoutes = require("./src/routes/todoRoutes");
const userRoutes = require("./src/routes/usersRoutes");
const authRoute = require("./src/routes/authRoute");
const exp = require("constants");

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api", authRoute);

// server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
