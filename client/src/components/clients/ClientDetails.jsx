import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Loader from "../common/Loader";
import { MdClear, MdDelete, MdEdit } from "react-icons/md";
import { GET_CLIENTS } from "../../graphql/queries";
import { DELETE_CLIENT } from "../../graphql/mutations";
import getTimeAgo from "../../utils/getTimeAgo.js";

function ClientDetails() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleView = (client) => {
    setSelectedClient(client);
    setIsOpen(true);
  };

  const handleDelete = (clientId) => {
    deleteClient({ variables: { deleteClientId: clientId } });
    setIsOpen(false);
  };

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
        Clients
      </h1>
      <table className="min-w-full divide-y divide-gray-700 text-white text-sm shadow-md rounded-lg">
        <thead>
          <tr className="bg-transparent text-left text-xs uppercase tracking-wider">
            <th className="px-6 py-3 font-medium text-gray-300">Name</th>
            <th className="px-6 py-3 font-medium text-gray-300">Email</th>
            <th className="px-6 py-3 font-medium text-gray-300">Phone</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.clients.map((client) => (
            <tr
              key={client.id}
              className="hover:bg-slate-900 bg-gradient-to-r from-transparent via-slate-950 to-transparent"
            >
              <td className="px-6 py-4 font-medium">{client.name}</td>
              <td className="px-6 py-4 font-medium">{client.email}</td>
              <td className="px-6 py-4 font-medium">{client.phone}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleView(client)}
                  className="inline-block rounded bg-teal-300 px-4 py-2 text-xs text-black font-bold hover:bg-teal-400"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl shadow-slate-900/50 text-white rounded-lg p-6 w-64 lg:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Client Details</h2>
            <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900 dark:text-white">
                  Name
                </dt>
                <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                  {selectedClient.name}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900 dark:text-white">
                  Email
                </dt>
                <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                  {selectedClient.email}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900 dark:text-white">
                  Phone
                </dt>
                <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                  {selectedClient.phone}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900 dark:text-white">
                  Joined
                </dt>
                <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                  {getTimeAgo(parseInt(selectedClient.createdAt))}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(selectedClient.id)}
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 duration-200"
                >
                  <MdDelete className="text-2xl" />
                </button>
                <button
                  onClick={() => handleDelete(selectedClient.id)}
                  className="bg-teal-300 text-black px-4 py-2 rounded hover:bg-teal-400 duration-200"
                >
                  <MdEdit className="text-xl" />
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                <MdClear className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetails;
