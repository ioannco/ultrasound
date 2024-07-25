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
const DEBUG = 0;

/**
 * Mobile device detection
 * @returns {boolean}
 */
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

const MOBILE = window.mobileAndTabletCheck();

/** Main demo renderer class based on three.js */
export class Renderer {
    /**
     * Base constructor
     *
     * @param {number}      canvasWidth    Width of the canvas
     * @param {number}      canvasHeight   Height of the canvas
     * @param {number}      deviceNo       Device number
     */
    constructor(canvasWidth, canvasHeight, deviceNo = 0) {
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
        this.clickableObjects = [];
        this.mixer = null;
        this.animationClip = null;
        this.video = null;
        this.videoImage = null;
        this.videoImageContext = null;
        this.videoTexture = null;
        this.videoIsPlaying = false;
        this.blank = null;
        this.deviceNo = deviceNo;
        this.lights = [];

        /** install camera controls library */
        CameraControls.install({THREE: THREE});

        /** scene components init */
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(-11.461147875985011, 1.5216442915288348, 8.030434329484287);

        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(canvasWidth, canvasHeight);

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.physicallyCorrectLights = true;

        this.controls = new CameraControls(this.camera, this.renderer.domElement);

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.truckSpeed = 2;
        this.controls.maxDistance = 20;

        this.controls.minPolarAngle = Math.PI/2 - Math.PI/8;
        this.controls.maxPolarAngle = Math.PI/2 + Math.PI/8;

        document.body.appendChild(this.renderer.domElement);

        /** light init */
        this.ambientLight = new THREE.AmbientLight (0xffffff, 1);
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

        document.addEventListener("touchmove", this.onMouseMove.bind(this));
        this.renderer.domElement.addEventListener("touchstart", this.onMouseClick.bind(this));


        function onWindowResize(){
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( window.innerWidth, window.innerHeight );

            console.log('lol');

        }


        window.addEventListener( 'resize', onWindowResize.bind(this), false );

        /** call render cycle */
        this.render();
    }

    /** Main render function, repeatedly called by requestAnimationFrame() */
    render () {

        /** Requesting DOM to call render() again */
        requestAnimationFrame(this.render.bind(this));

        const deltaTime = this.clock.getDelta();

        // update animations
        if (this.mixer)
            this.mixer.update(deltaTime);

        this.controls.update(deltaTime);
        this.renderer.render(this.scene, this.camera);

        //console.log (this.camera);
    }

