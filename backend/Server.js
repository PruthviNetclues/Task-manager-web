const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Import the User model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
const sequelize = new Sequelize("login", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

// Define your routes and middleware here...

// Signup route
app.post("/Signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create user" });
  }
});

// Login route
app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Start the server
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
