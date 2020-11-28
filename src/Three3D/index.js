/**
 *  three.js  demo
 *
 */

import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ResourceTracker from './utils/ResourceTracker';

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

class Three3D {
    constructor(
        options = {
            container: '#gl-wrapper',
            stats: false,
            modelResources: []
        }
    ) {
        this.options = options;
        this.initContainer(this.options.container);

        //
        if (this.options.stats) this.initStats();

        this.initLoader();

        // 场景、相机、渲染器
        this.initScene();
        this.initCamera();
        this.initRenderer();

        if (this.options.modelResources.length) {
            this.loadModelByUrl(this.options.modelResources[0]);
        }

        // 控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = false;
        this.controls.screenSpacePanning = true;
        //
        this.animate();
    }
    initContainer(container) {
        this.container = document.querySelector(container);
    }

    /**
     *  场景
     */
    initScene() {
        this.scene = new THREE.Scene();
        this.setSceneBackground();

        /**
         *  灯光
         *  AmbientLight 环境光 没有方向，不能投射阴影
         */
        const light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);

        const dirLight = new THREE.DirectionalLight(0xe0e0e0, 0.8);
        dirLight.position.set(0, 2, 2);
        this.scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight(0xe0e0e0, 0.8);
        dirLight2.position.set(0, -2, -2);
        this.scene.add(dirLight2);
    }
    /**
     *  相机
     *  THREE.PerspectiveCamera 透视摄像机
     *  THREE.OrthographicCamera 正交摄像机
     */
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
        this.camera.position.set(0, 0, 100);
    }
    /**
     *  渲染器
     */
    initRenderer(op) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true //是否抗锯齿，默认false
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
    }
    render(scene = this.scene, camera = this.camera) {
        this.renderer.render(scene, camera);
    }

    /**
     *  tool
     *  统计仪表板
     *  0: fps , 1: ms , 2: mb
     */
    initStats() {
        this.stats = new Stats();
        this.stats.showPanel(0);
        // default css fix : left-top
        this.container.appendChild(this.stats.dom);
    }

    /**
     *  模型加载 这里用 GLTFLoader 导入
     */
    initLoader() {
        this.loader = new GLTFLoader();
    }

    loadModelByUrl(url) {
        this.loader.load(
            url,
            gltf => {
                console.log(gltf, 'gltf');
                this.resMgr?.dispose();
                this.resMgr = new ResourceTracker();
                const track = this.resMgr.track.bind(this.resMgr);
                const rootModel = track(gltf.scene);
                this.scene.add(rootModel);

                // const box = new THREE.Box3().setFromObject(rootModel);
                // const boxSize = box.getSize(new THREE.Vector3()).length();
                // const boxCenter = box.getCenter(new THREE.Vector3());

                // set the camera to frame the box
                // this.frameArea(boxSize, boxSize, boxCenter, this.camera, rootModel);

                const box = new THREE.Box3().setFromObject(rootModel);
                const boxSize = box.getSize(new THREE.Vector3()).length();
                const S = 100 / boxSize;
                rootModel.scale.set(S, S, S);

                //包围盒自动计算：模型整体居中
                const box2 = new THREE.Box3().setFromObject(rootModel);
                const boxCenter = box2.getCenter(new THREE.Vector3());
                rootModel.position.set(rootModel.position.x - boxCenter.x, rootModel.position.y - boxCenter.y, rootModel.position.z - boxCenter.z);
            },
            undefined,
            function(error) {
                console.error(error);
            }
        );
    }

    /**
     * empty constructor - will default white
     * @param {color} color RGB string
     */
    setSceneBackground(color = 0xd0d0d0) {
        this.scene.background = new THREE.Color(color);
    }

    animate() {
        if (resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        this.controls?.update();
        this.renderer.render(this.scene, this.camera);

        this.stats?.update();
        requestAnimationFrame(this.animate.bind(this));
    }
}

export default Three3D;
