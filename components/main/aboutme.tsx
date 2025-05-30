"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useWindowSize } from 'react-use';
import profile from '../../public/profile.png';

const AboutMe = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const { width, height } = useWindowSize();

  // Social media links
  const socialLinks = [
    { name: "GitHub", icon: "github", url: "https://github.com/username" },
    { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/username" },
    { name: "Twitter", icon: "twitter", url: "https://twitter.com/username" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/username" },
    { name: "Medium", icon: "medium", url: "https://medium.com/@username" }
  ];

  // Company data
  const companies = [
    {
      name: "Next Era Innovation",
      logoColor: "#3730a3",
      description: "Pioneering digital transformation with cutting-edge solutions for forward-thinking businesses.",
      role: "Founder & CEO",
      url: "https://nexterainnovation.com",
      tags: ["Digital Transformation", "Innovation", "Software Solutions"]
    },
    {
      name: "kSolutions ERP",
      logoColor: "#6366f1",
      description: "Enterprise resource planning systems tailored for modern businesses with seamless integration capabilities.",
      role: "Founder",
      url: "https://ksolutionserp.com", 
      tags: ["ERP", "Enterprise", "Business Management"]
    },
    {
      name: "Ravo.ai",
      logoColor: "#a855f7",
      description: "AI-powered solutions that transform how businesses operate, analyze data, and make decisions.",
      role: "Founder",
      url: "https://ravo.ai",
      tags: ["AI", "Machine Learning", "Automation"]
    }
  ];

  // Soft skills
  const softSkills = [
    { name: "Leadership", level: 95 },
    { name: "Problem Solving", level: 90 },
    { name: "Communication", level: 85 },
    { name: "Creativity", level: 92 },
    { name: "Adaptability", level: 88 },
    { name: "Critical Thinking", level: 93 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight * 0.75);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Nano-grid background effect
  const NanoGrid = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="relative w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute border border-indigo-500/20"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                transform: `rotate(${Math.random() * 45}deg)`,
                animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out alternate`
              }}
            />
          ))}
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={`dot-${i}`} 
              className="absolute bg-indigo-500/30 rounded-full"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animation: `blink ${Math.random() * 4 + 1}s infinite ease-in-out alternate`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Company Logo Component
  const CompanyLogo = ({ name, color }) => {
    const initials = name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
    
    return (
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
    );
  };

  // Social Icon Component
  const SocialIcon = ({ name, icon }) => {
    return (
      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-900 transition-colors">
        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          {icon === "github" && (
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          )}
          {icon === "linkedin" && (
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          )}
          {icon === "twitter" && (
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          )}
          {icon === "instagram" && (
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
          )}
          {icon === "medium" && (
            <path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z" />
          )}
        </svg>
      </div>
    );
  };

  return (
    <motion.section 
      id="about-me"
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-[#080e1e] to-[#0f172a] overflow-hidden py-10 md:py-16"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Nano-grid background */}
      <NanoGrid />
      
      {/* Section Title */}
      <motion.div 
        variants={itemVariants}
        className="container mx-auto px-4 md:px-6 mb-10 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          ABOUT<span className="text-transparent">.</span>
          <span className="relative">
            ME
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-indigo-500"></span>
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl">Fullstack Software Engineer & Tech Entrepreneur</p>
      </motion.div>
      
      {/* Bento Grid Layout */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 auto-rows-min">
          
          {/* Main Profile - Spans 8 columns (2/3 of the grid) on large screens */}
          <motion.div 
            variants={itemVariants}
            className="col-span-4 md:col-span-5 lg:col-span-8 row-span-2 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden group"
          >
            <div className="h-full p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-indigo-600/30 flex-shrink-0">
                <Image 
                  src={profile}
                  alt="Kavindu Kaveesha"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              
              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Kavindu Kaveesha</h3>
                <p className="text-indigo-400 font-medium mb-3">Entrepreneur & Software Engineer</p>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  I'm a passionate tech entrepreneur and software engineer with a vision to build innovative solutions 
                  that transform industries. As the founder of three forward-thinking companies, I combine technical 
                  expertise with business acumen to create products that make a difference.
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-3 py-1 bg-indigo-900/50 text-indigo-200 rounded-full text-xs">
                    Tech Entrepreneur
                  </span>
                  <span className="px-3 py-1 bg-purple-900/50 text-purple-200 rounded-full text-xs">
                    Fullstack Developer
                  </span>
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-xs">
                    AI Specialist
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Social Links - 4 columns on large screens */}
          <motion.div 
            variants={itemVariants}
            className="col-span-4 md:col-span-3 lg:col-span-4 row-span-1 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden"
          >
            <div className="h-full p-6">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-1 h-5 bg-indigo-500 mr-3"></span>
                Connect With Me
              </h3>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {socialLinks.map(social => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="group"
                  >
                    <SocialIcon name={social.name} icon={social.icon} />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Soft Skills - 4 columns on large screens */}
          <motion.div 
            variants={itemVariants}
            className="col-span-4 md:col-span-3 lg:col-span-4 row-span-1 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden"
          >
            <div className="h-full p-6">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-1 h-5 bg-purple-500 mr-3"></span>
                Soft Skills
              </h3>
              
              <div className="space-y-3">
                {softSkills.slice(0, 4).map(skill => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{skill.name}</span>
                      <span className="text-xs text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Company Showcases - Full width on all screens */}
          <motion.div 
            variants={itemVariants}
            className="col-span-4 md:col-span-8 lg:col-span-12 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 mr-4"></span>
                My Companies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {companies.map((company, index) => (
                  <div 
                    key={company.name}
                    className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300"
                  >
                    {/* Gradient overlay for hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Company Content */}
                    <div className="p-5 h-full flex flex-col">
                      <div className="flex items-center mb-3">
                        <CompanyLogo name={company.name} color={company.logoColor} />
                        <div className="ml-3">
                          <h3 className="text-lg font-bold text-white">{company.name}</h3>
                          <p className="text-indigo-400 text-xs">{company.role}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 flex-grow">{company.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {company.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={company.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 rounded-lg text-xs transition-all duration-300"
                      >
                        Visit Website
                        <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Technical Background Box */}
          <motion.div 
            variants={itemVariants}
            className="col-span-4 md:col-span-8 lg:col-span-12 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center">
                <span className="w-1 h-6 bg-blue-500 mr-4"></span>
                Technical Background
              </h3>
              
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["React", "Angular", "Next.js", "Node.js", "Python", "Java", "Spring Boot", 
                  "TensorFlow", "Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "Flutter", 
                  "React Native", "GraphQL", "MongoDB", "PostgreSQL"].map(tech => (
                  <span 
                    key={tech}
                    className="px-3 py-1.5 bg-gray-800/70 border border-indigo-500/30 text-gray-300 text-sm 
                             rounded-md transform hover:scale-105 transition-transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 border-l-2 border-b-2 border-indigo-500/20"></div>
      <div className="absolute top-20 right-10 w-16 h-16 border-r-2 border-t-2 border-indigo-500/20"></div>
      
      {/* Add some floating cubes as decoration */}
      <div className="absolute top-1/4 left-10 w-6 h-6 bg-gray-900 border border-indigo-500/30 transform rotate-45 animate-float"></div>
      <div className="absolute bottom-1/4 right-20 w-10 h-10 bg-gray-900 border border-purple-500/30 transform rotate-45 animate-float-slow"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default AboutMe;