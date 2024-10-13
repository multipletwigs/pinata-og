import { create } from "zustand";
import { OGMetadata } from "./og-metadata"; // Import the OGMetadata type from your existing store
import { createClient } from "@/lib/supabase/client";

interface OGMetadataListStore {
  metadataList: OGMetadata[];
  isLoading: boolean;
  error: string | null;
  fetchAllMetadata: () => Promise<void>;
}

const useOGMetadataListStore = create<OGMetadataListStore>((set) => ({
  metadataList: [],
  isLoading: false,
  error: null,
  fetchAllMetadata: async () => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from("og_content").select("*");

      if (error) throw error;

      set({ metadataList: data as OGMetadata[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useOGMetadataListStore;
