import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Instruction from "./pages/instruction/Instruction";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Navigate, Route, Routes } from "react-router";
import supabase from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            session ? <Dashboard session={session} /> : <Navigate to="/" />
          }
        />
        <Route path="/instruction" element={<Instruction />} />
      </Routes>
    </div>
  );
}

export default App;
