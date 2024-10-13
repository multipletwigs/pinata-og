import { create } from "zustand";

type GridType = "none" | "lines";

interface LayoutAState {
  logoSrc: string;
  companyName: string;
  ctaText: string;
  title: string;
  gradientStart: string;
  gradientEnd: string;
  gridType: GridType;
  imageSrc: string;
  setLogoSrc: (logoSrc: string) => void;
  setCompanyName: (companyName: string) => void;
  setCtaText: (ctaText: string) => void;
  setTitle: (title: string) => void;
  setGradientStart: (gradientStart: string) => void;
  setGradientEnd: (gradientEnd: string) => void;
  setGridType: (gridType: GridType) => void;
  setImageSrc: (imageSrc: string) => void;
}

const useLayoutAStore = create<LayoutAState>((set) => ({
  logoSrc: "default-layouts/pinata-logo.png",
  companyName: "~/npm i pinata",
  ctaText: "-- because you’ve got better things to code than infrastructure.",
  title: "THE INTERNET'S FILE API",
  gradientStart: "#E6F2FF",
  gradientEnd: "#FFF0F5",
  gridType: "lines",
  imageSrc: "default-layouts/pinata-mascot.png",
  setLogoSrc: (logoSrc) => set({ logoSrc }),
  setCompanyName: (companyName) => set({ companyName }),
  setCtaText: (ctaText) => set({ ctaText }),
  setTitle: (title) => set({ title }),
  setGradientStart: (gradientStart) => set({ gradientStart }),
  setGradientEnd: (gradientEnd) => set({ gradientEnd }),
  setGridType: (gridType) => set({ gridType }),
  setImageSrc: (imageSrc) => set({ imageSrc }),
}));

export default useLayoutAStore;
