import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PROJECT_BY_ID, GET_PROJECTS } from "../../graphql/queries";
import Loader from "../common/Loader";
import getTimeAgo from "../../utils/getTimeAgo";
import { MdDelete, MdEdit } from "react-icons/md";
import { DELETE_PROJECT } from "../../graphql/mutations";
import ProjectEditForm from "./ProjectEditForm";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState(null);

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = (projectId) => {
    deleteProject({ variables: { deleteProjectId: projectId } });
    navigate("/projects");
  };

  if (loading)
    return (
      <h1>
        <Loader />
      </h1>
    );
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="mx-10">
      <h1 className="text-3xl tracking-wide antialiased font-semibold mb-4 bg-gradient-to-r from-teal-300 to-pink-500 inline-block text-transparent bg-clip-text">
        {data.project?.name}
      </h1>
      <div className="flow-root rounded-lg py-4 shadow-sm">
        <dl className="-my-3 divide-y divide-gray-800 text-sm">
          <div className="grid grid-cols-1 gap-1 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent p-4 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Name</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {data.project?.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Description</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {data.project?.description}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Client</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {data.project?.client?.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Status</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {data.project?.status}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Started</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {data.project?.startDate}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Deadline</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {data.project?.endDate}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Budget</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              ₹ {data.project?.budget}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-4 hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-white">Updated</dt>
            <dd className="text-teal-300 sm:col-span-2 font-semibold">
              {getTimeAgo(parseInt(data?.project?.updatedAt))}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex gap-2 mt-4 float-right">
        <button
          class="flex gap-1 items-center rounded bg-teal-300 px-4 py-2 text-sm font-medium text-black transition hover:scale-105 hover:shadow-xl focus:outline-none active:bg-teal-500"
          onClick={() => setEditingProject(data.project)}
        >
          <MdEdit className="text-xl" /> Edit
        </button>
        <button
          class="flex gap-1 items-center rounded bg-pink-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none active:bg-pink-700"
          onClick={() => handleDelete(data.project?.id)}
        >
          <MdDelete className="text-xl" /> Delete
        </button>
      </div>
      {editingProject && (
        <ProjectEditForm
          project={editingProject}
          closeModal={() => setEditingProject(null)}
        />
      )}
    </div>
  );
}

export default ProjectDetails;
