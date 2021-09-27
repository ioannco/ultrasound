/**
 * @author Ivan Cheremisenov
 */

/** Three JS import */
import * as THREE from './three.js-master/build/three.module.js'
import { FBXLoader } from "./three.js-master/examples/jsm/loaders/FBXLoader.js";

/** Camera controls import and installation */
import CameraControls from './camera-controls/dist/camera-controls.module.js';
import {GLTFLoader} from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";

/** Main demo renderer class based on three.js */
export class Renderer {
    /**
     * Base constructor
     * @param {number}      canvasWidth    Width of the canvas
     * @param {number}      canvasHeight   Height of the canvas
     */
    constructor(canvasWidth, canvasHeight) {
        CameraControls.install({THREE: THREE});

        /** Scene components init */
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(canvasWidth, canvasHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.controls = new CameraControls(this.camera, this.renderer.domElement);

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.truckSpeed = 0.0;

        document.body.appendChild(this.renderer.domElement);

        /** Light init */
        this.directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directLight.position.set(5, 5, 5);
        this.scene.add(this.directLight);

        this.ambientLight = new THREE.AmbientLight (0xffffff, 0.5);
        this.scene.add(this.ambientLight);

        /** Scene init */
        this.initScene();

        /** Helpers */
        this.initHelpers();

        /** Set the clock */
        this.clock = new THREE.Clock();

        this.render();
    }

    /** Main render function, repeatedly called by requestAnimationFrame() */
    render () {

        /** Requesting DOM to call render() again */
        requestAnimationFrame(this.render.bind(this));

        const deltaTime = this.clock.getDelta();

        this.controls.update(deltaTime);
        this.renderer.render(this.scene, this.camera);
    }

    /** load and place models */
    initScene() {
        const loader = new GLTFLoader();

        loader.load(
            // resource URL
            'models/stand/stand.gltf',
            // called when the resource is loaded
            function ( gltf ) {

                this.scene.add( gltf.scene );

                console.log (gltf);

            }.bind(this),
            // called while loading is progressing
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened', error );

            }
        );


    }

    /** init scene helpers */
    initHelpers() {

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);

        const gridHepler = new THREE.GridHelper(10, 10);
        this.scene.add(gridHepler);
    }
}
