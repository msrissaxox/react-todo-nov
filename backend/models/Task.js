const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: [true, "Todo content is required"],
    trim: true,
    maxlength: [500, "Todo content cannot exceed 500 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // Automatically manages createdAt and updatedAt

// Add an instance method to toggle completion state
TaskSchema.methods.toggleCompleted = async function() {
  try {
    this.completed = !this.completed;
    return await this.save();
  } catch (error) {
    throw new error("Error toggling completion status:", error);
}
};


// Add index for faster queries
TaskSchema.index({ userId: 1, completed: 1 });

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
