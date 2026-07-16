import "./SessionCard.css";

import { useState } from "react";

import {
    ArrowRight,
    Monitor,
    Database,
    Network,
    Code2,
    SquarePen,
    Trash2
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

function SessionCard({ session, onRename, onDelete }) {

    const [expanded, setExpanded] = useState(false);

    const [showRenameModal, setShowRenameModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [newName, setNewName] = useState(session.title);

    const Icon = iconMap[session.icon];

    return (

        <>

            <div
                className={`session-card ${expanded ? "expanded" : ""}`}
                onClick={() => setExpanded(!expanded)}
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

                                console.log("Open Workspace");

                            }}
                        >

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </div>

                {expanded && (

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

                            {session.materials.map((file) => (

                                <div
                                    key={file}
                                    className="material-chip"
                                >

                                    {file}

                                </div>

                            ))}

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