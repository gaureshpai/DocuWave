export async function extractTextFromPDFAlternative(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("file", file)
    
    const response = await fetch("https:https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("api:"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: file,
        format: "text",
      }),
    })

    if (!response.ok) {
      throw new Error("PDF extraction service failed")
    }

    const text = await response.text()
    return text
  } catch (error) {
    console.error("Alternative PDF extraction failed:", error)
    throw new Error("Failed to extract text from PDF using alternative method")
  }
}

export async function extractTextClientSide(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer)
        const decoder = new TextDecoder("utf-8")
        let text = decoder.decode(uint8Array)
        
        text = text.replace(/[^\x20-\x7E\n\r\t]/g, " ")
        text = text.replace(/\s+/g, " ")
        text = text.trim()

        if (text.length < 10) {
          throw new Error("Could not extract readable text from PDF")
        }

        resolve(text)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsArrayBuffer(file)
  })
}
