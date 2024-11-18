//In controllers/authController.js, define functions to handle user registration and login.
//bcrpt hashes passwords
//jsonwebtoken (JWT) is used to securely handle user authentication and authorization by creating and verifying JSON Web Tokens.
//Use JWT if you want to add user authentication and restrict access to certain endpoints.

//controllers/authController.js
// import index from ("/index.js");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// Register User
const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log("Registering user:", username); 
      console.log("Original password:", password);
      // Log incoming data
      // Check if the user already exists
      
//Check if the username already exists
const existingUser = await User.findOne({ username });
if (existingUser) {
    console.log("Username is already taken");
  return res.status(400).json({ message: "Username is already taken" });
}

// Check if the email already exists
const existingEmail = await User.findOne({ email });
if (existingEmail) {
  console.log("Email is already taken");
  return res.status(400).json({ message: "Email is already taken" });
}

     
// Create a new user
const newUser = new User({
    username,
    email,
    password
  });
  console.log("Saving new user to database...");

      // Save the user to the database
      await newUser.save();
      console.log("User registered successfully");
  

      //respond with success
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Login function
const loginUser = async (req, res) => {
    try {
  const { username, password } = req.body;
  console.log("Received username:", username); // Debugging line
  console.log("Received password:", password); // Debugging line

  // Step 1: Find the user by username (e.g., from your database)
  const user = await User.findOne({ username });
  if (!user) {
    console.log("User not found:", username);
    return res.status(400).json({ message: "User not found" });
  }
  console.log("Found user in database:", user.username);
  console.log("Stored hashed password:", user.password);

  // Step 2: Check if the password is correct
  const isPasswordValid = await user.comparePassword(password);
  console.log("Password match:", isPasswordValid); // Debugging line

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Step 3: Generate a JWT token if credentials are correct
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }, // token will expire in 1 hour
  );

  // Step 4: Send the token back to the client
  console.log("Login successful for user:", username);
  res.json({ message: "Login successful", token });
} catch (error) {
  console.error("Error in loginUser:", error);
  res.status(500).json({ message: "Server error" });
}
};
    






module.exports = { loginUser, registerUser };
