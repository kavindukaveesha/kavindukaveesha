"use client"
import React, { useEffect, useRef, useState } from "react"
;
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const AdvancedCosmicHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const canvasRef = useRef(null);
  const blackHoleRef = useRef(null);
  const containerRef = useRef(null);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      
      // Apply parallax effect to black hole
      if (blackHoleRef.current) {
        blackHoleRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Set isLoaded to true after initial render
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);
  
  // Three.js setup for 3D metallic cubes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create cubes
    const cubes: any[] = [];
    const cubeCount = 8;
    
    // Define metallic materials with different colors
    const createMetallicMaterial = (color: number, metalness = 0.9, roughness = 0.1) => {
      return new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: metalness,
        roughness: roughness,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1,
      });
    };
    
    // Create environment map for realistic reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
    scene.add(cubeCamera);
    
    // Materials using your color palette
    const materials = [
      createMetallicMaterial(0x7DD3FC), // space-300
      createMetallicMaterial(0x3B82F6), // space-500
      createMetallicMaterial(0x6366F1), // nebula-600
      createMetallicMaterial(0xCBD5E1), // neutron-500 (silver)
      createMetallicMaterial(0xBAE6FD), // space-200
    ];
    
    // Create cubes with different sizes, positions and rotations
    for (let i = 0; i < cubeCount; i++) {
      const size = 0.6 + Math.random() * 0.5;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = materials[i % materials.length];
      
      // Bevel the edges for a more realistic look
      geometry.computeVertexNormals();
      
      const cube = new THREE.Mesh(geometry, material);
      
      // Position in an interesting 3D formation
      const angle = (i / cubeCount) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;
      const heightVariation = 3;
      
      cube.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      cube.position.y = Math.sin(angle) * radius + (Math.random() - 0.5) * heightVariation;
      cube.position.z = -4 + Math.random() * 8;
      
      // Initial rotation
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;
      cube.rotation.z = Math.random() * Math.PI;
      
      // Store initial positions for animation
      cube.userData.initialPosition = {
        x: cube.position.x,
        y: cube.position.y,
        z: cube.position.z
      };
      
      cube.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };
      
      scene.add(cube);
      cubes.push(cube);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x3B82F6, 0.3); // Space-500, low intensity
    scene.add(ambientLight);
    
    const bluePointLight = new THREE.PointLight(0x7DD3FC, 1, 20); // Space-300
    bluePointLight.position.set(5, 5, 5);
    scene.add(bluePointLight);
    
    const silverPointLight = new THREE.PointLight(0xE2E8F0, 1, 20); // Neutron-400
    silverPointLight.position.set(-5, -5, 5);
    scene.add(silverPointLight);
    
    // Animation variables
    let time = 0;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.003;
      
      // Update camera position based on mouse movement (subtle effect)
      camera.position.x += (mousePosition.x * 1 - camera.position.x) * 0.05;
      camera.position.y += (mousePosition.y * 1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Animate each cube
      cubes.forEach((cube, index) => {
        // Rotation
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
        cube.rotation.z += cube.userData.rotationSpeed.z;
        
        // Floating motion with sine waves
        const floatFactor = Math.sin(time + index) * 0.1;
        cube.position.y = cube.userData.initialPosition.y + floatFactor;
        
        // Subtle expansion and contraction of the formation
        const pulseFactor = Math.sin(time * 0.5) * 0.2;
        const direction = new THREE.Vector3(
          cube.userData.initialPosition.x,
          cube.userData.initialPosition.y,
          cube.userData.initialPosition.z
        ).normalize();
        
        cube.position.x = cube.userData.initialPosition.x + direction.x * pulseFactor;
        cube.position.z = cube.userData.initialPosition.z + direction.z * pulseFactor;
        
        // Subtle response to mouse position
        cube.position.x += mousePosition.x * 0.05 * (index % 3);
        cube.position.y += mousePosition.y * 0.05 * (index % 3);
      });
      
      // Update cube environment maps for reflections
      if (time % 0.1 < 0.001) {
        const randomCube = cubes[Math.floor(Math.random() * cubes.length)];
        randomCube.visible = false;
        cubeCamera.position.copy(randomCube.position);
        cubeCamera.update(renderer, scene);
        randomCube.material.envMap = cubeRenderTarget.texture;
        randomCube.visible = true;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up resources
      cubes.forEach(cube => {
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach((m: { dispose: () => any; }) => m.dispose());
        } else {
          cube.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, [mousePosition]);
  
  // Features for tabs
  const features = [
    {
      title: "AI Integration",
      description: "Harness the power of cutting-edge artificial intelligence to transform your development workflow.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
          <circle cx="7.5" cy="14.5" r="1.5"/>
          <circle cx="16.5" cy="14.5" r="1.5"/>
        </svg>
      )
    },
    {
      title: "Quantum Analytics",
      description: "Process data at unprecedented speeds with our quantum-inspired computational framework.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2v20M2 12h20M2 7h5M2 17h5M17 2h5M17 22h5M17 17h5M17 7h5"/>
        </svg>
      )
    },
    {
      title: "Neural Networks",
      description: "Build, train, and deploy sophisticated neural networks with our intuitive interface.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/>
        </svg>
      )
    }
  ];
  
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-space-950">
      {/* 3D Canvas - Metallic Cubes */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      {/* Black Hole Effect */}
      <div ref={blackHoleRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0">
        {/* Dark center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-black z-20"></div>
        
        {/* Inner accretion disk - blue */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 rounded-full bg-gradient-radial from-space-400 via-space-500/30 to-transparent opacity-80 z-10"
          style={{ transform: 'translate(-50%, -50%) perspective(500px) rotateX(70deg)', filter: 'blur(5px)' }}>
        </div>
        
        {/* Outer accretion disk - silver blue */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-24 rounded-full bg-gradient-radial from-nebula-400/70 via-neutron-400/30 to-transparent opacity-60 z-9"
          style={{ transform: 'translate(-50%, -50%) perspective(500px) rotateX(70deg)', filter: 'blur(8px)' }}>
        </div>
        
        {/* Light flare effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] z-0">
          {/* Horizontal light beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-gradient-to-r from-transparent via-space-300 to-transparent opacity-70"
               style={{ filter: 'blur(4px)' }}></div>
          
          {/* Vertical light beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-[600px] bg-gradient-to-b from-transparent via-space-300 to-transparent opacity-70"
               style={{ filter: 'blur(4px)' }}></div>
          
          {/* Diagonal light beams */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-2 bg-gradient-to-r from-transparent via-nebula-400/80 to-transparent opacity-60"
               style={{ filter: 'blur(4px)', transform: 'rotate(45deg)' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-2 bg-gradient-to-r from-transparent via-nebula-400/80 to-transparent opacity-60"
               style={{ filter: 'blur(4px)', transform: 'rotate(-45deg)' }}></div>
        </div>
        
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-space-800/20 via-space-900/10 to-transparent z-1"
             style={{ filter: 'blur(120px)' }}></div>
      </div>
      
      {/* Star Field */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {Array.from({ length: 300 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() < 0.8 ? '1px' : '2px',
              height: Math.random() < 0.8 ? '1px' : '2px',
              backgroundColor: Math.random() < 0.3 ? '#BAE6FD' : Math.random() < 0.6 ? '#CBD5E1' : '#FFFFFF',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div ref={containerRef} className="relative container mx-auto h-screen flex flex-col z-30 px-4">
        {/* Navigation */}
        <header className="pt-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-space-800/40 backdrop-blur-xl rounded-md flex items-center justify-center border border-space-600/20 shadow-lg shadow-space-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-space-300">
                <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">WebChain<span className="text-space-300">Dev</span></span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <div className="bg-space-900/30 backdrop-blur-xl border border-space-700/20 rounded-full p-1 flex items-center">
              {['About', 'Services', 'Projects', 'Contact'].map((item, i) => (
                <a key={i} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-neutron-300 hover:text-white text-sm font-medium rounded-full hover:bg-space-800/40 transition-all duration-200">
                  {item}
                </a>
              ))}
            </div>
            
            <button className="ml-4 px-5 py-2.5 bg-space-800/40 hover:bg-space-700/50 text-white backdrop-blur-xl border border-space-600/20 rounded-full text-sm font-medium transition-all shadow-lg shadow-space-900/20">
              Get Started
            </button>
          </nav>
          
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>
        
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-space-800/30 backdrop-blur-xl border border-space-600/20 px-3 py-1.5 rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-space-300 animate-pulse"></div>
            <span className="text-space-200 text-xs font-medium">Full Stack Engineer & AI Architect</span>
          </motion.div>
          
          {/* Main headline with metallic text effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-transparent bg-clip-text leading-none mb-6">
              <span className="block mb-2 bg-gradient-to-r from-white via-neutron-500 to-white text-transparent bg-clip-text drop-shadow-md" 
                style={{ WebkitBackgroundClip: 'text' }}>
                Forge Digital
              </span>
              <span className="block bg-gradient-to-r from-space-300 via-space-400 to-nebula-400 text-transparent bg-clip-text drop-shadow-sm"
                style={{ WebkitBackgroundClip: 'text' }}>
                Experiences
              </span>
            </h1>
            
            {/* Text glow effect */}
            <div className="absolute -inset-1 bg-space-500/5 rounded-2xl blur-2xl"></div>
          </motion.div>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto text-neutron-300 text-lg md:text-xl mb-10 leading-relaxed"
          >
            Transforming complex challenges into elegant digital solutions through
            cutting-edge engineering and innovative AI architectures.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-5 mb-16"
          >
            {/* Primary Button with gradient border */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden"
            >
              {/* Gradient Border Background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-space-400 via-nebula-500 to-space-300 filter blur-md group-hover:blur-lg transition-all duration-300"></div>
              
              {/* Actual Button */}
              <button className="relative z-10 px-8 py-3.5 bg-space-900 rounded-xl w-full text-white font-medium shadow-xl shadow-space-500/20 border border-space-700/50 backdrop-blur-xl">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="bg-gradient-to-r from-white to-space-300 text-transparent bg-clip-text font-semibold tracking-wide"
                    style={{ WebkitBackgroundClip: 'text' }}>
                    View Projects
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-space-300">
                    <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </motion.a>
            
            {/* Secondary Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl text-white font-medium border border-space-600/20 backdrop-blur-xl bg-space-800/30 hover:bg-space-700/40 transition-all duration-300 shadow-lg shadow-space-900/20"
            >
              Contact Me
            </motion.a>
          </motion.div>
          
          {/* Feature tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col w-full max-w-4xl mx-auto mb-6"
          >
            <div className="flex space-x-2 justify-center mb-6">
              {features.map((feature, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === i 
                      ? 'bg-space-700/70 text-white border border-space-500/30 shadow-lg shadow-space-500/20' 
                      : 'bg-space-900/30 text-neutron-400 hover:text-white border border-space-700/30 hover:bg-space-800/50'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-space-900/30 backdrop-blur-xl border border-space-700/30 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-space-800 to-space-900 border border-space-700/50 text-space-300">
                    {features[activeTab].icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{features[activeTab].title}</h3>
                    <p className="text-neutron-300">{features[activeTab].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Decorative elements */}
              <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full bg-gradient-radial from-space-400/10 to-transparent blur-xl"></div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full border border-space-500/20 backdrop-blur-md"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-neutron-400 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border border-space-500/30 rounded-full flex justify-center pt-1.5"
          >
            <motion.div className="w-1.5 h-1.5 bg-space-300 rounded-full" />
          </motion.div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.2; }
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
        
        /* Metallic text effect */
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </main>
  );
};

export default AdvancedCosmicHero;