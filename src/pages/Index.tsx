
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { BloodType, ViewMode, getCompatibleTypes } from "@/utils/bloodTypeCompatibility";
import BloodTypeSelector from "@/components/BloodTypeSelector";
import PersonFigure from "@/components/PersonFigure";
import BloodFlow from "@/components/BloodFlow";
import { ArrowDown, ArrowUp } from "lucide-react";

const Index = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType>("O-");
  const [viewMode, setViewMode] = useState<ViewMode>("donor");
  const [isCircularLayout, setIsCircularLayout] = useState(true);

  // Get compatible blood types based on selection and mode
  const compatibleTypes = useMemo(() => 
    getCompatibleTypes(selectedBloodType, viewMode),
    [selectedBloodType, viewMode]
  );

  // Calculate positions for blood types in the visualization
  const positions = useMemo(() => {
    const allBloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const centerX = window.innerWidth > 768 ? 400 : window.innerWidth / 2;
    const centerY = window.innerWidth > 768 ? 300 : 350;
    
    // The selected blood type will be in the center
    const result: Record<BloodType, {x: number, y: number}> = {
      [selectedBloodType]: { x: centerX, y: centerY }
    };
    
    // Position the other blood types in a circle or grid around the center
    const otherTypes = allBloodTypes.filter(type => type !== selectedBloodType);
    
    if (isCircularLayout) {
      // Circular layout
      const radius = window.innerWidth > 768 ? 200 : 140;
      otherTypes.forEach((type, index) => {
        const angle = (index * 2 * Math.PI) / otherTypes.length;
        result[type] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        };
      });
    } else {
      // Grid layout
      const gridWidth = window.innerWidth > 768 ? 150 : 100;
      const gridHeight = window.innerWidth > 768 ? 150 : 120;
      const cols = 3;
      let row = 0;
      let col = 0;
      
      otherTypes.forEach((type, index) => {
        // Skip the center position
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

  // Handle blood type selection
  const handleSelectBloodType = (type: BloodType) => {
    setSelectedBloodType(type);
  };

  // Toggle view mode between donor and recipient
  const toggleViewMode = () => {
    setViewMode(viewMode === "donor" ? "recipient" : "donor");
  };

  // Determine if a blood type is compatible with the selection
  const getPersonStatus = (bloodType: BloodType) => {
    if (bloodType === selectedBloodType) return "active";
    if (compatibleTypes.includes(bloodType)) return "compatible";
    return "inactive";
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <header className="w-full p-4 bg-white shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Blood Type Compatibility Visualizer
        </h1>
      </header>

      {/* Controls */}
      <div className="w-full bg-white p-4 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center">
        <BloodTypeSelector
          selectedBloodType={selectedBloodType}
          onSelectBloodType={handleSelectBloodType}
        />

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button 
            onClick={toggleViewMode}
            variant="outline"
            className="flex items-center gap-2"
          >
            {viewMode === "donor" ? (
              <>
                <ArrowDown className="h-4 w-4" /> 
                Donor View
              </>
            ) : (
              <>
                <ArrowUp className="h-4 w-4" /> 
                Recipient View
              </>
            )}
          </Button>
          
          <Toggle 
            pressed={isCircularLayout} 
            onPressedChange={setIsCircularLayout}
            aria-label="Toggle layout"
          >
            {isCircularLayout ? "Circle" : "Grid"}
          </Toggle>
        </div>
      </div>

      {/* Explanation */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {viewMode === "donor" 
            ? `Blood type ${selectedBloodType} can donate to:`
            : `Blood type ${selectedBloodType} can receive from:`}
        </h2>
        <p className="text-gray-500 mt-2">
          {compatibleTypes.length > 0 
            ? compatibleTypes.join(", ") 
            : "No compatible blood types"}
        </p>
      </div>

      {/* Visualization */}
      <div className="w-full flex-grow relative overflow-hidden max-w-4xl mx-auto">
        <svg width="100%" height="100%" viewBox={`0 0 ${window.innerWidth} 600`} className="overflow-visible">
          {/* Connect tubes between compatible types */}
          {Object.keys(positions).map((type) => {
            const bloodType = type as BloodType;
            if (compatibleTypes.includes(bloodType) && bloodType !== selectedBloodType) {
              const delay = compatibleTypes.indexOf(bloodType) * 300;
              const start = positions[selectedBloodType];
              const end = positions[bloodType];
              
              return (
                <BloodFlow
                  key={`flow-${selectedBloodType}-${bloodType}`}
                  startX={viewMode === "donor" ? start.x : end.x}
                  startY={viewMode === "donor" ? start.y : end.y}
                  endX={viewMode === "donor" ? end.x : start.x}
                  endY={viewMode === "donor" ? end.y : start.y}
                  mode={viewMode}
                  delay={delay}
                />
              );
            }
            return null;
          })}
          
          {/* Render person figures for all blood types */}
          {Object.keys(positions).map((type) => {
            const bloodType = type as BloodType;
            const status = getPersonStatus(bloodType);
            
            return (
              <PersonFigure
                key={`person-${bloodType}`}
                bloodType={bloodType}
                status={status}
                position={positions[bloodType]}
                size={bloodType === selectedBloodType ? 70 : 50}
                onClick={() => handleSelectBloodType(bloodType)}
                isPulsing={bloodType === selectedBloodType}
              />
            );
          })}
        </svg>
      </div>
      
      {/* Footer */}
      <footer className="w-full p-4 text-center text-gray-500 mt-auto">
        <p className="text-sm">
          Click on any figure to select that blood type
        </p>
      </footer>
    </div>
  );
};

export default Index;
