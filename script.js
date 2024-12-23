import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


/*Canvas*/
const canvas = document.querySelector('canvas.webgl');

/*Scene*/
const scene = new THREE.Scene();

/*Font*/
const font_link = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";
const fontLoader = new FontLoader();
fontLoader.load(font_link, (font) => {
    const text_value = 'Medieval World';
    const text_properties = {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 0,
    };
    const textGeometry = new TextGeometry(text_value, text_properties);
    textGeometry.center();
  
    const text_texture = new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/soil_texture.png');
    text_texture.wrapS = THREE.RepeatWrapping;
    text_texture.wrapT = THREE.RepeatWrapping;
    text_texture.repeat.set(1, 1);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: text_texture,
      side: THREE.DoubleSide
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
});

/*Object*/
/**background**/
const background_textures = [
  new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/background_right.png'),
  new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/background_left.png'),
  new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/background_top.png'),
  new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/background_bottom.png'),
  new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/background_front.png'),
  new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/background_back.png'),
];
const background_materials = [
    new THREE.MeshBasicMaterial({map: background_textures[0], side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: background_textures[1], side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: background_textures[2], side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: background_textures[3], side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: background_textures[4], side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: background_textures[5], side: THREE.BackSide}),
]
const background_geometry = new THREE.BoxGeometry(100, 100, 100);
const background_mesh = new THREE.Mesh(background_geometry, background_materials);
scene.add(background_mesh);
/**geometry**/
const texture = new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/crate_texture.png');
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
  map: texture
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -2;
scene.add(mesh);
/**ground**/
const ground_texture = new THREE.TextureLoader().load('https://dex4short.github.io/web-THREE_JS_Act2/grass_texture.png');
ground_texture.wrapS = THREE.RepeatWrapping;
ground_texture.wrapT = THREE.RepeatWrapping;
ground_texture.repeat.set(50, 50);
const ground_geometry = new THREE.BoxGeometry(100,0.1,100);
const ground_material = new THREE.MeshBasicMaterial({
  map: ground_texture
});
const ground_mesh = new THREE.Mesh(ground_geometry, ground_material);
ground_mesh.position.y = -5;
scene.add(ground_mesh);

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
