import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

// TEXTURES
const loadingManager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load("/matcaps/7.png")

// FONTS
const fontLoader = new FontLoader()
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("STEVE STEVE STEVE", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  })

  textGeometry.center()

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)
})

const steveTexture1 = textureLoader.load("/steves/steve1.jpg")
const steveTexture2 = textureLoader.load("/steves/steve2.jpg")
const steveTexture3 = textureLoader.load("/steves/steve3.jpg")
const steveTexture4 = textureLoader.load("/steves/steve4.jpg")
const steveTexture5 = textureLoader.load("/steves/steve5.jpg")
const steveTexture6 = textureLoader.load("/steves/steve6.jpg")
const steveTexture7 = textureLoader.load("/steves/steve7.jpg")
const steveTexture8 = textureLoader.load("/steves/steve8.jpg")
const steveTexture9 = textureLoader.load("/steves/steve9.jpg")
const steveTexture10 = textureLoader.load("/steves/steve10.jpg")
const steveTexture11 = textureLoader.load("/steves/steve11.jpg")
const steveTexture12 = textureLoader.load("/steves/steve12.jpg")
const steveTexture13 = textureLoader.load("/steves/steve13.jpg")
const steveTexture14 = textureLoader.load("/steves/steve14.jpg")
const steveTexture15 = textureLoader.load("/steves/steve15.jpg")
const steveTexture16 = textureLoader.load("/steves/steve16.png")
const steveTexture17 = textureLoader.load("/steves/steve17.jpg")

const steveTextureArray = [steveTexture1, steveTexture2, steveTexture3, steveTexture4, steveTexture5, steveTexture6, steveTexture7, steveTexture8, steveTexture9, steveTexture10, steveTexture11, steveTexture12, steveTexture13, steveTexture14, steveTexture15, steveTexture16, steveTexture17]

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometryBox = new THREE.BoxGeometry(1, 1, 1)
const geometrySphere = new THREE.SphereGeometry(1, 32, 32)


for (let i = 0; i < steveTextureArray.length; i++) {
  const material = new THREE.MeshBasicMaterial({ map: steveTextureArray[i] })
  const meshBox = new THREE.Mesh(geometryBox, material)
  const meshSphere = new THREE.Mesh(geometrySphere, material)
  meshBox.position.x = (Math.random() - 0.5) * 15
  meshBox.position.y = (Math.random() - 0.5) * 15
  meshBox.position.z = (Math.random() - 0.5) * 15

  const scale = Math.random() * 2
  meshBox.scale.set(scale, scale, scale)

  meshSphere.position.x = (Math.random() - 0.5) * 15
  meshSphere.position.y = (Math.random() - 0.5) * 15
  meshSphere.position.z = (Math.random() - 0.5) * 15

  meshSphere.scale.set(scale, scale, scale)
  scene.add(meshBox, meshSphere)
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
