import { UploadCloud } from "lucide-react";

function UploadCard() {
    return (
        <div className="upload-card">

            <h2>Study Materials</h2>

            <p className="upload-subtitle">
                Upload new PDFs to begin your study session.
            </p>

            <div className="upload-box">

                <UploadCloud
                    size={70}
                    strokeWidth={1.7}
                    className="upload-icon"
                />

                <h3>Drag & Drop PDF files here</h3>

                <span>or</span>

                <button className="browse-btn">
                    Browse Files
                </button>

                <small>
                    Only PDF files are supported
                </small>

            </div>

        </div>
    );
}

export default UploadCard;