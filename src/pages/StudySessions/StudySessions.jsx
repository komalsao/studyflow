import "./StudySessions.css";

import { useEffect, useState } from "react";

import AppHeader from "../../components/Shared/AppHeader/AppHeader";

import SearchBar from "../../components/StudySessions/SearchBar/SearchBar";
import SessionsList from "../../components/StudySessions/SessionsList/SessionsList";
import MaterialsLibrary from "../../components/StudySessions/MaterialsLibrary/MaterialsLibrary";
import { getSessionMaterials } from "../../services/sessionService";

function StudySessions() {

    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    useEffect(() => {

        let isActive = true;

        if (!selectedSessionId) {
            return undefined;

        }

        getSessionMaterials(selectedSessionId)
            .then((materials) => {

                if (isActive) {

                    setSelectedMaterials(materials);

                }

            })
            .catch((error) => {

                console.error("Unable to load session materials:", error);

            });

        return () => {

            isActive = false;

        };

    }, [selectedSessionId]);

    const handleSessionSelect = (sessionId) => {

        setSelectedSessionId(sessionId);
        setSelectedMaterials([]);

    };

    const handleSessionDelete = (sessionId) => {

        if (sessionId === selectedSessionId) {

            setSelectedSessionId(null);
            setSelectedMaterials([]);

        }

    };

    return (
        <div className="study-sessions-page">

            <AppHeader />

            <main className="study-sessions-content">

                <div className="study-sessions-header">

                    <h1>Study Sessions</h1>

                    <p>
                        Continue where you left off.
                    </p>

                </div>

                <SearchBar />

                <div className="study-sessions-layout">

                    <SessionsList
                        selectedSessionId={selectedSessionId}
                        selectedMaterials={selectedMaterials}
                        onSessionSelect={handleSessionSelect}
                        onSessionDelete={handleSessionDelete}
                    />

                    <MaterialsLibrary />

                </div>

            </main>

        </div>
    );
}

export default StudySessions;
