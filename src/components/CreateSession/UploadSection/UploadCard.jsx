import { UploadCloud } from "lucide-react";
import { useRef } from "react";

function UploadCard({ selectedFiles, setSelectedFiles, onFilesSelected }) {

    const fileInputRef = useRef(null);

    return (
        <div className="upload-card">

            <h2>Study Materials</h2>

            <p className="upload-subtitle">
                Upload your PDFs, DOCX or TXT files to begin your study session.
            </p>

            <div className="upload-box">

                <UploadCloud
                    size={70}
                    strokeWidth={1.7}
                    className="upload-icon"
                />

                <h3>Drag & Drop your study files here</h3>

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
                    accept=".pdf,.docx,.txt"
                    multiple
                    hidden
                    onChange={(event) => {

                        const files = Array.from(event.target.files || []);

                        const fileKeys = new Set(
                            selectedFiles.map(
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

                        if (newFiles.length) {

                            setSelectedFiles((currentFiles) => [
                                ...currentFiles,
                                ...newFiles,
                            ]);

                            onFilesSelected(newFiles);

                        }

                    }}
                />

                <small>
                    Supported formats: PDF, DOCX and TXT
                </small>

                <small>
                    For the best learning experience, upload one lesson or chapter per session.
                </small>

            </div>

        </div>
    );
}

export default UploadCard;
