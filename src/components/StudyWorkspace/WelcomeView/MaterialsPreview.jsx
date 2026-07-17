import "./MaterialsPreview.css";

import { useState, useEffect, useMemo } from "react";

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

import {
    deleteMaterial,
    renameMaterial
} from "../../../services/materialService";

const iconMap = {
    pdf: FileText,
    docx: FileSpreadsheet,
    pptx: Presentation,
    txt: FileCode2
};

function formatMaterial(material) {

    const name = material.originalFileName;
    const extension = name.split(".").pop().toLowerCase();

    return {
        ...material,
        name,
        type: iconMap[extension] ? extension : "pdf"
    };

}

function getFileNameWithoutExtension(name) {

    const dotIndex = name.lastIndexOf(".");

    return dotIndex > 0 ? name.substring(0, dotIndex) : name;

}

function getFileExtension(name) {

    const dotIndex = name.lastIndexOf(".");

    return dotIndex > 0 ? name.substring(dotIndex) : "";

}

function MaterialsPreview({

    popup = false,
    materials = [],
    onMaterialRename,
    onMaterialDelete

}) {

    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [showRenameModal, setShowRenameModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editingMaterial, setEditingMaterial] = useState(null);

    const [newName, setNewName] = useState("");

    const formattedMaterials = useMemo(
        () => materials.map(formatMaterial),
        [materials]
    );

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

        setNewName(getFileNameWithoutExtension(material.name));

        setShowRenameModal(true);

    }

    function openDelete(material) {

        setEditingMaterial(material);

        setShowDeleteModal(true);

    }

    async function handleRename() {

        const extension = getFileExtension(editingMaterial.name);

        const updatedName = newName + extension;

        try {

            await renameMaterial(editingMaterial.id, updatedName);

            onMaterialRename(editingMaterial.id, updatedName);

            setShowRenameModal(false);

            setEditingMaterial(null);

        } catch (error) {

            console.error("Unable to rename material:", error);

        }

    }

    async function handleDelete() {

        try {

            await deleteMaterial(editingMaterial.id);

            onMaterialDelete(editingMaterial.id);

            setShowDeleteModal(false);

            setSelectedMaterial(null);

            setEditingMaterial(null);

        } catch (error) {

            console.error("Unable to delete material:", error);

        }

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

                {formattedMaterials.map((material) => {

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
                                        {getFileNameWithoutExtension(material.name)}
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

                                            openRename(material);

                                        }}
                                    >
                                        <SquarePen size={16} />
                                    </button>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

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
