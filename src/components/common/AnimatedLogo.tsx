import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AnimatedLogo: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrambledText, setScrambledText] = useState("----------");
  const finalText = "BloodLink";
  
  useEffect(() => {
    let charIndex = 0;
    const scrambleInterval = setInterval(() => {
      if (charIndex < finalText.length) {
        setScrambledText(prev => {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let scrambled = prev.split('');
          
          // Keep correctly decoded letters
          for (let i = 0; i < charIndex; i++) {
            scrambled[i] = finalText[i];
          }
          
          // Scramble the rest
          for (let i = charIndex; i < finalText.length; i++) {
            scrambled[i] = chars[Math.floor(Math.random() * chars.length)];
          }
          
          return scrambled.join('');
        });
        
        charIndex += 0.4; // Slowing down the decode rate
      } else {
        setScrambledText(finalText);
        setAnimationComplete(true);
        clearInterval(scrambleInterval);
      }
    }, 100);
    
    return () => clearInterval(scrambleInterval);
  }, []);
  
  return (
    <Link to="/" className="flex items-center no-underline">
      <div className="relative flex items-center">
        <div className={`text-2xl font-bold text-[hsl(var(--clr-primary-a30))] ${animationComplete ? "" : "glitch-animation"}`}>
          {scrambledText}
        </div>
        <span className="ml-1 text-xs mt-1 text-[hsl(var(--donor-color))]">®</span>
      </div>
    </Link>
  );
};

export default AnimatedLogo;
