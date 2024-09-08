import { useQuery } from "@apollo/client";
import React from "react";
import {
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
  FaDotCircle,
  FaBusinessTime,
} from "react-icons/fa";
import {
  GET_ALL_TASKS,
  GET_CLIENTS,
  GET_PROJECTS,
} from "../../graphql/queries";
import dayjs from "dayjs";

const Dashboard = () => {
  const { data: clientsData } = useQuery(GET_CLIENTS);
  const { data: projectsData } = useQuery(GET_PROJECTS);
  const { data: tasksData } = useQuery(GET_ALL_TASKS);

  const currentDate = dayjs();

  const totalBudget = projectsData?.projects?.reduce(
    (sum, project) => sum + project.budget,
    0
  );

  const completedProjectsBudget = projectsData?.projects
    ?.filter((project) => project.status === "COMPLETED")
    .reduce((sum, project) => sum + project.budget, 0);

  const remainingBudget = totalBudget - completedProjectsBudget;

  // Calculate upcoming task deadline
  const upcomingTaskDeadline = tasksData?.tasks
    ?.filter((task) => dayjs(task.dueDate).isAfter(currentDate)) // Filter future tasks
    .reduce((nearest, task) => {
      return !nearest || dayjs(task.dueDate).isBefore(dayjs(nearest.dueDate))
        ? task
        : nearest;
    }, null);

  // Calculate upcoming project deadline
  const upcomingProjectDeadline = projectsData?.projects
    ?.filter((project) => dayjs(project.endDate).isAfter(currentDate)) // Filter future projects
    .reduce((nearest, project) => {
      return !nearest || dayjs(project.endDate).isBefore(dayjs(nearest.dueDate))
        ? project
        : nearest;
    }, null);

  const latestProject = projectsData?.projects?.reduce((latest, project) => {
    return !latest || dayjs(project.createdAt).isAfter(dayjs(latest.createdAt))
      ? project
      : latest;
  }, null);

  const latestClient = clientsData?.clients?.reduce((latest, client) => {
    return !latest || dayjs(client.createdAt).isAfter(dayjs(latest.createdAt))
      ? client
      : latest;
  }, null);

  const latestTask = tasksData?.tasks?.reduce((latest, task) => {
    return !latest || dayjs(task.createdAt).isAfter(dayjs(latest.createdAt))
      ? task
      : latest;
  }, null);

  return (
    <div className="bg-gradient-to-t from-transparent via-slate-950 to-transparent text-white min-h-screen">
      <h1 className="text-3xl tracking-wide antialiased font-semibold mb-4 bg-gradient-to-r from-teal-300 to-pink-500 inline-block text-transparent bg-clip-text">
        Dashboard
      </h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 mx-10">
        {/* Projects Overview */}
        <div className="bg-gradient-to-tl from-teal-300 via-violet-400 to-pink-500 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Projects Overview</h2>
            <FaProjectDiagram className="text-white text-2xl" />
          </div>
          <div className="space-y-2 px-4">
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Total Projects:{" "}
              <span className="font-semibold text-white text-lg">
                {projectsData?.projects?.length}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Active Projects:{" "}
              <span className="font-semibold text-white text-lg">
                {
                  projectsData?.projects?.filter(
                    (project) =>
                      project.status === "IN_PROGRESS" ||
                      project.status === "NOT_STARTED"
                  ).length
                }
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Completed Projects:{" "}
              <span className="font-semibold text-white text-lg">
                {
                  projectsData?.projects?.filter(
                    (project) => project.status === "COMPLETED"
                  ).length
                }
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Projects on Hold:{" "}
              <span className="font-semibold text-white text-lg">
                {
                  projectsData?.projects?.filter(
                    (project) => project.status === "ON_HOLD"
                  ).length
                }
              </span>
            </p>
          </div>
        </div>

        {/* Tasks Overview */}
        <div className="bg-gradient-to-tl from-teal-300 via-violet-400 to-pink-500 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tasks Overview</h2>
            <FaTasks className="text-white text-2xl" />
          </div>
          <div className="space-y-2 px-4">
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Total Tasks:{" "}
              <span className="font-semibold text-white text-lg">
                {tasksData?.tasks?.length}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Completed Tasks:{" "}
              <span className="font-semibold text-white text-lg">
                {tasksData?.tasks?.length}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Overdue Tasks:{" "}
              <span className="font-semibold text-white text-lg">
                {
                  tasksData?.tasks?.filter((task) =>
                    dayjs(task.dueDate).isBefore(currentDate)
                  ).length
                }
              </span>
            </p>
          </div>
        </div>

        {/* Clients Overview */}
        <div className="bg-gradient-to-tl from-teal-300 via-violet-400 to-pink-500 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Clients Overview</h2>
            <FaUsers className="text-white text-2xl" />
          </div>
          <div className="space-y-2 px-4">
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Total Clients:{" "}
              <span className="font-semibold text-white text-lg">
                {clientsData?.clients?.length}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Recent Clients:{" "}
              <span className="font-semibold text-white text-lg">
                {clientsData?.clients?.length}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Budget & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mx-10">
        {/* Budget Overview */}
        <div className="bg-gradient-to-tl from-teal-300 via-violet-400 to-pink-500 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Budget Overview</h2>
            <FaDollarSign className="text-white text-2xl" />
          </div>
          <div className="space-y-2 px-4">
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Total Budget:{" "}
              <span className="font-semibold text-white text-lg">
                ₹ {totalBudget}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Spent Budget:{" "}
              <span className="font-semibold text-white text-lg">
                ₹ {completedProjectsBudget}
              </span>
            </p>
            <p className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Remaining Budget:{" "}
              <span className="font-semibold text-white text-lg">
                ₹ {remainingBudget}
              </span>
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-tl from-teal-300 via-violet-400 to-pink-500 shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <FaBusinessTime className="text-white text-2xl" />
          </div>
          <ul className="space-y-2 px-4">
            <li className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Latest Task: <p className="text-lg">{latestTask?.title}</p>
            </li>
            <li className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Latest Project: <p className="text-lg">{latestProject?.name}</p>
            </li>
            <li className="font-semibold flex items-center gap-2">
              <FaDotCircle />
              Latest Client: <p className="text-lg">{latestClient?.name}</p>
            </li>
          </ul>
        </div>
      </div>
      {/* Calendar */}
      <div className="bg-gradient-to-tl from-teal-300 via-violet-400 to-pink-500 shadow-lg rounded-lg p-6 mb-12 mx-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
          <FaCalendarAlt className="text-white text-2xl" />
        </div>
        <div className="space-y-2 px-4">
          <p className="font-semibold flex items-center gap-2">
            <FaDotCircle />
            Task Deadline:{" "}
            <span className="font-semibold text-white text-lg">
              {upcomingTaskDeadline?.title},{" "}
              {upcomingTaskDeadline
                ? dayjs(upcomingTaskDeadline?.dueDate).format("MMMM D, YYYY")
                : "None"}
            </span>
          </p>
          <p className="font-semibold flex items-center gap-2">
            <FaDotCircle />
            Project Deadline:{" "}
            <span className="font-semibold text-white text-lg">
              {upcomingProjectDeadline?.name},{" "}
              {upcomingProjectDeadline
                ? dayjs(upcomingProjectDeadline?.endDate).format("MMMM D, YYYY")
                : "None"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
