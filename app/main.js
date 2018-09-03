const W = 1280;
const H = 800;

let renderer, scene, camera;
let controls; // eslint-disable-line no-unused-vars
let circles = [];
let numberCircles = 10;
let colors = [];


(function main() {

  setup(); // set up scene
  loop(); // start game loop

})();


function setup() {

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize( W, H );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor(0x003699);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  document.body.appendChild( renderer.domElement );

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, W / H, 0.01, 1000 );
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  camera.position.z = 15;
  // camera.rotation.y = 90;


  // let geo = new THREE.BoxGeometry( 1, 1, 1 );
  // let mesh = new THREE.Mesh( geo, mat );
  let size = 3;
  // let colors = [0x0885c2, 0xfbb132, 0x666666, 0x1c8b3c, 0xed334e];
  colors = [0xFFFFFF]
  // let colors = [0x000000, 0x111111, 0x222222, 0x333333, 0x444444, 0x555555, 0x666666, 0x777777, 0x888888, 0x999999];
  for(let i = 0; i < numberCircles; i++) {
    let mat = new THREE.MeshBasicMaterial({
      color: colors[i%colors.length],
      wireframe: false,
      transparent: true,
      opacity: 0.8,
      // blending: THREE.MultiplyBlending
   });
    let mesh = new THREE.Mesh( new THREE.TorusBufferGeometry( 1+i, 1/(1+i*0.5), 30, 100 ), mat );
    // let mesh = new THREE.Mesh( new THREE.CylinderGeometry( 1+i, 1+i, 0.1, 32 ), mat );
    circles.push( mesh );
    scene.add( mesh );
  }
  console.log( circles );


}

let angle;
let stepAngle;
let steps;

function loop(time) { // eslint-disable-line no-unused-vars

  for(let i = 0; i < numberCircles; i++) {
    circles[i].position.x = Math.sin( (i+1)*time/3000 );
    // circles[i].position.y = i;
    circles[i].position.y = Math.cos( (i+1)*time/3000 );
    // circles[i].position.z = Math.cos( (i+1)*time/2000 );
    circles[i].position.z = 1-(i*0.5);
  }

  requestAnimationFrame( loop );
  renderer.render( scene, camera );

}


document.addEventListener('keydown', e => {
  // console.log(e.key, e.keyCode, e);

  if (e.key == 'f') { // f .. fullscreen
    if (!document.webkitFullscreenElement) {
      document.querySelector('body').webkitRequestFullscreen();
    } else { document.webkitExitFullscreen(); }
  }

  else if (e.key == '1') {
    colors = [0xffffff];
    for(let i = 0; i < numberCircles; i++) {
      scene.remove(circles[i]);
    }
    circles = [];
    for(let i = 0; i < numberCircles; i++) {
      let mat = new THREE.MeshBasicMaterial({
        color: colors[i%colors.length],
        wireframe: false,
        transparent: true,
        opacity: 0.8,
        // blending: THREE.MultiplyBlending
     });
      let mesh = new THREE.Mesh( new THREE.TorusBufferGeometry( 1+i, 1/(1+i*0.5), 30, 60 ), mat );
      // let mesh = new THREE.Mesh( new THREE.CylinderGeometry( 1+i, 1+i, 0.1, 32 ), mat );
      circles.push( mesh );
      scene.add( mesh );
      renderer.setClearColor(0x003699);
    }
  }

  else if (e.key == '2') {
    colors = [0x0885c2, 0xfbb132, 0x666666, 0x1c8b3c, 0xed334e];
    for(let i = 0; i < numberCircles; i++) {
      scene.remove(circles[i]);
    }
    circles = [];
    for(let i = 0; i < numberCircles; i++) {
      let mat = new THREE.MeshBasicMaterial({
        color: colors[i%colors.length],
        wireframe: false,
        transparent: true,
        // opacity: 0.8,
        blending: THREE.MultiplyBlending
     });
      let mesh = new THREE.Mesh( new THREE.TorusBufferGeometry( 1+i, 1/(1+i*0.5), 30, 60 ), mat );
      // let mesh = new THREE.Mesh( new THREE.CylinderGeometry( 1+i, 1+i, 0.1, 32 ), mat );
      circles.push( mesh );
      scene.add( mesh );
      renderer.setClearColor(0xFFFFFF);
    }
  }

  else if (e.key == '3') {
    colors = [0xFFFFFF, 0xEEEEEE, 0xDDDDDD, 0xCCCCCC, 0xBBBBBB, 0xAAAAAA, 0x777777, 0x444444, 0x333333, 0x222222];
    for(let i = 0; i < numberCircles; i++) {
      scene.remove(circles[i]);
    }
    circles = [];
    for(let i = 0; i < numberCircles; i++) {
      let mat = new THREE.MeshBasicMaterial({
        color: colors[i%colors.length],
        wireframe: false,
        transparent: true,
        opacity: 0.8
        // blending: THREE.MultiplyBlending
     });
      let mesh = new THREE.Mesh( new THREE.TorusBufferGeometry( 1+i, 1/(1+i*0.5), 30, 60 ), mat );
      // let mesh = new THREE.Mesh( new THREE.CylinderGeometry( 1+i, 1+i, 0.1, 32 ), mat );
      circles.push( mesh );
      scene.add( mesh );
      renderer.setClearColor(0x000000);
    }
  }

});
