import { PDFDocument } from "pdf-lib";
import jsPDF from "jspdf";
import * as pdfjsLib from "pdfjs-dist";
import { readFileAsDataURL, downloadFile, downloadImage } from "./fileUtils";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Merge multiple PDFs
export const mergePDFs = async (files: File[]): Promise<void> => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    if (file.type === "application/pdf") {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
  }
  const mergedBytes = await mergedPdf.save();
  downloadFile(mergedBytes, "merged.pdf");
};

// Convert multiple images → PDF
export const imagesToPDF = async (files: File[]): Promise<void> => {
  const pdf = new jsPDF();
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.startsWith("image/")) {
      const imgData = (await readFileAsDataURL(files[i])) as string;
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 10, 10, 180, 250);
    }
  }
  pdf.save("images.pdf");
};

// Convert PDF → Images
export const pdfToImages = async (files: File[]): Promise<void> => {
  for (const file of files) {
    if (file.type === "application/pdf") {
      const pdfData = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport, canvas }).promise;

        const imgData = canvas.toDataURL("image/png");
        downloadImage(imgData, `page-${i}.png`);
      }
    }
  }
};
