import mongoose from "mongoose";

const assigneeSchema = new mongoose.Schema({
  name: String,
  email: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Assignee = mongoose.model("Assignee", assigneeSchema);
