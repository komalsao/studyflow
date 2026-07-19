import "./UploadCard.css";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";

function UploadCard({
    selectedFiles,
    setSelectedFiles,
    onFilesSelected,
    isGenerating
}) {

    const fileInputRef = useRef(null);

    return (

        <div className="upload-card">

            <h2>Study Materials</h2>

            <p className="upload-subtitle">
                Upload your PDFs, DOCX or TXT files to begin your study session.
            </p>

            <div className="upload-box">

                {isGenerating ? (

                    <>

                        <div className="upload-spinner"></div>

                        <h3>Preparing your study session...</h3>

                        <span>
                            Lumi is uploading your material and generating your study resources.
                        </span>

                        <small className="upload-loading-note">
                            This usually takes less than a minute.
                        </small>

                    </>

                ) : (

                    <>

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

                        <small>
                            Supported formats: PDF, DOCX and TXT
                        </small>

                        <small>
                            For the best learning experience, upload one lesson or chapter per session.
                        </small>

                    </>

                )}

                <input
                    key={selectedFiles.length}
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    multiple
                    hidden
                    disabled={isGenerating}
                    onChange={(event) => {

                        if (isGenerating) return;

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

            </div>

        </div>

    );

}

export default UploadCard;