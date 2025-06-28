// src/components/custom/upload-dropzone.tsx
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (file: File) => void;
}

export function UploadDropzone({ onFileSelected }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-full p-3 border-2 border-dashed border-muted rounded text-center cursor-pointer bg-muted/50 hover:bg-muted"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Dosyayı bırak...</p>
      ) : (
        <p>Logo yüklemek için tıklayın veya dosyayı sürükleyin</p>
      )}
    </div>
  );
}
