import "./MaterialsPreview.css";

import { useState, useEffect } from "react";

import {
    Upload,
    SquarePen,
    Trash2,
    FileText,
    FileSpreadsheet,
    FileCode2,
    Presentation
} from "lucide-react";

import RenameModal from "../../Shared/Modals/RenameModal/RenameModal";
import DeleteModal from "../../Shared/Modals/DeleteModal/DeleteModal";

const initialMaterials = [
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

function MaterialsPreview({

    popup = false

}) {

    const [materials, setMaterials] = useState(initialMaterials);

    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [showRenameModal, setShowRenameModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editingMaterial, setEditingMaterial] = useState(null);

    const [newName, setNewName] = useState("");

    useEffect(() => {

        function handleClick() {

            setSelectedMaterial(null);

        }

        document.addEventListener("click", handleClick);

        return () => {

            document.removeEventListener("click", handleClick);

        };

    }, []);

    function openRename(material) {

        setEditingMaterial(material);

        const dotIndex = material.name.lastIndexOf(".");

        setNewName(material.name.substring(0, dotIndex));

        setShowRenameModal(true);

    }

    function openDelete(material) {

        setEditingMaterial(material);

        setShowDeleteModal(true);

    }

    function handleRename() {

        const extension =
            editingMaterial.name.substring(
                editingMaterial.name.lastIndexOf(".")
            );

        setMaterials(prev =>
            prev.map(material =>
                material.id === editingMaterial.id
                    ? {
                        ...material,
                        name: newName + extension
                    }
                    : material
            )
        );

        setShowRenameModal(false);

    }

    function handleDelete() {

        setMaterials(prev =>
            prev.filter(material => material.id !== editingMaterial.id)
        );

        setShowDeleteModal(false);

        setSelectedMaterial(null);

    }

    return (

        <>       <aside
            className={`materials-preview ${popup ? "popup" : ""
                }`}
        >

            <div className="materials-header">

                <h2>Materials</h2>

                <p className="materials-subtitle">
                    Available in this study session
                </p>

            </div>

            <div className="materials-list">

                {materials.map((material) => {

                    const Icon = iconMap[material.type];

                    return (

                        <div
                            key={material.id}
                            className={`material-item ${selectedMaterial === material.id
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
                        >

                            <div className="material-left">

                                <div className={`material-icon ${material.type}`}>

                                    <Icon size={18} />

                                </div>

                                <div className="material-info">

                                    <span>
                                        {material.name.substring(0, material.name.lastIndexOf("."))}
                                    </span>

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

                                            console.log("Rename clicked");

                                            openRename(material);

                                        }}
                                    >
                                        <SquarePen size={16} />
                                    </button>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            console.log("Delete clicked");

                                            openDelete(material);

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

            <RenameModal

                isOpen={showRenameModal}

                title="Rename Material"

                value={newName}

                setValue={setNewName}

                onClose={() => setShowRenameModal(false)}

                onSave={handleRename}

            />

            <DeleteModal

                isOpen={showDeleteModal}

                title="Delete Material"

                message={`Are you sure you want to delete "${editingMaterial?.name}"?`}

                onClose={() => setShowDeleteModal(false)}

                onDelete={handleDelete}

            />

        </>

    );

}

export default MaterialsPreview;