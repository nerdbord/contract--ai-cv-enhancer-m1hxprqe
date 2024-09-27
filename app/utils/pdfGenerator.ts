import { PDFDocument } from "pdf-lib";

export async function generateEnhancedCv(text: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  page.drawText(`Enhanced CV:\n${text}`, {
    x: 50,
    y: 750,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
