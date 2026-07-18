import "./UploadSection.css";

import UploadCard from "./UploadCard";
import SelectedMaterials from "./SelectedMaterials";

function UploadSection({
    selectedFiles,
    setSelectedFiles,
    materials,
    selectedMaterialIds,
    onMaterialToggle,
    onFilesSelected
}) {
    return (

        <section className="upload-wrapper">

            <div className="upload-section">

                <UploadCard
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    onFilesSelected={onFilesSelected}
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
