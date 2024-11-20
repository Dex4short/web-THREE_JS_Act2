import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/*Canvas*/
const canvas = document.querySelector('canvas.webgl');

/*Scene*/
const scene = new THREE.Scene();

/*Font*/
const fontLoader = new FontLoader();
fontLoader.load(
  "./examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry(
      'Hello Three.js',
       {
       font: font,
       size: 0.5,
       height: 0.2,
       curveSegments: 12,
       bevelEnabled: true,
       bevelThickness: 0.03,
       bevelSize: 0.02,
       bevelOffset: 0,
       bevelSegments: 5
       }
    );
    const textMaterial = new THREE.MeshBasicMaterial();
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
  }
);

/*Object*/
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/*Camera*/
const sizes = {width: window.innerWidth, height: window.innerHeight};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/*Renderer*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


/*Resize Listener*/
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

/*Animation*/
const tick = () => {
    renderer.render(scene, camera);
    controls.update();
    window.requestAnimationFrame(tick);
};
tick();

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
   if(!fullscreenElement) {
     if(canvas.requestFullscreen) {
        canvas.requestFullscreen()
     }
     else if(canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen()
      }
   }
   else {
     if(document.exitFullscreen) {
        document.exitFullscreen()
     }
     else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
     }
   }
});

/*GUI*/
const gui = new dat.GUI();
gui.add(mesh.position, 'x').min(- 3).max(3).step(0.01).name('x:');
gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('y:');
gui.add(mesh.position, 'z').min(- 3).max(3).step(0.01).name('z:');
gui.add(mesh.rotation, 'x').min(- 3).max(3).step(0.01).name('rotation x:');
gui.add(mesh.rotation, 'y').min(- 3).max(3).step(0.01).name('rotation y:');
gui.add(mesh.rotation, 'z').min(- 3).max(3).step(0.01).name('rotation z:');
gui.add(mesh.scale, 'x').min(0).max(5).step(0.01).name('scale x:');
gui.add(mesh.scale, 'y').min(0).max(5).step(0.01).name('scale y:');
gui.add(mesh.scale, 'z').min(0).max(5).step(0.01).name('scale z:');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
const parameters = { color: 0xff0000 };
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
})
