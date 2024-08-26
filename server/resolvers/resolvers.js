import { Client } from "../models/client.model.js";
import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";

const resolvers = {
  Query: {
    // Fetch all projects
    projects: async () => {
      return await Project.find().populate("client tasks");
    },
    // Fetch a single project by ID
    project: async (parent, { id }) => {
      return await Project.findById(id).populate("client tasks");
    },
    // Fetch all clients
    clients: async () => {
      return await Client.find().populate("projects");
    },
    // Fetch a single client by ID
    client: async (parent, { id }) => {
      return await Client.findById(id).populate("projects");
    },
    // Fetch all tasks
    tasks: async () => {
      return await Task.find().populate("project");
    },
    // Fetch a single task by ID
    task: async (parent, { id }) => {
      return await Task.findById(id).populate("project");
    },
  },
  Mutation: {
    // Create a new project
    createProject: async (parent, args) => {
      const project = new Project({
        ...args,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await project.save();

      // Update the client with the new project reference
      await Client.findByIdAndUpdate(args.clientId, {
        $push: { projects: project._id },
      });

      return project.populate("client tasks").execPopulate();
    },
    // Update an existing project
    updateProject: async (parent, { id, ...updateFields }) => {
      updateFields.updatedAt = new Date();
      return await Project.findByIdAndUpdate(id, updateFields, {
        new: true,
      }).populate("client tasks");
    },
    // Delete a project
    deleteProject: async (parent, { id }) => {
      const project = await Project.findById(id);
      if (project) {
        await project.remove();
        return true;
      }
      return false;
    },
    // Create a new client
    createClient: async (parent, args) => {
      const client = new Client({
        ...args,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await client.save();
      return client;
    },
    // Update an existing client
    updateClient: async (parent, { id, ...updateFields }) => {
      updateFields.updatedAt = new Date();
      return await Client.findByIdAndUpdate(id, updateFields, { new: true });
    },
    // Delete a client
    deleteClient: async (parent, { id }) => {
      const client = await Client.findById(id);
      if (client) {
        await client.remove();
        return true;
      }
      return false;
    },
    // Create a new task
    createTask: async (parent, args) => {
      const task = new Task({
        ...args,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save the task
      await task.save();

      // Update the project with the new task reference
      await Project.findByIdAndUpdate(projectId, {
        $push: { tasks: task._id },
      });

      return task.populate("project").execPopulate();
    },
    // Update an existing task
    updateTask: async (parent, { id, ...updateFields }) => {
      updateFields.updatedAt = new Date();
      return await Task.findByIdAndUpdate(id, updateFields, {
        new: true,
      }).populate("project");
    },
    // Delete a task
    deleteTask: async (parent, { id }) => {
      const task = await Task.findById(id);
      if (task) {
        await task.remove();
        return true;
      }
      return false;
    },
  },

  // Resolvers for nested fields
  Project: {
    client: async (project) => {
      return await Client.findById(project.client);
    },
    tasks: async (project) => {
      return await Task.find({ project: project._id });
    },
  },
  Client: {
    projects: async (client) => {
      return await Project.find({ client: client._id });
    },
  },
  Task: {
    project: async (task) => {
      return await Project.findById(task.project);
    },
  },
};

export default resolvers;
