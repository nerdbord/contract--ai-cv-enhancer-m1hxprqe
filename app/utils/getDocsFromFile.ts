import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

export const getExtractedText = async (file: File) => {
  try {
    switch (file.type) {
      case "application/pdf": {
        const pdfDocs = await getDocsFromPDF(file);
        console.log("pdfDocs", pdfDocs.pageContent);
        return pdfDocs.pageContent;
      }
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        const docxDocs = await getDocsFromDocx(file);
        console.log("docxDocs", docxDocs.pageContent);
        return docxDocs.pageContent;
      }
      default:
        throw new Error("Unsupported file type");
    }
  } catch (e) {
    console.error(e);
    throw new Error("Text extraction failed!");
  }
};

const getDocsFromPDF = async (file: File) => {
  try {
    const loader = new PDFLoader(file);
    const docs = await loader.load();

    return docs[0];
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed!");
  }
};

const getDocsFromDocx = async (file: File) => {
  try {
    const loader = new DocxLoader(file);
    const docs = await loader.load();

    return docs[0];
  } catch (e) {
    console.error(e);
    throw new Error("DOCX docs chunking failed!");
  }
};
