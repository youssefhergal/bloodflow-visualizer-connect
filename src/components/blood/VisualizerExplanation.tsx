
import React from "react";
import { BloodType, ViewMode } from "@/utils/bloodTypeCompatibility";

interface VisualizerExplanationProps {
  selectedBloodType: BloodType;
  viewMode: ViewMode;
  compatibleTypes: BloodType[];
}

const VisualizerExplanation: React.FC<VisualizerExplanationProps> = ({
  selectedBloodType,
  viewMode,
  compatibleTypes,
}) => {
  return (
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
      <p className="text-sm text-gray-400 mt-4">
        {viewMode === "donor" 
          ? "Blood flows down to compatible recipients" 
          : "Blood flows down from compatible donors"}
      </p>
    </div>
  );
};

export default VisualizerExplanation;
