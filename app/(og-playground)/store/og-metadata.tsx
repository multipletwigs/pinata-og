import { create } from "zustand";

interface OGMetadata {
  og_image_name: string;
  title: string;
  description: string;
  imageUrl: string;
  siteName: string;
  url: string;
}

interface OGMetadataStore {
  metadata: OGMetadata;
  setMetadata: (metadata: Partial<OGMetadata>) => void;
  resetMetadata: () => void;
}

const initialMetadata: OGMetadata = {
  og_image_name: "",
  title: "",
  description: "",
  imageUrl: "",
  siteName: "",
  url: "",
};

const useOGMetadataStore = create<OGMetadataStore>((set) => ({
  metadata: initialMetadata,
  setMetadata: (newMetadata) =>
    set((state) => ({
      metadata: { ...state.metadata, ...newMetadata },
    })),
  resetMetadata: () => set({ metadata: initialMetadata }),
}));

export default useOGMetadataStore;
