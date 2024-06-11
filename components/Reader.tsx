'use client'

import React, { useState, useRef, ChangeEvent } from 'react';
import ReaderPDF from './ReaderPDF';
import ReaderButtons from './ReaderButtons';
import ReaderFunctions from './ReaderFunctions';
import '../public/styles/Reader.css';

const Reader = () => {
    const [pdfFile, setPdfFile] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResult, setSearchResult] = useState<number | null>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const handlePdfUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(URL.createObjectURL(file));
            setError(null);
        } else {
            setError('Please upload a valid PDF file.');
        }
    };

    const handleTextToSpeech = () => {
        // handle text to speech
    };

    const handleSearch = () => {
        // handle search
    };

    const handleQuestion = () => {
        // handle questions and retrieve answers from the PDF
    };

    return (
        <div className="reader-container">
            <ReaderFunctions
                handlePdfUpload={handlePdfUpload}
                error={error}
            />

            <ReaderButtons
                speaking={speaking}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleTextToSpeech={handleTextToSpeech}
                handleSearch={handleSearch}
                handleQuestion={handleQuestion}
            />

            <ReaderPDF pdfFile={pdfFile} />

            {searchResult !== null && (
                <p className="error">Search term found on page {searchResult + 1}.</p>
            )}
        </div>
    );
};

export default Reader;
