import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_TASKS } from "../../graphql/queries";
import { FaEdit, FaTrash } from "react-icons/fa";
import getTimeAgo from "../../utils/getTimeAgo";
import Loader from "../common/Loader";
import { DELETE_TASK } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import TaskEditForm from "./TaskEditForm";

const TaskDetails = () => {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);
  const navigate = useNavigate();
  const [editingTask, setEditingTask] = useState(null);

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const handleDelete = (taskId) => {
    deleteTask({ variables: { deleteTaskId: taskId } });
  };

  if (loading)
    return (
      <h1>
        <Loader />
      </h1>
    );
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="container mx-auto">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl tracking-wide antialiased font-semibold mb-4 bg-gradient-to-r from-teal-300 to-pink-500 inline-block text-transparent bg-clip-text">
          Tasks
        </h1>
        <button
          className="rounded-md px-4 py-2 text-sm font-bold bg-teal-300 text-black hover:bg-teal-400 active:scale-95 duration-200 flex items-center gap-2 mb-4"
          onClick={() => navigate("/task-form")}
        >
          <MdAddCircleOutline className="text-2xl" /> Add Task
        </button>
      </div>
      <div className="px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gradient-to-r from-transparent via-slate-950 to-transparent border border-slate-800 p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {task.title}
              </h2>
              <p className="text-slate-400 text-sm mb-4 font-semibold">
                {task.description}
              </p>
              <div className="text-sm gap-2 text-slate-400 mb-4 font-semibold">
                Due : {task.dueDate}
              </div>
              <p className="text-sm text-slate-400 font-semibold">
                Project : {task.project.name}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                  onClick={() => setEditingTask(task)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                  onClick={() => handleDelete(task.id)}
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-white text-opacity-50 text-sm self-end">
                {getTimeAgo(parseInt(task.createdAt))}
              </p>
            </div>
          </div>
        ))}
      </div>
      {editingTask && (
        <TaskEditForm
          task={editingTask}
          closeModal={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskDetails;
