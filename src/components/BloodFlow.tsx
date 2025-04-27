
import React, { useEffect, useState } from "react";
import { ViewMode } from "@/utils/bloodTypeCompatibility";

interface BloodFlowProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  mode: ViewMode;
  delay?: number;
}

const BloodFlow: React.FC<BloodFlowProps> = ({
  startX,
  startY,
  endX,
  endY,
  mode,
  delay = 0
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;
  
  // Calculate bezier curve control points for natural flow
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const curveOffset = 50;
  
  // Different control point strategy based on relative positions
  const controlX = midX + (endY > startY ? curveOffset : -curveOffset);
  const controlY = midY + (endX > startX ? -curveOffset : curveOffset);
  
  // Path definition for the tube
  const path = `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`;
  
  // Flow is from start to end in donor mode, and end to start in recipient mode
  const flowDirection = mode === 'donor' ? "" : "reverse";
  
  // Color based on mode
  const strokeColor = mode === 'donor' ? "hsl(var(--donor-color))" : "hsl(var(--recipient-color))";
  
  return (
    <g className="blood-tube">
      {/* Background tube */}
      <path
        d={path}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={8}
        strokeLinecap="round"
        className="opacity-50"
      />
      
      {/* Animated blood flow */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={4}
        strokeLinecap="round"
        className={`blood-flow ${flowDirection}`}
        style={{ animationDirection: mode === 'recipient' ? 'reverse' : 'normal' }}
      />
    </g>
  );
};

export default BloodFlow;
