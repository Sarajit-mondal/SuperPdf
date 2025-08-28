import { useState } from "react";
import FileDropzone from "./components/FileDropzone";
import PdfTools from "./components/PdfTools";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">📄 PDF & Image Tool</h1>
      <FileDropzone files={files} setFiles={setFiles} />
      <PdfTools files={files} />
    </div>
  );
}

export default App;
