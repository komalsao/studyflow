import "./RenameModal.css";

import { X } from "lucide-react";

function RenameModal({
    isOpen,
    title = "Rename Material",
    value,
    setValue,
    onClose,
    onSave
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
                    >

                        <X size={18} />

                    </button>

                </div>

                <input
                    className="rename-input"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                />

                <div className="rename-actions">

                    <button
                        className="rename-cancel"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        className="rename-save"
                        onClick={onSave}
                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

}

export default RenameModal;