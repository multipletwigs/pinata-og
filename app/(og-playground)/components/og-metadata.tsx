"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useOGMetadataStore from "@/app/(og-playground)/store/og-metadata";
import OGSaveMetadata from "./og-metadata-save";

export default function OGMetadataExport() {
  const { metadata, setMetadata } = useOGMetadataStore();
  const [error, _] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata({ [name]: value });
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Tag Editor</legend>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="og_image_name">OG Image Name (Full URL Path)</Label>
          <Input
            id="og_image_name"
            name="og_image_name"
            type="text"
            placeholder="https://pinata.nightly.ink/dashboard"
            value={metadata.og_image_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={metadata.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              name="siteName"
              type="text"
              value={metadata.siteName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={metadata.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={metadata.imageUrl}
            onChange={handleInputChange}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <OGSaveMetadata />
      </form>
    </fieldset>
  );
}
