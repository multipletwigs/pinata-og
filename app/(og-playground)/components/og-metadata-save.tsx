"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import useOGMetadataStore from "@/app/(og-playground)/store/og-metadata";
import { useAuthStore } from "../store/auth-user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const supabase = createClient();

const SaveOGMetadata = () => {
  const { metadata } = useOGMetadataStore();
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const saveMetadata = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save metadata.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase.from("paths").upsert(
        {
          name: metadata.og_image_name,
          title: metadata.title,
          description: metadata.description,
          image_url: metadata.imageUrl,
          site_name: metadata.siteName,
          og_url: metadata.url,
          user_id: user.id, // Ensure user_id is set
        },
        {
          onConflict: "name, user_id",
          returning: "minimal",
        },
      );

      if (error) throw error;

      toast({
        title: "Metadata Saved",
        description: "Your OG metadata has been successfully saved.",
      });
    } catch (error) {
      console.error("Error saving metadata:", error);
      toast({
        title: "Error",
        description: "Failed to save metadata. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const buttonContent = (
    <Button onClick={saveMetadata} disabled={isSaving || !user}>
      {isSaving ? "Saving..." : "Save to Supabase"}
    </Button>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        {!user && (
          <TooltipContent>
            <p>Please log in to save metadata</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SaveOGMetadata;
