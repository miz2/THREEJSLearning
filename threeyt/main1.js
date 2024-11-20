import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'; // Import dat.GUI

// Create the scene
const scene = new THREE.Scene();

// Set up texture loader to load the brown texture image
const loader = new THREE.TextureLoader();
const colorTexture = loader.load("./text/color.jpg"); // Path to your brown-colored texture image

// Create a sphere geometry and material with the texture
const geometry = new THREE.SphereGeometry(15, 32, 16, 32, true); // Sphere of radius 15
const material = new THREE.MeshStandardMaterial({
  map: colorTexture, // Apply the loaded texture
  wireframe: false, // Solid rendering
  side: THREE.DoubleSide, // Render both sides of the geometry
});
const sphere = new THREE.Mesh(geometry, material);

// Add the sphere to the scene
scene.add(sphere);

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 50; // Move the camera back to fit the sphere in view

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering quality on high-DPI screens
document.body.appendChild(renderer.domElement);

// Add studio-style lighting

// High-intensity directional light (like a spotlight)
const intenseLight = new THREE.DirectionalLight(0xffffff, 3); // High-intensity white light
intenseLight.position.set(50, 50, 50); // Positioned above and in front of the object
intenseLight.castShadow = true; // Enable shadows
scene.add(intenseLight);

// Create and add helper for the high-intensity directional light
const intenseLightHelper = new THREE.DirectionalLightHelper(intenseLight, 5);
scene.add(intenseLightHelper);

// Key light
const keyLight = new THREE.DirectionalLight(0xffffff, 1); // Standard white light
keyLight.position.set(20, 20, 20); // Position light above and to the side
scene.add(keyLight);

// Create and add helper for the key light
const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 5);
scene.add(keyLightHelper);

// Fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5); // Softer white light
fillLight.position.set(-20, -10, 10); // Positioned on the opposite side
scene.add(fillLight);

// Create and add helper for the fill light
const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 5);
scene.add(fillLightHelper);

// **Ambient Light** (Adds soft global illumination)
const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // Soft white light for background illumination
scene.add(ambientLight);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds a smooth effect to the controls
controls.autoRotate = true; // Enables automatic rotation
controls.enableZoom = true; // Allows zooming with mouse/touch

// Create dat.GUI panel to control material settings
const gui = new dat.GUI();

// Create a GUI folder for material settings
const materialFolder = gui.addFolder('Material Settings');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'side', { 'Front': THREE.FrontSide, 'Back': THREE.BackSide, 'Double': THREE.DoubleSide });
materialFolder.open();

// Create a GUI folder for light settings
const lightFolder = gui.addFolder('Lighting');
lightFolder.add(intenseLight, 'intensity', 0, 5).name('Intensity (Spotlight)');
lightFolder.add(keyLight, 'intensity', 0, 5).name('Intensity (Key Light)');
lightFolder.add(fillLight, 'intensity', 0, 5).name('Intensity (Fill Light)');
lightFolder.add(ambientLight, 'intensity', 0, 2).name('Ambient Light Intensity');
lightFolder.open();

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update controls (required for damping and auto-rotation to work)
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Call the animate function
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  // Update the renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Update the camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
