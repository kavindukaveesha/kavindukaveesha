"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Project data
  const projects = [
    {
      id: 1,
      name: "AI-Powered Analytics Dashboard",
      image: "/projects/analytics-dashboard.jpg",
      description: "Enterprise analytics platform with machine learning insights for business intelligence.",
      tech: ["React", "Node.js", "TensorFlow", "AWS"],
      level: "Advanced",
      url: "https://project1.com",
      category: "AI",
      featured: true
    },
    {
      id: 2,
      name: "Smart City Management System",
      image: "/projects/smart-city.jpg",
      description: "IoT-based platform for monitoring and managing urban infrastructure and services.",
      tech: ["Angular", "Python", "MongoDB", "Azure"],
      level: "Advanced",
      url: "https://project2.com",
      category: "IoT",
      featured: true
    },
    {
      id: 3,
      name: "Healthcare Patient Portal",
      image: "/projects/healthcare-portal.jpg",
      description: "Secure platform connecting patients with healthcare providers for seamless communication.",
      tech: ["React Native", "Express", "PostgreSQL", "Firebase"],
      level: "Intermediate",
      url: "https://project3.com",
      category: "Web",
      featured: true
    },
    {
      id: 4,
      name: "E-Commerce Recommendation Engine",
      image: "/projects/ecommerce-engine.jpg",
      description: "AI-driven product recommendation system for online retailers.",
      tech: ["Python", "Flask", "PyTorch", "Redis"],
      level: "Advanced",
      url: "https://project4.com",
      category: "AI",
      featured: false
    },
    {
      id: 5,
      name: "Fintech Payment Gateway",
      image: "/projects/fintech-payment.jpg",
      description: "Secure and scalable payment processing system for financial institutions.",
      tech: ["Java", "Spring Boot", "Kafka", "Docker"],
      level: "Advanced",
      url: "https://project5.com",
      category: "Fintech",
      featured: false
    },
    {
      id: 6,
      name: "Real Estate Marketplace",
      image: "/projects/real-estate.jpg",
      description: "Property listing platform with virtual tours and analytics.",
      tech: ["Next.js", "GraphQL", "MongoDB", "AWS"],
      level: "Intermediate",
      url: "https://project6.com",
      category: "Web",
      featured: false
    },
    {
      id: 7,
      name: "HR Management Solution",
      image: "/projects/hr-management.jpg",
      description: "Comprehensive HR platform for employee management and analytics.",
      tech: ["Vue.js", "Laravel", "MySQL", "Docker"],
      level: "Intermediate",
      url: "https://project7.com",
      category: "SaaS",
      featured: false
    },
    {
      id: 8,
      name: "Educational Learning Platform",
      image: "/projects/educational-platform.jpg",
      description: "Interactive e-learning platform with progress tracking and certification.",
      tech: ["React", "Node.js", "MongoDB", "AWS"],
      level: "Advanced",
      url: "https://project8.com",
      category: "EdTech",
      featured: false
    },
    {
      id: 9,
      name: "Supply Chain Tracking System",
      image: "/projects/supply-chain.jpg",
      description: "Blockchain-based solution for transparent supply chain management.",
      tech: ["React", "Solidity", "Node.js", "AWS"],
      level: "Expert",
      url: "https://project9.com",
      category: "Blockchain",
      featured: false
    }
  ];
  
  // Filter categories
  const categories = ['All', 'AI', 'Web', 'IoT', 'Blockchain', 'Fintech', 'SaaS', 'EdTech'];

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

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  // Level indicator component
  const LevelBadge = ({ level }) => {
    const colors = {
      'Expert': 'bg-purple-900/60 text-purple-200 border-purple-500/30',
      'Advanced': 'bg-indigo-900/60 text-indigo-200 border-indigo-500/30',
      'Intermediate': 'bg-blue-900/60 text-blue-200 border-blue-500/30',
      'Beginner': 'bg-green-900/60 text-green-200 border-green-500/30'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${colors[level]}`}>
        {level}
      </span>
    );
  };

  return (
    <motion.section 
      id="projects"
      ref={containerRef}
      className="relative py-20 bg-gradient-to-b "
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div 
          variants={itemVariants}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            PROJECTS<span className="text-transparent">.</span>
            <span className="relative">
              <span className="absolute -top-1 -right-4 w-8 h-1 bg-indigo-500"></span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Innovative solutions across multiple domains, showcasing technical expertise and creative problem-solving.
          </p>
        </motion.div>
        
        {/* Filter Tabs */}
        <motion.div 
          variants={itemVariants}
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeFilter === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80'}`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Featured Projects */}
        {activeFilter === 'All' && (
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="h-6 w-1 bg-indigo-500 mr-4"></span>
              Featured Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.filter(project => project.featured).map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Project Image */}
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      {/* Replace with actual image when available */}
                      <div className="w-16 h-16 rounded-xl bg-indigo-700/50 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{project.id}</span>
                      </div>
                    </div>
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <LevelBadge level={project.level} />
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(tech => (
                          <span 
                            key={tech} 
                            className="text-xs px-2 py-1 bg-gray-800/80 text-gray-300 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-4 py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 rounded-lg text-sm font-medium transition-all duration-300 group-hover:border-indigo-500/70"
                    >
                      View Project
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* More Projects Bento Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="h-6 w-1 bg-indigo-500 mr-4"></span>
            {activeFilter === 'All' ? 'More Projects' : `${activeFilter} Projects`}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-min">
            {filteredProjects
              .filter(project => activeFilter !== 'All' || !project.featured)
              .map((project, index) => {
                // Create dynamic grid positioning for bento layout
                const isWide = index % 5 === 0;
                const isTall = index % 3 === 1;
                const colSpan = isWide ? 'md:col-span-3 lg:col-span-6' : 'md:col-span-3';
                const rowSpan = isTall ? 'md:row-span-2' : '';
                
                return (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className={`${colSpan} ${rowSpan} group bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col`}
                  >
                    {isTall || isWide ? (
                      // Larger card layout for wide or tall cards
                      <>
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
                          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-xl bg-indigo-700/50 flex items-center justify-center">
                              <span className="text-2xl font-bold text-white">{project.id}</span>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 z-20">
                            <LevelBadge level={project.level} />
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                            {project.name}
                          </h3>
                          
                          <p className="text-gray-400 text-sm mb-4 flex-grow">
                            {project.description}
                          </p>
                          
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.map(tech => (
                                <span 
                                  key={tech} 
                                  className="text-xs px-2 py-0.5 bg-gray-800/80 text-gray-300 rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full px-3 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            View Project
                            <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </a>
                        </div>
                      </>
                    ) : (
                      // Compact card layout for standard cards
                      <div className="p-4 flex h-full">
                        <div className="w-10 h-10 rounded-lg bg-indigo-900/50 flex-shrink-0 flex items-center justify-center mr-4">
                          <span className="text-lg font-bold text-white">{project.id}</span>
                        </div>
                        
                        <div className="flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors pr-2">
                              {project.name}
                            </h3>
                            <LevelBadge level={project.level} />
                          </div>
                          
                          <p className="text-gray-400 text-xs mb-3 flex-grow">
                            {project.description.length > 100 
                              ? `${project.description.substring(0, 100)}...` 
                              : project.description
                            }
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.tech.slice(0, 3).map(tech => (
                              <span 
                                key={tech} 
                                className="text-xs px-1.5 py-0.5 bg-gray-800/80 text-gray-300 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="text-xs px-1.5 py-0.5 bg-gray-800/80 text-gray-300 rounded-md">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
                          >
                            View Project
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
        
        {/* View All Projects Button */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mt-12"
        >
          <Link 
            href="/projects" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-medium transition-all duration-300 shadow-lg shadow-indigo-900/30"
          >
            View All Projects
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-20 left-10 w-16 h-16 border-l-2 border-b-2 border-indigo-500/20"></div>
      <div className="absolute top-20 right-10 w-16 h-16 border-r-2 border-t-2 border-indigo-500/20"></div>
    </motion.section>
  );
};

export default ProjectsSection;