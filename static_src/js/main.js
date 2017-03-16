/* global window document */
/* eslint camelcase: ["error", {properties: "never"}] */

const THREE = require('../../node_modules/three/build/three.min.js');

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

let scene;
let camera;
let renderer;
let geometry;
let material;
let line;
let projector = new THREE.Projector();
let mouse = {x: 0, y: 0};
let targetList = [];

init();
renderer.render(scene, camera);

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
	camera.position.z = 8;
	camera.position.x = -2;
	camera.position.y = -1;

	geometry = new THREE.Geometry();

	let dotGeometry = new THREE.Geometry();
	dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
	const dotMaterial = new THREE.PointCloudMaterial({size: 10, sizeAttenuation: false, color: 0xFF0000});
	const dot = new THREE.PointCloud(dotGeometry, dotMaterial);
	scene.add(dot);
	targetList.push(dot);

	material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1, wireframe: true});

	geometry.vertices.push(new THREE.Vector3(0, 0, 0)); // add vector
	geometry.vertices.push(new THREE.Vector3(1, 0, 0));
	geometry.vertices.push(new THREE.Vector3(1, 1, 0));
	geometry.vertices.push(new THREE.Vector3(0, 1, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 1));
	geometry.vertices.push(new THREE.Vector3(0, 1, 1));
	geometry.vertices.push(new THREE.Vector3(0, 1, 0));
	geometry.vertices.push(new THREE.Vector3(0, 1, 1));
	geometry.vertices.push(new THREE.Vector3(1, 1, 1));
	geometry.vertices.push(new THREE.Vector3(1, 1, 0));
	geometry.vertices.push(new THREE.Vector3(1, 1, 1));
	geometry.vertices.push(new THREE.Vector3(1, 0, 1));
	geometry.vertices.push(new THREE.Vector3(1, 0, 0));
	geometry.vertices.push(new THREE.Vector3(1, 0, 1));
	geometry.vertices.push(new THREE.Vector3(0, 0, 1))

	line = new THREE.Line(geometry, material);

	scene.add(line);
	targetList.push(line);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	document.addEventListener('mousedown', onDocumentMouseDown, false);
}

function onDocumentMouseDown(event) {
	// update the mouse variable
	mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
	mouse.y = (-(event.clientY / window.innerHeight) * 2) + 1;

	// find intersections
	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects(targetList);

	// if there is one (or more) intersections
	if (intersects.length > 0) {
		console.log('Hit @ ' + toString(intersects[0].point));
		// change the color of the closest face.
		console.log(intersects, intersects[0]);
		// intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 );
		intersects[0].object.geometry.colorsNeedUpdate = true;
	}
}
