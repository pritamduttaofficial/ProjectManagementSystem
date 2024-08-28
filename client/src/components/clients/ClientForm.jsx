import React, { useState } from "react";
import { FaPhone, FaUserTie } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useMutation, gql } from "@apollo/client";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { GET_CLIENTS } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";

function ClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const [createClient, { loading, error }] = useMutation(CREATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClient({ variables: { name, email, phone } });
      setName("");
      setEmail("");
      setPhone("");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-teal-300 sm:text-3xl">
          Add New Client
        </h1>
        <form
          className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="text-white font-semibold text-opacity-80 flex items-center gap-2"
            >
              <FaUserTie />
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700  p-4 pe-12 text-sm shadow-2xl shadow-white/5"
                placeholder="Enter name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-white font-semibold text-opacity-80 flex items-center gap-2"
            >
              <IoIosMail className="text-xl" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700  p-4 pe-12 text-sm shadow-2xl shadow-white/5"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="text-white font-semibold text-opacity-80 flex items-center gap-2"
            >
              <FaPhone />
              Phone
            </label>
            <div className="relative">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-2 rounded-lg bg-transparent text-white border-slate-700  p-4 pe-12 text-sm shadow-2xl shadow-white/5"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-medium text-white"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>

          {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
