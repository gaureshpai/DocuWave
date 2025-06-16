export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const pdfjsLib = await import("pdfjs-dist")
    
    if (typeof window !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
    }

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ""
    const extractedTexts: string[] = []

    console.log(`PDF has ${pdf.numPages} pages`)
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        
        const pageTexts = textContent.items
          .map((item: any) => {
            if (item.str && typeof item.str === "string") {
              const cleaned = item.str.trim()
              if (isReadableText(cleaned)) {
                return cleaned
              }
            }
            return ""
          })
          .filter((text) => text.length > 0)

        if (pageTexts.length > 0) {
          const pageText = pageTexts.join(" ")
          extractedTexts.push(pageText)
          console.log(`Page ${pageNum}: extracted ${pageTexts.length} text items`)
        }
      } catch (pageError) {
        console.warn(`Failed to extract text from page ${pageNum}:`, pageError)
      }
    }

    if (extractedTexts.length === 0) {
      throw new Error("No readable text found in any page")
    }
    
    fullText = extractedTexts.join("\n\n")
    
    fullText = fullText
      .replace(/\s+/g, " ") 
      .replace(/\n\s*\n/g, "\n") 
      .trim()

    console.log("PDF.js extraction successful, length:", fullText.length)
    console.log("Sample text:", fullText.substring(0, 200))

    return fullText
  } catch (error) {
    console.error("PDF.js extraction failed:", error)
    throw new Error(
      "Could not extract text using PDF.js: " + (error instanceof Error ? error.message : "Unknown error"),
    )
  }
}

function isReadableText(text: string): boolean {
  if (!text || text.length < 1) return false
  
  const cleaned = text.replace(/\\n/g, " ").replace(/\\r/g, " ").replace(/\\t/g, " ").trim()

  if (cleaned.length < 1) return false
  
  const readableChars = cleaned.match(/[a-zA-Z0-9\s.,!?;:'"()-]/g)
  if (!readableChars) return false

  const readableRatio = readableChars.length / cleaned.length
  
  if (readableRatio < 0.6) return false
  
  const garbagePatterns = [
    /^[xX]{3,}/, 
    /^[A-Z]{8,}$/, 
    /^[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{4,}$/, 
    /^[A-Za-z0-9]{1,2}$/, 
  ]

  for (const pattern of garbagePatterns) {
    if (pattern.test(cleaned)) return false
  }

  return true
}

export function searchInText(text: string, searchTerm: string): number[] {
  const matches: number[] = []
  const lowerText = text.toLowerCase()
  const lowerSearchTerm = searchTerm.toLowerCase()
  let index = 0

  while ((index = lowerText.indexOf(lowerSearchTerm, index)) !== -1) {
    matches.push(index)
    index += lowerSearchTerm.length
  }

  return matches
}