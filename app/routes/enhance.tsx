/* eslint-disable prettier/prettier */
import { LoaderFunction } from "@remix-run/node";
import { generateEnhancedCv } from "~/utils/pdfGenerator";

// Loader function to create and return the enhanced CV as a PDF
export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams;
  const extractedText = urlParams.get("text");

  if (!extractedText) {
    throw new Error("No text provided!");
  }

  const pdfBuffer = await generateEnhancedCv(extractedText);  // Generate the PDF buffer

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Enhanced-CV.pdf"',
    },
  });
};