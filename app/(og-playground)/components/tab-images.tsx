"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import useLayoutAStore from "@/app/(og-playground)/store/layouts/layout-a";
import GradientSelector from "./gradient-selector";
import { FileUploadField } from "@/components/settings/file-upload";
import { TextInputField } from "@/components/settings/text-input";
import { ColorInputField } from "@/components/settings/colour-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LayoutASettings {
  companyName: string;
  ctaText: string;
  title: string;
  gradientStart: string;
  gradientEnd: string;
  logoSrc: string;
  imageSrc: string;
  gridType: "none" | "lines";
}

export default function LayoutASettings() {
  const {
    companyName,
    ctaText,
    title,
    gradientStart,
    gradientEnd,
    gridType,
    setLogoSrc,
    setImageSrc,
    setCompanyName,
    setCtaText,
    setTitle,
    setGradientStart,
    setGradientEnd,
    setGridType,
  } = useLayoutAStore();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">
        Layout Settings
      </legend>

      <div className="grid gap-4">
        <FileUploadField
          onFileUpload={handleLogoUpload}
          label="Upload Visual Idenity"
        />

        <FileUploadField
          onFileUpload={handleImageUpload}
          label="Upload Hero Image"
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInputField
            id="company-name"
            label="Brand Name"
            value={companyName}
            onChange={setCompanyName}
          />
          <TextInputField
            id="cta-text"
            label="Description"
            value={ctaText}
            onChange={setCtaText}
          />
        </div>

        <TextInputField
          id="title"
          label="Title"
          value={title}
          onChange={setTitle}
        />

        <Separator className="my-4" />

        <div className="grid gap-4">
          <h3 className="text-sm font-medium">Background Gradient</h3>
          <div className="grid grid-cols-2 gap-4">
            <ColorInputField
              id="gradient-start"
              label="Start Color"
              value={gradientStart}
              onChange={setGradientStart}
            />
            <ColorInputField
              id="gradient-end"
              label="End Color"
              value={gradientEnd}
              onChange={setGradientEnd}
            />
          </div>
        </div>

        <div className="grid gap-3">
          <h3 className="text-sm font-medium">Preset Gradients</h3>
          <GradientSelector />
        </div>

        <div className="grid gap-3">
          <h3 className="text-sm font-medium">Grid Type</h3>
          <Select value={gridType} onValueChange={setGridType}>
            <SelectTrigger>
              <SelectValue placeholder="Select grid type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="lines">Lines</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </fieldset>
  );
}
