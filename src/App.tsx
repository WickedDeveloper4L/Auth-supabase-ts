import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Instruction from "./pages/instruction/Instruction";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Route, Routes } from "react-router";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/instruction" element={<Instruction />} />
      </Routes>
    </div>
  );
}

export default App;
