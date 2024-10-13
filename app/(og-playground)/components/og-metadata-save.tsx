"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useOGMetadataStore from "@/app/(og-playground)/store/og-metadata";
import { useAuthStore } from "../store/auth-user";
import { LoginDialog } from "@/components/login-dialog";
import { Loader2, Save, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SaveOGMetadata = () => {
  const { saveMetadata: saveMetadataServer, metadata } = useOGMetadataStore();
  const { user, setIsLoginModalOpen, isLoginModalOpen } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(metadata);
  const handleAction = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      await saveMetadata();
    }
  };

  const saveMetadata = async () => {
    setIsLoading(true);
    try {
      await saveMetadataServer();
      toast({
        title: "Success",
        description: "Metadata saved successfully.",
      });
    } catch (error) {
      console.error("Error saving metadata:", error);
      toast({
        title: "Error",
        description: "Failed to save metadata. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = user
    ? "Save and Generate Metadata"
    : "Login to Generate og:image and Save Metadata";

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Button className="w-full" onClick={handleAction} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : user ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </div>{" "}
      {isLoginModalOpen && <LoginDialog />}
      {
        <Card>
          <CardContent className="pt-4">
            <h3 className="font-semibold text-sm mb-2">
              OG Image Content Link
            </h3>
            {isLoading ? (
              <div className="mt-2 flex flex-col gap-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              <p className="text-sm break-all mt-2">
                {!user
                  ? "Login to get your og:image metatag url"
                  : metadata.cid
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-og?cid=${metadata.cid}`
                    : "Save to generate og image metatag url"}
              </p>
            )}
          </CardContent>
        </Card>
      }
    </div>
  );
};

export default SaveOGMetadata;
