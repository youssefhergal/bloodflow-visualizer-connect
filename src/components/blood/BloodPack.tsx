
import React from "react";
import { Droplet } from "lucide-react";

interface BloodPackProps {
  isActive: boolean;
}

const BloodPack: React.FC<BloodPackProps> = ({ isActive }) => {
  return (
    <div className={`blood-pack flex flex-col items-center ${isActive ? "active" : ""}`}>
      <div className="blood-bag relative w-36 h-48 bg-white border-2 border-gray-300 rounded-md shadow-md overflow-hidden">
        <div className={`absolute bottom-0 w-full bg-[hsl(var(--donor-color))] transition-height duration-500 ${isActive ? "h-full" : "h-0"}`}></div>
        <Droplet className="absolute top-4 left-1/2 transform -translate-x-1/2 text-[hsl(var(--donor-color))] w-12 h-12" />
      </div>
      <div className="tube-connector w-2 h-8 bg-gray-300"></div>
    </div>
  );
};

export default BloodPack;
