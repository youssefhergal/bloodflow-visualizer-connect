
import React from "react";
import { Button } from "@/components/ui/button";
import { BloodType, getAllBloodTypes } from "@/utils/bloodTypeCompatibility";

interface BloodTypeSelectorProps {
  selectedBloodType: BloodType;
  onSelectBloodType: (type: BloodType) => void;
}

const BloodTypeSelector: React.FC<BloodTypeSelectorProps> = ({
  selectedBloodType,
  onSelectBloodType
}) => {
  const bloodTypes = getAllBloodTypes();
  
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {bloodTypes.map((type) => (
        <Button
          key={type}
          variant={selectedBloodType === type ? "default" : "outline"}
          className={`min-w-[60px] font-bold ${
            selectedBloodType === type ? 
              "bg-[hsl(var(--donor-color))] hover:bg-[hsl(var(--donor-color))]" : 
              ""
          }`}
          onClick={() => onSelectBloodType(type)}
        >
          {type}
        </Button>
      ))}
    </div>
  );
};

export default BloodTypeSelector;
