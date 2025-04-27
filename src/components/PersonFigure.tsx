
import React from "react";
import { cn } from "@/lib/utils";
import { BloodType } from "@/utils/bloodTypeCompatibility";

export type PersonStatus = "active" | "compatible" | "inactive";

interface PersonFigureProps {
  bloodType: BloodType;
  status: PersonStatus;
  position: { x: number; y: number };
  size?: number;
  onClick?: () => void;
  isPulsing?: boolean;
}

const PersonFigure: React.FC<PersonFigureProps> = ({
  bloodType,
  status,
  position,
  size = 50,
  onClick,
  isPulsing = false
}) => {
  // Status-based styling
  const statusStyles = {
    active: "fill-[hsl(var(--donor-color))]",
    compatible: "fill-[hsl(var(--recipient-color))]",
    inactive: "fill-[hsl(var(--inactive-color))]"
  };

  return (
    <g 
      transform={`translate(${position.x - size/2}, ${position.y - size/2})`}
      className={cn(
        "cursor-pointer transition-all duration-300 person-fade-in", 
        isPulsing && "pulse"
      )}
      onClick={onClick}
    >
      {/* Person Silhouette */}
      <svg 
        width={size} 
        height={size * 1.8} 
        viewBox="0 0 100 180" 
        className={statusStyles[status]}
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
      
      {/* Blood Type Label */}
      <div className="absolute top-[5px] left-0 w-full text-center">
        <span 
          className={cn(
            "inline-block px-2 py-1 rounded-full text-xs font-bold shadow-sm",
            status === "active" ? "bg-white text-[hsl(var(--donor-color))]" : 
            status === "compatible" ? "bg-white text-[hsl(var(--recipient-color))]" :
            "bg-white text-gray-600"
          )}
        >
          {bloodType}
        </span>
      </div>
    </g>
  );
};

export default PersonFigure;
