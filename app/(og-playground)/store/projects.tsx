import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Domain = {
  id: string;
  name: string;
  paths: Path[];
};

type Path = {
  id: string;
  name: string;
  image: Image | null;
};

type Image = {
  id: string;
  src: string;
};

type UploadStore = {
  domains: Domain[];
  selectedDomain: Domain | null;
  fetchDomains: () => Promise<void>;
  addDomain: (name: string) => Promise<void>;
  selectDomain: (domain: Domain) => void;
  addPath: (domainId: string, pathName: string) => Promise<void>;
  uploadImage: (domainId: string, pathId: string, file: File) => Promise<void>;
};

const useUploadStore = create<UploadStore>((set, get) => ({
  domains: [],
  selectedDomain: null,

  fetchDomains: async () => {
    const { data, error } = await supabase.from("domains").select(`
        id, 
        name, 
        paths (
          id, 
          name, 
          images (
            id, 
            src
          )
        )
      `);
    if (error) throw error;
    set({ domains: data });
  },

  addDomain: async (name: string) => {
    const { data, error } = await supabase
      .from("domains")
      .insert({ name })
      .select()
      .single();
    if (error) throw error;
    set((state) => ({
      domains: [...state.domains, { ...data, paths: [] }],
      selectedDomain: { ...data, paths: [] },
    }));
  },

  selectDomain: (domain: Domain) => set({ selectedDomain: domain }),

  addPath: async (domainId: string, pathName: string) => {
    const { data, error } = await supabase
      .from("paths")
      .insert({ name: pathName, domain_id: domainId })
      .select()
      .single();
    if (error) throw error;
    set((state) => ({
      domains: state.domains.map((d) =>
        d.id === domainId ? { ...d, paths: [...d.paths, data] } : d,
      ),
      selectedDomain:
        state.selectedDomain && state.selectedDomain.id === domainId
          ? {
              ...state.selectedDomain,
              paths: [...state.selectedDomain.paths, data],
            }
          : state.selectedDomain,
    }));
  },

  uploadImage: async (domainId: string, pathId: string, file: File) => {
    const formData = new FormData();
    formData.append("domainId", domainId);
    formData.append("pathId", pathId);
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { data } = await response.json();

    set((state) => ({
      domains: state.domains.map((d) =>
        d.id === domainId
          ? {
              ...d,
              paths: d.paths.map((p) =>
                p.id === pathId ? { ...p, image: data } : p,
              ),
            }
          : d,
      ),
      selectedDomain:
        state.selectedDomain && state.selectedDomain.id === domainId
          ? {
              ...state.selectedDomain,
              paths: state.selectedDomain.paths.map((p) =>
                p.id === pathId ? { ...p, image: data } : p,
              ),
            }
          : state.selectedDomain,
    }));
  },
}));

export default useUploadStore;
