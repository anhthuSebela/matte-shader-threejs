import * as THREE from 'three';

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
camera.position.z = 2;
const scene = new THREE.Scene();

//Create a geometry shape and material for a mesh to the empty scene (this part can be deleted)
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshBasicMaterial({
    color: 0xccff
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//Create a render loop to render the scene to the camera
renderer.render(scene, camera);
