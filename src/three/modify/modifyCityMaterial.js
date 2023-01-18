import gsap from "gsap";
import * as THREE from "three";

export default function modifyCityMaterial(mesh) {
  mesh.material.onBeforeCompile = (shader) => {
    // console.log(shader.vertexShader);
    // console.log(shader.fragmentShader);
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
        #include <dithering_fragment>
        // #end#
      `
    );
    addGradColor(shader, mesh);
    addSpread(shader);
    addLightLine(shader);
    addToTopLine(shader);
  };
}

// 添加渐变
export function addGradColor(shader, mesh) {
  mesh.geometry.computeBoundingBox();
  const { min, max } = mesh.geometry.boundingBox;
  // 获取物体的高度
  const uHeight = max.y - min.y;

  shader.uniforms.uTopColor = {
    value: new THREE.Color("#aaaeff"),
  };
  shader.uniforms.uHeight = {
    value: uHeight,
  };

  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>
    varying vec3 vPosition;
  `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    vPosition = position;
  `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform vec3 uTopColor;
    uniform float uHeight;
    varying vec3 vPosition;
  `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
    vec4 distGradColor = gl_FragColor;

    // 设置混合的百分比
    float gradMix = (vPosition.y + uHeight / 2.0) / uHeight;
    // 计算混合颜色
    vec3 gradMixColor = mix(distGradColor.xyz, uTopColor, gradMix);
    gl_FragColor = vec4(gradMixColor, 1);
    // #end#
  `
  );
}

// 扩散效果
export function addSpread(shader) {
  // 设置扩散的中心点
  shader.uniforms.uSpreadCenter = { value: new THREE.Vector2(0, 0) };
  // 扩散时间
  shader.uniforms.uSpreadTime = { value: 0 }
  // 设置条带的宽度
  shader.uniforms.uSpreadWidth = { value: 40 }
  
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
    `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
      float spreadRadius = distance(vPosition.xz, uSpreadCenter);
      // 扩散范围的函数
      float spreadIndex = -(spreadRadius - uSpreadTime) * (spreadRadius - uSpreadTime) + uSpreadWidth;
      if (spreadIndex > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(1, 1, 1, 1), spreadIndex / uSpreadWidth);
      }

      // #end#
    `
  )

  gsap.to(shader.uniforms.uSpreadTime, {
    value: 200,
    duration: 2,
    ease: 'none',
    repeat: -1,
  })

}

// 直线效果
export function addLightLine(shader) {
  // 设置扩散时间
  shader.uniforms.uLightLineTime = { value: -1500 };
  // 设置条带宽度
  shader.uniforms.uLightLineWidth = { value: 40 };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      
      uniform float uLightLineTime;
      uniform float uLightLineWidth;
    `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
      float LightLineMix = -(vPosition.x + vPosition.z - uLightLineTime) * (vPosition.x + vPosition.z - uLightLineTime) + uLightLineWidth;
      
      if (LightLineMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(1, 0.8, 0.8, 1), LightLineMix / uLightLineWidth);
      }

      // #end#
    `
  )

  gsap.to(shader.uniforms.uLightLineTime, {
    value: 1500,
    duration: 5,
    ease: 'none',
    repeat: -1
  })
}

// 从下向上扫描
export function addToTopLine(shader) {
  // 设置时间
  shader.uniforms.uToTopLineTime = { value: -100 }
  // 设置线的宽度
  shader.uniforms.uToTopLineWidth = { value: 5 }

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      
      uniform float uToTopLineTime;
      uniform float uToTopLineWidth;
    `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #end#",
    `
      float ToTopLineMix = -(vPosition.y - uToTopLineTime) * (vPosition.y - uToTopLineTime) + uToTopLineWidth;

      if (ToTopLineMix > 0.0) {
        gl_FragColor = mix(gl_FragColor, vec4(0.8, 0.8, 1, 1), ToTopLineMix / uToTopLineWidth);
      }
    `
  )

  gsap.to(shader.uniforms.uToTopLineTime, {
    value: 100,
    duration: 2,
    ease: 'none',
    repeat: -1,
  })
}