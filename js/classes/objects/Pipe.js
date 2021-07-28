import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Pipe {
    constructor() {
        this.object = this.createMesh()
        this.cannon = this.createBody()
    }
    
    update() {
        // this.cannon.position.x = -100
        // this.cannon.velocity.x -= 1
        this.cannon.position.x -= 1
        this.object.position.copy(this.cannon.position)
        this.object.position.y = this.geometry.parameters.height / 2

        if(this.cannon.position.x < -200) {
            this.cannon.position.x = 200
        }
    }

    createMesh() {
        this.geometry = new THREE.CylinderGeometry(5, 5, 50, 50)
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.5})
        
        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(200, 0, 0)
        return mesh
    }

    createBody() {
        const {radiusTop, radiusBottom, height, radialSegments} = this.geometry.parameters

        const cylinder = new CANNON.Body({
            mass: 10000,
            shape: new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments)
        })

        cylinder.position.copy(this.object.position)
        cylinder.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
        cylinder.position.y += height / 2

        return cylinder
    }
}