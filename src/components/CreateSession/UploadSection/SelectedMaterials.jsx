import { FileText, Square } from "lucide-react";

function SelectedMaterials({
    materials,
    selectedMaterialIds,
    onMaterialToggle
}) {
    return (
        <div className="selected-materials">

            <h2>Selected Materials</h2>

            <p className="materials-subtitle">
                Choose from your uploaded study materials.
            </p>

            <div className="material-list">

                {materials.map((material) => (

                    <div
                        key={material.id}
                        className="material-item"
                        onClick={() => onMaterialToggle(material.id)}
                    >

                        <div className="material-left">

                            <FileText
                                size={22}
                                className="pdf-icon"
                            />

                            <span>{material.originalFileName}</span>

                        </div>

                        <Square
                            size={20}
                            aria-checked={selectedMaterialIds.includes(material.id)}
                        />

                    </div>

                ))}

            </div>

            <button className="view-materials-btn">
                View all materials →
            </button>

        </div>
    );
}

export default SelectedMaterials;
