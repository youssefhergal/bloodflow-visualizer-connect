
import React, { useState, useMemo } from "react";
import { BloodType, ViewMode, getCompatibleTypes } from "@/utils/bloodTypeCompatibility";
import VisualizerHeader from "@/components/layout/VisualizerHeader";
import VisualizerExplanation from "@/components/blood/VisualizerExplanation";
import VisualizerDisplay from "@/components/blood/VisualizerDisplay";

const Index = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType>("O-");
  const [viewMode, setViewMode] = useState<ViewMode>("donor");
  const [isCircularLayout, setIsCircularLayout] = useState(true);

  const compatibleTypes = useMemo(() => 
    getCompatibleTypes(selectedBloodType, viewMode),
    [selectedBloodType, viewMode]
  );

  // Calculate positions for blood types in the visualization
  const positions = useMemo(() => {
    const allBloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const centerX = window.innerWidth > 768 ? 400 : window.innerWidth / 2;
    const centerY = window.innerWidth > 768 ? 300 : 350;
    
    // Initialize positions with center position for selected type
    const result: Record<BloodType, {x: number, y: number}> = {
      "A+": { x: 0, y: 0 },
      "A-": { x: 0, y: 0 },
      "B+": { x: 0, y: 0 },
      "B-": { x: 0, y: 0 },
      "AB+": { x: 0, y: 0 },
      "AB-": { x: 0, y: 0 },
      "O+": { x: 0, y: 0 },
      "O-": { x: 0, y: 0 }
    };

    // Set the selected blood type in the center
    result[selectedBloodType] = { x: centerX, y: centerY };
    
    // Position other blood types around the center
    const otherTypes = allBloodTypes.filter(type => type !== selectedBloodType);
    
    if (isCircularLayout) {
      // Circular layout calculations
      const radius = window.innerWidth > 768 ? 200 : 140;
      otherTypes.forEach((type, index) => {
        const angle = (index * 2 * Math.PI) / otherTypes.length;
        result[type] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        };
      });
    } else {
      // Grid layout calculations
      const gridWidth = window.innerWidth > 768 ? 150 : 100;
      const gridHeight = window.innerWidth > 768 ? 150 : 120;
      const cols = 3;
      let row = 0;
      let col = 0;
      
      otherTypes.forEach((type, index) => {
        // Skip the center position if needed
        if (row === 1 && col === 1) {
          col++;
          if (col >= cols) {
            col = 0;
            row++;
          }
        }
        
        result[type] = {
          x: centerX + (col - 1) * gridWidth,
          y: centerY + (row - 1) * gridHeight
        };
        
        col++;
        if (col >= cols) {
          col = 0;
          row++;
        }
      });
    }
    
    return result;
  }, [selectedBloodType, isCircularLayout]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <VisualizerHeader
        selectedBloodType={selectedBloodType}
        viewMode={viewMode}
        isCircularLayout={isCircularLayout}
        onSelectBloodType={setSelectedBloodType}
        onToggleViewMode={() => setViewMode(viewMode === "donor" ? "recipient" : "donor")}
        onToggleLayout={setIsCircularLayout}
      />

      <VisualizerExplanation
        selectedBloodType={selectedBloodType}
        viewMode={viewMode}
        compatibleTypes={compatibleTypes}
      />

      <VisualizerDisplay
        positions={positions}
        compatibleTypes={compatibleTypes}
        selectedBloodType={selectedBloodType}
        viewMode={viewMode}
        onSelectBloodType={setSelectedBloodType}
      />
      
      <footer className="w-full p-4 text-center text-gray-500 mt-auto">
        <p className="text-sm">
          Click on any figure to select that blood type
        </p>
      </footer>
    </div>
  );
};

export default Index;
