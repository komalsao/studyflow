import "./UploadSection.css";

import UploadCard from "./UploadCard";
import SelectedMaterials from "./SelectedMaterials";

function UploadSection({ selectedFiles, setSelectedFiles }) {
    return (

        <section className="upload-wrapper">

            <div className="upload-section">

                <UploadCard
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />

                <SelectedMaterials />

            </div>

        </section>

    );
}

export default UploadSection;
