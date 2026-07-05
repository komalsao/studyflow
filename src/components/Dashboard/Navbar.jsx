import "./Navbar.css";

function Navbar({ name, onLogout }) {
    return (
        <nav className="navbar">

            <div className="logo">
                <h2>🌿 StudyFlow</h2>
            </div>

            <div className="navbar-right">

                <button className="profile-btn">
                    <span>{name || "User"}</span>
                    <span className="dropdown">⌄</span>
                </button>

                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;