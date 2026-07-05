import { FileText, Square } from "lucide-react";

function SelectedMaterials() {
    return (
        <div className="selected-materials">

            <h2>Selected Materials</h2>

            <p className="materials-subtitle">
                Choose from your uploaded study materials.
            </p>

            <div className="material-list">

                <div className="material-item">

                    <div className="material-left">

                        <FileText
                            size={22}
                            className="pdf-icon"
                        />

                        <span>Operating Systems Unit 1.pdf</span>

                    </div>

                    <Square size={20} />

                </div>


                <div className="material-item">

                    <div className="material-left">

                        <FileText
                            size={22}
                            className="pdf-icon"
                        />

                        <span>Operating Systems Unit 2.pdf</span>

                    </div>

                    <Square size={20} />

                </div>


                <div className="material-item">

                    <div className="material-left">

                        <FileText
                            size={22}
                            className="pdf-icon"
                        />

                        <span>DBMS Chapter 4.pdf</span>

                    </div>

                    <Square size={20} />

                </div>


                <div className="material-item">

                    <div className="material-left">

                        <FileText
                            size={22}
                            className="pdf-icon"
                        />

                        <span>TOC Notes.pdf</span>

                    </div>

                    <Square size={20} />

                </div>

            </div>

            <button className="view-materials-btn">
                View all materials →
            </button>

        </div>
    );
}

export default SelectedMaterials;