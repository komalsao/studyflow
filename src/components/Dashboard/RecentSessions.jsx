import "./RecentSessions.css";

import {
  ArrowRight,
  Code2,
  Database,
  FolderOpen,
  Monitor,
  Network
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const sessionColors = [
  "#2E8B57",
  "#F59E0B",
  "#8B5CF6",
  "#3B82F6"
];

const iconMap = {
  monitor: Monitor,
  database: Database,
  network: Network,
  code: Code2
};

function RecentSessions({ sessions }) {

  const navigate = useNavigate();

  return (

    <div className="recent-card">

      <h2>Recent Sessions</h2>

      {sessions.length > 0 ? (

        <>

          <div className="recent-sessions-list">

            {sessions.map((session, index) => {

              const Icon = iconMap[session.icon] || Monitor;

              const color =
                session.color ||
                sessionColors[index % sessionColors.length];

              return (

                <button
                  key={session.id}
                  type="button"
                  className="recent-session-row"
                  onClick={() =>
                    navigate(`/study-workspace/${session.id}`)
                  }
                >

                  <div className="recent-session-left">

                    <div
                      className="recent-session-icon"
                      style={{
                        background: `${color}20`,
                        color
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span className="recent-session-title">
                      {session.title}
                    </span>

                  </div>

                  <div className="recent-session-arrow">

                    <ArrowRight size={18} />

                  </div>

                </button>

              );

            })}

          </div>

          <div className="recent-card-footer">

            <button
              type="button"
              className="view-all-sessions"
              onClick={() => navigate("/study-sessions")}
            >
              View all sessions →
            </button>

          </div>

        </>

      ) : (

        <>

          <p>
            Start a study session to see it here.
          </p>

          <div className="empty-state">
            <FolderOpen size={56} strokeWidth={1.6} />
          </div>

        </>

      )}

    </div>

  );

}

export default RecentSessions;