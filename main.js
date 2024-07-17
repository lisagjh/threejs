import * as THREE from 'three';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Vertex Shader
const vertexShader = `
varying vec3 vPosition;

void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
varying vec3 vPosition;

void main() {
  gl_FragColor = vec4(vPosition * 0.5 + 0.5, 1.0);
}
`;

// STAP 1: setup
// threejs heeft altijd een scene, camera en renderer nodig. 
// de scene kan je zien als een soort container waar al je objecten, cameras en lights in zitten

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, );
// PerspectiveCamera( FOV , aspect ratio , 0.1, 1000, view frustrum x 2)
// View frustrum: controls which objects are visible to the camera -> nu: vrijwel alles

const renderer = new THREE.WebGLRenderer({
    // renderer moet weten welk dom element gebruikt moet worden
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
// maakt het canvas full screen
renderer.setSize(window.innerWidth, window.innerHeight);
// de standaard positie van de camera is in het midden van de scene, 
camera.position.setZ(30);

renderer.render( scene, camera );


// STAP 2: geometry !
const geometry = new THREE.TorusGeometry( 10, 4, 20, 100);
// new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);


// 2.a geef het materiaal
// dit basic materiaal heeft geen light source nodig, veel andere materials wel
// const material = new THREE.MeshBasicMaterial({ color: 0xFFAA00, wireframe: true});
// MeshStandardMaterial reageert dus wel op licht

const material = new THREE.MeshMatcapMaterial({ color: 0x32a8a2});

// material.bumpMap = new THREE.Texture();

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// helpers:
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement)


// scroll animatie ?
let previousScrollPosition = window.scrollY;

function moveCamera() {
  const currentScrollPosition = window.scrollY;
  const delta = currentScrollPosition - previousScrollPosition;

  // Update torus rotation based on scroll direction
  if (delta > 0) {
      // Scrolling down
      torus.rotation.x += 0.03;
      torus.rotation.y -= 0.01;
  } else if (delta < 0) {
      // Scrolling up
      torus.rotation.x -= 0.04;
      torus.rotation.y += 0.01;
  }

  // Update previous scroll position
  previousScrollPosition = currentScrollPosition;
}
document.body.onscroll = moveCamera


// optie a: render elke keer opnieuw aanroepen
// renderer.render(scene, camera)
// optie b: functie maken
function animate() {
  requestAnimationFrame(animate);

  // anaimtie toevoegen

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.0000001;
  
  // controls.update();

  renderer.render(scene, camera);
}

animate();