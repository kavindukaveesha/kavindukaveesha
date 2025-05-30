"use client"

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import { RocketIcon, ServerIcon, BrainCircuitIcon } from "lucide-react";
import { CpuChipIcon, CommandLineIcon } from "@heroicons/react/24/solid";

// Regular floating card component with mouse tracking
const FloatingCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateY: isHovered ? mousePosition.x * 5 : 0,
        rotateX: isHovered ? -mousePosition.y * 5 : 0,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered 
          ? "0 10px 20px rgba(143, 179, 255, 0.2)" 
          : "0 0 0 rgba(143, 179, 255, 0)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        style={{ 
          transform: isHovered ? `translateZ(20px)` : "none",
          transition: "transform 0.3s ease"
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

// Flippable card component with project details on back
const FlippableCard = ({ 
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
  iconTextColor,
  projectType
}: {
  title: string,
  value: string,
  subtitle: string,
  icon: React.ReactNode,
  iconBgColor: string,
  iconTextColor: string,
  projectType: string
}) => {
  const [flipped, setFlipped] = useState(false);
  
  // Project data for the card back
  const projects = {
    aiModels: [
      { name: "GPT Fine-tuning", progress: 75 },
      { name: "Vision Model Integration", progress: 40 },
      { name: "NLP Chatbot", progress: 90 }
    ],
    projects: [
      { name: "E-commerce Recommendation Engine", progress: 60 },
      { name: "Healthcare Analytics Dashboard", progress: 85 },
      { name: "Financial Prediction System", progress: 30 }
    ],
    techStack: [
      { name: "React Native App", progress: 70 },
      { name: "GraphQL API", progress: 50 },
      { name: "Kubernetes Migration", progress: 45 }
    ],
    clientSatisfaction: [
      { name: "Client Feedback System", progress: 80 },
      { name: "Portfolio Showcase", progress: 95 },
      { name: "Case Study Documentation", progress: 65 }
    ]
  };
  
  // Get projects based on card type
  const currentProjects = projects[projectType as keyof typeof projects] || [];
  
  return (
    <div 
      className="flip-card-container"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`flip-card ${flipped ? 'is-flipped' : ''}`}>
        {/* Front of card - Statistics */}
        <div className="flip-card-front">
          <div className="bg-[#111827] bg-opacity-80 p-3 sm:p-4 rounded-xl border border-gray-800 h-full">
            <div className="flex items-center mb-1">
              <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg ${iconBgColor} flex items-center justify-center mr-3`}>
                <div className={`h-4 w-4 sm:h-5 sm:w-5 ${iconTextColor}`}>{icon}</div>
              </div>
              <h3 className="text-sm sm:text-base font-medium text-white">{title}</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
              <span className="ml-2 text-xs sm:text-sm text-green-400">{subtitle}</span>
            </div>
          </div>
        </div>
        
        {/* Back of card - Project details and video */}
        <div className="flip-card-back">
          <div className="bg-[#161F30] p-3 sm:p-4 rounded-xl border border-gray-800 h-full">
            {/* Project list with progress bars */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-medium text-white mb-2">Ongoing Projects</h3>
              {currentProjects.map((project: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">{project.name}</span>
                    <span className="text-blue-300">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {/* Coding video section */}
              <div className="mt-3">
                <h3 className="text-xs sm:text-sm font-medium text-white mb-2">Live Coding</h3>
                <div className="relative w-full h-14 bg-black rounded overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="text-xs text-gray-400">Your coding video here</div>
                    {/* Insert your video element here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Hero section component
const KavinduPortfolioHero: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Tech categories
  const techCategories = [
    {
      name: "Frontend",
      techs: ["React", "Next.js", "Angular", "Flutter", "React Native"]
    },
    {
      name: "Backend",
      techs: ["Node.js", "Spring Boot", "Python", "Java"]
    },
    {
      name: "AI & ML",
      techs: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP"]
    },
    {
      name: "DevOps",
      techs: ["Docker", "Kubernetes", "AWS", "CI/CD", "Azure"]
    }
  ];
  
  const heroTabs = useMemo(() => [
    {
      icon: <CpuChipIcon className="h-5 w-5" />,
      title: "AI Architecture",
      description: "Designing and implementing advanced AI systems that transform raw data into intelligent solutions. Specializing in deep learning, NLP, and computer vision."
    },
    {
      icon: <CommandLineIcon className="h-5 w-5" />,
      title: "Fullstack Development",
      description: "Building end-to-end applications with modern frameworks and cloud technologies. Expert in React, Next.js, Node.js, and serverless architecture."
    },
    {
      icon: <RocketIcon className="h-5 w-5" />,
      title: "Next-Gen Solutions",
      description: "Creating innovative solutions at the intersection of AI and software engineering to solve complex problems and drive business transformation."
    }
  ], []);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <>
      {/* Essential CSS for card flipping */}
      <style jsx global>{`
        .flip-card-container {
          width: 100%;
          height: 100%;
        }
        
        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card.is-flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
      
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Three.js cosmic background container */}
        <div 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0"
          aria-hidden="true"
        >
        </div>
        
        {/* Content overlay - matched to the preview */}
        <div className="relative z-10 h-full pt-20 md:pt-24 lg:pt-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left content column */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4">
                    Kavindu Kaveesha
                  </h1>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Fullstack Engineer &
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                      AI Architect
                    </span>
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-300 max-w-xl">
                    I design and implement next-generation solutions at the intersection of advanced AI and modern software engineering, transforming complex challenges into elegant systems.
                  </p>
                </motion.div>
                
                {/* Expertise tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="pt-2 sm:pt-4"
                >
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                    {heroTabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                          activeTab === index
                            ? index === 0 ? "bg-blue-600 text-white" 
                            : index === 1 ? "bg-[#1A2234] text-white" 
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-[#111827] bg-opacity-50 text-gray-400 hover:bg-[#1A2234] hover:text-gray-200"
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.title}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Tab content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#111827] bg-opacity-70 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-800"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center">
                        {heroTabs[activeTab].icon}
                        <span className="ml-2">{heroTabs[activeTab].title}</span>
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">
                        {heroTabs[activeTab].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                
                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-8"
                >
                  <button className="px-4 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                    <RocketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    View My Work
                  </button>
                  
                  <button className="px-4 sm:px-8 py-2.5 sm:py-3 bg-[#111827] bg-opacity-70 hover:bg-opacity-90 text-white font-medium rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                    <CommandLineIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    Contact Me
                  </button>
                </motion.div>
              </div>
              
              {/* Right stats column */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full"
                >
                  <div className="bg-[#0F1724] bg-opacity-80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-gray-800 h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {/* AI Models card */}
                      <div className="h-32 sm:h-36">
                        <FlippableCard
                          title="AI Models Deployed"
                          value="24+"
                          subtitle="production systems"
                          icon={<CpuChipIcon />}
                          iconBgColor="bg-blue-500 bg-opacity-20"
                          iconTextColor="text-blue-400"
                          projectType="aiModels"
                        />
                      </div>
                      
                      {/* Projects card */}
                      <div className="h-32 sm:h-36">
                        <FlippableCard
                          title="Projects Completed"
                          value="40+"
                          subtitle="across 12 industries"
                          icon={<CommandLineIcon />}
                          iconBgColor="bg-purple-500 bg-opacity-20"
                          iconTextColor="text-purple-400"
                          projectType="projects"
                        />
                      </div>
                      
                      {/* Tech Stack card */}
                      <div className="h-32 sm:h-36">
                        <FlippableCard
                          title="Tech Stack Depth"
                          value="15+"
                          subtitle="technologies mastered"
                          icon={<ServerIcon />}
                          iconBgColor="bg-indigo-500 bg-opacity-20"
                          iconTextColor="text-indigo-400"
                          projectType="techStack"
                        />
                      </div>
                      
                      {/* Client satisfaction card */}
                      <div className="h-32 sm:h-36">
                        <FlippableCard
                          title="Client Satisfaction"
                          value="100%"
                          subtitle="5-star feedback"
                          icon={<BrainCircuitIcon />}
                          iconBgColor="bg-cyan-500 bg-opacity-20"
                          iconTextColor="text-cyan-400"
                          projectType="clientSatisfaction"
                        />
                      </div>
                    </div>
                    
                    {/* Core technologies section - now organized by category */}
                    <FloatingCard className="bg-[#111827] bg-opacity-80 p-4 sm:p-5 rounded-xl border border-gray-800">
                      <h3 className="text-base sm:text-lg font-medium text-white mb-3 flex items-center">
                        <CpuChipIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-400" />
                        Core Technologies
                      </h3>
                      
                      <div className="space-y-3">
                        {techCategories.map((category, idx) => (
                          <div key={category.name} className="space-y-2">
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-lg bg-gray-700 bg-opacity-30 flex items-center justify-center mr-2">
                                {idx === 0 ? <RocketIcon className="h-3.5 w-3.5 text-blue-300" /> :
                                 idx === 1 ? <ServerIcon className="h-3.5 w-3.5 text-purple-300" /> :
                                 idx === 2 ? <BrainCircuitIcon className="h-3.5 w-3.5 text-indigo-300" /> :
                                 <CommandLineIcon className="h-3.5 w-3.5 text-cyan-300" />}
                              </div>
                              <h4 className="text-xs sm:text-sm font-medium text-gray-300">{category.name}</h4>
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 ml-8">
                              {category.techs.map((tech) => (
                                <span key={tech} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#0D1321] text-xs sm:text-sm text-gray-300 rounded-full border border-gray-700">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </FloatingCard>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KavinduPortfolioHero;