const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Password hashed during save:", {
        originalPassword: this._previousPassword, // Add this line
        hashedPassword: this.password
      });
  
    next();
  } catch (error) {
    console.error("Error in password hashing:", error);
    next(error);
  }
});

// Method to check password validity with enhanced logging
UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      console.log("comparePassword method called with:", {
        candidatePassword: candidatePassword,
        storedHash: this.password
      });
  
      if (!candidatePassword || !this.password) {
        console.error("Missing password or hash for comparison");
        return false;
      }
  
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      console.log("Password comparison result:", isMatch);
      
      return isMatch;
    } catch (error) {
      console.error("Error in comparePassword:", error);
      return false;
    }
  };
  
  // Add a middleware to log password changes
  UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      this._previousPassword = this._doc.password;
    }
    next();
  });
  
  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  
  module.exports = User;