import { signOut } from "firebase/auth";
import auth from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

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
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1>Welcome back, {name}!</h1>
    </>
  );
}

export default Dashboard; 