import { create } from "zustand";
import useOGImageStore from "./og-renderer"; // Import the OG image store

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

export interface OGMetadataStore {
  metadata: OGMetadata;
  setMetadata: (metadata: Partial<OGMetadata>) => void;
  resetMetadata: () => void;
  saveMetadata: () => Promise<void>;
}

const initialMetadata: OGMetadata = {
  author: null,
  cid: "",
  created_at: null,
  description: null,
  id: "",
  og_image_path: null,
  site_name: null,
  title: "",
  updated_at: null,
  user_id: null,
};

const useOGMetadataStore = create<OGMetadataStore>((set, get) => ({
  metadata: initialMetadata,
  setMetadata: (newMetadata) =>
    set((state) => ({
      metadata: { ...state.metadata, ...newMetadata },
    })),
  resetMetadata: () => set({ metadata: initialMetadata }),
  saveMetadata: async () => {
    try {
      const imageDataUrl = useOGImageStore.getState().imageDataUrl;
      if (!imageDataUrl) {
        throw new Error("No image data available");
      }

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], "og-image.png", { type: "image/png" });

      const formData = new FormData();
      formData.append(
        "metadata",
        JSON.stringify({ ...get().metadata, cid: "" }),
      );
      formData.append("image", file);

      const submitResponse = await fetch("/api/save-metadata", {
        method: "POST",
        body: formData,
      });

      if (!submitResponse.ok) {
        throw new Error("Failed to save metadata");
      }

      const result = await submitResponse.json();
      if (result.success) {
        if (result.data && result.data[0]) {
          set((state) => ({
            metadata: { ...state.metadata, ...result.data[0] },
          }));
        }
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      throw error;
    }
  },
}));

export default useOGMetadataStore;
