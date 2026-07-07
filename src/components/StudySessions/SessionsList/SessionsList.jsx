import "./SessionsList.css";

import SessionCard from "../SessionCard/SessionCard";

import { studySessions } from "../../../data/studySessions";

function SessionsList() {

    return (

        <div className="sessions-list">

            {studySessions.map((session) => (

                <SessionCard

                    key={session.id}

                    session={session}

                />

            ))}

        </div>

    );

}

export default SessionsList;