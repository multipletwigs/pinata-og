"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import OGImageMetadataCopy from "./og-medatadata-copy";

export default function OGMedataExport() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!domain) {
      setError("Please enter a domain");
      return;
    }

    try {
      const url = new URL(domain);
      console.log("Saved domain:", url.toString());
      setError("");
      // Here you would typically save the domain to your backend or state management
    } catch (err) {
      setError(
        "Please enter a valid URL including the protocol (e.g., https://example.com/path)",
      );
    }
  };
  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend>Metadata Export</legend>
      <div className="space-y-4">
        <div className="flex items-end space-x-2">
          <div className="flex-grow mt-1">
            <Label htmlFor="domain-input" className="text-sm font-medium">
              Full Domain Name (including path)
            </Label>
            <Input
              id="domain-input"
              type="text"
              placeholder="https://example.com/path"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <OGImageMetadataCopy />
    </fieldset>
  );
}
