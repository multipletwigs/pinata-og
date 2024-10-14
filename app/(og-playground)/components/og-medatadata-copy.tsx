import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useOGMetadataStore from "@/app/(og-playground)/store/og-metadata";
import { generateMetaTags } from "@/lib/utils";

const OGImageMetadataCopy = () => {
  const [copied, setCopied] = useState(false);
  const { metadata } = useOGMetadataStore();
  const metaTags = generateMetaTags({
    ...metadata,
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTags).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Edit in Metadata Editor and Copy this into your header tag!
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-40 w-full overflow-y-auto">
          <pre className="bg-muted p-4 rounded-md text-sm text-wrap">
            <code>{metaTags}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default OGImageMetadataCopy;
