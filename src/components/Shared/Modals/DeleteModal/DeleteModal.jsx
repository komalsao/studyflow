import "./DeleteModal.css";

import { TriangleAlert, X } from "lucide-react";
import { useEffect } from "react";

function DeleteModal({
    isOpen,
    title,
    message,
    onClose,
    onDelete,
    loading = false
}) {

    useEffect(() => {

        if (!isOpen || loading) return;

        function handleKeyDown(e) {

            if (e.key === "Enter") {

                onDelete();

            }

            if (e.key === "Escape") {

                onClose();

            }

        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };

    }, [isOpen, loading, onDelete, onClose]);

    if (!isOpen) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <button
                    className="delete-close"
                    onClick={onClose}
                    disabled={loading}
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
                        disabled={loading}
                    >

                        Cancel

                    </button>

                    <button
                        className="delete-btn"
                        onClick={onDelete}
                        disabled={loading}
                    >

                        {loading
                            ? "Deleting..."
                            : "Delete"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;