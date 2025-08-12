
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BloodType, ViewMode, getCompatibleTypes } from "@/utils/bloodTypeCompatibility";

const BloodVisualizer = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType>("O-");
  const [viewMode, setViewMode] = useState<ViewMode>("donor");
  const [isAnimating, setIsAnimating] = useState(false);
  
  const compatibleTypes = useMemo(() => 
    getCompatibleTypes(selectedBloodType, viewMode),
    [selectedBloodType, viewMode]
  );

  // Reset and trigger animation when selection changes
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedBloodType, viewMode]);

  const handleSelectBloodType = (type: BloodType) => {
    if (type !== selectedBloodType) {
      setSelectedBloodType(type);
    }
  };

  const bloodTypes: BloodType[] = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Blood Type Compatibility Visualizer
        </h1>
        
        {/* Blood Type Selector */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <label className="text-lg font-medium text-gray-700">Select Blood Type:</label>
          <select
            value={selectedBloodType}
            onChange={(e) => setSelectedBloodType(e.target.value as BloodType)}
            className="px-4 py-2 border-2 border-red-300 rounded-lg focus:border-red-500 focus:outline-none bg-white shadow-md"
          >
            {bloodTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <button
            onClick={() => setViewMode(viewMode === "donor" ? "recipient" : "donor")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            {viewMode === "donor" ? "Donor View" : "Recipient View"}
          </button>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="max-w-7xl mx-auto">
        {/* Blood Bag */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Blood Bag SVG */}
            <svg width="200" height="280" viewBox="0 0 200 280" className="drop-shadow-2xl">
              {/* Bag Container */}
              <rect x="20" y="40" width="160" height="200" rx="20" fill="#fef2f2" stroke="#fecaca" strokeWidth="4"/>
              
              {/* Bag Handle */}
              <rect x="70" y="20" width="60" height="20" rx="10" fill="#fca5a5"/>
              
              {/* Bag Seal */}
              <rect x="80" y="50" width="40" height="8" rx="4" fill="#ef4444"/>
              
              {/* Blood Content */}
              <motion.rect
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? 180 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                x="30"
                y="220"
                width="140"
                fill="url(#bloodGradient)"
                rx="15"
              />
              
              {/* Blood Bubbles */}
              <motion.circle
                animate={{ opacity: isAnimating ? [0.6, 1, 0.6] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                cx="60" cy="180" r="6" fill="#fca5a5"
              />
              <motion.circle
                animate={{ opacity: isAnimating ? [0.6, 1, 0.6] : 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                cx="140" cy="160" r="4" fill="#fca5a5"
              />
              <motion.circle
                animate={{ opacity: isAnimating ? [0.6, 1, 0.6] : 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                cx="100" cy="200" r="5" fill="#fca5a5"
              />
              
              {/* Blood Type Label */}
              <rect x="70" y="80" width="60" height="25" rx="12.5" fill="white" stroke="#ef4444" strokeWidth="2"/>
              <text x="100" y="96" textAnchor="middle" className="text-lg font-bold" fill="#ef4444">
                {selectedBloodType}
              </text>
              
              {/* Droplet Icon */}
              <motion.path
                animate={{ y: isAnimating ? [0, -3, 0] : 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                d="M100 120 L110 140 L100 150 L90 140 Z"
                fill="#ef4444"
              />
              
              {/* Gradients */}
              <defs>
                <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626"/>
                  <stop offset="50%" stopColor="#ef4444"/>
                  <stop offset="100%" stopColor="#b91c1c"/>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Main Tube */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isAnimating ? 80 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-4 h-20 bg-gradient-to-b from-red-400 to-red-300 mx-auto mt-2 rounded-full shadow-lg"
            />
          </motion.div>
        </div>

        {/* Liquid Wave Paths */}
        <div className="relative mb-8 h-32">
          <svg className="w-full h-full absolute inset-0">
            {bloodTypes.map((bloodType, index) => {
              const isCompatible = compatibleTypes.includes(bloodType);
              
              // Calculate curved path for liquid wave
              const startX = 50; // Center of blood bag
              const endX = (index * 12.5) + 6.25; // Position of person
              const controlX = (startX + endX) / 2;
              const controlY = 30; // Height of curve
              
              const wavePath = `M ${startX} 0 Q ${controlX} ${controlY} ${endX} 60`;
              
              return (
                <g key={bloodType}>
                  {/* Wave Path */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: isAnimating && isCompatible ? 1 : 0,
                      opacity: isAnimating && isCompatible ? 1 : 0
                    }}
                    transition={{ duration: 1.2, delay: index * 0.15, ease: "easeInOut" }}
                    d={wavePath}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))"
                    }}
                  />
                  
                  {/* Liquid Wave Particles */}
                  <AnimatePresence>
                    {isAnimating && isCompatible && (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <motion.circle
                            key={i}
                            initial={{ r: 0, opacity: 0 }}
                            animate={{ 
                              r: [0, 3, 0],
                              opacity: [0, 1, 0],
                              offsetDistance: [0, 1]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 2, 
                              delay: index * 0.15 + i * 0.2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            fill="url(#particleGradient)"
                            style={{
                              offsetPath: `path("${wavePath}")`,
                              filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.8))"
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </g>
              );
            })}
            
            {/* Gradients */}
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.8" />
              </linearGradient>
              <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* People Grid */}
        <div className="grid grid-cols-8 gap-4 items-end justify-items-center">
          {bloodTypes.map((bloodType, index) => {
            const status = bloodType === selectedBloodType ? "active" : 
                          compatibleTypes.includes(bloodType) ? "compatible" : "inactive";
            const isCompatible = compatibleTypes.includes(bloodType);
            
            return (
              <div key={bloodType} className="flex flex-col items-center">
                {/* Person Figure */}
                <motion.div
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  className="relative cursor-pointer group"
                  onClick={() => handleSelectBloodType(bloodType)}
                >
                  {/* Person SVG */}
                  <svg 
                    width="60" 
                    height="90" 
                    viewBox="0 0 120 180" 
                    className={`transition-all duration-300 group-hover:scale-110 ${
                      status === "active" ? "fill-red-500" : 
                      status === "compatible" ? "fill-red-400" :
                      "fill-gray-400"
                    }`}
                  >
                    {/* Head */}
                    <circle cx="60" cy="30" r="22" />
                    
                    {/* Body */}
                    <rect x="42" y="52" width="36" height="55" rx="8" />
                    
                    {/* Arms */}
                    <rect x="20" y="60" width="22" height="10" rx="5" />
                    <rect x="78" y="60" width="22" height="10" rx="5" />
                    
                    {/* Legs */}
                    <rect x="42" y="107" width="10" height="45" rx="5" />
                    <rect x="68" y="107" width="10" height="45" rx="5" />
                  </svg>

                  {/* Blood Type Label */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-gray-200">
                    {bloodType}
                  </div>

                  {/* Glow Effect for Compatible */}
                  {isCompatible && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.3 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-red-400 rounded-full blur-xl -z-10"
                    />
                  )}
                </motion.div>

                {/* Blood Cup */}
                <AnimatePresence>
                  {isAnimating && isCompatible && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0, y: 10 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-3"
                    >
                      <div className="relative">
                        {/* Cup Shape */}
                        <div className="w-10 h-6 bg-white border-2 border-red-300 rounded-b-full relative overflow-hidden shadow-lg">
                          {/* Filling Blood */}
                          <motion.div
                            initial={{ height: "0%" }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
                            className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 to-red-500"
                          />
                        </div>
                        
                        {/* Cup Handle */}
                        <div className="absolute -right-2 top-1 w-2 h-5 border-2 border-red-300 border-l-0 rounded-r-full"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Connection Point */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isAnimating ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className={`w-4 h-4 rounded-full mt-3 ${
                    isCompatible ? 'bg-gradient-to-r from-red-400 to-red-500 shadow-lg shadow-red-300' : 'bg-gray-300'
                  }`}
                  style={{
                    background: isCompatible 
                      ? "radial-gradient(circle, #fca5a5 0%, #ef4444 50%, #dc2626 100%)"
                      : undefined
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Floating Droplets */}
        <div className="relative mt-8">
          <AnimatePresence>
            {isAnimating && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0, scale: 0, x: 0 }}
                    animate={{ 
                      y: [-30, -60, -30],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [-10, 10, -10]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 3, 
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                    style={{ 
                      left: `${(i % 8) * 12.5 + 6.25}%`,
                      top: "50%",
                      filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500">
        <p className="text-sm">
          💉 Click on any person to select that blood type • Watch the liquid waves flow with realistic physics!
        </p>
      </div>
    </div>
  );
};

export default BloodVisualizer;
