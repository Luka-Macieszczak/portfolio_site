const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x141414 );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg-canvas')})

renderer.render(scene, camera);


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, 2*window.innerHeight );
camera.position.setZ(200);
camera.position.setX(0); 
camera.position.setY(-50); 
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// scene.add(torus);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.3, 3, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xc00c00});
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
    return [star, x, y, z];
}
let stars = []
/*
Array(50).fill().forEach(() => {
    stars.push(addStar())
});*/

let particleSystem, uniforms, geometry;

uniforms = {

    pointTexture: { value: new THREE.TextureLoader().load( './spark1.png' ) }

};

const shaderMaterial = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true

} );
const radius = 200;

geometry = new THREE.BufferGeometry();

const positions = [];
const offset = [];
const colors = [];
const sizes = [];

const color = new THREE.Color();

for ( let i = 0; i < 50; i ++ ) {

    positions.push( ( Math.random() * 2 - 1 ) * radius );
    positions.push( ( Math.random() * 2 - 1 ) * radius/2 );
    positions.push( ( Math.random() * 2 - 1 ) * radius/2 );

    offset.push((Math.random() * 2*Math.PI))

    color.setHSL( i / 50, 1.0, 0.5 );

    colors.push( color.r, color.g, color.b );

    sizes.push( 20 );

}

geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ).setUsage(THREE.DynamicDrawUsage) );
geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );

particleSystem = new THREE.Points( geometry, shaderMaterial );

scene.add( particleSystem );



/*
const composer = new THREE.EffectComposer(renderer);
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.6,
    0.15,
    0.15
);

composer.addPass(renderScene);
composer.addPass(bloomPass);*/
let t = 0
function animate() {
    requestAnimationFrame(animate);
    //composer.render();
    t += 0.003
    //particleSystem.rotation.z = 0.01 * t;

    const positions = geometry.attributes.position.array;
    
    for ( let i = 0; i < 150; i += 3 ) {

        positions[ i ] = positions[i] + 0.3* Math.cos( t + offset[i / 3]);
        positions[i + 1] = positions[i + 1] - 0.3*Math.cos( t + offset[i / 3]);
        positions[i + 2] = positions[i + 2] - 0.3*Math.sin( t + offset[i / 3]);

    }

	geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}
  
animate();