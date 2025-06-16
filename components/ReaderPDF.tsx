"use client"

import type React from "react"
import { useState } from "react"
import { ZoomIn, ZoomOut, Download, ExternalLink, Maximize2 } from "lucide-react"

interface ReaderPDFProps {
  pdfFile: string | null
}

const ReaderPDF: React.FC<ReaderPDFProps> = ({ pdfFile }) => {
  const [scale, setScale] = useState<number>(100)

  const zoomIn = () => {
    setScale((prev) => Math.min(200, prev + 25))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(50, prev - 25))
  }

  const downloadPDF = () => {
    if (pdfFile) {
      const link = document.createElement("a")
      link.href = pdfFile
      link.download = "document.pdf"
      link.click()
    }
  }

  const openInNewTab = () => {
    if (pdfFile) {
      window.open(pdfFile, "_blank")
    }
  }

  if (!pdfFile) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-100">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Maximize2 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No PDF loaded</h3>
          <p className="text-gray-500">Please upload a PDF file to get started with viewing and analysis.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-800">PDF Viewer</h3>
        </div>
      </div>

      <div className="bg-gray-50 min-h-[700px] flex justify-center p-6">
        <div className="w-full max-w-5xl">
          <iframe
            src={`${pdfFile}#zoom=${scale}`}
            className="w-full h-[700px] border-0 rounded-lg shadow-lg bg-white"
            title="PDF Viewer"
          />
        </div>
      </div>

      <div className="p-4 bg-blue-50 border-t">
        <p className="text-sm text-blue-800 text-center">
          <strong>💡 Tip:</strong> If the PDF doesn't display properly, try{" "}
          <button onClick={openInNewTab} className="underline hover:no-underline font-medium">
            opening it in a new tab
          </button>{" "}
          or{" "}
          <button onClick={downloadPDF} className="underline hover:no-underline font-medium">
            downloading it
          </button>
          . You can also use Ctrl+F to search within the PDF.
        </p>
      </div>
    </div>
  )
}

export default ReaderPDF
