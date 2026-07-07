import "./MaterialsPreview.css";
import { FileText, Plus } from "lucide-react";

function MaterialsPreview() {

    const materials = [
        "Operating Systems Unit 1.pdf",
        "Processes.pdf",
        "CPU Scheduling.pdf",
    ];

    return (

        <aside className="materials-card">

            <div className="materials-header">

                <h3>Materials</h3>

                <button className="upload-btn">

                    <Plus size={18} />

                    Upload PDF

                </button>

            </div>

            <div className="materials-list">

                {materials.map((file, index) => (

                    <div
                        className="material-item"
                        key={index}
                    >

                        <div className="material-left">

                            <div className="file-icon">

                                <FileText size={20} />

                            </div>

                            <span>{file}</span>

                        </div>

                    </div>

                ))}

            </div>

            <div className="materials-footer">

                <span>3 PDFs</span>

                <span className="dot"></span>

                <span>Ready to study</span>

            </div>

        </aside>

    );

}

export default MaterialsPreview;