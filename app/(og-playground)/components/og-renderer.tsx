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
import { CheckCircle2, Download, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface OGImageRendererProps {
  previewWidth?: number;
}

const OGImageRenderer: React.FC<OGImageRendererProps> = React.memo((props) => {
  const { previewWidth = 600 } = props;
  const ogImageRef = useRef<HTMLDivElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
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

  const debouncedGenerateImage = useCallback(debounce(generateImage, 500), []);

  useEffect(() => {
    debouncedGenerateImage();
  }, [layoutAStore, debouncedGenerateImage]);

  const previewHeight = useMemo(() => {
    return previewWidth * (630 / 1200);
  }, [previewWidth]);

  const handleDownload = useCallback(() => {
    if (imageDataUrl) {
      const link = document.createElement("a");
      link.href = imageDataUrl;
      link.download = "og-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [imageDataUrl]);

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
        <legend>Open Graph Image Preview</legend>
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
          <Alert
            variant="default"
            className="transition-all flex flex-row items-center justify-between duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <Loader className="h-4 w-4 text-yellow-400 mr-2 animate-spin" />
              <AlertDescription>Generating Image...</AlertDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              disabled
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </Alert>
        )}
        {isComplete && !isGenerating && (
          <Alert
            variant="default"
            className="transition-all flex flex-row items-center justify-between duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              <AlertDescription>Image generation complete!</AlertDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </Alert>
        )}
      </fieldset>
    </div>
  );
});

export default OGImageRenderer;
