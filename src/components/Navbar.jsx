import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>StudyFlow</h2>

      <Link to="/login" className="nav-link">
        <button>Sign In</button>
      </Link>
    </nav>
  );
}

export default Navbar;