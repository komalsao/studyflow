import "./UploadSection.css";

import UploadCard from "./UploadCard";
import SelectedMaterials from "./SelectedMaterials";

function UploadSection({
    selectedFiles,
    setSelectedFiles,
    materials,
    selectedMaterialIds,
    onMaterialToggle
}) {
    return (

        <section className="upload-wrapper">

            <div className="upload-section">

                <UploadCard
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />

                <SelectedMaterials
                    materials={materials}
                    selectedMaterialIds={selectedMaterialIds}
                    onMaterialToggle={onMaterialToggle}
                />

            </div>

        </section>

    );
}

export default UploadSection;
