"use client"

import React, { useEffect, useState } from "react";
import KavinduPortfolioHero from "../sub/HeroContent";

const Hero = () => {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false
  });

  useEffect(() => {
    // Initial check
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle window resize
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setViewport({
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024
    });
  };

  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      {/* Background video with responsive positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-[1]">
        {viewport.isMobile ? (
          // For mobile: Simplified background with gradient
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950"></div>
        ) : (
          // For tablet and desktop: Video background
          <video
            autoPlay
            muted
            loop
            playsInline
            className={`rotate-180 object-cover w-full min-h-full ${
              viewport.isTablet 
                ? "absolute top-[-25%] scale-125" 
                : "absolute top-[-340px]"
            }`}
          >
            <source src="/blackhole.webm" type="video/webm" />
          </video>
        )}
        
        {/* Dark overlay for better readability (only on mobile) */}
        {viewport.isMobile && (
          <div className="absolute inset-0 bg-black bg-opacity-40 z-[2]"></div>
        )}
      </div>
      
      {/* Mobile cosmic starfield (static image alternative) */}
      {viewport.isMobile && (
        <div className="absolute inset-0 z-[2] opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-repeat opacity-70"></div>
          {/* You'll need to add a simple stars-bg.png image to your public folder */}
        </div>
      )}
      
      {/* Content overlay */}
      <div className={`relative ${viewport.isMobile ? 'z-[3]' : 'z-[2]'} w-full h-full`}>
        <KavinduPortfolioHero />
      </div>
    </div>
  );
};

export default Hero;