import "./SessionsList.css";

import { useEffect, useState } from "react";

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
        progress: typeof session.progress === "number" ? session.progress : 0,
        lastOpened: formatLastOpened(session.lastOpened),
        materials: Array.isArray(session.materials) ? session.materials : [],
    };

}

function SessionsList() {

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadSessions = async () => {

            const user = auth.currentUser;

            if (!user) {

                setLoading(false);

                return;

            }

            try {

                const userSessions = await getUserSessions(user.uid);

                setSessions(userSessions.map(formatSession));

            } catch (error) {

                console.error("Unable to load study sessions:", error);

            } finally {

                setLoading(false);

            }

        };

        loadSessions();

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

    };

    return (

        <div className="sessions-list">

            {loading ? (

                <p>Loading sessions...</p>

            ) : sessions.map((session) => (

                <SessionCard

                    key={session.id}

                    session={session}

                    onRename={handleSessionRename}

                    onDelete={handleSessionDelete}

                />

            ))}

        </div>

    );

}

export default SessionsList;
