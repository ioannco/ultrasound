/**
 * @author Ivan Cheremisenov
 */

/** Three JS import */
import * as THREE from './three.js-master/build/three.module.js'

/** jquery import */
import  './jquery-3.6.0.js'

/** Camera controls import and installation */
import CameraControls from './camera-controls/dist/camera-controls.module.js';
import {GLTFLoader} from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";

/** constants */
const DEBUG = false;
const STAND_URL = 'models/scene.glb';

/** Main demo renderer class based on three.js */
export class Renderer {
    /**
     * Base constructor
     *
     * @param {number}      canvasWidth    Width of the canvas
     * @param {number}      canvasHeight   Height of the canvas
     */
    constructor(canvasWidth, canvasHeight) {
        /** class member variables */
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.ambientLight = null;
        this.clock = null;
        this.clickHelperMeshes = [];
        this.raycaster = null;
        this.mouse = new THREE.Vector2();
        this.raycasterNeedUpdate = false;
        this.intersectedObejcts = [];
        this.defaultUltraDeviceCamDistance = 1.5;
        this.focusedMesh = null;
        this.cameraInitPosition = new THREE.Vector3(.7357705765396183, 1.9329664940753455, 9.324636211086014);

        /** install camera controls library */
        CameraControls.install({THREE: THREE});

        /** scene components init */
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
        this.camera.position.set(.7357705765396183, 1.9329664940753455, 9.324636211086014);

        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(canvasWidth, canvasHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.controls = new CameraControls(this.camera, this.renderer.domElement);

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.truckSpeed = 0.0;

        this.controls.minPolarAngle = Math.PI/2 - Math.PI/8;
        this.controls.maxPolarAngle = Math.PI/2 - Math.PI/16;

        document.body.appendChild(this.renderer.domElement);

        /** light init */
        this.ambientLight = new THREE.AmbientLight (0xffffff, 0.3);
        this.scene.add(this.ambientLight);

        /** raycaster init **/
        this.raycaster = new THREE.Raycaster();

        /** scene init */
        this.initScene();

        /** helpers */
        if (DEBUG) this.initHelpers();

        /** set the clock */
        this.clock = new THREE.Clock();

        /** set events listeners */
        this.renderer.domElement.addEventListener("mouseup", this.onMouseClick.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));

        /** call render cycle */
        this.render();
    }

    /** Main render function, repeatedly called by requestAnimationFrame() */
    render () {

        /** Requesting DOM to call render() again */
        requestAnimationFrame(this.render.bind(this));

        const deltaTime = this.clock.getDelta();

        //this.directLight.position.x = Math.sin(this.clock.getElapsedTime() / 2) * 10;
        //this.directLight.position.z = Math.cos(this.clock.getElapsedTime() / 2) * 10;

        this.controls.update(deltaTime);
        this.renderer.render(this.scene, this.camera);

        //console.log (this.camera);
    }

    /** load and place models */
    initScene() {
        const loader = new GLTFLoader();

        loader.load(
            // resource URL
            STAND_URL,

            // called when the resource is loaded
            function ( gltf ) {
                this.scene.add( gltf.scene );
                this.scene.getObjectByName("")

                if (DEBUG) console.log(gltf);

                this.initClickableObjects();

            }.bind(this),

            // called while loading is progressing
            function ( xhr ) {

                console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },

            // called when loading has errors
            function( error ) {

                console.log( 'An error happened', error );

            }
        );
    }

    /** init scene helpers */
    initHelpers() {

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);

        const gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(gridHelper);
    }

    /** hide meshes that helps to register click on objects */
    initClickableObjects() {
        this.clickHelperMeshes.push(this.scene.getObjectByName("кнопка_ап_1"));
        this.clickHelperMeshes.push(this.scene.getObjectByName("кнопка_ап_2"));
        this.clickHelperMeshes.push(this.scene.getObjectByName("кнопка_ап_3"));
        this.clickHelperMeshes.push(this.scene.getObjectByName("кнопка_ап_4"));
        this.clickHelperMeshes.push(this.scene.getObjectByName("кнопка_ап_5"));

        this.clickHelperMeshes[0].onClick = function () {
            this.cameraFocusDevice(this.clickHelperMeshes[0], 0, 1, 0);
        }.bind(this);

        this.clickHelperMeshes[1].onClick = function () {
            this.cameraFocusDevice(this.clickHelperMeshes[1], 0, 1, 0);
        }.bind(this);

        this.clickHelperMeshes[2].onClick = function () {
            this.cameraFocusDevice(this.clickHelperMeshes[2], 0, 1, 0);
        }.bind(this);

        this.clickHelperMeshes[3].onClick = function () {
            this.cameraFocusDevice(this.clickHelperMeshes[3], 0, 1, 0);
        }.bind(this);

        this.clickHelperMeshes[4].onClick = function () {
            this.cameraFocusDevice(this.clickHelperMeshes[4], 0, 1, 0);
        }.bind(this);

        this.clickHelperMeshes.forEach( element => {
	   element.material.transparent = true;
           if (DEBUG) element.material.opacity = 0.2;
	   else element.material.opacity = 0;
        });

        $('#menu-exit').click(function () {
            this.controls.setTarget(0, 0, 0, true);
            this.controls.dollyTo(10, true);
            this.focusedMesh = null;
        }.bind(this));

        if (DEBUG) console.log(this.clickHelperMeshes);
    }

    /** update intersected objects */
    updateRaycaster() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersectedObejcts = this.raycaster.intersectObjects(this.clickHelperMeshes);
        this.raycasterNeedUpdate = false;
    }

    /**
     * mouse movement update function
     *
     * @param event event to handle
     */
    onMouseMove(event) {
        this.mouse.x =  (event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.updateRaycaster();
    }

    /**
     * mouse click event function
     */
    onMouseClick() {
        if (DEBUG) console.log ('intersected with objects:', this.intersectedObejcts);
        if (DEBUG) console.log ('mouse position:', this.mouse);
        if (DEBUG) console.log ('camera:', this.camera.position);

        for (let i = 0; i < this.intersectedObejcts.length; i++) {
            if (this.intersectedObejcts[i].object.onClick) {
                if (this.intersectedObejcts[i].object === this.focusedMesh)
                    continue;

                this.intersectedObejcts[i].object.onClick();
                break;
            }
        }
    }

    /**
     * set camera's target to device and dolly to it
     *
     * @param {THREE.Object3D} device
     * @param {number} xShift
     * @param {number} yShift
     * @param {number} zShift
     * @param {boolean} enableTransition
     */
    cameraFocusDevice (device, xShift = 0, yShift = 0, zShift = 0, enableTransition = true)
    {
	if (DEBUG) console.log("cameraFocusDevice invoked for device", device);
        this.focusedMesh = device;

        const newTarget = new THREE.Vector3();
        device.getWorldPosition(newTarget);

        this.controls.setTarget(newTarget.x + xShift, newTarget.y + yShift, newTarget.z + zShift, enableTransition);
        this.controls.dollyTo (this.defaultUltraDeviceCamDistance, enableTransition);
    }
}
