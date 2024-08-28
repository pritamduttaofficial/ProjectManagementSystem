import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FaCalendar, FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import { IoIosCreate, IoIosListBox } from "react-icons/io";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { GET_CLIENTS_PROJECT_FORM, GET_PROJECTS } from "../../graphql/queries";

function ProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("NOT_STARTED");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");

  const { data } = useQuery(GET_CLIENTS_PROJECT_FORM);

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        variables: {
          name,
          status,
          client,
          description,
          startDate,
          endDate,
          budget: parseFloat(budget),
        },
      });
      setName("");
      setDescription("");
      setClient("");
      setStatus("NOT_STARTED");
      setStartDate("");
      setEndDate("");
      setBudget("");
      alert("Project added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add project.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-teal-300 sm:text-3xl">
          Add New Project
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          {/* Project Name */}
          <div>
            <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
              <IoIosCreate />
              Project Name
            </label>
            <input
              type="text"
              required
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
              <IoIosListBox />
              Description
            </label>
            <textarea
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              required
            />
          </div>

          {/* Select Client */}
          <div>
            <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
              <FaUserTie />
              Client
            </label>
            <select
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
            >
              <option value="" disabled className="bg-slate-950">
                Select a client
              </option>
              {data?.clients?.map((client) => (
                <option
                  key={client.id}
                  value={client.id}
                  className="bg-slate-950 text-sm uppercase"
                >
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Project Status */}
          <div>
            <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
              <IoIosListBox />
              Status
            </label>
            <select
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="NOT_STARTED" className="bg-slate-950 text-sm">
                NOT STARTED
              </option>
              <option value="IN_PROGRESS" className="bg-slate-950 text-sm">
                IN PROGRESS
              </option>
              <option value="COMPLETED" className="bg-slate-950 text-sm">
                COMPLETED
              </option>
              <option value="ON_HOLD" className="bg-slate-950 text-sm">
                ON HOLD
              </option>
            </select>
          </div>

          {/* Dates */}
          <div>
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

          <div>
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

          {/* Budget */}
          <div>
            <label className="text-white font-semibold text-opacity-80 flex items-center gap-2">
              <FaMoneyBillWave />
              Budget
            </label>
            <input
              type="number"
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-medium text-white"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
