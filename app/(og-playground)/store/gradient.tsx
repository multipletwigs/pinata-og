import { create } from "zustand";

type Gradient = {
  name: string;
  startColor: string;
  endColor: string;
};

interface GradientState {
  gradients: Gradient[];
  selectedGradient: Gradient;
  setSelectedGradient: (gradient: Gradient) => void;
}

const predefinedGradients: Gradient[] = [
  { name: "Serene Sky", startColor: "#E6F2FF", endColor: "#FFF0F5" },
  { name: "Ocean Breeze", startColor: "#87CEEB", endColor: "#20B2AA" },
  { name: "Arctic Aurora", startColor: "#00FFFF", endColor: "#8A2BE2" },
  { name: "Peachy Keen", startColor: "#FFDAB9", endColor: "#FF7F50" },
  { name: "Lemon Lime", startColor: "#FFFACD", endColor: "#32CD32" },
  { name: "Cotton Candy", startColor: "#FFB6C1", endColor: "#87CEFA" },
  { name: "Coral Reef", startColor: "#FF7F50", endColor: "#00CED1" },
  { name: "Vintage Rose", startColor: "#FFF0F5", endColor: "#DB7093" },
  { name: "Citrus Burst", startColor: "#FFA500", endColor: "#7FFF00" },
  { name: "Wildflower Meadow", startColor: "#DDA0DD", endColor: "#90EE90" },
  { name: "Frosty Mint", startColor: "#F0FFF0", endColor: "#98FB98" },
  { name: "Raspberry Sorbet", startColor: "#FFB6C1", endColor: "#C71585" },
];
const useGradientStore = create<GradientState>((set) => ({
  gradients: predefinedGradients,
  selectedGradient: predefinedGradients[0],
  setSelectedGradient: (gradient) => set({ selectedGradient: gradient }),
}));

export default useGradientStore;
