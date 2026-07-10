import "./StudyWorkspace.css";

import { useState } from "react";

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

function StudyWorkspace() {
    const [activeView, setActiveView] = useState("welcome");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const showChatBar =
        activeView === "welcome" ||
        activeView === "chat";

    return (
        <div className="study-workspace">

            <WorkspaceHeader
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />

            <div className="workspace-body">

                <Sidebar
                    activeView={activeView}
                    setActiveView={setActiveView}
                    collapsed={sidebarCollapsed}
                />

                <main className="workspace-content">

                    <div
                        className={`workspace-scroll ${activeView === "welcome"
                            ? "welcome-scroll"
                            : ""
                            }`}
                    >

                        {activeView === "welcome" && (
                            <WelcomeView setActiveView={setActiveView} />
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

                        {activeView === "materials" && <MaterialsView />}

                    </div>

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