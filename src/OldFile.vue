<template>
  <div class="hero-container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted } from 'vue';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let container: HTMLElement | null;
let scene: THREE.Object3D<THREE.Event> | THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: any;
let mouseX = 0;
let mouseY = 0;
let objects = [];

onMounted(() => {
  // Création de la scène
  scene = new THREE.Scene();
  scene.updateMatrixWorld(true);

  // Création de la caméra
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
  camera.position.z = 20;

  // Création du render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // Insertion du render dans le DOM
  container = document.querySelector('.hero-container');

  // Mise en place d'orbite control
  const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 100;
  controls.minDistance = 2;

  if (container) {
    container.appendChild(renderer.domElement);
  }

  // Création du cube plat
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('./assets/vue.png');
  const loader = new GLTFLoader(undefined);

  for (let i = 0; i < 20; i++) {
    const x = THREE.MathUtils.randInt(-20, 20);
    const y = THREE.MathUtils.randInt(-20, 20);
    const z = THREE.MathUtils.randInt(-10, 2);

    let mesh = new THREE.Mesh();

    loader.load(
      'assets/model.glb',
      (gltf) => {
        mesh = gltf.scene;
        mesh.position.set(x, y, z);
        objects.push(mesh);
        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }

  // const geometry = new RoundedBoxGeometry(1, 1, 0.2, 6, 2);
  // const material = new THREE.MeshLambertMaterial({ color: 0xcecece, map: texture });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // Lumière avant
  const directionLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionLight.position.set(0, 2, 10);
  directionLight.scale.set(10, 10, 10);
  directionLight.castShadow = true;
  scene.add(directionLight);

  document.body.addEventListener('pointermove', onPointerMove);

  // Appel de la fonction animate
  animate();
});

function onPointerMove(event) {
  if (event.isPrimary === false) {
    return;
  }

  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;
}

const render = () => {
  const time = Date.now() * 0.00005;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
  }

  renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};
</script>

<style scoped lang="sass">
.hero-container
  border: 1px solid red
</style>
