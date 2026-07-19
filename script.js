// 1️⃣ Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2️⃣ Particle Background
const particleCount = 3000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 2000;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x00E5FF,
  size: 2,
  transparent: true,
  opacity: 0.8,
});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// 3️⃣ Scroll‑driven camera depth
const scrollToCamera = () => {
  const scroll = window.scrollY;
  camera.position.z = 400 + scroll * 0.5; // move deeper as you scroll
  camera.lookAt(scene.position);
};
window.addEventListener('scroll', scrollToCamera);

// 4️⃣ Mouse‑driven camera rotation
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});
const rotateCamera = () => {
  camera.rotation.x = mouse.y * 0.05;
  camera.rotation.y = mouse.x * 0.05;
};

// 5️⃣ Animation Loop
const animate = () => {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0003;
  rotateCamera();
  renderer.render(scene, camera);
};
animate();

// 6️⃣ Responsive Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});