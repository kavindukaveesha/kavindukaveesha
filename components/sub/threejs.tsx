"use client"

import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface ThreeJSComponentsProps {
  canvasRef: React.RefObject<HTMLDivElement>;
}

const ThreeJSComponents: React.FC<ThreeJSComponentsProps> = ({ canvasRef }) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08101E); // modern space dark blue
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Setup bloom effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.7,    // strength
      0.4,    // radius
      0.85    // threshold
    );
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Responsive sizing
    const updateSize = () => {
      if (canvasRef.current && renderer && composer) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        
        renderer.setSize(width, height);
        composer.setSize(width, height);
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    // Initial size setup
    updateSize();
    window.addEventListener('resize', updateSize);

    // Append renderer to DOM
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x1A2E6C, 0.4);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xD8E2F4, 0.8);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const accentLight = new THREE.PointLight(0x8FB3FF, 1.5, 30);
    accentLight.position.set(-5, 3, 8);
    scene.add(accentLight);
    
    const purpleLight = new THREE.PointLight(0xB076FF, 1.2, 40);
    purpleLight.position.set(0, -7, 10);
    scene.add(purpleLight);

    // Add starfield
    createStarField(scene);
    
    // Add nebula
    createNebula(scene);
    
    // Add central orb
    const centralOrb = createCentralOrb(scene);

    // Animation variables
    let time = 0;

    // Animation loop
    const animate = () => {
      time += 0.01;
      
      // Orb pulsation
      if (centralOrb) {
        const pulseFactor = Math.sin(time * 0.5) * 0.1 + 1;
        centralOrb.scale.set(pulseFactor, pulseFactor, pulseFactor);
      }
      
      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.position.y = Math.cos(time * 0.1) * 0.5;
      camera.lookAt(scene.position);
      
      // Render
      if (composerRef.current) {
        composerRef.current.render();
      } else if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();

    // Cleanup on unmount
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      window.removeEventListener('resize', updateSize);
      
      if (canvasRef.current && rendererRef.current && rendererRef.current.domElement) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (composerRef.current) {
        composerRef.current.renderTarget1.dispose();
        composerRef.current.renderTarget2.dispose();
      }
    };
  }, [canvasRef]);

  return null;
};

// Function to create a star field
const createStarField = (scene: THREE.Scene, count = 800) => {
  const vertices: number[] = [];
  const sizes: number[] = [];
  const colors: number[] = [];
  
  // Color palette
  const colorOptions = [
    new THREE.Color(0xFFFFFF), // pure white
    new THREE.Color(0xE6EDF8), // silver white
    new THREE.Color(0xB1C8FE), // soft blue
    new THREE.Color(0xC8BFFC), // soft purple
    new THREE.Color(0xD8E2F4), // titanium white
  ];
  
  for (let i = 0; i < count; i++) {
    // Create stars in a spherical distribution
    const radius = 20 + Math.random() * 30;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    vertices.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    
    // Variable star size
    sizes.push(0.2 + Math.random() * 1.8);
    
    // Random color
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors.push(color.r, color.g, color.b);
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 1,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  
  return stars;
};

// Function to create nebula
const createNebula = (scene: THREE.Scene) => {
  const particleCount = 2000;
  const particles = new THREE.BufferGeometry();
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  // Nebula palette
  const nebulaPalette = [
    new THREE.Color(0x1A2E6C).multiplyScalar(0.7), // cosmic blue
    new THREE.Color(0x3A4366).multiplyScalar(0.8), // space titanium
    new THREE.Color(0x8FB3FF).multiplyScalar(0.5), // soft blue glow
    new THREE.Color(0xB076FF).multiplyScalar(0.5), // purple glow
  ];
  
  // Create cloud clusters
  const clusterCenters = [
    { x: -8, y: 5, z: -15 },
    { x: 8, y: -3, z: -20 },
    { x: 0, y: -7, z: -25 }
  ];
  
  for (let i = 0; i < particleCount; i++) {
    // Choose a cluster
    const clusterIndex = Math.floor(Math.random() * clusterCenters.length);
    const center = clusterCenters[clusterIndex];
    const localRadius = 8 + Math.random() * 4;
    
    // Position within cluster
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = localRadius * Math.cbrt(Math.random());
    
    const x = center.x + r * Math.sin(phi) * Math.cos(theta);
    const y = center.y + r * Math.sin(phi) * Math.sin(theta);
    const z = center.z + r * Math.cos(phi);
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    
    // Size based on distance to center
    const distanceToCenter = Math.sqrt(
      Math.pow(x - center.x, 2) + 
      Math.pow(y - center.y, 2) + 
      Math.pow(z - center.z, 2)
    );
    
    sizes[i] = 0.5 + (1 - Math.min(distanceToCenter / localRadius, 1)) * 1.5;
    
    // Color based on position
    const colorIndex = Math.floor(Math.random() * nebulaPalette.length);
    const color = nebulaPalette[colorIndex];
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  const material = new THREE.PointsMaterial({
    size: 1.5,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  const nebula = new THREE.Points(particles, material);
  scene.add(nebula);
  
  // Animation
  const animateNebula = () => {
    nebula.rotation.y += 0.0002;
    nebula.rotation.x += 0.0001;
    requestAnimationFrame(animateNebula);
  };
  
  animateNebula();
  
  return nebula;
};

// Function to create central orb
const createCentralOrb = (scene: THREE.Scene) => {
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.15,
  });
  
  const orb = new THREE.Mesh(geometry, material);
  orb.position.set(10, 10, -15);
  
  // Add glow effect
  const glowGeometry = new THREE.SphereGeometry(3.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0.1,
  });
  
  const glowOrb = new THREE.Mesh(glowGeometry, glowMaterial);
  orb.add(glowOrb);
  
  scene.add(orb);
  return orb;
};

export default ThreeJSComponents;