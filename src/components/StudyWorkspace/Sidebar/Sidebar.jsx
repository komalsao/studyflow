import "./Sidebar.css";

import {
    MessageSquare,
    FileText,
    Layers,
    CircleHelp,
    Network,
    FolderOpen,
    LogOut
} from "lucide-react";
import auth from "../../../firebase/auth";
import { getCurrentUserProfile } from "../../../services/userService";
import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Sidebar({

    activeView,

    setActiveView,

    collapsed,

    showMaterials,

    setShowMaterials

}) {

    const [profile, setProfile] = useState(null);

    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    const navigate = useNavigate();



    async function handleLogout() {

    try {

        await signOut(auth);

        navigate("/login");

    } catch (error) {

        console.error("Unable to logout:", error);

    }

}

    useEffect(() => {

        function handleClick(e) {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {

                setShowMenu(false);

            }

        }

        document.addEventListener("pointerdown", handleClick);

        return () => {

            document.removeEventListener("pointerdown", handleClick);

        };

    }, []);



    useEffect(() => {

        const user = auth.currentUser;

        if (!user) return;

        getCurrentUserProfile(user.uid)
            .then(setProfile);

    }, []);

    return (

        <aside className={`study-sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-scroll">

                <nav className="sidebar-nav">

                    <div className="sidebar-section">

                        {!collapsed && (
                            <h3 className="sidebar-heading">
                                Learning
                            </h3>
                        )}

                        <button
                            className={`sidebar-item ${activeView === "chat" ? "active" : ""}`}
                            onClick={() => { setShowMaterials(false); setActiveView("chat") }}
                        >
                            <MessageSquare size={20} />
                            {!collapsed && <span>Ask Lumi</span>}
                        </button>

                        <button
                            className={`sidebar-item ${activeView === "summary" ? "active" : ""}`}
                            onClick={() => { setShowMaterials(false); setActiveView("summary") }}
                        >
                            <FileText size={20} />
                            {!collapsed && <span>Summary</span>}
                        </button>

                        <button
                            className={`sidebar-item ${activeView === "flashcards" ? "active" : ""}`}
                            onClick={() => { setShowMaterials(false); setActiveView("flashcards") }}
                        >
                            <Layers size={20} />
                            {!collapsed && <span>Flashcards</span>}
                        </button>

                        <button
                            className={`sidebar-item ${activeView === "quiz" ? "active" : ""}`}
                            onClick={() => { setShowMaterials(false); setActiveView("quiz") }}
                        >
                            <CircleHelp size={20} />
                            {!collapsed && <span>Quiz</span>}
                        </button>

                        <button
                            className={`sidebar-item ${activeView === "mindmap" ? "active" : ""}`}
                            onClick={() => { setShowMaterials(false); setActiveView("mindmap") }}
                        >
                            <Network size={20} />
                            {!collapsed && <span>Mind Map</span>}
                        </button>

                    </div>

                    <div className="sidebar-section">

                        {!collapsed && (
                            <h3 className="sidebar-heading">
                                Resources
                            </h3>
                        )}

                        <button
                            className={`sidebar-item ${showMaterials ? "active" : ""}`}
                            onClick={() => {

                                setShowMaterials(prev => !prev);

                            }}
                        >
                            <FolderOpen size={20} />

                            {!collapsed && <span>Materials</span>}
                        </button>

                    </div>

                </nav>

            </div>

            <div
                className="sidebar-profile"
                ref={menuRef}
                onClick={() => {

                    if (!collapsed) {

                        setShowMenu((prev) => !prev);

                    }

                }}
            >

                <div className="profile-avatar">
                    {profile?.name?.charAt(0).toUpperCase() || "?"}
                </div>

                {!collapsed && (

                    <div className="profile-info">

                        <h4>{profile?.name || "User"}</h4>

                        <p>{profile?.email}</p>

                    </div>

                )}

                {showMenu && (

                    <div className="profile-menu">

                        <button
                            className="logout-btn"
                            onClick={(e) => {

                                e.stopPropagation();

                                handleLogout();

                            }}
                        >

                            <LogOut size={16} />

                            Logout

                        </button>

                    </div>

                )}

            </div>
        </aside>

    );

}

export default Sidebar;