
import React from "react";
import { BloodType, ViewMode } from "@/utils/bloodTypeCompatibility";
import PersonFigure from "@/components/PersonFigure";

interface VerticalHierarchyProps {
  selectedBloodType: BloodType;
  compatibleTypes: BloodType[];
  onSelectBloodType: (type: BloodType) => void;
  isAnimating: boolean;
}

const VerticalHierarchy: React.FC<VerticalHierarchyProps> = ({
  selectedBloodType,
  compatibleTypes,
  onSelectBloodType,
  isAnimating
}) => {
  // Define the order of blood types to be displayed (top to bottom)
  const bloodTypeOrder: BloodType[] = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  const getPersonStatus = (bloodType: BloodType) => {
    if (bloodType === selectedBloodType) return "active";
    if (compatibleTypes.includes(bloodType)) return "compatible";
    return "inactive";
  };

  return (
    <div className="vertical-hierarchy flex flex-col items-center w-full px-4">
      {/* Main vertical tube */}
      <div className="vertical-tube w-2 bg-gray-300 flex flex-col items-center">
        {bloodTypeOrder.map((bloodType, index) => {
          const status = getPersonStatus(bloodType);
          const isCompatible = compatibleTypes.includes(bloodType);
          
          return (
            <div key={bloodType} className="person-section flex flex-col items-center">
              {/* Blood flow animation */}
              {isAnimating && index > 0 && (
                <div 
                  className={`blood-drop w-2 h-16 ${isCompatible ? "bg-[hsl(var(--donor-color))]" : "bg-gray-300"}`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: "0.5s"
                  }}
                ></div>
              )}
              
              {/* Person with blood type */}
              <div className="person-container flex items-center justify-center relative h-24">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center">
                    <div 
                      className={`horizontal-tube w-16 h-2 ${isCompatible ? "bg-[hsl(var(--donor-color))]" : "bg-gray-300"}`}
                    ></div>
                    <div 
                      className="person-wrapper cursor-pointer"
                      onClick={() => onSelectBloodType(bloodType)}
                    >
                      <svg 
                        width={60} 
                        height={100} 
                        viewBox="0 0 100 180" 
                        className={`${
                          status === "active" ? "fill-[hsl(var(--donor-color))]" : 
                          status === "compatible" ? "fill-[hsl(var(--recipient-color))]" :
                          "fill-[hsl(var(--inactive-color))]"
                        } transition-colors duration-300`}
                      >
                        {/* Head */}
                        <circle cx="50" cy="30" r="20" />
                        
                        {/* Body */}
                        <rect x="35" y="50" width="30" height="60" rx="5" />
                        
                        {/* Arms */}
                        <rect x="10" y="60" width="25" height="10" rx="5" />
                        <rect x="65" y="60" width="25" height="10" rx="5" />
                        
                        {/* Legs */}
                        <rect x="35" y="110" width="10" height="50" rx="5" />
                        <rect x="55" y="110" width="10" height="50" rx="5" />
                      </svg>
                      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-white px-2 py-1 rounded-full text-sm font-bold shadow-sm">
                        {bloodType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalHierarchy;
