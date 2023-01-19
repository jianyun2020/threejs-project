import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/shader/flyLine/vertex.glsl?raw'
import fragment from '@/shader/flyLine/fragment.glsl?raw'

export default class FlyLineShader {
  constructor() {
    // 1. 根据点生成曲线
    const linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-5, 5, 0),
      new THREE.Vector3(-10, 0, 0)
    ]
    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints)
    const points = this.lineCurve.getPoints(1000)
    
    // 2. 创建几何体顶点
    this.geometry = new THREE.BufferGeometry().setFromPoints(points)
    // 给每一个顶点设置属性
    const aSizeArray = new Float32Array(points.length)
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i;
    }
    // 设置几何体顶点属性
    this.geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(aSizeArray, 1)
    )

    // 3. 设置着色器材质
    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new THREE.Color(0xffff00)
        },
        uLength: {
          value: points.length
        }
      }
    })

    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial)

    // 改变uTime来控制动画
    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })
  }
}