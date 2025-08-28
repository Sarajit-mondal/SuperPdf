import React from "react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileDropzone({ files, setFiles }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg", ".jpeg"] },
    onDrop: (acceptedFiles) => setFiles([...files, ...acceptedFiles]),
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-400 p-10 rounded-lg cursor-pointer text-center"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">Drag & drop PDF or Images here</p>
      {files.length > 0 && (
        <ul className="mt-3 text-left text-sm text-gray-700">
          {files.map((file, i) => (
            <li key={i}>📄 {file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
