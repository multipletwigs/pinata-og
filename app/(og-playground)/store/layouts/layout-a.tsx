import React from "react";
import { create } from "zustand";

// Define the grid type options
type GridType = "none" | "lines";

// Define the store state type
interface LayoutAState {
  logoSrc: string;
  companyName: string;
  ctaText: string;
  title: string;
  gradientStart: string;
  gradientEnd: string;
  gridType: GridType;
  imageSrc: string; // New property for the right-side image
  setLogoSrc: (logoSrc: string) => void;
  setCompanyName: (companyName: string) => void;
  setCtaText: (ctaText: string) => void;
  setTitle: (title: string) => void;
  setGradientStart: (gradientStart: string) => void;
  setGradientEnd: (gradientEnd: string) => void;
  setGridType: (gridType: GridType) => void;
  setImageSrc: (imageSrc: string) => void; // New setter for imageSrc
}

// Create the Zustand store
const useLayoutAStore = create<LayoutAState>((set) => ({
  logoSrc: "https://placekitten.com/200/200", // Larger, softer kitten image
  companyName: "Serene Solutions",
  ctaText: "Begin Your Journey",
  title: "Embrace Simplicity, Unlock Potential",
  gradientStart: "#E6F2FF", // Soft sky blue
  gradientEnd: "#FFF0F5", // Light lavender pink
  gridType: "lines",
  imageSrc: "https://placekitten.com/450/500", // Default image for the right side
  setLogoSrc: (logoSrc) => set({ logoSrc }),
  setCompanyName: (companyName) => set({ companyName }),
  setCtaText: (ctaText) => set({ ctaText }),
  setTitle: (title) => set({ title }),
  setGradientStart: (gradientStart) => set({ gradientStart }),
  setGradientEnd: (gradientEnd) => set({ gradientEnd }),
  setGridType: (gridType) => set({ gridType }),
  setImageSrc: (imageSrc) => set({ imageSrc }), // New setter function
}));

export default useLayoutAStore;
