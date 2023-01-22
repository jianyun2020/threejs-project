<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import scene from '@/three/scene'
import camera from '@/three/camera'
import renderer from '@/three/renderer'
import axesHelper from '@/three/axesHelper'
import animate from '@/three/animate'
import '@/three/init'
import createMesh from '@/three/createMesh'


scene.add(camera)
scene.add(axesHelper)
const sceneDiv = ref(null)

createMesh()

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)
  animate()
})
</script>

<style>
.scene {
  width: 100vw;
  height: 100vh;
}
</style>