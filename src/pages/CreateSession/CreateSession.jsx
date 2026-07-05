import "./CreateSession.css";

import PageHeader from "../../components/CreateSession/PageHeader/PageHeader";
import UploadSection from "../../components/CreateSession/UploadSection/UploadSection";
import SessionDetails from "../../components/CreateSession/SessionDetails/SessionDetails";


function CreateSession() {

    return (

        <div className="create-session-page">

            <button className="page-back-btn">
                ← Back to Dashboard
            </button>

            <div className="workspace-card">

                <PageHeader />

                <UploadSection />

                <SessionDetails />

                <div className="workspace-footer">

                    <button className="create-session-btn">
                        Create Study Session →
                    </button>

                </div>
            </div>

        </div>

    );
}

export default CreateSession;