"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (file: File) => void;
}

export function UploadDropzone({ onFileSelected }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // 2MB sınırı
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Dosya boyutu 2MB'den büyük olamaz.");
        return;
      }

      onFileSelected(file);
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // sadece görseller
    multiple: false, // tek dosya
  });

  return (
    <div
      {...getRootProps()}
      className="w-full p-3 border-2 border-dashed border-muted rounded text-center cursor-pointer bg-muted/50 hover:bg-muted"
      role="button"
      tabIndex={0}
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
