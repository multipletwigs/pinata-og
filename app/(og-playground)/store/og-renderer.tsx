import { create } from "zustand";

interface OGImageState {
  imageDataUrl: string | null;
  isGenerating: boolean;
  isComplete: boolean;
  setImageDataUrl: (url: string | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
}

const useOGImageStore = create<OGImageState>((set, get) => ({
  imageDataUrl: null,
  isGenerating: false,
  isComplete: false,
  setImageDataUrl: (url) => set({ imageDataUrl: url }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsComplete: (isComplete) => set({ isComplete }),
}));

export default useOGImageStore;
