// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function initCinematicExperience() {
  const section = document.getElementById('cinematic-experience');
  const canvas = document.getElementById('cinematic-canvas');
  const pinContainer = document.getElementById('canvas-pin');

  if (!section || !canvas || !pinContainer) return;

  // 1. Setup Three.js Scene
  const scene = new THREE.Scene();
  scene.background = null;

  // Camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 16);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  // 2. Add Lights (Premium shadows and specular reflection)
  const ambient = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambient);

  // Moving spotlight to sweep reflections across the watch
  const spotlight = new THREE.SpotLight(0xfff5db, 5.0, 30, Math.PI / 4, 0.5, 1);
  spotlight.position.set(5, 5, 8);
  spotlight.castShadow = true;
  scene.add(spotlight);

  // Soft blue-ish rim light from back-left
  const rimLight = new THREE.DirectionalLight(0x8ba6c9, 1.5);
  rimLight.position.set(-8, 3, -5);
  scene.add(rimLight);

  // Warm key light from top-right
  const keyLight = new THREE.DirectionalLight(0xc9a96e, 2.5);
  keyLight.position.set(8, 8, 4);
  scene.add(keyLight);

  // 3. Create the Watch Model group procedurally
  const watchGroup = new THREE.Group();
  
  // Materials
  const matteBlackMat = new THREE.MeshStandardMaterial({
    color: 0x121212,
    roughness: 0.8,
    metalness: 0.2
  });

  const goldPolishedMat = new THREE.MeshStandardMaterial({
    color: 0xC9A96E,
    roughness: 0.15,
    metalness: 0.9,
    bumpScale: 0.05
  });

  const silverBrushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    roughness: 0.45,
    metalness: 0.85
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5
  });

  // Watch Case (Cylinder ring)
  const caseGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.9, 45, 1, true);
  const caseMesh = new THREE.Mesh(caseGeo, matteBlackMat);
  caseMesh.rotation.x = Math.PI / 2;
  watchGroup.add(caseMesh);

  // Watch Bezel (Gold Ring)
  const bezelGeo = new THREE.TorusGeometry(3.1, 0.15, 16, 100);
  const bezelMesh = new THREE.Mesh(bezelGeo, goldPolishedMat);
  bezelMesh.position.z = 0.45;
  watchGroup.add(bezelMesh);

  // Create a canvas texture for the Titan dial
  const dialCanvas = document.createElement('canvas');
  dialCanvas.width = 512;
  dialCanvas.height = 512;
  const dialCtx = dialCanvas.getContext('2d');
  
  // Fill background with deep matte black
  dialCtx.fillStyle = '#0f0f0f';
  dialCtx.fillRect(0, 0, 512, 512);
  
  // Draw subtle luxury gold circular rings
  dialCtx.strokeStyle = 'rgba(201, 169, 110, 0.05)';
  dialCtx.lineWidth = 1;
  for (let r = 80; r < 240; r += 6) {
    dialCtx.beginPath();
    dialCtx.arc(256, 256, r, 0, Math.PI * 2);
    dialCtx.stroke();
  }
  
  // Draw "TITAN" logo text in gold
  dialCtx.fillStyle = '#C9A96E';
  dialCtx.font = 'bold 38px "Playfair Display", serif';
  dialCtx.textAlign = 'center';
  dialCtx.textBaseline = 'middle';
  dialCtx.letterSpacing = '14px';
  dialCtx.fillText('TITAN', 263, 170); // Offset X slightly to balance letter-spacing
  
  // Draw "EDGE" subtext in muted gold
  dialCtx.fillStyle = '#DFCB9F';
  dialCtx.font = '15px "Inter", sans-serif';
  dialCtx.letterSpacing = '6px';
  dialCtx.fillText('EDGE', 259, 215);
  
  // Draw "SAPPHIRE" subtext in dark gold/gray
  dialCtx.fillStyle = '#8E703B';
  dialCtx.font = '10px "Inter", sans-serif';
  dialCtx.letterSpacing = '8px';
  dialCtx.fillText('SAPPHIRE', 260, 340);
  
  const dialTexture = new THREE.CanvasTexture(dialCanvas);
  
  const titanDialMat = new THREE.MeshStandardMaterial({
    map: dialTexture,
    roughness: 0.35,
    metalness: 0.75
  });

  // Watch Dial Plate
  const dialGeo = new THREE.CylinderGeometry(3.0, 3.0, 0.08, 40);
  const dialMesh = new THREE.Mesh(dialGeo, titanDialMat);
  dialMesh.rotation.x = Math.PI / 2;
  dialMesh.position.z = -0.1;
  watchGroup.add(dialMesh);

  // Dial markings/ticks (Gold markers)
  const ticksGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12;
    const tickGeo = new THREE.BoxGeometry(0.1, 0.4, 0.05);
    const tickMesh = new THREE.Mesh(tickGeo, goldPolishedMat);
    tickMesh.position.set(Math.sin(angle) * 2.7, Math.cos(angle) * 2.7, 0.05);
    tickMesh.rotation.z = -angle;
    ticksGroup.add(tickMesh);
  }
  watchGroup.add(ticksGroup);

  // Hands (Hour & Minute)
  const hourHandGeo = new THREE.BoxGeometry(0.12, 1.5, 0.03);
  hourHandGeo.translate(0, 0.75, 0); // anchor at bottom
  const hourHand = new THREE.Mesh(hourHandGeo, goldPolishedMat);
  hourHand.position.set(0, 0, 0.12);
  hourHand.rotation.z = Math.PI / 4; // 1:30 position
  watchGroup.add(hourHand);

  const minHandGeo = new THREE.BoxGeometry(0.08, 2.3, 0.03);
  minHandGeo.translate(0, 1.15, 0); // anchor at bottom
  const minHand = new THREE.Mesh(minHandGeo, goldPolishedMat);
  minHand.position.set(0, 0, 0.15);
  minHand.rotation.z = Math.PI / -6;
  watchGroup.add(minHand);

  // Internal Gears (Visible behind dial when exploded, or represented)
  const gearsSubGroup = new THREE.Group();
  gearsSubGroup.position.z = -0.6; // placed behind dial plate
  
  // Custom gear function
  function makeInternalGear(radius, teeth, mat, speed) {
    const shape = new THREE.Shape();
    const steps = teeth * 2;
    const stepAngle = (Math.PI * 2) / steps;
    for (let i = 0; i <= steps; i++) {
      const angle = i * stepAngle;
      const r = (i % 2 === 0) ? radius : radius - 0.25;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    const extrudeGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.15, bevelEnabled: false });
    extrudeGeo.center();
    const gear = new THREE.Mesh(extrudeGeo, mat);
    gear.userData = { speed: speed };
    return gear;
  }

  const gear1 = makeInternalGear(1.8, 12, goldPolishedMat, 0.02);
  gear1.position.set(-0.8, -0.6, 0);
  gearsSubGroup.add(gear1);

  const gear2 = makeInternalGear(1.3, 10, silverBrushedMat, -0.025);
  gear2.position.set(1.0, 0.8, 0.05);
  gearsSubGroup.add(gear2);

  watchGroup.add(gearsSubGroup);

  // Straps (Top & Bottom)
  const strapGeo = new THREE.BoxGeometry(1.6, 4.0, 0.15);
  strapGeo.translate(0, 2.0, 0); // anchor at base of lug
  
  const topStrap = new THREE.Mesh(strapGeo, matteBlackMat);
  topStrap.position.set(0, 3.1, 0);
  watchGroup.add(topStrap);

  const bottomStrap = new THREE.Mesh(strapGeo, matteBlackMat);
  bottomStrap.position.set(0, -3.1, 0);
  bottomStrap.rotation.z = Math.PI; // flip downward
  watchGroup.add(bottomStrap);

  // Dial Glass
  const glassGeo = new THREE.CylinderGeometry(3.08, 3.08, 0.1, 40);
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.rotation.x = Math.PI / 2;
  glassMesh.position.z = 0.55;
  watchGroup.add(glassMesh);

  // Gold crown at 3 o'clock position
  const crownGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 24);
  const crownMesh = new THREE.Mesh(crownGeo, goldPolishedMat);
  crownMesh.rotation.z = Math.PI / 2;
  crownMesh.position.set(3.35, 0, 0); // 3 o'clock position on watch case
  watchGroup.add(crownMesh);

  scene.add(watchGroup);

  // Position watch initially out of sight or offset
  watchGroup.rotation.set(0.2, 0.5, 0);
  watchGroup.position.set(0, 0, -20); // starts far back

  // 4. Create floating gold particles
  const particleCount = 80;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const speeds = [];

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;      // x
    positions[i + 1] = (Math.random() - 0.5) * 15;  // y
    positions[i + 2] = (Math.random() - 0.5) * 10;  // z
    speeds.push({
      x: (Math.random() - 0.5) * 0.005,
      y: (Math.random() - 0.5) * 0.005,
      z: (Math.random() - 0.5) * 0.005
    });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particleMat = new THREE.PointsMaterial({
    color: 0xC9A96E,
    size: 0.15,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeometry, particleMat);
  scene.add(particles);

  // 5. GSAP ScrollTrigger Setup
  // We control these proxy values using GSAP ScrollTrigger timeline,
  // and map them to our Three.js objects inside the requestAnimationFrame loop.
  const animProxy = {
    // Watch transform
    watchPosZ: -20,
    watchPosX: 0,
    watchPosY: 0,
    watchRotX: 0.2,
    watchRotY: 0.5,
    watchRotZ: 0,
    
    // Explosion states
    explosionFactor: 0.0, // 0 = assembled, 1 = exploded
    
    // Camera & lights
    cameraX: 0,
    cameraY: 0,
    cameraZ: 16,
    lightIntensity: 2.5,
    lightSweepX: 5,
    
    // Particles
    particleOpacity: 0.35,
    particleSpeedScale: 1.0
  };

  // Build the unified ScrollTrigger timeline
  // Pin length is 500vh (representing 5 steps of scrolling)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#cinematic-experience',
      start: 'top top',
      end: '+=500%',
      scrub: 1.5,
      pin: true,
      anticipatePin: 1
    }
  });

  // Scene 1 -> Scene 2: Gear/Mechanisms emerge, camera zooms in close
  tl.to(animProxy, {
    watchPosZ: -3,
    watchPosX: -2.0, // shift left slightly for text alignment
    watchRotX: 0.9,
    watchRotY: 1.4,
    cameraZ: 6.5,    // Macro zoom in!
    cameraX: -2.0,   // Focus camera on the watch dial
    cameraY: 0.3,
    particleOpacity: 0.6,
    duration: 1.0
  }, 0)
  .to('#scene-01 .cinematic-title, #scene-01 .cinematic-desc', {
    opacity: 0,
    y: -30,
    duration: 0.35
  }, 0.1)
  .to('#scene-02 .cinematic-title', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 0.5)
  .to('#scene-02 .cinematic-desc', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 0.6);
  
  // Scene 2 -> Scene 3: Glide camera, watch comes to center
  tl.to(animProxy, {
    watchPosX: 0,
    watchPosY: 0,
    watchPosZ: 2,
    watchRotX: 0.2,
    watchRotY: 0.6,
    cameraZ: 14,     // Zoom back out for full watch center position
    cameraX: 0,
    cameraY: 0,
    lightSweepX: -5,
    duration: 1.0
  }, 1.0)
  .to('#scene-02 .cinematic-title, #scene-02 .cinematic-desc', {
    opacity: 0,
    y: -30,
    duration: 0.35
  }, 1.1)
  .to('#scene-03 .cinematic-title', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 1.5)
  .to('#scene-03 .cinematic-desc', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 1.6);
  
  // Scene 3 -> Scene 4: Explosion! watch components push outward along Z and Y
  tl.to(animProxy, {
    watchRotX: 0.6,
    watchRotY: 2.2,
    watchRotZ: 0.3,
    explosionFactor: 1.0, // trigger parts drift
    cameraZ: 12.5,   // Zoom in slightly on gears
    cameraX: 0.5,    // Pan slightly right to see gears clearly
    cameraY: -0.3,
    duration: 1.0
  }, 2.0)
  .to('#scene-03 .cinematic-title, #scene-03 .cinematic-desc', {
    opacity: 0,
    y: -30,
    duration: 0.35
  }, 2.1)
  .to('#scene-04 .cinematic-title', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 2.5)
  .to('#scene-04 .cinematic-desc', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 2.6);
  
  // Scene 4 -> Scene 5: Reassemble, sweep bright light across surface
  tl.to(animProxy, {
    watchRotX: 0.3,
    watchRotY: 0.0, // facing front mostly
    watchRotZ: 0,
    explosionFactor: 0.0, // reassemble
    lightSweepX: 8,
    cameraZ: 13,
    cameraX: 0,
    cameraY: 0,
    duration: 1.0
  }, 3.0)
  .to('#scene-04 .cinematic-title, #scene-04 .cinematic-desc', {
    opacity: 0,
    y: -30,
    duration: 0.35
  }, 3.1)
  .to('#scene-05 .cinematic-title', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 3.5)
  .to('#scene-05 .cinematic-desc', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 3.6);
  
  // Scene 5 -> Scene 6: Fade out/shrink watch back to darkness as we morph to next section
  tl.to(animProxy, {
    watchPosZ: -15,
    watchRotX: -0.5,
    watchRotY: -1.5,
    particleOpacity: 0.1,
    duration: 1.0
  }, 4.0)
  .to('#scene-05 .cinematic-title, #scene-05 .cinematic-desc', {
    opacity: 0,
    y: -30,
    duration: 0.35
  }, 4.1)
  .to('#scene-06 .cinematic-title', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 4.5)
  .to('#scene-06 .cinematic-desc', {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, 4.6)
  .to('#scene-06 .cinematic-title, #scene-06 .cinematic-desc', {
    opacity: 0,
    y: -30,
    duration: 0.25
  }, 4.85);

  // 6. RequestAnimationFrame Loop
  function tick() {
    // Map animProxy properties to Three.js objects
    watchGroup.position.set(animProxy.watchPosX, animProxy.watchPosY, animProxy.watchPosZ);
    watchGroup.rotation.set(animProxy.watchRotX, animProxy.watchRotY, animProxy.watchRotZ);

    // Apply Explosion Factor
    const exp = animProxy.explosionFactor;
    
    // Lug & strap displacement (outward Y)
    topStrap.position.set(0, 3.1 + exp * 1.5, 0);
    bottomStrap.position.set(0, -3.1 - exp * 1.5, 0);
    
    // Crown displacement (outward X)
    crownMesh.position.set(3.35 + exp * 0.8, 0, 0);
    
    // Dial and bezel displacement (forward Z)
    glassMesh.position.z = 0.55 + exp * 2.8;
    bezelMesh.position.z = 0.45 + exp * 2.0;
    ticksGroup.position.z = exp * 1.3;
    hourHand.position.set(0, 0, 0.12 + exp * 1.1);
    minHand.position.set(0, 0, 0.15 + exp * 0.9);
    
    // Dial plate goes backward Z slightly
    dialMesh.position.z = -0.1 - exp * 0.5;
    
    // Internals drift further back Z to expose them
    gearsSubGroup.position.z = -0.6 - exp * 1.8;

    // Rotate internal gears continuously, with speed scaled by explosion
    const gearRotSpeedScale = 1.0 + exp * 3.0;
    gearsSubGroup.children.forEach(g => {
      g.rotation.z += g.userData.speed * gearRotSpeedScale;
    });

    // Update light sweep position
    spotlight.position.x = animProxy.lightSweepX;
    keyLight.intensity = animProxy.lightIntensity;

    // Update camera position (with X, Y, and Z coordinates)
    camera.position.set(animProxy.cameraX, animProxy.cameraY, animProxy.cameraZ);

    // Gently move floating particles
    const positionsAttr = particleGeometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positionsAttr.array[idx] += speeds[i].x * animProxy.particleSpeedScale;
      positionsAttr.array[idx + 1] += speeds[i].y * animProxy.particleSpeedScale;
      positionsAttr.array[idx + 2] += speeds[i].z * animProxy.particleSpeedScale;

      // Wrap-around boundary check
      if (Math.abs(positionsAttr.array[idx]) > 8) positionsAttr.array[idx] *= -1;
      if (Math.abs(positionsAttr.array[idx + 1]) > 8) positionsAttr.array[idx + 1] *= -1;
      if (Math.abs(positionsAttr.array[idx + 2]) > 8) positionsAttr.array[idx + 2] *= -1;
    }
    positionsAttr.needsUpdate = true;
    particleMat.opacity = animProxy.particleOpacity;

    // Render frame
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  // Start tick loop
  tick();

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Export / Make globally available
window.initCinematicExperience = initCinematicExperience;
