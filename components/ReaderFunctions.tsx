import React, { ChangeEvent } from 'react';

interface ReaderFunctionsProps {
    handlePdfUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
}

const ReaderFunctions: React.FC<ReaderFunctionsProps> = ({
    handlePdfUpload,
    error,
}) => {
    return (
        <div className="upload-container">
            <label className="upload-label">
                Upload PDF
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                />
            </label>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ReaderFunctions;
