'use client'
import React, { useState, useEffect } from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';

import '../public/styles/Reader.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Reader = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  useEffect(() => {
    const storedPdfFiles = localStorage.getItem('pdfFiles');
    if (storedPdfFiles) {
      setPdfFiles(JSON.parse(storedPdfFiles));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setLoading(true);
      const newPdfFiles: File[] = [];
      const newErrors: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf') {
          newPdfFiles.push(file);
        } else {
          newErrors.push(`File ${file.name} is not a PDF.`);
        }
      }
      if (newErrors.length > 0) {
        setError(newErrors.join('\n'));
        setLoading(false);
      } else {
        setPdfFiles(newPdfFiles);
        localStorage.setItem('pdfFiles', JSON.stringify(newPdfFiles));
        setLoading(false);
        setError(null);
      }
    }
  };

  const handleReadPdf = async () => {
    if (!speaking && pdfFiles.length > 0) {
      const pdfFile = pdfFiles[0]; // Assuming only one PDF file is handled
      try {
        setLoading(true);
        const text = await readPdfContent(pdfFile);
        setLoading(false);
        if (text.trim().length === 0) {
          setError('PDF is empty or cannot be read.');
          return;
        }
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        setSpeaking(true);
        utterance.onend = () => {
          setSpeaking(false);
        };
        speechSynthesis.speak(utterance);
        const stopReading = () => {
          speechSynthesis.cancel();
          setSpeaking(false);
        };
        window.addEventListener('stopReading', stopReading);
        return () => {
          window.removeEventListener('stopReading', stopReading);
        };
      } catch (error) {
        setError('Error reading PDF.');
        console.error('Error reading PDF:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const readPdfContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjs.getDocument(typedArray).promise;
          const fullText = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const pageText = await page.getTextContent();
            const textItems: string[] = [];
            for (const item of pageText.items) {
              if ('str' in item) {
                textItems.push(item.str);
              } else if ('str' in (item as any).markedContent) {
                textItems.push((item as any).markedContent.str);
              }
            }
            fullText.push(textItems.join(' '));
          }
          resolve(fullText.join('\n'));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  useEffect(() => {
    if (numPages > 0) {
      setCurrentPageNumber(1);
    }
  }, [numPages]);

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <Page key={i} />
      );
    }
    return pages;
  };

  const onLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    console.error('Failed to load PDF:', error);
  };

  return (
    <div className="reader-container">
      <div className="upload-container">
        <label htmlFor="pdfFileInput" className="upload-label">
          <span>Upload</span>
          <input id="pdfFileInput" type="file" onChange={handleFileChange} accept=".pdf" multiple />
        </label>
      </div>

      <div className="navigation">
        <button className="read-pdf-button" onClick={handleReadPdf} disabled={loading}>
          {speaking ? 'Stop Reading' : 'Read PDF'}
        </button>
      </div>

      <div className="pdf-container">
        {loading && <p>Loading PDFs...</p>}
        {error && <p className="error">{error}</p>}
        {pdfFiles.length > 0 ? (
          <Document >
            {renderPages()}
          </Document>
        ) : (
          <p>Upload a PDF to view here.</p>
        )}
      </div>
    </div>
  );
};

export default Reader;
