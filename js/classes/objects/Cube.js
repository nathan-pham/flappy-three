import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Cube {
    constructor() {
        this.object = this.createMesh()
        this.cannon = this.createBody()

        this.addEventListeners()
    }

    addEventListeners() {
        window.addEventListener("keypress", e => {
            if(e.key == " ") {
                this.cannon.velocity.y = 60
            }
        })
    }

    createMesh() {
        this.geometry = new THREE.BoxGeometry(4, 4, 4)
        this.material = new THREE.MeshPhongMaterial({color: 0xff0000})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.y = 90
        mesh.receiveShadow = true
        mesh.castShadow = true
        return mesh
    }
    
    createBody() {
        const {width, height, depth} = this.geometry.parameters

        const cube = new CANNON.Body({
            mass: 100,
            // linearDamping: 0.5,
            // angularDamping: 1.0,
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)) 
            // new CANNON.Sphere(Math.max(width / 2, height / 2, depth / 2))
        })

        cube.position.copy(this.object.position)

        const contactNormal = new CANNON.Vec3()

        cube.addEventListener("collide", e => {
            console.log("dead")
            
            // const contact = e.contact

            // if (contact.bi.id == cube.id) {
            //     contact.ni.negate(contactNormal)
            // } else {
            //     contactNormal.copy(contact.ni)
            // }

            // if(contactNormal.dot(new CANNON.Vec3(0, 1, 0)) > 0.5) {
                
            //     // this.jump = true
            //     // this.player.action = "idle"
            // }
        })

        return cube
    }

    update() {
        this.object.position.copy(this.cannon.position)
        this.object.quaternion.copy(this.cannon.quaternion)
    }
}