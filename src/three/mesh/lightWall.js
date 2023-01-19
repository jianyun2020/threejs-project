import * as THREE from 'three'
import gsap from 'gsap'
import vertex from "@/shader/lightWall/vertex.glsl?raw"
import fragment from "@/shader/lightWall/fragment.glsl?raw"

export default class LightWall {
  constructor() {
    this.geometry = new THREE.CylinderBufferGeometry(5, 5, 2, 32, 1, true)
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(0, 1, 0)
    this.mesh.geometry.computeBoundingBox()
    const {min, max} = this.mesh.geometry.boundingBox
    const uHeight = max.y - min.y
    this.material.uniforms.uHeight = {
      value: uHeight
    }

    // 光圈动画
    gsap.to(this.mesh.scale, {
      x: 0.5,
      z: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true
    })
  }
}