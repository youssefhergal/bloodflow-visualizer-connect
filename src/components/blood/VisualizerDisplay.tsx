
import React from "react";
import { BloodType, ViewMode } from "@/utils/bloodTypeCompatibility";
import PersonFigure from "@/components/PersonFigure";
import BloodFlow from "@/components/BloodFlow";

interface VisualizerDisplayProps {
  positions: Record<BloodType, { x: number; y: number }>;
  compatibleTypes: BloodType[];
  selectedBloodType: BloodType;
  viewMode: ViewMode;
  onSelectBloodType: (type: BloodType) => void;
}

const VisualizerDisplay: React.FC<VisualizerDisplayProps> = ({
  positions,
  compatibleTypes,
  selectedBloodType,
  viewMode,
  onSelectBloodType,
}) => {
  const getPersonStatus = (bloodType: BloodType) => {
    if (bloodType === selectedBloodType) return "active";
    if (compatibleTypes.includes(bloodType)) return "compatible";
    return "inactive";
  };

  return (
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
              onClick={() => onSelectBloodType(bloodType)}
              isPulsing={bloodType === selectedBloodType}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default VisualizerDisplay;
