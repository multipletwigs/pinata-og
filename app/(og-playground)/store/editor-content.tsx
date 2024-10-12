import { create } from "zustand";

interface EditorState {
  content: string;
  language: string;
  theme: string;
  setContent: (newContent: string) => void;
  setLanguage: (newLanguage: string) => void;
  setTheme: (newTheme: string) => void;
  resetContent: () => void;
}

const useEditorStore = create<EditorState>((set) => ({
  content: "",
  language: "typescript",
  theme: "vs-dark",

  setContent: (newContent) => set({ content: newContent }),
  setLanguage: (newLanguage) => set({ language: newLanguage }),
  setTheme: (newTheme) => set({ theme: newTheme }),

  resetContent: () => set({ content: "" }),
}));

export default useEditorStore;
