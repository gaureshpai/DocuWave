"use client"

import type React from "react"
import type { ChangeEvent } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"

interface ReaderUploadProps {
  onPdfUpload: (event: ChangeEvent<HTMLInputElement>) => void
  error: string | null
  loading: boolean
}

const ReaderUpload: React.FC<ReaderUploadProps> = ({ onPdfUpload, error, loading }) => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-all duration-300 p-12">
          <label className="cursor-pointer block">
            <div className="flex flex-col items-center space-y-6">
              {loading ? (
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-indigo-300" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Upload className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "Processing your PDF..." : "Upload your PDF"}
                </h3>
                <p className="text-gray-600 max-w-md">
                  {loading
                    ? "We're uploading to AI and extracting text for the best experience"
                    : "Drag and drop your PDF file here, or click to browse"}
                </p>
              </div>
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-full">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">PDF files only</span>
              </div>
            </div>
            <input type="file" accept=".pdf" onChange={onPdfUpload} className="hidden" disabled={loading} />
          </label>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">⚠️</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          How DocuWave Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📤</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Upload</h3>
            <p className="text-gray-600">Select and upload your PDF document securely</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Process</h3>
            <p className="text-gray-600">AI analyzes and extracts content automatically</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Interact</h3>
            <p className="text-gray-600">Ask questions and get intelligent answers</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReaderUpload
