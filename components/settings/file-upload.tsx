// FileUploadField.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileUploadFieldProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onFileUpload,
  label,
}) => (
  <div className="grid gap-3">
    <Label htmlFor="image-upload">{label}</Label>
    <Input
      id="image-upload"
      type="file"
      accept=".png,.jpg,.jpeg"
      onChange={onFileUpload}
    />
  </div>
);
