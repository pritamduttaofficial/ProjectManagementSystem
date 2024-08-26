import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="w-screen">
        <Navbar />
        <Sidebar />
      </div>
    </>
  );
}

export default App;
