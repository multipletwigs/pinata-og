import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useOGMetadataStore from "@/app/(og-playground)/store/og-metadata";

const OGImageMetadataCopy = () => {
  const [copied, setCopied] = useState(false);
  const { metadata } = useOGMetadataStore();

  const { title, description, site_name, cid } = metadata;

  const ogImageUrl = cid
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/og-image?cid=${cid}`
    : "";

  const metaTags = `
<meta property="og:image" content="${ogImageUrl}" />
<meta property="og:image:secure_url" content="${ogImageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${title}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:site_name" content="${site_name}" />
  `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTags).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-full max-w-lg md:max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Copy this into your header tag!
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
        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
          <code>{metaTags}</code>
        </pre>
      </CardContent>
    </Card>
  );
};

export default OGImageMetadataCopy;
