import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLenght: 50,
    },
    description: {
      type: String,
      maxLenght: 255,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "in-completed"],
      default: "in-progress",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
