'use client'


import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "lucide-react";

interface ImageDropzoneProps {
  onChange: (file: File | null) => void;
  value?: File | null;
}

const ImageDropzone = ({ onChange, value }: ImageDropzoneProps) => {
  const [preview, setPreview] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    onChange(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative aspect-video">
          <img
            src={preview}
            alt="Preview"
            className="rounded-md object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <Image className="w-8 h-8" />
          <p>Drag & drop your course thumbnail here, or click to select</p>
          <p className="text-sm">Supported formats: JPEG, PNG, WebP</p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;