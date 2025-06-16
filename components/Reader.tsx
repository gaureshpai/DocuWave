"use client"

import { useState, type ChangeEvent } from "react"
import ReaderPDF from "./ReaderPDF"
import ReaderControls from "./ReaderControls"
import ReaderUpload from "./ReaderUpload"
import QuestionModal from "./QuestionModal"
import { clearPDFContent } from "@/lib/ai-utils"

const Reader = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const [pdfText, setPdfText] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false)
  const [extractionInfo, setExtractionInfo] = useState<string>("")
  const [textExtractionFailed, setTextExtractionFailed] = useState<boolean>(false)
  const [geminiUploadSuccess, setGeminiUploadSuccess] = useState<boolean>(false)

  const handlePdfUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.")
      return
    }
    
    clearPDFContent()

    setLoading(true)
    setError(null)
    setExtractionInfo("")
    setTextExtractionFailed(false)
    setGeminiUploadSuccess(false)
    setPdfText("")

    try {
      const fileURL = URL.createObjectURL(file)
      setPdfFile(fileURL)
      
      const geminiUploadPromise = (async () => {
        try {
          setExtractionInfo("🔄 Uploading PDF to Gemini AI for intelligent analysis...")

          const geminiFormData = new FormData()
          geminiFormData.append("file", file)

          const geminiResponse = await fetch("/api/upload-pdf-to-gemini", {
            method: "POST",
            body: geminiFormData,
          })

          const geminiResult = await geminiResponse.json()

          if (geminiResponse.ok) {
            setGeminiUploadSuccess(true)
            return true
          } else {
            console.error("Gemini upload failed:", geminiResult)
            return false
          }
        } catch (error) {
          console.error("Gemini upload error:", error)
          return false
        }
      })()
      
      const textExtractionPromise = (async () => {
        try {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/extract-text", {
            method: "POST",
            body: formData,
          })

          const result = await response.json()

          if (response.ok && result.success) {
            setPdfText(result.text)
            return { success: true, text: result.text }
          } else {
            setTextExtractionFailed(true)
            return { success: false, error: result.error }
          }
        } catch (error) {
          setTextExtractionFailed(true)
          return { success: false }
        }
      })()
      
      const [geminiSuccess, textResult] = await Promise.all([geminiUploadPromise, textExtractionPromise])
      
      if (geminiSuccess && textResult.success) {
        setExtractionInfo(
          `✅ PDF uploaded to Gemini AI successfully! AI question answering is now available. Text length: ${textResult.text.length} characters.`,
        )
      } else if (geminiSuccess && !textResult.success) {
        setExtractionInfo(
          `✅ PDF uploaded to Gemini AI successfully! AI features are available.`,
        )
      } else if (!geminiSuccess && textResult.success) {
        setExtractionInfo(
          `⚠️ Gemini AI upload failed, so AI questions are limited. Text was extracted successfully (${textResult.text.length} characters).`,
        )
      } else {
        setExtractionInfo(`⚠️ Both AI upload had issues, but you can still view the PDF manually.`)
      }
    } catch (error) {
      console.error("Error processing PDF:", error)
      setExtractionInfo("⚠️ PDF processing failed, but you can still view the PDF manually.")
    } finally {
      setLoading(false)
    }
  }

  const handleQuestion = () => {
    if (!geminiUploadSuccess && !pdfText) {
      setError(
        "AI questions are not available because both Gemini upload failed. Please try uploading the PDF again.",
      )
      return
    }
    setShowQuestionModal(true)
  }

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!pdfFile && <ReaderUpload onPdfUpload={handlePdfUpload} error={error} loading={loading} />}

          {extractionInfo && (
            <div
              className={`mb-6 p-4 border rounded-lg shadow-sm ${
                textExtractionFailed && !geminiUploadSuccess
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <p
                className={`text-sm ${textExtractionFailed && !geminiUploadSuccess ? "text-yellow-800" : "text-green-800"}`}
              >
                {extractionInfo}
              </p>
            </div>
          )}

          {pdfFile && (
            <>
              <ReaderControls
                onQuestion={handleQuestion}
                hasAI={geminiUploadSuccess}
                textExtractionFailed={textExtractionFailed}
              />

              <ReaderPDF pdfFile={pdfFile} />
            </>
          )}

          {showQuestionModal && (
            <QuestionModal
              pdfText={pdfText}
              hasGeminiUpload={geminiUploadSuccess}
              onClose={() => setShowQuestionModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Reader
