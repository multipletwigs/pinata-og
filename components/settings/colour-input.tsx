// ColorInputField.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorInputField: React.FC<ColorInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
}) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    <div className="flex items-center gap-2">
      <Input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-10 cursor-pointer"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow"
        placeholder="#000000"
      />
    </div>
  </div>
);
