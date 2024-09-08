import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaEdit, FaCalendar, FaDollarSign } from "react-icons/fa";
import { UPDATE_PROJECT } from "../../graphql/mutations";
import { GET_PROJECTS } from "../../graphql/queries";

const ProjectEditForm = ({ project, closeModal }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [budget, setBudget] = useState(project.budget);

  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject({
        variables: {
          updateProjectId: project.id,
          name,
          description,
          status,
          startDate,
          endDate,
          budget: parseFloat(budget),
        },
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-slate-950 p-6 rounded-lg shadow-2xl shadow-slate-900 border border-slate-700 lg:w-1/2">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white font-semibold text-opacity-80">
              Project Name
            </label>
            <input
              type="text"
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-white font-semibold text-opacity-80">
              Description
            </label>
            <textarea
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-white font-semibold text-opacity-80">
              Status
            </label>
            <select
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="NOT_STARTED" className="bg-slate-950">
                NOT STARTED
              </option>
              <option value="IN_PROGRESS" className="bg-slate-950">
                IN PROGRESS
              </option>
              <option value="COMPLETED" className="bg-slate-950">
                COMPLETED
              </option>
              <option value="ON_HOLD" className="bg-slate-950">
                ON HOLD
              </option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="mb-4 w-1/2">
              <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
                <FaCalendar />
                Start Date
              </label>
              <input
                type="date"
                className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
                <FaCalendar />
                End Date
              </label>
              <input
                type="date"
                className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
              <FaDollarSign />
              Budget
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-300 hover:bg-teal-400 text-black font-semibold py-2 px-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProjectEditForm;
