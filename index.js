import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
//create the renderer and add it to the DOM
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//Set up the camera and passing in the field of view, aspect ratio, near and far clipping planes
//////field of view is set to the angle of the camera's view in degrees
//////aspect ratio is the width of the camera's view divided by the height
//////near and far clipping planes are the distances from the camera that objects will be rendered
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 4;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const textureLoader = new THREE.TextureLoader();    //create a texture loader\
const BrickBaseColor = textureLoader.load('brickTextures/brick-wall_albedo.png'); 
const BrickAmbientOcclusionMap = textureLoader.load('brickTextures/brick-wall_ao.png');
const BrickHeightMap = textureLoader.load('brickTextures/brick-wall_height.png');
const BrickMetallicMap = textureLoader.load('brickTextures/brick-wall_metallic.png');
const BrickNormalMap = textureLoader.load('brickTextures/brick-wall_normal-dx.png');
const BrickRoughnesslMap = textureLoader.load('brickTextures/brick-wall_roughness.png');


const PlasterBaseColor = textureLoader.load('plasterTextures/rough-plaster-basecolor.png');
const PlasterAmbientOcclusionMap = textureLoader.load('plasterTextures/rough-plaster-ao.png');
const PlasterMetallicMap = textureLoader.load('plasterTextures/rough-plaster-metallic.png');
const PlasterNormalMap = textureLoader.load('plasterTextures/rough-plaster-normal-dx.png');

//Create a geometry shape and material for a mesh to the empty scene (this part can be deleted)
const geo = new THREE.SphereGeometry( );

//brick material
// const mat = new THREE.MeshStandardMaterial({
//     map: BrickBaseColor,
//     normalMap: BrickNormalMap,
//     displacementMap: BrickHeightMap,
//     displacementScale: 0.2,
//     aoMap: BrickAmbientOcclusionMap,
//     roughnessMap: BrickRoughnesslMap,
//     roughness: 1,
//     metalnessMap: BrickMetallicMap,
//     metalness: 0.1
// });

//plaster-matte material
const mat = new THREE.MeshStandardMaterial({
    // map: PlasterBaseColor ,
    color: 0xb77572,
    normalMap: PlasterNormalMap,
    aoMap: PlasterAmbientOcclusionMap,
    metalnessMap: PlasterMetallicMap,
    metalness: 0.1
});


const mesh = new THREE.Mesh(geo, mat);
//adding the shape and material to the scene
scene.add(mesh);

// //now try to create another material overlayed on to the geo
// const wireMat = new THREE.MeshBasicMaterial({
//     color: 0xc6e2e9,
//     wireframe: true,
// });
// const wireMesh = new THREE.Mesh(geo, wireMat);
// wireMesh.scale.setScalar(1.001);
// mesh.add(wireMesh);


// creating a light source to illuminate the scene and adding it to the scene
const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 2);
scene.add(hemiLight);

//Create a render loop to render the scene to the camera
function animate (t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();  