import { signOut } from "firebase/auth";
import auth from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard; 