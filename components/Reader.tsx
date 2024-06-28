'use client'

import React, { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import ReaderPDF from './ReaderPDF';
import ReaderButtons from './ReaderButtons';
import ReaderFunctions from './ReaderFunctions';
import '../public/styles/Reader.css';

const Reader = () => {
    const [pdfFile, setPdfFile] = useState<string | null>(null);
    const [pdfText, setPdfText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResult, setSearchResult] = useState<number | null>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const handlePdfUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            setPdfFile(fileURL);
            try {
                const extractedText = await extractTextFromPDF(file);
                setPdfText(extractedText);
                setError(null);
            } catch (error) {
                console.error('Error extracting text from PDF:', error);
                setError('Error extracting text from PDF. Please ensure the PDF is not encrypted and try again.');
            }
        } else {
            setError('Please upload a valid PDF file.');
        }
    };

    const extractTextFromPDF = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        const API_KEY = 'YOUR_PDF_CO_API_KEY'; // Replace with your PDF.co API key

        try {
            const response = await axios.post('https://api.pdf.co/v1/pdf/convert/to/text', formData, {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.body) {
                return response.data.body;
            } else {
                throw new Error('No text found in PDF response.');
            }
        } catch (error:any) {
            console.error('Failed to extract text from PDF:', error.response ? error.response.data : error.message);
            throw new Error('Failed to extract text from PDF.');
        }
    };

    const handleTextToSpeech = () => {
        if (!pdfText) return;
        const utterance = new SpeechSynthesisUtterance(pdfText);
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        speechSynthesis.speak(utterance);
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
