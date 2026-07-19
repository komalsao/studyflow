import "./RenameModal.css";

import { X } from "lucide-react";

function RenameModal({
    isOpen,
    title = "Rename Material",
    value,
    setValue,
    onClose,
    onSave,
    loading = false
}) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="rename-modal">

                <div className="rename-header">

                    <h2>{title}</h2>

                    <button
                        className="rename-close"
                        onClick={onClose}
                        disabled={loading}
                    >

                        <X size={18} />

                    </button>

                </div>

                <input
                    className="rename-input"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {

                        if (e.key === "Enter" && !loading) {

                            onSave();

                        }

                    }}
                    autoFocus
                    disabled={loading}
                />

                <div className="rename-actions">

                    <button
                        className="rename-cancel"
                        onClick={onClose}
                        disabled={loading}
                    >

                        Cancel

                    </button>

                    <button
                        className="rename-save"
                        onClick={onSave}
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : "Save"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default RenameModal;