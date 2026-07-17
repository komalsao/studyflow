import "./StudyWorkspace.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/StudyWorkspace/Sidebar/Sidebar";
import WorkspaceHeader from "../../components/StudyWorkspace/WorkspaceHeader/WorkspaceHeader";

import WelcomeView from "../../components/StudyWorkspace/WelcomeView/WelcomeView";
import ChatView from "../../components/StudyWorkspace/ChatView/ChatView";
import SummaryView from "../../components/StudyWorkspace/SummaryView/SummaryView";
import FlashcardsView from "../../components/StudyWorkspace/FlashcardsView/FlashcardsView";
import QuizView from "../../components/StudyWorkspace/QuizView/QuizView";
import MindMapView from "../../components/StudyWorkspace/MindMapView/MindMapView";
import MaterialsView from "../../components/StudyWorkspace/MaterialsView/MaterialsView";
import ChatInput from "../../components/StudyWorkspace/Shared/ChatInput/ChatInput";
import {
    getSession,
    getSessionMaterials
} from "../../services/sessionService";

function StudyWorkspace() {
    const { sessionId } = useParams();
    const materialsRef = useRef(null);
    const [showMaterials, setShowMaterials] = useState(false);
    const [activeView, setActiveView] = useState("welcome");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [session, setSession] = useState(null);
    const [materials, setMaterials] = useState([]);
    const showChatBar =
        activeView === "welcome";

    useEffect(() => {

        let isActive = true;

        if (!sessionId) {
            return undefined;

        }

        Promise.all([
            getSession(sessionId),
            getSessionMaterials(sessionId)
        ])
            .then(([loadedSession, loadedMaterials]) => {

                if (isActive) {

                    setSession(loadedSession);
                    setMaterials(loadedMaterials);

                }

            })
            .catch((error) => {

                console.error("Unable to load study workspace:", error);

            });

        return () => {

            isActive = false;

        };

    }, [sessionId]);

    const activeSession = session?.id === sessionId ? session : null;
    const activeMaterials = activeSession ? materials : [];

    const handleMaterialRename = (materialId, originalFileName) => {

        setMaterials((currentMaterials) =>
            currentMaterials.map((material) =>
                material.id === materialId
                    ? { ...material, originalFileName }
                    : material
            )
        );

    };

    const handleMaterialDelete = (materialId) => {

        setMaterials((currentMaterials) =>
            currentMaterials.filter((material) => material.id !== materialId)
        );

    };

    useEffect(() => {

        function handleClick(e) {

            if (

                showMaterials &&

                materialsRef.current &&

                !materialsRef.current.contains(e.target)

            ) {

                setShowMaterials(false);

            }

        }

        window.addEventListener("pointerdown", handleClick, true);

        return () => {

            window.removeEventListener("pointerdown", handleClick, true);

        };

    }, [showMaterials]);


    return (
        <div className="study-workspace">

            <WorkspaceHeader
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                session={activeSession}
                materialsCount={activeMaterials.length}
            />

            <div className="workspace-body">

                <Sidebar
                    activeView={activeView}
                    setActiveView={setActiveView}
                    collapsed={sidebarCollapsed}
                    showMaterials={showMaterials}
                    setShowMaterials={setShowMaterials}
                />

                <main className="workspace-content">

                    <div
                        className={`workspace-scroll ${activeView === "welcome"
                            ? "welcome-scroll"
                            : ""
                            }`}
                    >

                        {activeView === "welcome" && (
                            <WelcomeView
                                setActiveView={setActiveView}
                                materials={activeMaterials}
                                onMaterialRename={handleMaterialRename}
                                onMaterialDelete={handleMaterialDelete}
                            />
                        )}

                        {activeView === "chat" && <ChatView />}

                        {activeView === "summary" && <SummaryView />}

                        {activeView === "flashcards" && (
                            <FlashcardsView
                                setActiveView={setActiveView}
                            />
                        )}

                        {activeView === "quiz" && <QuizView />}

                        {activeView === "mindmap" && <MindMapView />}

                    </div>

                    {showMaterials && (

                        <MaterialsView
                            ref={materialsRef}

                            open={showMaterials}
                            materials={activeMaterials}
                            onMaterialRename={handleMaterialRename}
                            onMaterialDelete={handleMaterialDelete}
                        />

                    )}

                    {showChatBar && (

                        <div className="workspace-chat">

                            <ChatInput
                                setActiveView={setActiveView}
                            />

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default StudyWorkspace;
