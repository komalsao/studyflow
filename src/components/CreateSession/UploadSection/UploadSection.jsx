import "./UploadSection.css";

import UploadCard from "./UploadCard";
import SelectedMaterials from "./SelectedMaterials";

function UploadSection() {
    return (

        <section className="upload-wrapper">

            <div className="upload-section">

                <UploadCard />

                <SelectedMaterials />

            </div>

        </section>

    );
}

export default UploadSection;