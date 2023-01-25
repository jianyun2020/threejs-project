import * as THREE from 'three'
import gsap from 'gsap'
import vertex from "@/shader/lightWall/vertex.glsl?raw"
import fragment from "@/shader/lightWall/fragment.glsl?raw"

export default class LightWall {
  constructor(
    radius=5,
    length=2,
    position={x:0,z:0},
    color=0xff0000
  ) {
    this.geometry = new THREE.CylinderGeometry(radius, radius, 2, 32, 1, true)
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(position.x, position.y, position.z)
    this.mesh.geometry.computeBoundingBox()
    const {min, max} = this.mesh.geometry.boundingBox
    const uHeight = max.y - min.y
    this.material.uniforms.uHeight = {
      value: uHeight
    }

    // 光圈动画
    gsap.to(this.mesh.scale, {
      x: length,
      z: length,
      duration: 1,
      repeat: -1,
      yoyo: true
    })
  }

  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}