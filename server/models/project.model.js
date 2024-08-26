import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  startDate: String,
  endDate: String,
  budget: Number,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);
