import React, { useMemo } from "react";
import useLayoutAStore from "@/app/(og-playground)/store/layouts/layout-a";

const LayoutA: React.FC = () => {
  const {
    logoSrc,
    companyName,
    ctaText,
    title,
    gradientStart,
    gradientEnd,
    gridType,
    imageSrc, // New property for the right-side image
  } = useLayoutAStore();

  const getGridBackground = useMemo(() => {
    switch (gridType) {
      case "lines":
        return `
          linear-gradient(to right, #00000010 1px, transparent 1px),
          linear-gradient(to bottom, #00000010 1px, transparent 1px),
          linear-gradient(to right, ${gradientStart}, ${gradientEnd})
        `;
      case "none":
      default:
        return `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
    }
  }, [gridType, gradientStart, gradientEnd]);

  const getGridBackgroundSize = useMemo(() => {
    switch (gridType) {
      case "lines":
        return "20px 20px, 20px 20px, 100% 100%";
      case "none":
      default:
        return "100% 100%";
    }
  }, [gridType]);

  return (
    <div
      className="w-[1200px] h-[630px] flex p-16"
      style={{
        background: getGridBackground,
        backgroundSize: getGridBackgroundSize,
      }}
    >
      <div className="flex flex-col justify-between w-1/2">
        <div className="flex items-center space-x-3">
          <img
            src={logoSrc}
            alt={`${companyName} logo`}
            className="w-12 h-12"
          />
          <span className="text-3xl font-bold text-blue-600">
            {companyName}
          </span>
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          <p className="text-2xl text-gray-600">{ctaText}</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <img
          src={imageSrc}
          alt="Product screenshot"
          className="w-[450px] h-auto object-contain rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default LayoutA;
