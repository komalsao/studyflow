import "./DeleteModal.css";

import { TriangleAlert, X } from "lucide-react";

function DeleteModal({
    isOpen,
    title,
    message,
    onClose,
    onDelete
}) {

    if (!isOpen) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <button
                    className="delete-close"
                    onClick={onClose}
                >

                    <X size={18} />

                </button>

                <div className="delete-icon">

                    <TriangleAlert size={34} />

                </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="delete-actions">

                    <button
                        className="delete-cancel"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        className="delete-btn"
                        onClick={onDelete}
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;