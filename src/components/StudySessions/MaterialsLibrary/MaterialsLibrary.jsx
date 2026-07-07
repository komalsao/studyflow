import "./MaterialsLibrary.css";

import { useState, useEffect } from "react";

import {
    Search,
    Upload,
    SquarePen,
    Trash2,
    FileText,
    FileSpreadsheet,
    FileCode2,
    Presentation
} from "lucide-react";

const materials = [
    {
        id: 1,
        name: "Operating Systems.pdf",
        type: "pdf"
    },
    {
        id: 2,
        name: "Assignment.docx",
        type: "docx"
    },
    {
        id: 3,
        name: "Lecture 5.pptx",
        type: "pptx"
    },
    {
        id: 4,
        name: "Commands.txt",
        type: "txt"
    },
    {
        id: 5,
        name: "Memory Management.pdf",
        type: "pdf"
    },
    {
        id: 6,
        name: "Unit 4 Notes.docx",
        type: "docx"
    },
    {
        id: 7,
        name: "OSI Model.pptx",
        type: "pptx"
    }
];

const iconMap = {
    pdf: FileText,
    docx: FileSpreadsheet,
    pptx: Presentation,
    txt: FileCode2
};

function MaterialsLibrary() {

    const [selectedMaterial, setSelectedMaterial] = useState(null);

    useEffect(() => {

        function handleClick() {

            setSelectedMaterial(null);

        }

        document.addEventListener("click", handleClick);

        return () => {

            document.removeEventListener("click", handleClick);

        };

    }, []);

    return (

        <aside className="materials-library">

            <div className="materials-header">

                <h2>Materials Library</h2>

                <div className="materials-stats">

                    <span>18 Materials</span>

                    <div className="file-badges">

                        <div className="file-badge pdf">
                            PDF&nbsp;4
                        </div>

                        <div className="file-badge docx">
                            DOCX&nbsp;8
                        </div>

                        <div className="file-badge ppt">
                            PPT&nbsp;3
                        </div>

                        <div className="file-badge txt">
                            TXT&nbsp;3
                        </div>

                    </div>

                </div>

            </div>

            <div className="materials-search">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search materials..."
                />

            </div>

            <div className="materials-list">

                {materials.map((material) => {

                    const Icon = iconMap[material.type];

                    return (

                        <div
                            key={material.id}
                            className={`material-item ${
                                selectedMaterial === material.id
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={(e) => {

                                e.stopPropagation();

                                setSelectedMaterial(

                                    selectedMaterial === material.id
                                        ? null
                                        : material.id

                                );

                            }}
                            onDoubleClick={(e) => {

                                e.stopPropagation();

                                console.log("Open:", material.name);

                            }}
                        >

                            <div className="material-left">

                                <div className={`material-icon ${material.type}`}>

                                    <Icon size={18} />

                                </div>

                                <div className="material-info">

                                    <span>{material.name}</span>

                                    <small>
                                        {material.type.toUpperCase()}
                                    </small>

                                </div>

                            </div>

                            {selectedMaterial === material.id && (

                                <div className="material-actions">

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            console.log("Rename:", material.name);

                                        }}
                                    >

                                        <SquarePen size={16} />

                                    </button>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            console.log("Delete:", material.name);

                                        }}
                                    >

                                        <Trash2 size={16} />

                                    </button>

                                </div>

                            )}

                        </div>

                    );

                })}

            </div>

            <button
                className="upload-material-btn"
                onClick={() => setSelectedMaterial(null)}
            >

                <Upload size={18} />

                Upload Material

            </button>

        </aside>

    );

}

export default MaterialsLibrary;