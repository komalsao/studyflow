import "./Dashboard.css";
import { signOut } from "firebase/auth";
import auth from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import AppHeader from "../../components/Shared/AppHeader/AppHeader";
import HeroCard from "../../components/Dashboard/HeroCard";
import StartSessionCard from "../../components/Dashboard/StartSessionCard";
import RecentSessions from "../../components/Dashboard/RecentSessions";
import ContinueCard from "../../components/Dashboard/ContinueCard";
import TipCard from "../../components/Dashboard/TipCard";


function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;

      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        setName(snap.data().name);
      }
    };
    loadUser();
  }, []);



  return (
    <>
      <AppHeader 
        name={name}
        onLogout={handleLogout}
      />
      <div className="dashboard">

        <HeroCard name={name} />

        <div className="dashboard-grid">

          <StartSessionCard />

          <RecentSessions />

        </div>

        <div className="dashboard-grid">

          <ContinueCard />

          <TipCard />

        </div>

      </div>
    </>
  );

}

export default Dashboard; 