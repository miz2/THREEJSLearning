import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'; // To load HDR images

// Create the scene
const scene = new THREE.Scene();

// Load the HDRI environment map for lighting
const loader = new RGBELoader();
loader.setDataType(THREE.UnsignedByteType); // Set the texture data type for proper HDRI loading

// Load a local HDR image
loader.load('./textures/my_hdr_image.hdr', (texture) => {  // Replace 'my_hdr_image.hdr' with your actual file path
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture; // Set as background
  scene.environment = texture; // Set as environment for lighting

  // Continue after HDRI is loaded
  createScene();
});

// Function to create scene elements once HDRI is loaded
function createScene() {
  // Create a sphere geometry and material
  const geometry = new THREE.SphereGeometry(15, 32, 16); // Sphere of radius 15
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000, // Red color
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
  camera.position.set(0, 0, 50); // Set initial camera position

  // Set up the renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother edges
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering quality on high-DPI screens
  document.body.appendChild(renderer.domElement);

  // Add OrbitControls for camera movement
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth movement
  controls.dampingFactor = 0.25; // Damping effect for smooth camera controls
  controls.enableZoom = true; // Allow zoom with mouse or touch
  controls.autoRotate = true; // Enable automatic rotation of the camera

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera); // Render the scene
  }

  animate(); // Start the animation loop

  // Handle window resizing
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
