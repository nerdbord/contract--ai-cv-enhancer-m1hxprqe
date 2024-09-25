/* eslint-disable prettier/prettier */
import mammoth from "mammoth"; // DOCX
// import pdfParse from "pdf-parse"; // PDF
import { pdf } from "remix-utils/responses";

// Function to extract text from DOCX
export async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

// Function to extract text from PDF
export const extractPdfText = async (file: File) => {
    const fileBuffer = await file.arrayBuffer();
    const data = await pdf(Buffer.from(fileBuffer));
    return data.text;
  };

// Placeholder to save uploaded file (if needed)
// eslint-disable-next-line prettier/prettier
export async function handleFileUpload({ filename }: { filename: string, stream: NodeJS.ReadableStream }): Promise<string> {
  const uploadDir = "./uploads";
  // Add logic to save file to directory
  return `${uploadDir}/${filename}`;
}