    /** load and place models */
    initScene() {
        const loader = new GLTFLoader();

        loader.load(
            // resource URL
            'models/device' + this.deviceNo.toString() + '.glb',

            // called when the resource is loaded
            function ( gltf ) {
                this.scene.add( gltf.scene );

                const audio = new Audio('audio/ambient.mp3');
                audio.loop = true;
                audio.play();

                $('#mute-button').click (() => {
                   if (!audio.muted)
                   {
                       $('#muted-icon').show();
                       $('#not-muted-icon').hide();
                       audio.muted = true;
                   }
                   else
                   {
                       $('#muted-icon').hide();
                       $('#not-muted-icon').show();
                       audio.muted = false;
                   }
                });

                if (DEBUG) console.log(this.scene);

                this.initClickableObjects();
                this.initSceneLights();

                $('#progress-bar-containter').fadeOut();
                this.mixer = new THREE.AnimationMixer(gltf.scene);

                this.clipAction = this.mixer.clipAction(gltf.animations[0]);
                this.clipAction.setLoop(THREE.LoopOnce, 1);
                this.clipAction.clampWhenFinished = true;

            }.bind(this),

            // called while loading is progressing
            function ( xhr ) {

                $('.percentage').html('идет загрузка<br>' + Math.trunc( xhr.loaded / xhr.total * 100 ) + '%');
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
        this.clickHelperMeshes.push(this.scene.getObjectByName("кнопка_ап_" + this.deviceNo));

        this.initCameraPositions();

        this.resetScene();

        if (DEBUG) console.log ('click boundaries:', this.clickHelperMeshes);

        this.clickHelperMeshes[0].onClick = function () {
            this.selectDevice('DC-60', 'DC60', this.clickHelperMeshes[0], 1.5);
        }.bind(this);

        const helper = this.clickHelperMeshes[0];

        helper.controlMeshesBounds = [];

        helper.controlMeshesBounds.push(this.scene.getObjectByName("кнопка_выхода_ап_" + (this.deviceNo).toString()));
        helper.controlMeshesBounds.push(this.scene.getObjectByName("кнопка_стрелки_л_ап_" + (this.deviceNo).toString()));
        helper.controlMeshesBounds.push(this.scene.getObjectByName("кнопка_стрелки_п_ап_" + (this.deviceNo).toString()));

        helper.controlMeshes = [];

        helper.controlMeshes.push(this.scene.getObjectByName('ап_' + (this.deviceNo).toString() + '_крестик'));
        helper.controlMeshes.push(this.scene.getObjectByName('ап_' + (this.deviceNo).toString() + '_стрелка_лево'));
        helper.controlMeshes.push(this.scene.getObjectByName('ап_' + (this.deviceNo).toString() + '_стрелка_право'));

        helper.controlMeshes.forEach(item => item.visible = false);

        helper.controlMeshesBounds[0].onClick = function () {
            this.setCameraInFrontOfDevice(this.focusedMesh, 1.5);
            this.focusedMesh.controlMeshes.forEach(item => item.visible = false);
            $('.item').removeClass('active');
            this.clickableObjects = this.clickHelperMeshes;
            $('#menu-exit').fadeIn();
        }.bind(this);

        helper.screenMesh = this.scene.getObjectByName('экран_1_аппарат_' + (this.deviceNo).toString());
        if (DEBUG) console.log (helper.screenMesh);



            const leftSensor = this.scene.getObjectByName('кнопка_датчика_л_ап_' + (this.deviceNo).toString());
            const rightSensor = this.scene.getObjectByName('кнопка_датчика_п_ап_' + (this.deviceNo).toString());

            leftSensor.onClick = function () {
                if (!this.focusedMesh)
                    return;

                this.clipAction.reset();
                this.clipAction.play();

                this.setCameraInFrontOfDevice(this.focusedMesh, 1);
                this.setCameraAboveTheDevice(this.focusedMesh, 0.5);

            }.bind(this)

            rightSensor.onClick = leftSensor.onClick;

            this.clickHelperMeshes.push(leftSensor);
            this.clickHelperMeshes.push(rightSensor);


        if (DEBUG) console.log(this.clickHelperMeshes);

        this.clickHelperMeshes.forEach( element => {
            element.material.transparent = true;
            if (DEBUG) element.material.opacity = 0.2;
            else element.material.opacity = 0;
        });

        $('#menu-exit').click(function () {
            this.resetScene();
        }.bind(this));

        $('#menu-clinic-pics').click(function () {
            if (!this.focusedMesh)
                return;

            $('#menu-exit').fadeOut();
            this.devicePhotoMode(this.focusedMesh);
        }.bind(this));

        $('#sensors-exit').click(function () {
            this.setCameraInFrontOfDevice(this.focusedMesh, 1.5);
            this.clipAction.reset();
            this.clipAction.stop();
        }.bind(this));


        $('#menu-commercial').click(function () {
            if (this.focusedMesh)
                this.focusedMesh.controlMeshes.forEach(item => item.visible = false);
            this.clickableObjects = this.clickHelperMeshes;
            if (this.clipAction)
            {
                this.clipAction.reset();
                this.clipAction.stop();
            }
        }.bind(this));

        $('#menu-advantages').click(function () {
            if (this.focusedMesh)
                this.focusedMesh.controlMeshes.forEach(item => item.visible = false);
            this.clickableObjects = this.clickHelperMeshes;
            if (this.clipAction)
            {
                this.clipAction.reset();
                this.clipAction.stop();
            }
        }.bind(this));

        if (DEBUG) console.log(this.clickHelperMeshes);
    }

    /** update intersected objects */
    updateRaycaster() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        this.intersectedObejcts = this.raycaster.intersectObjects(this.clickableObjects);
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

    }

    /**
     * mouse click event function
     */
    onMouseClick(e) {
        $('#menu-exit').fadeIn();

        let mouse = {x: 0, y: 0};

        if (!MOBILE) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        } else {
            mouse.x = e.touches[0].pageX;
            mouse.y = e.touches[0].pageY;
        }

        this.mouse.x =  (mouse.x / window.innerWidth ) * 2 - 1;
        this.mouse.y = -(mouse.y / window.innerHeight) * 2 + 1;

        console.log (e.touches);

        this.updateRaycaster();

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
        this.focusedMesh = device;

        let newTarget = new THREE.Vector3();
        device.getWorldPosition(newTarget);

        this.controls.setTarget(newTarget.x + xShift,  yShift, newTarget.z + zShift, enableTransition);
        this.controls.dollyTo (this.defaultUltraDeviceCamDistance, enableTransition);
        this.setCameraInFrontOfDevice(device, 1.5);
    }

