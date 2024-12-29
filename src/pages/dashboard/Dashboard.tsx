import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";

interface DashboardProps {
  session: Session;
}

const Dashboard = ({ session }: DashboardProps) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      alert("Signed Out successfully");
    }
  };
  useEffect(() => {
    let ignore = false;

    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`name, email`)
        .eq("id", user.id)
        .single();
      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setName(data.name);
          setEmail(data.email);
        }
      }
      setLoading(false);
    }
    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);
  return (
    <div>
      {loading ? (
        <h6>Loading...</h6>
      ) : (
        <div>
          <h5>{name}</h5>
          <br />
          <h5>{email}</h5>

          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
