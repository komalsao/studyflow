import "./CreateSession.css";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/CreateSession/PageHeader/PageHeader";
import UploadSection from "../../components/CreateSession/UploadSection/UploadSection";
import SessionDetails from "../../components/CreateSession/SessionDetails/SessionDetails";

import auth from "../../firebase/auth";
import {
    createSession,
    attachMaterialToSession,
} from "../../services/sessionService";
import {
    getUserMaterials,
    uploadMaterial
} from "../../services/materialService";


function CreateSession() {

    const [title, setTitle] = useState("");

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [materials, setMaterials] = useState([]);

    const [selectedMaterialIds, setSelectedMaterialIds] = useState([]);

    const [isCreating, setIsCreating] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        let isActive = true;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {

                if (isActive) {

                    setMaterials([]);

                    setSelectedMaterialIds([]);

                }

                return;

            }

            try {

                const userMaterials = await getUserMaterials(user.uid);

                if (isActive) {

                    setMaterials(userMaterials);

                }

            } catch (error) {

                console.error("Unable to load user materials:", error);

            }

        });

        return () => {

            isActive = false;

            unsubscribe();

        };

    }, []);

    const handleMaterialToggle = (materialId) => {

        setSelectedMaterialIds((currentMaterialIds) =>
            currentMaterialIds.includes(materialId)
                ? currentMaterialIds.filter((id) => id !== materialId)
                : [...currentMaterialIds, materialId]
        );

    };

    const handleCreateSession = async () => {

        if (isCreating) {
            return;
        }

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            console.error("A session title is required.");
            return;
        }

        const user = auth.currentUser;

        if (!user) {
            console.error("A user must be logged in.");
            return;
        }

        setIsCreating(true);

        try {

            const session = await createSession(user.uid, {
                title: trimmedTitle,
            });

            const materials = await Promise.all(
                selectedFiles.map((file) => uploadMaterial(user.uid, file))
            );

            await Promise.all(
                materials.map((material) =>
                    attachMaterialToSession(session.id, material.id)
                )
            );

            navigate("/study-sessions");

        } catch (error) {

            console.error(error);

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
                    materials={materials}
                    selectedMaterialIds={selectedMaterialIds}
                    onMaterialToggle={handleMaterialToggle}
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
