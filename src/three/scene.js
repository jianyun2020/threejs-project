import * as THREE from 'three'
// import camera from './camera'

const scene = new THREE.Scene()

// 天空盒子
const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/")
const textureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
])

scene.background = textureCube
scene.environment = textureCube

// 通过射线检测获取坐标
// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()

// window.addEventListener('click', (event) => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
//   raycaster.setFromCamera(mouse, camera)
//   const a = scene.children.filter(i => {
//     return i.type === 'Group'
//   })
//   const res = a[0].children.filter((i) => {
//     return i.name === "Layerbuildings"
//   })
//   const intersects = raycaster.intersectObjects(res)
//   if (intersects.length > 0) {
//     console.log(intersects)
//   }
// })

export default scene