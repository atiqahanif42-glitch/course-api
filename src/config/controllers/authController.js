const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Validation Error: All fields (name, email, password) are required." });
    }

    const existingUser = User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
    User.createUser(newUser);

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error); // Error ko terminal par print karne ke liye
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Validation Error: Email and password are required." });
    }

    const user = User.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};