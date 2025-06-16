"use client"

import type React from "react"
import { useState } from "react"
import { X, Send, Loader2, MessageCircle, Sparkles, AlertCircle } from "lucide-react"

interface QuestionModalProps {
  pdfText: string
  hasGeminiUpload: boolean
  onClose: () => void
}

const QuestionModal: React.FC<QuestionModalProps> = ({ pdfText, hasGeminiUpload, onClose }) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    setError(null)
    setAnswer("")

    try {
      console.log("Submitting question:", question)

      const response = await fetch("/api/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          context: "", 
        }),
      })

      const result = await response.json()
      console.log("API response:", result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to get answer")
      }

      setAnswer(result.answer)
    } catch (error) {
      console.error("Error asking question:", error)
      setError(error instanceof Error ? error.message : "Failed to get answer. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const suggestedQuestions = [
    "What is the main topic of this document?",
    "Can you summarize the key points?",
    "What are the important dates or numbers mentioned?",
    "Who are the main people or organizations mentioned?",
    "What conclusions or recommendations are made?",
  ]

  const handleSuggestedQuestion = (suggestion: string) => {
    setQuestion(suggestion)
    setError(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Ask AI about your document</h2>
              <p className="text-purple-100 text-sm">
                {hasGeminiUpload ? "✨ Using advanced Gemini AI with your uploaded PDF" : "❌ PDF not uploaded to AI"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {!hasGeminiUpload ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Features Not Available</h3>
              <p className="text-gray-600">
                The PDF was not successfully uploaded to Gemini AI. Please try uploading your PDF again.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-3">
                    What would you like to know about this document?
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-700"
                    rows={3}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Getting answer from AI...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Ask AI</span>
                    </>
                  )}
                </button>
              </form>

              {!question && !loading && !answer && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-600 mb-3">💡 Try these suggested questions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestedQuestion(suggestion)}
                        className="text-left p-3 text-sm text-black bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-lg transition-colors"
                        disabled={loading}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Error getting AI response</p>
                      <p className="text-sm mt-1">{error}</p>
                      {error.includes("API key") && (
                        <p className="text-sm mt-2 text-red-600">
                          Please make sure your GEMINI_API_KEY environment variable is set correctly.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {answer && (
                <div className="mt-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">AI Answer:</h3>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{answer}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setQuestion("")
                        setAnswer("")
                        setError(null)
                      }}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Ask another question
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionModal