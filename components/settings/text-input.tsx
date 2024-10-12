// TextInputField.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
}) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);
