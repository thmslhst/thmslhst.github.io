import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

const nX = 1;
const nY = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer({antialias:false, alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('three').appendChild(renderer.domElement);

const clock = new THREE.Clock();
var mixer = null;

const texture = new THREE.TextureLoader().load( "assets/textures/t.png" );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, alphaTest: 0.9, side: THREE.DoubleSide} );

var cloth = null;

var loader = new GLTFLoader();
loader.load('assets/meshes/cloth.gltf', function(gltf){
    cloth = gltf.scene.children[0];
    cloth.children[1].material = material;

    mixer = new THREE.AnimationMixer(gltf.scene);
    var action = mixer.clipAction(gltf.animations[0]);
    action.play();

    cloth.rotation.set(Math.random()*360, Math.random()*360, Math.random()*360);

    scene.add(gltf.scene);
    animate();
});

function animate() {
    mixer.update(clock.getDelta());

    cloth.rotation.x += 0.002 * nY;
    cloth.rotation.y += 0.001 * nX;

    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}