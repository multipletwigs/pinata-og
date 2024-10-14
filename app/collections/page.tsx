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
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

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
  const setIsLoginModalOpen = useAuthStore(
    (state) => state.setIsLoginModalOpen,
  );

  useEffect(() => {
    if (user) {
      fetchAllMetadata();
    }
  }, [user, fetchAllMetadata]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-extrabold">
              Pinata OG!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <p className="text-center text-lg">
                Supercharge your web presence with dynamic OG images!
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Easily manage
                  and update OG images
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Leverage
                  Pinata's powerful file APIs
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span> Boost your
                  social media engagement
                </li>
              </ul>
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform"
              >
                Get Started Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-og?cid=${metadata.cid}`}
              alt={metadata.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-3 sm:p-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                Show Tags
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Meta Tags</DialogTitle>
              </DialogHeader>
              <div className="mt-2 overflow-x-auto">
                <pre className="p-2 rounded text-xs overflow-x-auto max-h-[300px] text-wrap">
                  {metaTags}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="mt-4 w-full"
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
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetadataList;
