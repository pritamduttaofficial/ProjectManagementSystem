import React, { useEffect, useState } from "react";
import {
  MdLaptopMac,
  MdMenu,
  MdOutlineAssignmentInd,
  MdOutlineClose,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {!isSidebarOpen && (
        <div
          className="fixed top-20 right-0 z-40 lg:hidden bg-[#0b1120] text-white px-4 py-2"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MdMenu className="text-2xl" />
        </div>
      )}

      {isSidebarOpen && (
        <div className="w-full lg:w-1/6 fixed top-20 h-screen z-50">
          <div className="flex h-full flex-col justify-between border-r border-gray-800 bg-gradient-to-b from-black to-[#0b1120]">
            <div className="px-4 py-6">
              <ul className="mt-6 space-y-1">
                <button
                  className="block lg:hidden text-white float-end -mt-8 cursor-pointer hover:bg-slate-700 rounded-full p-2"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdOutlineClose className="text-xl" />
                </button>
                <li>
                  <Link
                    className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                    to="#"
                  >
                    <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>
                    <span className="relative text-sm font-medium transition-colors text-pink-500 group-hover:text-black flex items-center gap-2">
                      <MdOutlineSpaceDashboard className="text-xl" /> Dashboard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                    to="/projects"
                  >
                    <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>
                    <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                      <MdLaptopMac className="text-xl" /> Projects
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                    to="/clients"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>
                    <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                      <LuUsers className="text-lg" /> Clients
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2 "
                    to="#"
                  >
                    <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>
                    <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                      <FaTasks className="text-base" /> Tasks
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block group relative overflow-hidden mb-3 text-sm font-semibold rounded px-4 py-2"
                    to="#"
                  >
                    <span className="absolute inset-y-0 left-0 w-[0px] bg-white transition-all group-hover:w-full group-active:bg-teal-500"></span>
                    <span className="relative text-sm font-medium transition-colors text-white group-hover:text-black flex items-center gap-2">
                      <MdOutlineAssignmentInd className="text-xl" /> Assignee
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
