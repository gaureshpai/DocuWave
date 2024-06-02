import React from 'react';

interface ReaderPDFProps {
  pdfFile: string | null;
}

const ReaderPDF: React.FC<ReaderPDFProps> = ({ pdfFile }) => {
  return (
    <div className="pdf-container">
      {pdfFile && (
        <embed
          src={pdfFile}
          type="application/pdf"
          className="pdf-page"
        />
      )}
    </div>
  );
};

export default ReaderPDF;
