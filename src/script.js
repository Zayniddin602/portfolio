import "./style.css";
import * as THREE from "three";

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color({color:0x72147E})

// Objects
// var axes = new THREE.AxesHelper(20);
// scene.add(axes);

var planeGeometry = new THREE.PlaneGeometry(1500, 1500);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x72147E });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
var cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xFA9905,
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -45;
cube.position.y = 5;
cube.position.z = 10;

scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0x0CECDD,
});

var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 20;
sphere.position.y = 22;
sphere.position.z = -20;

scene.add(sphere);


const cyGeometry = new THREE.CylinderGeometry( 8, 12,35, 32 );
const cyMaterial = new THREE.MeshBasicMaterial( {color: 0x1c1427} );
const cylinder = new THREE.Mesh( cyGeometry, cyMaterial );
cylinder.position.x = 60;
cylinder.position.y = 0;
cylinder.position.z = 45;
scene.add( cylinder );


const texture = new THREE.TextureLoader().load( "./textures/grass.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

const coneGeometry = new THREE.ConeGeometry( 35, 70, 32 );
const coneMaterial = new THREE.MeshBasicMaterial( {map:texture} );

const cone1 = new THREE.Mesh( coneGeometry, coneMaterial );
cone1.position.x = 60;
cone1.position.y = 45;
cone1.position.z = 45;

scene.add( cone1 );

 //Fog
 scene.fog=new THREE.Fog( 0x72147E, 0.15, 500 )

//Font
const loader = new THREE.FontLoader();

loader.load("./helvetiker_regular.typeface.json", function (font) {
  const geometry = new THREE.TextGeometry("Hi, there", {
    font: font,
    size: 18,
    height: 2,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 1.5,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({ color: 0xF21170 }),
    new THREE.MeshPhongMaterial({ color: 0xF21170 }),
  ]);
  textMesh.position.x = -40;
  textMesh.position.y = 20;

  scene.add(textMesh);
});

loader.load("./helvetiker_regular.typeface.json", function (font) {
  const geometry = new THREE.TextGeometry("I'm Zayniddin", {
    font: font,
    size: 10,
    height: 2,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({ color: 0xFF5200 }),
    new THREE.MeshPhongMaterial({ color: 0xFF5200 }),
  ]);
  textMesh.position.x = -40;
  textMesh.position.y = 5;

  scene.add(textMesh);
});

//Lights
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 260, 120);

scene.add(spotLight);

//Camera
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = -50;
camera.position.y = 50;
camera.position.z = 50;
camera.lookAt(scene.position);
scene.add(camera);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.maxPolarAngle = Math.PI / 2.5;
controls.enableDamping = true; //damping
controls.dampingFactor = 0.25; //damping inertia
controls.enableZoom = true; //Zooming
controls.minDistance = 50; 
controls.maxDistance = 200;
controls.autoRotate = false; // enable rotation
controls.keys = {
  LEFT: 37, //left arrow
  UP: 38, // up arrow
  RIGHT: 39, // right arrow
  BOTTOM: 40, // down arrow
};

controls.addEventListener("change", () => {
  if (renderer) renderer.render(scene, camera);
});

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setClearColor(new THREE.Color(0xffffff));

//Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  cube.rotation.y += 0.01;

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

var step = 0;
function renderScene() {
  step += 0.03;
  sphere.position.y = 5 + 10 * Math.abs(Math.sin(step));
  cube.position.y = 6 + Math.abs(Math.sin(step));
  window.requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}
renderScene();
tick();

