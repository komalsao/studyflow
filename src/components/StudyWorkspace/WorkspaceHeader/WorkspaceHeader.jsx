import "./WorkspaceHeader.css";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { PencilLine } from "lucide-react";

function WorkspaceHeader({
    sidebarCollapsed,
    setSidebarCollapsed,
}) {
    return (
        <header className="workspace-header">

            <div className="workspace-brand">

                <h2 className="workspace-logo">
                    StudyFlow
                </h2>

                <button
                    className="collapse-btn"
                    onClick={() =>
                        setSidebarCollapsed(!sidebarCollapsed)
                    }
                >
                    {sidebarCollapsed ? (
                        <PanelLeftOpen size={18} />
                    ) : (
                        <PanelLeftClose size={18} />
                    )}
                </button>

            </div>

            <div className="workspace-session">

                <div className="workspace-title">

                    <h1>Operating Systems</h1>

                    <button className="edit-title-btn">

                        <PencilLine size={16} />

                    </button>

                </div>

                <p>
                    Created July 6 • 3 Materials
                </p>

            </div>

        </header>
    );
}

export default WorkspaceHeader;