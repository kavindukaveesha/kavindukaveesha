import * as THREE from "three";

/**
 * Initialize the black hole scene
 * @param {HTMLCanvasElement} canvas - The canvas element to render to
 * @returns {Function} - Cleanup function to be called on unmount
 */
export const initBlackHoleScene = (canvas) => {
  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  
  // Handle window resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', handleResize);
  
  // Create black hole
  const blackHoleGroup = new THREE.Group();
  scene.add(blackHoleGroup);
  
  // Black hole center (dark sphere)
  const blackHoleGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const blackHoleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    transparent: true,
    opacity: 0.9
  });
  const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
  blackHoleGroup.add(blackHole);
  
  // Create accretion disk
  const diskGeometry = new THREE.RingGeometry(0.6, 2, 64);
  const diskMaterial = new THREE.MeshBasicMaterial({
    color: 0x3B82F6, // space-500
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
  });
  const disk = new THREE.Mesh(diskGeometry, diskMaterial);
  disk.rotation.x = Math.PI / 2.2; // Tilt the disk
  blackHoleGroup.add(disk);
  
  // Create outer glow
  const glowGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x7DD3FC) }, // space-300
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(color, intensity * 0.8);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.scale.set(2, 2, 2);
  blackHoleGroup.add(glow);
  
  // Create event horizon (inner ring effect)
  const horizonGeometry = new THREE.RingGeometry(0.5, 0.6, 64);
  const horizonMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
  horizon.rotation.x = Math.PI / 2;
  blackHoleGroup.add(horizon);
  
  // Add light beams
  const createLightBeam = (color, width, height, rotation, position) => {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const beam = new THREE.Mesh(geometry, material);
    
    // Apply rotation
    beam.rotation.set(...rotation);
    
    // Apply position
    beam.position.set(...position);
    
    return beam;
  };
  
  // Vertical beam
  const verticalBeam = createLightBeam(
    0x7DD3FC, // space-300
    0.2, 
    8, 
    [0, 0, 0], 
    [0, 0, 0]
  );
  blackHoleGroup.add(verticalBeam);
  
  // Horizontal beam
  const horizontalBeam = createLightBeam(
    0x6366F1, // nebula-600
    8, 
    0.2, 
    [0, 0, 0], 
    [0, 0, 0]
  );
  blackHoleGroup.add(horizontalBeam);
  
  // Create metallic cubes
  const cubes = [];
  const cubeCount = 40;
  
  // Define materials
  const createMetallicMaterial = (color) => {
    return new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      emissive: color,
      emissiveIntensity: 0.2
    });
  };
  
  const cubeMaterials = [
    createMetallicMaterial(0x7DD3FC), // space-300
    createMetallicMaterial(0x3B82F6), // space-500
    createMetallicMaterial(0x6366F1), // nebula-600
    createMetallicMaterial(0xCBD5E1), // neutron-500 (silver)
  ];
  
  // Create cube function
  const createCube = (size, position, material) => {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position);
    
    // Random rotation
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    cube.rotation.z = Math.random() * Math.PI;
    
    // Animation data
    cube.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      orbitRadius: Math.sqrt(position[0] * position[0] + position[1] * position[1] + position[2] * position[2]),
      orbitSpeed: Math.random() * 0.005,
      orbitOffset: Math.random() * Math.PI * 2,
      floatAmplitude: Math.random() * 0.1,
      floatFrequency: Math.random() * 0.02
    };
    
    scene.add(cube);
    return cube;
  };
  
  // Create cubes in a spherical distribution
  for (let i = 0; i < cubeCount; i++) {
    const size = 0.1 + Math.random() * 0.15;
    
    // Use spherical coordinates for better distribution
    const radius = 3 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2; // Longitude
    const phi = Math.acos(2 * Math.random() - 1); // Latitude
    
    const position = [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    ];
    
    // Select random material
    const material = cubeMaterials[Math.floor(Math.random() * cubeMaterials.length)];
    
    // Create and store cube
    const cube = createCube(size, position, material);
    cubes.push(cube);
  }
  
  // Add spotlight effects
  const addSpotlight = (color, intensity, position) => {
    const light = new THREE.SpotLight(color, intensity, 15, Math.PI / 4, 0.5, 1);
    light.position.set(...position);
    scene.add(light);
    return light;
  };
  
  const spotlights = [
    addSpotlight(0x7DD3FC, 2, [5, 5, 5]), // space-300 (top right)
    addSpotlight(0x6366F1, 1.5, [-5, 3, 2]), // nebula-600 (top left)
    addSpotlight(0xCBD5E1, 1, [0, -5, 5]) // neutron-500 (bottom)
  ];
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x3B82F6, 0.2); // space-500
  scene.add(ambientLight);
  
  // Animation loop
  let time = 0;
  let animationFrameId;
  
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    time += 0.01;
    
    // Rotate black hole
    blackHoleGroup.rotation.z = time * 0.1;
    
    // Pulse event horizon
    if (horizon) {
      horizon.scale.set(
        1 + Math.sin(time * 2) * 0.05,
        1 + Math.sin(time * 2) * 0.05,
        1
      );
    }
    
    // Animate light beams
    if (verticalBeam) {
      verticalBeam.material.opacity = 0.2 + Math.sin(time * 3) * 0.1;
      verticalBeam.rotation.z = time * 0.2;
    }
    
    if (horizontalBeam) {
      horizontalBeam.material.opacity = 0.2 + Math.sin(time * 2.5) * 0.1;
      horizontalBeam.rotation.z = -time * 0.15;
    }
    
    // Animate cubes
    cubes.forEach(cube => {
      // Self rotation
      cube.rotation.x += cube.userData.rotationSpeed.x;
      cube.rotation.y += cube.userData.rotationSpeed.y;
      cube.rotation.z += cube.userData.rotationSpeed.z;
      
      // Orbital motion
      const orbitSpeed = cube.userData.orbitSpeed;
      const orbitRadius = cube.userData.orbitRadius;
      const orbitAngle = time * orbitSpeed + cube.userData.orbitOffset;
      
      const initialX = Math.cos(orbitAngle) * orbitRadius;
      const initialZ = Math.sin(orbitAngle) * orbitRadius;
      
      // Apply vertical floating motion
      const floatY = Math.sin(time * cube.userData.floatFrequency) * cube.userData.floatAmplitude;
      
      // Update position
      cube.position.x = initialX;
      cube.position.y += (floatY - cube.position.y) * 0.05; // Smooth transition
      cube.position.z = initialZ;
      
      // Pulse size with distance from center (gravitational effect)
      const distanceToCenter = Math.sqrt(
        cube.position.x * cube.position.x + 
        cube.position.y * cube.position.y + 
        cube.position.z * cube.position.z
      );
      
      const scaleFactor = 1 + Math.sin(time * 2 + distanceToCenter) * 0.1;
      cube.scale.set(scaleFactor, scaleFactor, scaleFactor);
    });
    
    // Move camera in a slow orbit
    camera.position.x = Math.sin(time * 0.1) * 7;
    camera.position.z = Math.cos(time * 0.1) * 7;
    camera.lookAt(0, 0, 0);
    
    // Animate spotlights
    spotlights.forEach((spotlight, index) => {
      const intensity = 1 + Math.sin(time * 0.5 + index) * 0.5;
      spotlight.intensity = intensity;
    });
    
    // Render scene
    renderer.render(scene, camera);
  };
  
  // Start animation
  animate();
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId);
    
    // Dispose of geometries and materials
    blackHoleGeometry.dispose();
    blackHoleMaterial.dispose();
    diskGeometry.dispose();
    diskMaterial.dispose();
    glowGeometry.dispose();
    glowMaterial.dispose();
    horizonGeometry.dispose();
    horizonMaterial.dispose();
    
    // Dispose of cube resources
    cubes.forEach(cube => {
      cube.geometry.dispose();
      cube.material.dispose();
    });
    
    // Remove everything from memory
    scene.clear();
    renderer.dispose();
  };
};