    /**
     * reset scene to initial phase
     */
    resetScene() {
        this.controls.setTarget(0, 1, 0, true);
        this.controls.setPosition(0, 1, 2, true);
        if (this.focusedMesh) {
            this.focusedMesh.controlMeshes.forEach(item => item.visible = false);
            this.focusedMesh = null;
        }
        this.clickableObjects = this.clickHelperMeshes;
        if (this.clipAction)
        {
            this.clipAction.reset();
            this.clipAction.stop();
        }
        this.stopVideo();
    }

    /**
     * select device and show menu
     *
     * @param {string} deviceName device name (example: MX 7)
     * @param {string} deviceId   device id (example: MX7)
     * @param {THREE.Object3D} deviceBoundariesMesh clickable mesh
     * @param {number} yShift vertical shift of controls target
     */
    selectDevice (deviceName, deviceId, deviceBoundariesMesh, yShift = 1.2) {
        this.cameraFocusDevice(deviceBoundariesMesh, 0, yShift, 0);
        $('#menu-exit').fadeIn();
        $('.item').removeClass('active');
    }

    /**
     * enter device photo mode
     *
     * @param deviceBoundariesMesh boundaries mesh of the device
     */
    devicePhotoMode (deviceBoundariesMesh) {
        this.controls.setPosition (this.focusedMesh.photoModePos.x, this.focusedMesh.photoModePos.y, this.focusedMesh.photoModePos.z, true);

        this.clickableObjects = this.focusedMesh.controlMeshesBounds;
        if (DEBUG) console.log (this.clickableObjects);
        this.focusedMesh.controlMeshes.forEach(item => item.visible = true);

        this.video = this.focusedMesh.screenPlayback[this.focusedMesh.playbackIndex];
    }

    /**
     * set camera in front of the device
     *
     * @param mesh {THREE.Object3D} device boundaries mesh
     * @param distanceCoef {number} distance multiplier
     */
    setCameraInFrontOfDevice (mesh, distanceCoef) {
        const cameraPosition = this.controls.getPosition();

        let meshPosition = new THREE.Vector3();
        mesh.getWorldPosition(meshPosition);

        this.controls.setPosition (meshPosition.x, cameraPosition.y, cameraPosition.z + 1, true);
    }

    /**
     * set camera above the device
     *
     * @param mesh {THREE.Object3D} device boundaries mesh
     * @param distanceShift {number} distance multiplier
     */
    setCameraAboveTheDevice (mesh, distanceShift) {
        const cameraPosition = this.controls.getPosition();

        let meshPosition = new THREE.Vector3();
        mesh.getWorldPosition(meshPosition);

        this.controls.setTarget(meshPosition.x ,  1, meshPosition.z + 0.3, true);
        this.controls.setPosition (meshPosition.x, meshPosition.y + 1.3 + distanceShift, meshPosition.z + 1, true);
    }

    /**
     * Start video playback
     */
    playVideo () {
        if (this.videoIsPlaying)
            return;

        this.video.play();
        this.videoIsPlaying = true;
    }

    /**
     * Stop video playback
     */
    stopVideo () {
        if (!this.videoIsPlaying)
            return;

        this.video.pause();
        this.video.currentTime = 0;
        this.videoImageContext.fillStyle = '#000000';
        this.videoImageContext.fillRect(0, 0, this.videoImage.width, this.videoImage.height);
        this.videoIsPlaying = false;
    }

    /**
     * play next video
     */
    nextVideo () {
        if (this.focusedMesh.playbackIndex >= this.focusedMesh.screenPlayback.length - 1)
            return;

        this.stopVideo();
        this.video = this.focusedMesh.screenPlayback[++this.focusedMesh.playbackIndex];
    }

    /**
     * play next video
     */
    prevVideo () {
        if (this.focusedMesh.playbackIndex <= 0)
            return;

        this.stopVideo();
        this.video = this.focusedMesh.screenPlayback[--this.focusedMesh.playbackIndex];
    }

