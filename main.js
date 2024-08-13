import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Right
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Left
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Top
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Front
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Back
];
const cube = new THREE.Mesh(geometry, materials);

scene.add(cube);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.ray.origin.copy(camera.position);
  raycaster.ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();

  const intersects = raycaster.intersectObjects(scene.children);

  let test = intersects[0];

  for (let i = 0; i < materials.length; i++) {
    materials[i].color.setHex(0xffff00);
  }

  if (test !== undefined) {
    materials[test.face.materialIndex].color.setHex(0xff0000);
  }
});

camera.position.z = 5;

function animate() {
  //   requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
