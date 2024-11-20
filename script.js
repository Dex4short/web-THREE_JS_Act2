import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/geometries/TextGeometry.js";

/*Canvas*/
const canvas = document.querySelector('canvas.webgl');

/*Scene*/
const scene = new THREE.Scene();

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
