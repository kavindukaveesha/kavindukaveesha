"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useWindowSize } from 'react-use';
import Link from 'next/link';

const TechStackSection = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const { height } = useWindowSize();

  // Tech categories with their technologies and icons
  const techCategories = [
    {
      id: "frontend",
      name: "Web Frontend",
      icon: "code",
      technologies: ["React", "Angular", "Next.js", "Vue.js", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "SASS/SCSS"]
    },
    {
      id: "mobile",
      name: "Mobile Development",
      icon: "smartphone",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Expo"]
    },
    {
      id: "backend",
      name: "Backend",
      icon: "server",
      technologies: ["Node.js", "Python", "Java", "Spring Boot", "Express.js", "Django", "Flask", "GraphQL", "REST API", "PHP"]
    },
    {
      id: "database",
      name: "Database",
      icon: "database",
      technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "SQL", "NoSQL", "ORM"]
    },
    {
      id: "devops",
      name: "DevOps",
      icon: "settings",
      technologies: ["Docker", "Kubernetes", "CI/CD", "Jenkins", "AWS", "Azure", "GCP", "Terraform", "Linux", "Nginx"]
    },
    {
      id: "ai",
      name: "AI / ML",
      icon: "brain",
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP", "Pandas", "NumPy", "Keras", "NLTK"]
    },
    {
      id: "testing",
      name: "Testing & QA",
      icon: "check-circle",
      technologies: ["Jest", "Cypress", "Selenium", "Mocha", "Chai", "JUnit", "TDD", "BDD", "E2E Testing"]
    },
    {
      id: "tools",
      name: "Tools & Utilities",
      icon: "tool",
      technologies: ["Git", "GitHub", "VS Code", "Figma", "Postman", "npm", "Webpack", "Babel", "ESLint", "Prettier", "Jira"]
    }
  ];

  useEffect(() => {
    // Enhanced scroll handler with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
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
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Header animation variants
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  // SVG Icons component
  const IconComponent = ({ name }) => {
    const icons = {
      code: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      smartphone: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      server: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
        </svg>
      ),
      database: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
        </svg>
      ),
      settings: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      brain: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      "check-circle": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      tool: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    };

    return icons[name] || icons.code;
  };

  const sectionStyle = {
    minHeight: height ? `${height * 0.95}px` : '95vh'
  };

  return (
    <motion.section 
      id="tech-stack"
      ref={containerRef}
      style={sectionStyle}
      className="relative bg-[#0a0b14] py-16 flex items-center overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            TECH STACK
          </h2>
          <motion.div 
            className="w-16 h-1 bg-blue-500  mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-gray-400 max-w-xl ">
            Comprehensive overview of my technical expertise
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-6">hello</button>
        </motion.div>
        
        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              custom={index}
              className="relative bg-[#12141f] rounded-2xl overflow-hidden group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Decorative corner dot */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-300"></div>
              
              {/* Category Content */}
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                    <IconComponent name={category.icon} />
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-white">{category.name}</h3>
                </div>
                
                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.slice(0, 6).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {category.technologies.length > 6 && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-400">
                        +{category.technologies.length - 6}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* View Projects Button - Fixed to ensure it's enabled */}
                <button
                  // href={`/projects?category=${category.id}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-300 cursor-pointer hue-rotate-10"
                  onClick={(e) => {
                    // Prevent default but handle navigation manually if needed
                    // e.preventDefault();
                    // console.log(`Navigating to projects for ${category.name}`);
                    // window.location.href = `/projects?category=${category.id}`;
                  }}
                >
                  View Projects
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
              
              {/* Bottom border that animates on hover */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Animating background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-900/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-900/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-900/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 25, 0], 
            y: [0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>
    </motion.section>
  );
};

export default TechStackSection;