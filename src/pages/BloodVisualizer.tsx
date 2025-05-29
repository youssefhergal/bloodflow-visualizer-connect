
import React, { useState, useEffect, useMemo } from "react";
import { BloodType, ViewMode, getCompatibleTypes } from "@/utils/bloodTypeCompatibility";
import VisualizerHeader from "@/components/layout/VisualizerHeader";
import VisualizerExplanation from "@/components/blood/VisualizerExplanation";
import BloodPack from "@/components/blood/BloodPack";
import VerticalHierarchy from "@/components/blood/VerticalHierarchy";

const BloodVisualizer = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType>("O-");
  const [viewMode, setViewMode] = useState<ViewMode>("donor");
  const [isAnimating, setIsAnimating] = useState(false);
  
  const compatibleTypes = useMemo(() => 
    getCompatibleTypes(selectedBloodType, viewMode),
    [selectedBloodType, viewMode]
  );

  // Reset and trigger animation when selection changes
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedBloodType, viewMode]);

  const handleSelectBloodType = (type: BloodType) => {
    if (type !== selectedBloodType) {
      setSelectedBloodType(type);
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center bg-[hsl(var(--clr-surface-a10))]">
      <h1 className="text-3xl font-bold text-center mb-6 text-[hsl(var(--clr-primary-a30))]">
        Blood Type Compatibility Visualizer
      </h1>
      
      <VisualizerHeader
        selectedBloodType={selectedBloodType}
        viewMode={viewMode}
        isCircularLayout={false}
        onSelectBloodType={handleSelectBloodType}
        onToggleViewMode={() => setViewMode(viewMode === "donor" ? "recipient" : "donor")}
        onToggleLayout={() => {}}
      />

      <VisualizerExplanation
        selectedBloodType={selectedBloodType}
        viewMode={viewMode}
        compatibleTypes={compatibleTypes}
      />

      <div className="horizontal-visualizer flex flex-col items-center w-full max-w-5xl">
        <BloodPack isActive={isAnimating} />
        
        <VerticalHierarchy
          selectedBloodType={selectedBloodType}
          compatibleTypes={compatibleTypes}
          onSelectBloodType={handleSelectBloodType}
          isAnimating={isAnimating}
        />
      </div>
      
      <footer className="w-full p-4 text-center text-gray-400 mt-auto">
        <p className="text-sm">
          Click on any figure to select that blood type
        </p>
      </footer>
    </div>
  );
};

export default BloodVisualizer;
