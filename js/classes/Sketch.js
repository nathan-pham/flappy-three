import * as THREE from "https://esm.sh/three"
import {OrbitControls} from "https://esm.sh/three/examples/jsm/controls/OrbitControls"
import * as CANNON from "https://esm.sh/cannon"
import cannonDebugger from "http://esm.sh/cannon-es-debugger"

export default class Sketch {
    objects = []
    clock = new THREE.Clock()

    constructor({container=document.body, controls}={}) {
        this.container = typeof container == "string" ? document.querySelector(container) : container
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.createWorld()
        this.createScene()
        this.createCamera()
        this.createRenderer()

        if(controls) {
            this.createControls()
        }

        cannonDebugger(this.scene, this.world.bodies)

        window.addEventListener("resize", this.resize.bind(this))
    }

    get aspect() {
        return this.dimensions.width / this.dimensions.height
    }

    add(...objects) {
        for(const object of objects) {
            this.objects.push(object)
            this.scene.add(object.object || object)

            if(object.cannon) {
                this.world.addBody(object.cannon)
            }
        }
    }
    
    resize() {
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.camera.aspect = this.aspect
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.dimensions.width, this.dimensions.height)
    }
    
    createWorld() {
        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.87 * 20, 0)
    }

    createScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)
    }

    createCamera() {
        const fov = 75
        const near = 1
        const far = 1000

        this.camera = new THREE.PerspectiveCamera(fov, this.aspect, near, far)
        // this.camera.position.set(50, 90, 50)
        this.camera.position.set(0, 55, 100)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

        document.body.addEventListener("click", e => {
            console.log(this.camera.position)
        })
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        this.renderer.setSize(this.dimensions.width, this.dimensions.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.container.appendChild(this.renderer.domElement)
    }
    
    createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.target.set(0, 0, 0)
        this.controls.update()
    }

    render() {
        const delta = this.clock.getDelta()
        this.world.step(1 / 60, delta)


        this.renderer.render(this.scene, this.camera)

        for(const object of this.objects) {
            if(typeof object.update == "function") {
                object.update(this)
            }
        }

        window.requestAnimationFrame(this.render.bind(this))
    }
}