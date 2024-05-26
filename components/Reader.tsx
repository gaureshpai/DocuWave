'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
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
      <div className="upload-container">
        <label className="upload-label">
          Upload PDF
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            ref={pdfInputRef}
          />
        </label>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="navigation">
        <button className="nav-button" onClick={handleTextToSpeech}>
          {speaking ? 'Pause Speech' : 'Text to Speech'}
        </button>
        <button className="nav-button" onClick={() => window.speechSynthesis.cancel()}>
          Stop Speech
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search term"
        />
        <button className="nav-button" onClick={handleSearch}>
          Search
        </button>
        <button className="nav-button" onClick={handleQuestion}>
          Ask Question
        </button>
      </div>

      <div className="pdf-container">
        {pdfFile && (
          <embed
            src={pdfFile}
            type="application/pdf"
            className="pdf-page"
            onLoad={() => {
              const pages = Array.from(
                document.querySelectorAll('.pdf-page')
              ).map((page) => page.ownerDocument as Document);
              // setPdfPages(pages); // Removed since it's not being used
            }}
          />
        )}
      </div>

      {searchResult !== null && (
        <p className="error">Search term found on page {searchResult + 1}.</p>
      )}
    </div>
  );
};

export default Reader;
