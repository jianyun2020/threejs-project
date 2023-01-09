<script setup>
  import * as THREE from 'three'
  import {ref, onMounted} from 'vue'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

  // 初始化场景
  const scene = new THREE.Scene()

  // 初始化相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 0.1

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  const container = ref(null)

  // 创建球体
  const geometry = new THREE.SphereGeometry(5, 32,32)
  // const loader = new RGBELoader()
  const loader = new THREE.TextureLoader()
  loader.load('./images/living/hotel_room.png', (texture) => {
    const material = new THREE.MeshBasicMaterial({map: texture})
    const sphere = new THREE.Mesh(geometry, material)
    sphere.geometry.scale(1,1,-1)
    scene.add(sphere)
  })
  // 挂载完毕
  onMounted(() => {
    // 添加轨道控制器
    const controls = new OrbitControls(camera, container.value)
    controls.enableDamping = true
    container.value.appendChild(renderer.domElement)
    const render = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    render()

    // 自适应
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio = window.innerWidth / window.innerHeight
    })
  })

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
