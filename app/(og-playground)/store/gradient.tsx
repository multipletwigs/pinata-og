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
  { name: "Sunset Bliss", startColor: "#FFD700", endColor: "#FF6347" },
  { name: "Ocean Breeze", startColor: "#87CEEB", endColor: "#20B2AA" },
  { name: "Lavender Fields", startColor: "#E6E6FA", endColor: "#9370DB" },
  { name: "Mint Chocolate", startColor: "#98FF98", endColor: "#4A4A4A" },
  { name: "Cherry Blossom", startColor: "#FFC0CB", endColor: "#FF69B4" },
  { name: "Golden Hour", startColor: "#FFA500", endColor: "#FF4500" },
  { name: "Arctic Aurora", startColor: "#00FFFF", endColor: "#8A2BE2" },
  { name: "Forest Mist", startColor: "#228B22", endColor: "#ADFF2F" },
  { name: "Desert Sand", startColor: "#F4A460", endColor: "#D2691E" },
  { name: "Twilight Zone", startColor: "#4B0082", endColor: "#800080" },
  { name: "Peachy Keen", startColor: "#FFDAB9", endColor: "#FF7F50" },
  { name: "Blue Lagoon", startColor: "#00BFFF", endColor: "#48D1CC" },
  { name: "Lemon Lime", startColor: "#FFFACD", endColor: "#32CD32" },
  { name: "Cotton Candy", startColor: "#FFB6C1", endColor: "#87CEFA" },
  { name: "Autumn Leaves", startColor: "#FFA07A", endColor: "#8B4513" },
];

const useGradientStore = create<GradientState>((set) => ({
  gradients: predefinedGradients,
  selectedGradient: predefinedGradients[0],
  setSelectedGradient: (gradient) => set({ selectedGradient: gradient }),
}));

export default useGradientStore;
