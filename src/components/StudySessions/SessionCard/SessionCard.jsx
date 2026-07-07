import "./SessionCard.css";

import { useState } from "react";

import {
    ArrowRight,
    Monitor,
    Database,
    Network,
    Code2
} from "lucide-react";

const iconMap = {
    monitor: Monitor,
    database: Database,
    network: Network,
    code: Code2
};

function SessionCard({ session }) {

    const [expanded, setExpanded] = useState(false);

    const Icon = iconMap[session.icon];

    return (

        <div
            className={`session-card ${expanded ? "expanded" : ""}`}
            onClick={() => setExpanded(!expanded)}
        >

            <div className="session-top">

                <div className="session-left">

                    <div
                        className="session-icon"
                        style={{ background: `${session.color}20` }}
                    >
                        <Icon
                            size={22}
                            color={session.color}
                        />
                    </div>

                    <div>

                        <h3>{session.title}</h3>

                        <p>Last opened {session.lastOpened}</p>

                    </div>

                </div>

                <div className="session-right">

                    <span
                        style={{ color: session.color }}
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

                </div>

            )}

        </div>

    );

}

export default SessionCard;