import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import scene from '../scene'

export default function createCity() {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load("./models/city.glb", (gltf) => {
    gltf.scene.traverse(item => {
      if (item.type === 'Mesh') {
        item.material = new THREE.MeshBasicMaterial({
          color: 0x00ffff
        })
      }
    })
    scene.add(gltf.scene)
  })
}