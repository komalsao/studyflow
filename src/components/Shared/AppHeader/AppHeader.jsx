import "./AppHeader.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

import auth from "../../../firebase/auth";
import { getCurrentUserProfile } from "../../../services/userService";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";

function AppHeader() {

    const [profile, setProfile] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const user = auth.currentUser;

        if (!user) return;

        getCurrentUserProfile(user.uid)
            .then(setProfile);

    }, []);

    async function confirmLogout() {

        try {

            await signOut(auth);

            navigate("/login");

        } catch (error) {

            console.error("Unable to logout:", error);

        }

    }

    return (

        <nav className="navbar">

            <div className="logo">

                <h2>StudyFlow</h2>

            </div>

            <div className="navbar-right">

                <div className="navbar-profile">

                    <div className="profile-avatar">

                        {profile?.name?.charAt(0).toUpperCase() || "?"}

                    </div>

                    <span className="profile-name">

                        {profile?.name || "User"}

                    </span>

                </div>

                <button
                    className="navbar-logout"
                    onClick={() => setShowLogoutModal(true)}
                    title="Logout"
                >

                    <LogOut size={18} />

                </button>

            </div>
            <DeleteModal
                isOpen={showLogoutModal}
                title="Logout"
                message="Are you sure you want to log out of StudyFlow?"
                onClose={() => setShowLogoutModal(false)}
                onDelete={confirmLogout}
            />

        </nav>

    );

}

export default AppHeader;