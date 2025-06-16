"use client"

import type React from "react"
import { Upload, Sparkles, Info } from "lucide-react"

interface ReaderControlsProps {
  onQuestion: () => void
  hasAI: boolean
  textExtractionFailed: boolean
}

const ReaderControls: React.FC<ReaderControlsProps> = ({ onQuestion, hasAI, textExtractionFailed }) => {
  const handleNewUpload = () => {
    window.location.reload() 
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Document Controls</h3>
        <button
          onClick={handleNewUpload}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New PDF</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={onQuestion}
          disabled={!hasAI}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Ask AI</span>
        </button>
      </div>

      {textExtractionFailed && !hasAI && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-blue-800 text-sm">
              <p className="font-semibold mb-2">AI features are limited</p>
              <p className="mb-2">You can still:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>View and read the PDF in the viewer below</li>
                <li>Use the PDF viewer's built-in search (Ctrl+F)</li>
                <li>Zoom in/out and navigate pages</li>
                <li>Download or open in a new tab</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {hasAI && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="text-purple-800 text-sm font-medium">
              ✨ AI features are active! Your PDF has been uploaded to Gemini for intelligent question answering.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReaderControls