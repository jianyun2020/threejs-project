<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as THREE from 'three'
import scene from "@/three/scene";
import camera from "@/three/camera";
import renderer from "@/three/renderer";
import axesHelper from "@/three/axesHelper";
import animate from "@/three/animate";
import "@/three/init";
import createMesh from "@/three/createMesh";
import LightWall from "../three/mesh/lightWall";
import FlyLineShader from "../three/mesh/flyLineShader";
import LightRadar from "../three/mesh/lightRadar";
import eventHub from "@/utils/eventHub";
import gsap from "gsap";
import controls from "@/three/controls";
import AlarmSprite from "../three/mesh/alarmSprite";

const props = defineProps(["eventList"]);

scene.add(camera);
scene.add(axesHelper);
const sceneDiv = ref(null);

createMesh();

onMounted(() => {
  sceneDiv.value.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  animate();
});

const eventListMesh = [];

const mapFn = {
  火警: (position, i) => {
    const lightWall = new LightWall(1, 2, position);
    lightWall.eventListIndex = i;
    scene.add(lightWall.mesh);
    eventListMesh.push(lightWall);
  },
  治安: (position, i) => {
    //   生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex();
    // 添加着色器飞线
    const flyLineShader = new FlyLineShader(position, color);
    flyLineShader.eventListIndex = i;
    scene.add(flyLineShader.mesh);
    eventListMesh.push(flyLineShader);
  },
  电力: (position, i) => {
    // 添加雷达
    const lightRadar = new LightRadar(2, position);
    lightRadar.eventListIndex = i;
    scene.add(lightRadar.mesh);
    eventListMesh.push(lightRadar);
  },
};

eventHub.on("eventToggle", (i) => {
  eventListMesh.forEach((item) => {
    if (item.eventListIndex === i) {
      item.mesh.visible = true;
    } else {
      item.mesh.visible = false;
    }
  });

  const position = {
    x: props.eventList[i].position.x / 5 - 10,
    y: 0,
    z: props.eventList[i].position.y / 5 - 10,
  };

  //   controls.target.set(position.x, position.y, position.z);
  gsap.to(controls.target, {
    duration: 1,
    x: position.x,
    y: position.y,
    z: position.z,
  });
});

watch(
  () => props.eventList,
  (val) => {
    eventListMesh.forEach((item) => {
      item.remove();
    });
    props.eventList.forEach((item, i) => {
      const position = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10,
      };
      const alarmSprite = new AlarmSprite(item.name, position);
      alarmSprite.onClick(() => {
        // console.log(item.name, i);
        eventHub.emit("spriteClick", { event: item, i });
      });
      alarmSprite.eventListIndex = i;
      eventListMesh.push(alarmSprite);
      scene.add(alarmSprite.mesh);
      if (mapFn[item.name]) {
        mapFn[item.name](position, i);
      }
    });
  }
);
</script>

<style>
.scene {
  width: 100vw;
  height: 100vh;
}
</style>
