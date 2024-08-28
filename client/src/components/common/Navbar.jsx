import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full fixed z-50">
      <header className="bg-gradient-to-t from-black to-[#0b1120]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-teal-600 dark:text-teal-300" href="#">
                <span className="sr-only">Home</span>
                <FaProjectDiagram className="text-5xl" />
              </a>
            </div>
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md px-4 py-2 text-sm font-bold bg-teal-300 text-[#0b1120] hover:bg-teal-400 active:scale-95 duration-200 flex items-center gap-2"
                    to="/client-form"
                  >
                    <MdAddCircleOutline className="text-2xl" /> Add Client
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md px-4 py-2 text-sm font-bold bg-pink-600 text-white hover:bg-pink-700 active:scale-95 duration-200 flex items-center gap-2"
                      to="/project-form"
                    >
                      <MdAddCircleOutline className="text-2xl" /> New Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="absolute inset-x-0 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-100"></div>
    </div>
  );
}

export default Navbar;
