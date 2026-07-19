import { FileText, Square, CheckSquare } from "lucide-react";

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

                {materials.map((material) => {

                    const isSelected = selectedMaterialIds.includes(material.id);

                    return (

                        <div
                            key={material.id}
                            className={`material-item ${
                                isSelected ? "selected" : ""
                            }`}
                            onClick={() => onMaterialToggle(material.id)}
                        >

                            <div className="material-left">

                                <FileText
                                    size={22}
                                    className="pdf-icon"
                                />

                                <span>{material.originalFileName}</span>

                            </div>

                            {isSelected ? (

                                <CheckSquare
                                    size={20}
                                    color="#2E8B57"
                                />

                            ) : (

                                <Square size={20} />

                            )}

                        </div>

                    );

                })}

            </div>

            <button className="view-materials-btn">
                View all materials →
            </button>

        </div>

    );

}

export default SelectedMaterials;