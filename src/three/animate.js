import * as THREE from 'three'
import camera from './camera'
import controls from './controls'
import renderer from './renderer'
import scene from './scene'

const clock = new THREE.Clock()

function animate() {
  controls.update()
  const time = clock.getElapsedTime()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

export default animate