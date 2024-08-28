import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_TASKS, GET_PROJECTS } from "../../graphql/queries";
import { FaCalendar, FaTasks } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { CREATE_TASK } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();

  const {
    loading: loadingProjects,
    error: errorProjects,
    data: projectData,
  } = useQuery(GET_PROJECTS);

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        variables: {
          title,
          description,
          dueDate,
          projectId,
        },
      });
      // Reset the form
      setTitle("");
      setDescription("");
      setDueDate("");
      setProjectId("");
      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-t from-transparent via-slate-950 to-transparent p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto"
    >
      <h2 className="text-white font-bold text-2xl mb-6">Create Task</h2>
      <div className="mb-4">
        <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
          <FaTasks />
          Title
        </label>
        <input
          type="text"
          className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
          <MdDescription />
          Description
        </label>
        <textarea
          className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
          <FaCalendar />
          Due Date
        </label>
        <input
          type="date"
          className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
          Project
        </label>
        <select
          className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="" disabled className="bg-slate-950">
            Select a project
          </option>
          {loadingProjects ? (
            <option>Loading projects...</option>
          ) : errorProjects ? (
            <option>Error loading projects</option>
          ) : (
            projectData?.projects?.map((proj) => (
              <option
                key={proj.id}
                value={proj.id}
                className="bg-slate-950 text-sm font-semibold"
              >
                {proj.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-2xl shadow-white/5 transition-all"
      >
        {loading ? "Creating Task..." : "Create Task"}
      </button>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </form>
  );
};

export default TaskForm;
