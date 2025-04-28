
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import BloodTypeSelector from "@/components/BloodTypeSelector";
import { BloodType, ViewMode } from "@/utils/bloodTypeCompatibility";

interface VisualizerHeaderProps {
  selectedBloodType: BloodType;
  viewMode: ViewMode;
  isCircularLayout: boolean; // Keep for compatibility
  onSelectBloodType: (type: BloodType) => void;
  onToggleViewMode: () => void;
  onToggleLayout: (value: boolean) => void; // Keep for compatibility
}

const VisualizerHeader: React.FC<VisualizerHeaderProps> = ({
  selectedBloodType,
  viewMode,
  onSelectBloodType,
  onToggleViewMode,
}) => {
  return (
    <div className="w-full bg-white shadow-sm mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 p-4">
        Blood Type Compatibility Visualizer
      </h1>
      <div className="w-full bg-white p-4 shadow-sm flex flex-col md:flex-row justify-between items-center">
        <BloodTypeSelector
          selectedBloodType={selectedBloodType}
          onSelectBloodType={onSelectBloodType}
        />
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button 
            onClick={onToggleViewMode}
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
        </div>
      </div>
    </div>
  );
};

export default VisualizerHeader;
