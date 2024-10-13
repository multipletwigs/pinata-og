"use client";
import React from "react";
import useLayoutAStore from "@/app/(og-playground)/store/layouts/layout-a";
import useGradientStore from "@/app/(og-playground)/store/gradient";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const GradientOption = ({ gradient }) => (
  <div className="flex items-center">
    <RadioGroupItem
      value={gradient.name}
      id={gradient.name}
      className="peer sr-only"
    />
    <Label
      htmlFor={gradient.name}
      className="flex items-center rounded-md border-2 border-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
    >
      <div
        className="w-8 h-8 rounded"
        style={{
          background: `linear-gradient(to right, ${gradient.startColor}, ${gradient.endColor})`,
        }}
      />
    </Label>
  </div>
);

const GradientSelector = () => {
  const { gradients, selectedGradient, setSelectedGradient } =
    useGradientStore();
  const { setGradientStart, setGradientEnd } = useLayoutAStore();

  const handleGradientChange = (gradientName) => {
    const gradient = gradients.find((g) => g.name === gradientName);
    if (gradient) {
      setSelectedGradient(gradient);
      setGradientStart(gradient.startColor);
      setGradientEnd(gradient.endColor);
    }
  };

  return (
    <ScrollArea className="pr-4">
      <RadioGroup
        value={selectedGradient.name}
        onValueChange={handleGradientChange}
        className="grid-cols-12"
      >
        {gradients.map((gradient) => (
          <GradientOption
            key={gradient.name}
            gradient={gradient}
            isSelected={selectedGradient.name === gradient.name}
            onSelect={() => handleGradientChange(gradient.name)}
          />
        ))}
      </RadioGroup>
    </ScrollArea>
  );
};

export default GradientSelector;
