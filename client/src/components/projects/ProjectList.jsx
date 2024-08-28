import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Loader from "../common/Loader";
import { GET_PROJECTS } from "../../graphql/queries";
import ProjectCard from "./ProjectCard";

function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading)
    return (
      <h1>
        <Loader />
      </h1>
    );
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl tracking-wide antialiased font-semibold mb-4 bg-gradient-to-r from-teal-300 to-pink-500 inline-block text-transparent bg-clip-text">
        Projects
      </h1>
      {data?.projects?.map((project) => (
        <div key={project.id}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
