"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useOGMetadataListStore from "@/app/(og-playground)/store/og-metadata-display";

const MetadataList = () => {
  const { metadataList, isLoading, error, fetchAllMetadata } =
    useOGMetadataListStore();

  useEffect(() => {
    fetchAllMetadata();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">OG Metadata List</h1>
      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metadataList.map((metadata) => (
            <Card key={metadata.id} className="flex flex-col">
              <CardHeader className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg truncate">
                    {metadata.title}
                  </CardTitle>
                  {metadata.site_name && (
                    <Badge variant="secondary" className="ml-2 truncate">
                      {metadata.site_name}
                    </Badge>
                  )}
                </div>
                {metadata.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {metadata.description}
                  </p>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                {metadata.cid && (
                  <div className="aspect-w-16 aspect-h-10 overflow-hidden rounded-md">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-og?cid=${metadata.cid}`}
                      alt={metadata.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MetadataList;
