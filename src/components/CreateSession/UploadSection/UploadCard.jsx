import { UploadCloud } from "lucide-react";
import { useRef } from "react";

function UploadCard({ selectedFiles, setSelectedFiles }) {

    const fileInputRef = useRef(null);

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

                <button
                    className="browse-btn"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Browse Files
                </button>

                <input
                    key={selectedFiles.length}
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    hidden
                    onChange={(event) => {

                        const files = Array.from(event.target.files || []);

                        setSelectedFiles((currentFiles) => {

                            const fileKeys = new Set(
                                currentFiles.map(
                                    (file) => `${file.name}\u0000${file.size}`
                                )
                            );

                            const newFiles = files.filter((file) => {

                                const fileKey = `${file.name}\u0000${file.size}`;

                                if (fileKeys.has(fileKey)) {

                                    return false;

                                }

                                fileKeys.add(fileKey);

                                return true;

                            });

                            return [...currentFiles, ...newFiles];

                        });

                    }}
                />

                <small>
                    Only PDF files are supported
                </small>

            </div>

        </div>
    );
}

export default UploadCard;
