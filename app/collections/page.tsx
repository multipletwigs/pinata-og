"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import useOGMetadataListStore from "@/app/(og-playground)/store/og-metadata-display";
import { useAuthStore } from "../(og-playground)/store/auth-user";
import { generateMetaTags } from "@/lib/utils"; // Assume this is the correct import path
import { Skeleton } from "@/components/ui/skeleton";

export interface OGMetadata {
  author: string | null;
  cid: string;
  created_at: string | null;
  description: string | null;
  id: string;
  og_image_path: string | null;
  site_name: string | null;
  title: string;
  updated_at: string | null;
  user_id: string | null;
}

const MetadataList = () => {
  const { metadataList, isLoading, error, fetchAllMetadata } =
    useOGMetadataListStore();

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div>Login</div>;
  }

  useEffect(() => {
    fetchAllMetadata();
  }, [fetchAllMetadata]);

  if (isLoading)
    return (
      <Skeleton className="flex justify-center items-center h-64 w-full" />
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        OG Metadata List
      </h1>
      <ScrollArea className="h-[calc(100vh-120px)] w-full rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {metadataList.map((metadata: OGMetadata) => (
            <MetadataCard key={metadata.id} metadata={metadata} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const MetadataCard = ({ metadata }: { metadata: OGMetadata }) => {
  const [showTags, setShowTags] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-grow space-y-2 p-3 sm:p-6">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg sm:text-xl font-bold truncate flex-1">
            {metadata.title}
          </CardTitle>
          {metadata.site_name && (
            <Badge variant="secondary" className="ml-2 text-xs sm:text-sm">
              {metadata.site_name}
            </Badge>
          )}
        </div>
        {metadata.description && (
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-3">
            {metadata.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {metadata.og_image_path && (
          <div className="aspect-w-16 aspect-h-9 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-og?cid=${metadata.og_image_path}`}
              alt={metadata.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-3 sm:p-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTags(!showTags)}
            className="w-full mb-2"
          >
            {showTags ? "Hide Tags" : "Show Tags"}
          </Button>
          {showTags && (
            <div className="mt-2">
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {metaTags}
              </pre>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="mt-2 w-full"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Clipboard className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetadataList;
