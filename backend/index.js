//Server

// index.js
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

//Create the express app
const app = express();


// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Start the server
const PORT = 5001;

// Middleware to parse the data in json and urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// For development, add CORS

app.use(cors());

// Express router instances that mount the authRoutes and taskRoutes to the right paths
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));


const uri = process.env.MONGO_URI;

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Check if the uri is provided in the .env file
if (!uri) {
  console.log("MongoDB URI is not defined in .env file");
  // console.log('All loaded environment variables:', process.env);
  process.exit(1); // Exit if the URI is not found
}

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// This should be MY LAST route - it's a catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
console.log(process.env.JWT_SECRET); // Check if the secret is loaded correctly

// var UserSchema = new mongoose.Schema(
//   {
//     username: String,
//     hash: String,
//     salt: String,
//   },
//   { timestamps: true },
// );

// mongoose.model('User', UserSchema);
// Our user model can then be accessed anywhere in our application by calling mongoose.model('User').

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