    /**
     * load videos to DOM
     */
    loadVideos () {
        console.assert (this.clickHelperMeshes.length > 0);

        this.blank = document.createElement('img');
        this.blank.src = 'img/mindray.png';

        const DC60 = this.clickHelperMeshes[0];
        DC60.screenPlayback = [];
        DC60.playbackIndex = 0;

        for (let i = 0; i < 33; i++) {
            const video = document.createElement('video');
            video.src = 'screen_playback/DC60/screen (' + (i + 1).toString() + ').mp4';
            video.load();
            video.loop = true;

            DC60.screenPlayback.push(video);
        }

        const DC80 = this.clickHelperMeshes[2];
        DC80.screenPlayback = [];
        DC80.playbackIndex = 0;
        DC80.scale
        for (let i = 0; i < 34; i++) {
            const video = document.createElement('video');
            video.src = 'screen_playback/DC80/screen (' + (i + 1).toString() + ').mp4';
            video.load();
            video.loop = true;

            DC80.screenPlayback.push(video);
        }

        const Resona7 = this.clickHelperMeshes[4];
        Resona7.screenPlayback = [];
        Resona7.playbackIndex = 0;
        Resona7.scaleFactorX = 1.7;
        Resona7.scaleFactorY = 1.7;
        Resona7.shiftFactorX = 225;

        for (let i = 0; i < 12; i++) {
            const video = document.createElement('video');
            video.src = 'screen_playback/Resona7/screen (' + (i + 1).toString() + ').mp4';
            video.load();
            video.loop = true;

            Resona7.screenPlayback.push(video);
        }

        const TE7 = this.clickHelperMeshes[3];
        TE7.screenPlayback = [];
        TE7.playbackIndex = 0;
        TE7.scaleFactorX = 2.5;

        for (let i = 0; i < 9; i++) {
            const video = document.createElement('video');
            video.src = 'screen_playback/TE7/screen (' + (i + 1).toString() + ').mp4';
            video.load();
            video.loop = true;

            TE7.screenPlayback.push(video);
        }

        const MX8 = this.clickHelperMeshes[1];
        MX8.screenPlayback = [];
        MX8.playbackIndex = 0;
        MX8.scaleFactorX = 0.8;
        MX8.scaleFactorY = 0.8;

        for (let i = 0; i < 23; i++) {
            const video = document.createElement('video');
            video.src = 'screen_playback/MX8/screen (' + (i + 1).toString() + ').mp4';
            video.load();
            video.loop = true;

            MX8.screenPlayback.push(video);
        }

    }

    /**
     * init scene light parameters
     */
    initSceneLights() {
        const backInt = 5;
        const standInt = 1;

        const backLightRight = new THREE.PointLight(0xffffff, 0, 10, 1);
        backLightRight.position.set (0.75, 2, 2.8);

        const backLightLeft = new THREE.PointLight(0xffffff, 0, 10, 1);
        backLightLeft.position.set (-3.5, 2, 2.8);

        const standLightLeft = new THREE.PointLight(0xffffff, 0, 0, 0);
        standLightLeft.position.set (-3.75, 1.2, -1.265);

        const standLightMid = new THREE.PointLight(0xffffff,0, 0, 0);
        standLightMid.position.set (-2.2, 1.2, -1.265);

        const standLightRight = new THREE.PointLight(0xffffff, 0, 0, 0);
        standLightRight.position.set (-0.665, 1.2, -1.265);

        const deviceLight = new THREE.PointLight(0xffffff, 0, 0, 1);
        deviceLight.position.set (1,1.7, 0.4);

        const lightClock = new THREE.Clock();

        const lights = [];

        lights.push (backLightLeft);
        lights.push (backLightRight);
        lights.push (standLightLeft);
        lights.push (standLightMid);
        lights.push (standLightRight);
        lights.push (deviceLight);

        lights.forEach(el => this.scene.add (el));

        const maxTime = 5;
        const delayTime = 2;

        function animateLight ()
        {
            if (lightClock.getElapsedTime() < maxTime)
                requestAnimationFrame(animateLight);

            const time = lightClock.getElapsedTime();

            if (time < delayTime)
                return;

            for (let i = 0; i < 2; i++)
                lights[i].intensity = Math.min((time - delayTime) / (maxTime - delayTime), 1) * backInt;

            for (let i = 2; i < 5; i++)
                lights[i].intensity =  Math.min((time - delayTime) / (maxTime - delayTime), 1) * standInt;

            lights.forEach(l => l.needsUpdate = true);
        }

        lightClock.start();
        animateLight();

    }


    initCameraPositions() {
        this.clickHelperMeshes[0].photoModePos = new THREE.Vector3 (0.8973190739301781,  1.5867374591248107, 3.7498216359522494);

    }

}
