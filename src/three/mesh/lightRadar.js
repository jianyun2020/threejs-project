import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/lightRadar/vertex.glsl?raw";
import fragment from "@/shader/lightRadar/fragment.glsl?raw";

export default class LightRadar {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(4, 4);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: {
          value: new THREE.Color("#ff00ff")
        },
        uTime: {
          value: 0
        }
      }
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-8, 1, 5);
    this.mesh.rotateX(-Math.PI / 2);

    gsap.to(this.material.uniforms.uTime,{
      value: 1,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })
  }
}
