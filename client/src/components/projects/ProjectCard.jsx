import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="w-full lg:px-20 mb-4">
      <Link
        to={`/project/${project.id}`}
        className="relative block overflow-hidden rounded-lg border border-gray-700 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-teal-300 via-blue-500 to-pink-600"></span>

        {project.status !== "ON_HOLD" ? (
          <div className="text-green-500 font-semibold float-end">
            {project.status}
          </div>
        ) : (
          <div className="text-red-500 font-semibold float-end">
            {project.status}
          </div>
        )}

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              {project.name}
            </h3>

            <p className="mt-1 text-xs font-semibold text-white text-opacity-50">
              By {project.client?.name}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-white font-semibold">
            {project.description}
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-white text-opacity-50">
              Started
            </dt>
            <dd className="text-xs text-white font-semibold">
              {project.startDate}
            </dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-white text-opacity-50">
              Deadline
            </dt>
            <dd className="text-xs text-white font-semibold">
              {project.endDate}
            </dd>
          </div>
        </dl>
      </Link>
    </div>
  );
}

export default ProjectCard;
