import "./MaterialsLibrary.css";

import { FileText, Upload } from "lucide-react";

const materials = [
    "Operating Systems.pdf",
    "CPU Scheduling.pdf",
    "Memory Management.pdf",
    "DBMS Notes.pdf",
    "Computer Networks.pdf",
    "OOP Cheatsheet.pdf"
];

function MaterialsLibrary() {

    return (

        <aside className="materials-library">

            <div className="materials-header">

                <h2>Materials Library</h2>

                <p>
                    All your uploaded study materials.
                </p>

            </div>

            <div className="materials-list">

                {materials.map((file) => (

                    <div
                        key={file}
                        className="material-item"
                    >

                        <div className="material-icon">

                            <FileText size={18}/>

                        </div>

                        <span>{file}</span>

                    </div>

                ))}

            </div>

            <button className="upload-material-btn">

                <Upload size={18}/>

                Upload Material

            </button>

        </aside>

    );

}

export default MaterialsLibrary;