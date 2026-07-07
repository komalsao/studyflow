import "./StudySessions.css";

import AppHeader from "../../components/Shared/AppHeader/AppHeader";

import SearchBar from "../../components/StudySessions/SearchBar/SearchBar";
import SessionsList from "../../components/StudySessions/SessionsList/SessionsList";
import MaterialsLibrary from "../../components/StudySessions/MaterialsLibrary/MaterialsLibrary";

function StudySessions() {
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

                    <SessionsList />

                    <MaterialsLibrary />

                </div>

            </main>

        </div>
    );
}

export default StudySessions;