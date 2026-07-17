import "./SessionCard.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    Monitor,
    Database,
    Network,
    Code2,
    SquarePen,
    Trash2,
    FileText
} from "lucide-react";

import RenameModal from "../../Shared/Modals/RenameModal/RenameModal";
import DeleteModal from "../../Shared/Modals/DeleteModal/DeleteModal";

import {
    deleteSession,
    renameSession
} from "../../../services/sessionService";

const iconMap = {
    monitor: Monitor,
    database: Database,
    network: Network,
    code: Code2
};

function SessionCard({
    session,
    materials,
    isSelected,
    onSelect,
    onRename,
    onDelete
}) {

    const navigate = useNavigate();

    const [showRenameModal, setShowRenameModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [newName, setNewName] = useState(session.title);

    const Icon = iconMap[session.icon];

    return (

        <>

            <div
                className={`session-card ${isSelected ? "expanded" : ""}`}
                onClick={onSelect}
            >

                <div className="session-top">

                    <div className="session-left">

                        <div
                            className="session-icon"
                            style={{
                                background: `${session.color}20`
                            }}
                        >

                            <Icon
                                size={22}
                                color={session.color}
                            />

                        </div>

                        <div>

                            <h3>{session.title}</h3>

                            <p>
                                Last opened {session.lastOpened}
                            </p>

                        </div>

                    </div>

                    <div className="session-right">

                        <span
                            style={{
                                color: session.color
                            }}
                        >

                            {session.progress}%

                        </span>

                        <button
                            className="open-session"
                            onClick={(e) => {

                                e.stopPropagation();

                                navigate(`/study-workspace/${session.id}`);

                            }}
                        >

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </div>

                {isSelected && (

                    <div className="session-details">

                        <div className="progress-section">

                            <span>Progress</span>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${session.progress}%`,
                                        background: session.color
                                    }}
                                />

                            </div>

                        </div>

                        <div className="materials-section">

                            <h4>Materials</h4>

                            {materials.length > 0 ? materials.map((material) => (

                                <div
                                    key={material.id}
                                    className="material-chip"
                                >

                                    <FileText size={16} />

                                    {material.originalFileName}

                                </div>

                            )) : (

                                <div className="material-chip">

                                    No materials attached.

                                </div>

                            )}

                        </div>

                        <div className="session-actions">

                            <button
                                className="session-action-btn"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    setNewName(session.title);

                                    setShowRenameModal(true);

                                }}
                            >

                                <SquarePen size={16} />

                                Rename

                            </button>

                            <button
                                className="session-action-btn delete"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    setShowDeleteModal(true);

                                }}
                            >

                                <Trash2 size={16} />

                                Delete

                            </button>

                        </div>

                    </div>

                )}

            </div>

            <RenameModal

                isOpen={showRenameModal}

                title="Rename Study Session"

                value={newName}

                setValue={setNewName}

                onClose={() => setShowRenameModal(false)}

                onSave={async () => {

                    const trimmedName = newName.trim();

                    if (!trimmedName) return;

                    if (trimmedName === session.title) {

                        setShowRenameModal(false);

                        return;

                    }

                    try {

                        await renameSession(
                            session.id,
                            trimmedName
                        );

                        onRename(session.id, trimmedName);

                        setShowRenameModal(false);

                    } catch (error) {

                        console.error(
                            "Unable to rename session:",
                            error
                        );

                    }

                }}

            />

            <DeleteModal

                isOpen={showDeleteModal}

                title="Delete Study Session"

                message={`Are you sure you want to delete "${session.title}"? This action cannot be undone.`}

                onClose={() => setShowDeleteModal(false)}

                onDelete={async () => {

                    if (!session.id) return;

                    try {

                        await deleteSession(session.id);

                        onDelete(session.id);

                        setShowDeleteModal(false);

                    } catch (error) {

                        console.error(
                            "Unable to delete session:",
                            error
                        );

                    }

                }}

            />

        </>

    );

}

export default SessionCard;
