import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true

export default renderer