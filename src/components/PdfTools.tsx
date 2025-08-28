import { imagesToPDF, mergePDFs, pdfToImages } from "../utils/pdfUtils";


interface PdfToolsProps {
  files: File[];
}

export default function PdfTools({ files }: PdfToolsProps) {
  return (
    <div className="mt-6 flex gap-3 justify-center flex-wrap">
      <button
        onClick={() => mergePDFs(files)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Merge PDFs
      </button>
      <button
        onClick={() => imagesToPDF(files)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Images → PDF
      </button>
      <button
        onClick={() => pdfToImages(files)}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
      >
        PDF → Images
      </button>
    </div>
  );
}
