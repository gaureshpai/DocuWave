import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

let pdfContent: string | null = null

export async function uploadPDFToGemini(file: File): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured")
    }
    
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    
    pdfContent = base64

    console.log("PDF uploaded to Gemini successfully, size:", base64.length)
    return "PDF uploaded successfully"
  } catch (error) {
    console.error("Error uploading PDF to Gemini:", error)
    throw new Error("Failed to upload PDF to Gemini: " + (error instanceof Error ? error.message : "Unknown error"))
  }
}

export async function generateAnswerFromUploadedPDF(question: string): Promise<string> {
  try {
    if (!pdfContent) {
      throw new Error("No PDF uploaded to Gemini")
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured")
    }

    console.log("Generating answer for question:", question)

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    })

    const prompt = `You are analyzing a PDF document. Please read the document carefully and answer the following question based on its content.

Question: ${question}

Instructions:
- Provide a detailed and accurate answer based on the document content
- If the answer cannot be found in the document, clearly state that
- Quote relevant parts of the document when possible
- Be specific and helpful in your response

Answer:`
    
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfContent,
        },
      },
      { text: prompt },
    ])

    const response = await result.response
    const text = response.text()

    console.log("Generated answer:", text.substring(0, 100) + "...")
    return text
  } catch (error) {
    console.error("Error generating answer from uploaded PDF:", error)

    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        throw new Error("Invalid API key. Please check your Gemini API key configuration.")
      } else if (error.message.includes("quota")) {
        throw new Error("API quota exceeded. Please try again later.")
      } else if (error.message.includes("SAFETY")) {
        throw new Error("Content was blocked by safety filters. Please try a different question.")
      }
    }

    throw new Error("Failed to generate answer: " + (error instanceof Error ? error.message : "Unknown error"))
  }
}

export async function generateAnswer(question: string, context: string): Promise<string> {
  try {
    if (pdfContent) {
      console.log("Using uploaded PDF for answer generation")
      return await generateAnswerFromUploadedPDF(question)
    }
    
    if (!context || context.trim().length === 0) {
      throw new Error("No document content available. Please upload a PDF first.")
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Based on the following document content, please answer the question. If the answer cannot be found in the document, please say so.

Document Content:
${context}

Question: ${question}

Answer:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating answer:", error)
    throw error 
  }
}

export async function summarizeText(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Please provide a concise summary of the following document:

${text}

Summary:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating summary:", error)
    throw new Error("Failed to generate summary")
  }
}

export function clearPDFContent(): void {
  pdfContent = null
  console.log("PDF content cleared")
}

export function hasPDFContent(): boolean {
  return pdfContent !== null
}