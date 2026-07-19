import "./WorkspaceHeader.css";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { PencilLine } from "lucide-react";
import RenameModal from "../../Shared/Modals/RenameModal/RenameModal";
import { renameSession } from "../../../services/sessionService";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WorkspaceHeader({
    sidebarCollapsed,
    setSidebarCollapsed,
    session,
    materialsCount,
    onRename,
}) {

    const navigate = useNavigate();

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [newName, setNewName] = useState("");

    const handleOpenRenameModal = () => {

        setNewName(session?.title || "");
        setShowRenameModal(true);

    };

    const handleRename = async () => {

        const trimmedName = newName.trim();

        if (!trimmedName || !session) return;

        if (trimmedName === session.title) {

            setShowRenameModal(false);

            return;

        }

        try {

            await renameSession(session.id, trimmedName);

            onRename(session.id, trimmedName);

            setShowRenameModal(false);

        } catch (error) {

            console.error("Unable to rename session:", error);

        }

    };

    return (
        <>

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

                    <button
                        className="workspace-home-btn"
                        onClick={() => navigate("/dashboard")}
                    >

                        <House size={18} />

                    </button>

                </div>

                <div className="workspace-session">

                    <div className="workspace-title">

                        <h1>{session?.title || "Study Session"}</h1>

                        <button
                            className="edit-title-btn"
                            onClick={handleOpenRenameModal}
                        >

                            <PencilLine size={16} />

                        </button>

                    </div>

                    <p>
                        {materialsCount} Materials
                    </p>

                </div>

            </header>

            <RenameModal
                isOpen={showRenameModal}
                title="Rename Study Session"
                value={newName}
                setValue={setNewName}
                onClose={() => setShowRenameModal(false)}
                onSave={handleRename}
            />

        </>
    );
}

export default WorkspaceHeader;
