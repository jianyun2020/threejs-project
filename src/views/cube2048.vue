<script setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 初始化场景
const scene = new THREE.Scene();

// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 0.1;

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const container = ref(null);

const imgArr = ["0_b", "0_f", "0_u", "0_d", "0_r", "0_l"];
const boxMaterials = [];
// 创建球体
const geometry = new THREE.BoxGeometry(10, 10, 10);
const loader = new THREE.TextureLoader();
imgArr.forEach((item) => {
  let texture = loader.load(`./images/cube_2048/${item.split('_')[0]}/${item}.jpg`);

  if (item === "0_u") {
    texture.rotation = -Math.PI / 2;
    texture.center = new THREE.Vector2(0.5, 0.5);
    boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
  } else if (item === "0_d") {
    texture.rotation = Math.PI / 2;
    texture.center = new THREE.Vector2(0.5, 0.5);
    boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
  } else {
    boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
  }
});

const cube = new THREE.Mesh(geometry, boxMaterials);
cube.geometry.scale(1, 1, -1);
scene.add(cube);

// 挂载完毕
onMounted(() => {
  // 添加轨道控制器
  const controls = new OrbitControls(camera, container.value);
  controls.enableDamping = true;
  container.value.appendChild(renderer.domElement);
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

  // 自适应
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio = window.innerWidth / window.innerHeight;
  });
});
</script>

<template>
  <div class="indoor-roaming" ref="container"></div>
</template>

<style>
.indoor-roaming {
  width: 100vw;
  height: 100vh;
}
</style>
