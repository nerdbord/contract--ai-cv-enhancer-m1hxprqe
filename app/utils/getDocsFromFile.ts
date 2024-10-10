import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

export const getExtractedText = async (file: File) => {
  try {
    switch (file.type) {
      case "application/pdf":
        return (await getDocsFromPDF(file)).pageContent;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (await getDocsFromDocx(file)).pageContent;
      default:
        throw new Error("Unsupported file type");
    }
  } catch (e) {
    console.error(e);
    throw e;
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
