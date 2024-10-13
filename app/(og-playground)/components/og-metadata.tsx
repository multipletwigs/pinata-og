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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMetadata({ [name]: value });
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Tag Editor</legend>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="og_image_path">OG Image Name</Label>
          <Input
            id="og_image_path"
            name="og_image_path"
            type="text"
            placeholder="nightly.ink og:images"
            value={metadata.og_image_path || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Metatag Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={metadata.title}
              placeholder="Pinata Submission"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_name">Site Path</Label>
            <Input
              id="site_name"
              name="site_name"
              type="text"
              value={metadata.site_name || ""}
              placeholder="https://pinata.nightly.ink"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Hello everyone, are you sleeping well? Drink water please."
            value={metadata.description || ""}
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
