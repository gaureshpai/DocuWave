import { type NextRequest, NextResponse } from "next/server"
import { uploadPDFToGemini } from "@/lib/ai-utils"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const fileUri = await uploadPDFToGemini(file)
    return NextResponse.json({
      success: true,
      fileUri,
      message: "PDF uploaded to Gemini successfully",
    })
  } catch (error) {
    console.error("Error uploading PDF to Gemini:", error)
    return NextResponse.json(
      {
        error: "Failed to upload PDF to Gemini",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
