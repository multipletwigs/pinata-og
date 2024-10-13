"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useOGMetadataStore from "@/app/(og-playground)/store/og-metadata";
import { useAuthStore } from "../store/auth-user";
import { LoginDialog } from "@/components/login-dialog";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SaveOGMetadata = () => {
  const { saveMetadata: saveMetadataServer, metadata } = useOGMetadataStore();
  const { user, setIsLoginModalOpen, isLoginModalOpen } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

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
    : "Login to Generate and Save Metadata";

  return (
    <div className="space-y-4">
      <Button className="w-full" onClick={handleAction} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          buttonText
        )}
      </Button>
      {isLoginModalOpen && <LoginDialog />}
      {metadata.cid && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-sm mb-2">Generated Metadata</h3>
            <p className="text-sm mb-2">
              <span className="font-medium">CID:</span> {metadata.cid}
            </p>
            <p className="text-sm break-all">
              <span className="font-medium">Full API URL:</span>{" "}
              {`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/og-image?cid=${metadata.cid}`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SaveOGMetadata;
