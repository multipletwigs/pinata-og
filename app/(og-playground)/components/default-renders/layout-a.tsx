"use client";
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
    imageSrc,
  } = useLayoutAStore();

  const gridBackground = useMemo(() => {
    switch (gridType) {
      case "lines":
        return `
          linear-gradient(to right, #00000010 1px, transparent 1px),
          linear-gradient(to bottom, #00000010 1px, transparent 1px)
        `;
      case "none":
      default:
        return "none";
    }
  }, [gridType]);

  const gradientBackground = useMemo(() => {
    return `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
  }, [gradientStart, gradientEnd]);

  const backgroundImage = useMemo(() => {
    return gridType === "lines"
      ? `${gridBackground}, ${gradientBackground}`
      : gradientBackground;
  }, [gridType, gridBackground, gradientBackground]);

  const backgroundSize = useMemo(() => {
    return gridType === "lines"
      ? "20px 20px, 20px 20px, 100% 100%"
      : "100% 100%";
  }, [gridType]);

  return (
    <div
      className="w-[1200px] h-[630px] flex p-16"
      style={{
        backgroundImage,
        backgroundSize,
        backgroundRepeat:
          gridType === "lines" ? "repeat, repeat, no-repeat" : "no-repeat",
        backgroundPosition: "0 0, 0 0, 0 0",
      }}
    >
      <div className="flex flex-col justify-between w-1/2">
        <div className="flex items-center space-x-3">
          <img
            src={logoSrc}
            alt={`${companyName} logo`}
            className="w-12 h-12"
          />
          <span className="text-3xl font-bold text-gray-800">
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
          className="w-[450px] h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default React.memo(LayoutA);
