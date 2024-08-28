import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

function App() {
  return (
    <>
      <div className="w-screen">
        <Navbar />
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <div className="absolute right-0 top-20 w-full min-h-screen lg:w-5/6 p-4 bg-gradient-to-b from-black to-[#0b1120]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
