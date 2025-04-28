
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
  // Define the order of blood types to be displayed (left to right)
  const bloodTypeOrder: BloodType[] = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  const getPersonStatus = (bloodType: BloodType) => {
    if (bloodType === selectedBloodType) return "active";
    if (compatibleTypes.includes(bloodType)) return "compatible";
    return "inactive";
  };

  return (
    <div className="horizontal-hierarchy flex flex-col items-center w-full px-4">
      {/* Main horizontal tube */}
      <div className="horizontal-tube h-2 bg-gray-300 flex flex-row items-center justify-center w-full max-w-4xl">
        <div className="flex flex-row justify-between w-full">
          {bloodTypeOrder.map((bloodType, index) => {
            const status = getPersonStatus(bloodType);
            const isCompatible = compatibleTypes.includes(bloodType);
            
            return (
              <div key={bloodType} className="person-section flex flex-col items-center mx-2">
                {/* Vertical tube connecting to person */}
                <div 
                  className={`vertical-connector h-16 w-2 ${isCompatible ? "bg-[hsl(var(--donor-color))]" : "bg-gray-300"}`}
                >
                  {/* Blood flow animation */}
                  {isAnimating && isCompatible && (
                    <div 
                      className="blood-drop h-full w-2 bg-[hsl(var(--donor-color))]"
                      style={{
                        animationDelay: `${index * 0.2}s`,
                        animationDuration: "0.5s"
                      }}
                    ></div>
                  )}
                </div>
                
                {/* Person with blood type */}
                <div className="person-container flex items-center justify-center relative">
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalHierarchy;
