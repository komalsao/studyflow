import "./CreateSession.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/CreateSession/PageHeader/PageHeader";
import UploadSection from "../../components/CreateSession/UploadSection/UploadSection";
import SessionDetails from "../../components/CreateSession/SessionDetails/SessionDetails";

import auth from "../../firebase/auth";
import {
    createSession,
    attachMaterialToSession,
} from "../../services/sessionService";
import { uploadMaterial } from "../../services/materialService";


function CreateSession() {

    const [title, setTitle] = useState("");

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [isCreating, setIsCreating] = useState(false);

    const navigate = useNavigate();

    const handleCreateSession = async () => {

        if (isCreating) return;

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {

            console.error("A session title is required.");

            return;

        }

        const user = auth.currentUser;

        if (!user) {

            console.error("A user must be logged in to create a session.");

            return;

        }

        setIsCreating(true);

        try {

            const sessionId = await createSession(user.uid, {
                title: trimmedTitle,
            });

            const materials = await Promise.all(
                selectedFiles.map((file) => uploadMaterial(user.uid, file))
            );

            await Promise.all(
                materials.map((material) =>
                    attachMaterialToSession(sessionId, material.id)
                )
            );

            navigate("/study-sessions");

        } catch (error) {

            console.error("Unable to create study session:", error);

        } finally {

            setIsCreating(false);

        }

    };

    return (

        <div className="create-session-page">

            <button className="page-back-btn">
                ← Back to Dashboard
            </button>

            <div className="workspace-card">

                <PageHeader />

                <UploadSection
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />

                <SessionDetails
                    title={title}
                    onTitleChange={setTitle}
                />

                <div className="workspace-footer">

                    <button
                        className="create-session-btn"
                        onClick={handleCreateSession}
                        disabled={isCreating}
                    >
                        Create Study Session →
                    </button>

                </div>
            </div>

        </div>

    );
}

export default CreateSession;
