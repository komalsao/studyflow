import "./SessionsList.css";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SessionCard from "../SessionCard/SessionCard";

import auth from "../../../firebase/auth";
import { getUserSessions } from "../../../services/sessionService";

const sessionColors = ["#2E8B57", "#F59E0B", "#8B5CF6", "#3B82F6"];

function formatLastOpened(lastOpened) {

    if (lastOpened?.toDate) {

        return lastOpened.toDate().toLocaleDateString();

    }

    return lastOpened || "Not opened yet";

}

function formatSession(session, index) {

    const supportedIcons = ["monitor", "database", "network", "code"];

    return {
        ...session,
        icon: supportedIcons.includes(session.icon) ? session.icon : "monitor",
        color: session.color || sessionColors[index % sessionColors.length],
        lastOpened: formatLastOpened(session.lastOpened),
    };

}

function SessionsList({
    selectedSessionId,
    selectedMaterials,
    onSessionSelect,
    onSessionDelete
}) {

    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isActive = true;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {

                if (isActive) {

                    setSessions([]);

                    setLoading(false);

                }

                return;

            }

            setLoading(true);

            try {

                const userSessions = await getUserSessions(user.uid);

                if (isActive) {

                    setSessions(userSessions.map(formatSession));

                }

            } catch (error) {

                console.error("Unable to load study sessions:", error);

            } finally {

                if (isActive) {

                    setLoading(false);

                }

            }

        });

        return () => {

            isActive = false;

            unsubscribe();

        };
    }, []);

    const handleSessionRename = (sessionId, newTitle) => {

        setSessions((currentSessions) =>
            currentSessions.map((session) =>
                session.id === sessionId
                    ? { ...session, title: newTitle }
                    : session
            )
        );

    };

    const handleSessionDelete = (sessionId) => {

        setSessions((currentSessions) =>
            currentSessions.filter((session) => session.id !== sessionId)
        );

        onSessionDelete(sessionId);

    };

    return (

        <div className="sessions-list">

            <button
                type="button"
                className="session-card create-session-card"
                onClick={() => navigate("/create-session")}
            >

                <Plus size={28} aria-hidden="true" />

                <span>Create New Session</span>

            </button>

            {loading ? (

                <p>Loading sessions...</p>

            ) : sessions.map((session) => (

                <SessionCard

                    key={session.id}

                    session={session}

                    materials={
                        session.id === selectedSessionId
                            ? selectedMaterials
                            : []
                    }

                    isSelected={session.id === selectedSessionId}

                    onSelect={() => onSessionSelect(session.id)}

                    onRename={handleSessionRename}

                    onDelete={handleSessionDelete}

                />

            ))}

        </div>

    );

}

export default SessionsList;
