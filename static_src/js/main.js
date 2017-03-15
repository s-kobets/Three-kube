/* global window document */
/* eslint camelcase: ["error", {properties: "never"}] */

const THREE = require('../../node_modules/three/build/three.min.js');

console.log(THREE);

let scene;
let camera;
let renderer;
let geometry;
let material;
let line;
/* eslint-disable */
// const cube_vertices = [
// 	[-1.0, -1.0, -1.0],
// 	[ 1.0, -1.0, -1.0],
// 	[ 1.0,  1.0, -1.0],
// 	[-1.0,  1.0, -1.0],
// 	[-1.0, -1.0,  1.0],
// 	[ 1.0, -1.0,  1.0],
// 	[ 1.0,  1.0,  1.0],
// 	[-1.0,  1.0,  1.0]
// ];
// const cube_edges = [
// 	[0, 1],
// 	[1, 2],
// 	[2, 3],
// 	[3, 0],
// 	[0, 4],
// 	[1, 5],
// 	[2, 6],
// 	[3, 7],
// 	[4, 5],
// 	[5, 6],
// 	[6, 7],
// 	[7, 0]
// ];
/* eslint-enable */
init();

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
	camera.rotation.order = 'YXZ';
	camera.position.z = 5;

	geometry = new THREE.Geometry();

	material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

	geometry.vertices.push(new THREE.Vector3(-1.0, -1.0, -1.0)); // add vector
	geometry.vertices.push(new THREE.Vector3(1.0, -1.0, -1.0));
	// lines
	// for (let i = 0; i < cube_edges.length; i += 1) {
	// 	// Add first vertex of edge
	// 	geometry.vertices.push(new THREE.Vector3(
	// 		cube_vertices[cube_edges[i][0]][0],
	// 		cube_vertices[cube_edges[i][0]][1],
	// 		cube_vertices[cube_edges[i][0]][2]
	// 		)
	// 	);
	// 	// Add second vertex of edge
	// 	geometry.vertices.push(new THREE.Vector3(
	// 		cube_vertices[cube_edges[i][1]][0],
	// 		cube_vertices[cube_edges[i][1]][1],
	// 		cube_vertices[cube_edges[i][1]][2]
	// 		)
	// 	);
	// }
	line = new THREE.Line(geometry, material);

	scene.add(line);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}

renderer.render(scene, camera);
