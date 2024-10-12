"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { debounce } from "@/lib/utils";
import html2canvas from "html2canvas";
import LayoutA from "./default-renders/layout-a";
import useLayoutAStore from "../store/layouts/layout-a";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface OGImageRendererProps {
  previewWidth?: number;
  // Add other props here
}

const OGImageRenderer: React.FC<OGImageRendererProps> = React.memo((props) => {
  const { previewWidth = 600 } = props;
  const ogImageRef = useRef<HTMLDivElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const layoutAStore = useLayoutAStore();

  const generateImage = async () => {
    if (ogImageRef.current) {
      setIsGenerating(true);
      setIsComplete(false);
      try {
        const canvas = await html2canvas(ogImageRef.current);
        const dataUrl = canvas.toDataURL("image/png");
        setImageDataUrl(dataUrl);
        setIsComplete(true);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  // Create a debounced version of generateImage
  const debouncedGenerateImage = useCallback(
    debounce(generateImage, 500), // 500ms debounce time
    [],
  );

  useEffect(() => {
    debouncedGenerateImage();
    // No need for cleanup function as our custom debounce doesn't have a cancel method
  }, [layoutAStore, debouncedGenerateImage]);

  const previewHeight = useMemo(() => {
    return previewWidth * (630 / 1200);
  }, [previewWidth]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute -inset-[99999px] pointer-events-none"
        aria-hidden="true"
      >
        <div ref={ogImageRef} style={{ width: "1200px", height: "630px" }}>
          <LayoutA />
        </div>
      </div>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend>Image</legend>
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt="Generated OG Image"
            style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
              objectFit: "contain",
            }}
          />
        ) : (
          <Skeleton
            style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
              objectFit: "contain",
            }}
          />
        )}
        {isGenerating && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>Generating new image...</AlertDescription>
          </Alert>
        )}
        {isComplete && !isGenerating && (
          <Alert
            variant="default"
            className="transition-all duration-300 ease-in-out"
          >
            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
            <AlertDescription>Image generation complete!</AlertDescription>
          </Alert>
        )}
      </fieldset>
    </div>
  );
});

export default OGImageRenderer;
