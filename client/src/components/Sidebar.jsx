import React, { useState } from "react";
import {
  MdLaptopMac,
  MdMenu,
  MdOutlineAssignmentInd,
  MdOutlineClose,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  console.log(isSidebarOpen);

  return isSidebarOpen ? (
    <div className="w-full md:w-1/2 lg:w-1/6">
      <div className="flex h-screen flex-col justify-between border-e bg-[#0b1120]">
        <div className="px-4 py-6">
          <ul className="mt-6 space-y-1">
            <button
              className="block lg:hidden text-white float-end -mt-8 cursor-pointer hover:bg-slate-700 rounded-full p-2"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <MdOutlineClose className="text-xl" />
            </button>
            <li>
              <a
                className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                href="#"
              >
                <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>

                <span className="relative text-sm font-medium transition-colors text-pink-500 group-hover:text-black flex items-center gap-2">
                  <MdOutlineSpaceDashboard className="text-xl" /> Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                href="#"
              >
                <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>

                <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                  <MdLaptopMac className="text-xl" /> Projects
                </span>
              </a>
            </li>
            <li>
              <a
                className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                href="#"
              >
                <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>

                <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                  <LuUsers className="text-lg" /> Clients
                </span>
              </a>
            </li>
            <li>
              <a
                className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                href="#"
              >
                <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>

                <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                  <FaTasks className="text-base" /> Tasks
                </span>
              </a>
            </li>
            <li>
              <a
                className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2"
                href="#"
              >
                <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>

                <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                  <MdOutlineAssignmentInd className="text-xl" /> Assignee
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="w-full lg:hidden bg-[#0b1120] text-white px-4 py-2"
      onClick={() => setIsSidebarOpen((prev) => !prev)}
    >
      <MdMenu className="text-2xl" />
    </div>
  );
}

export default Sidebar;
