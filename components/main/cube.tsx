// pages/index.js (Next.js)
"use client"
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Cube() {
  const mountRef = useRef(null);
  const [currentFace, setCurrentFace] = useState(0);

  // Content for 6 sides
  const cubeContents = [
    { title: "About Me", text: "I'm a passionate web developer with a love for 3D graphics.", image: "/your-image.jpg" },
    { title: "Skills", text: "Next.js, Three.js, Framer Motion, Tailwind CSS", image: "/skills.jpg" },
    { title: "Projects", text: "Built interactive 3D portfolio and e-commerce sites", image: "/projects.jpg" },
    { title: "Contact", text: "email@example.com | @yourtwitter", image: "/contact.jpg" },
    { title: "Experience", text: "5+ years in web development", image: "/exp.jpg" },
    { title: "Education", text: "B.S. in Computer Science", image: "/edu.jpg" },
  ];

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create textures for each face
    const createFaceTexture = (content) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#778899';
      ctx.fillRect(0, 0, 256, 256);

      const img = new Image();
      img.src = content.image;
      img.onload = () => {
        ctx.drawImage(img, 64, 20, 128, 128);
      };

      ctx.fillStyle = '#E6E6FA';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(content.title, 128, 170);

      ctx.fillStyle = '#DCDCDC';
      ctx.font = '16px Arial';
      ctx.fillText(content.text.substring(0, 20) + '...', 128, 200);

      return new THREE.CanvasTexture(canvas);
    };

    // Cube creation
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = cubeContents.map(content => 
      new THREE.MeshBasicMaterial({ map: createFaceTexture(content) })
    );
    
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 5;

    // Animation variables
    let scrollY = 0;
    let rotationSpeed = 0.005;
    let lastFace = 0;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      cube.rotation.x += rotationSpeed + scrollY * 0.00005;
      cube.rotation.y += rotationSpeed + scrollY * 0.00005;

      // Determine which face is most facing forward
      const euler = new THREE.Euler().setFromQuaternion(cube.quaternion);
      const angles = [
        { face: 0, angle: Math.abs(euler.y) },              // Front
        { face: 1, angle: Math.abs(euler.y - Math.PI) },    // Back
        { face: 2, angle: Math.abs(euler.x) },              // Top
        { face: 3, angle: Math.abs(euler.x - Math.PI) },    // Bottom
        { face: 4, angle: Math.abs(euler.y - Math.PI/2) },  // Right
        { face: 5, angle: Math.abs(euler.y + Math.PI/2) },  // Left
      ];

      const current = angles.reduce((prev, curr) => 
        curr.angle < prev.angle ? curr : prev
      ).face;

      if (current !== lastFace) {
        setCurrentFace(current);
        lastFace = current;
      }
      
      renderer.render(scene, camera);
    };

    // Scroll handler
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    // Responsive handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      if (width < 768) {
        cube.scale.set(1, 1, 1);
      } else if (width < 1024) {
        cube.scale.set(1.5, 1.5, 1.5);
      } else {
        cube.scale.set(2, 2, 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-[200vh] bg-gray-900">
      <div ref={mountRef} className="fixed top-0 left-0 w-full h-screen z-[1] opacity-70"></div>
      
      <motion.div 
        className="relative z-[2] min-h-screen flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md w-full text-center text-white shadow-xl">
          <img 
            src={cubeContents[currentFace].image}
            alt={cubeContents[currentFace].title}
            className="w-24 h-24 md:w-36 md:h-36 rounded-full mx-auto mb-4 object-cover"
          />
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-purple-100">
            {cubeContents[currentFace].title}
          </h1>
          <p className="text-sm md:text-base text-gray-200">
            {cubeContents[currentFace].text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}