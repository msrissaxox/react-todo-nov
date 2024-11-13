const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../src/.env") });

console.log("MONGODB_URI:", process.env.MONGODB_URI); // Check if the URI is loaded correctly

const mongoose = require("mongoose");

const testConnection = async () => {
  try {
    // Print the URI (without password) to verify it's correct
    const sanitizedUri = process.env.MONGODB_URI?.replace(
      /:([^:@]{8})[^:@]*@/,
      ":****@",
    );
    console.log("Attempting to connect to:", sanitizedUri);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to MongoDB!");

    // List all collections in the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("\nAvailable collections:");
    collections.forEach((collection) => {
      console.log("-", collection.name);
    });

    // Close the connection
    await mongoose.connection.close();
    console.log("\nConnection closed successfully");
  } catch (error) {
    console.error("Error:", error);
    await mongoose.connection.close();
  }
};

testConnection();
