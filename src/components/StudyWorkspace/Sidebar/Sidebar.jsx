import "./Sidebar.css";

import {
    MessageSquare,
    FileText,
    Layers,
    CircleHelp,
    Network,
    FolderOpen
} from "lucide-react";

function Sidebar({

    activeView,

    setActiveView,

    collapsed,

    showMaterials,

    setShowMaterials

}) {

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

            <div className="sidebar-profile">

                <div className="profile-avatar">
                    K
                </div>

                {!collapsed && (

                    <div className="profile-info">

                        <h4>Komal</h4>

                        <p>Your AI Study Companion</p>

                    </div>

                )}

            </div>

        </aside>

    );

}

export default Sidebar;