 // Create the scene
 const scene = new THREE.Scene();

 // Create the camera
 const camera = new THREE.PerspectiveCamera(
   65, // Field of View
   window.innerWidth / window.innerHeight, // Aspect Ratio
   0.1, // Near Plane
   100 // Far Plane
 );
 camera.position.z = 5; // Move the camera backward

 // Create the geometry and material for the cube
 const geometry = new THREE.BoxGeometry(1, 1, 1);
 const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
 const cube = new THREE.Mesh(geometry, material);

 // Move the cube
 cube.position.x = 1;
 cube.position.z=2
 // dandi daalna
 cube.rotation.x=1.2
 cube.scale.z=2.3
 // cube.rotation.y=Math.PI
 // Add the cube to the scene
 scene.add(cube);

 // Set up the renderer
 const canvas = document.getElementById('draw');
 const renderer = new THREE.WebGLRenderer({ canvas,antialias:true });
 renderer.setSize(window.innerWidth, window.innerHeight);

 // Render the scene
 renderer.render(scene, camera);
 let clock=new THREE.Clock()
 function animate(){
    // fps speed k hissab se chalate raho 
    window.requestAnimationFrame(animate);
    renderer.render(scene,camera)
    // cube.rotation.y+=0.01
    cube.rotation.y=clock.getElapsedTime()*2
 }
 animate()