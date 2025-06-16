import { type NextRequest, NextResponse } from "next/server"
import { generateAnswer, hasPDFContent } from "@/lib/ai-utils"

export async function POST(request: NextRequest) {
  try {
    const { question, context } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }
    
    if (!hasPDFContent()) {
      return NextResponse.json(
        {
          error: "No PDF uploaded to AI. Please upload a PDF first.",
        },
        { status: 400 },
      )
    }

    console.log("Processing question:", question)

    const answer = await generateAnswer(question, context || "")

    console.log("Generated answer successfully")
    return NextResponse.json({ answer })
  } catch (error) {
    console.error("Error generating answer:", error)
    
    let errorMessage = "Failed to generate answer"
    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("API_KEY")) {
        errorMessage = "Gemini API key is not configured properly. Please check your environment variables."
      } else if (error.message.includes("quota")) {
        errorMessage = "API quota exceeded. Please try again later."
      } else if (error.message.includes("model")) {
        errorMessage = "AI model is currently unavailable. Please try again later."
      } else if (error.message.includes("SAFETY")) {
        errorMessage = "Content was blocked by safety filters. Please try a different question."
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}