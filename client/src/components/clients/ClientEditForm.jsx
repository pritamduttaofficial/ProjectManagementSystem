import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT } from "../../graphql/mutations";
import { GET_CLIENTS } from "../../graphql/queries";

const ClientEditForm = ({ client, closeModal }) => {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  const [updateClient, { loading, error }] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient({
        variables: {
          updateClientId: client.id,
          name,
          email,
          phone,
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
        <h2 className="text-2xl font-bold text-white mb-4">Edit Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white font-semibold text-opacity-80">
              Name
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
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-white font-semibold text-opacity-80">
              Phone
            </label>
            <input
              type="tel"
              className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700 p-4 text-sm shadow-2xl shadow-white/5"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              {loading ? "Updating..." : "Update Client"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ClientEditForm;
