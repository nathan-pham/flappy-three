import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

const random = (min, max) => Math.random() * (max - min) + min

export default class Pipe {
    constructor(position=[200, 0, 0], height=25) {
        this.object = this.createMesh(position, height)
        this.cannon = this.createBody()
    }

    static createSet(x=200) {
        const gap = 15
        const height = random(10, 40)

        return [
            new Pipe([x, 0, 0], height),
            new Pipe([x, height + gap, 0], 200)
        ]
    }
    
    update(sketch) {
        this.cannon.position.x -= 1
        this.object.position.copy(this.cannon.position)
        // this.object.position.y += this.geometry.parameters.height / 2

        if(this.cannon.position.x < -150) {
            this.dead = true
        }

        if(this.cannon.position.x == 75 && !this.spawned) {
            this.spawned = true
            // sketch.add(Pipe.createSet(this.initialPosition[0] + 75))
            // sketch.add(Pipe.createSet(this.initialPosition[0]))
        }

        // if(Math.floor(this.cannon.position.x) == 50) {
        //     sketch.add(Pipe.createSet(150))
        // }

        // if(this.cannon.position.x < -150) {
        //     this.dead = true
        //     sketch.remove(this)
        //     sketch.add(Pipe.createSet(150))
        // }

        // if(this.cannon.position.x < -200) {
        //     this.cannon.position.x = 200
        // }
    }

    createMesh(position, height) {
        this.geometry = new THREE.CylinderGeometry(4, 4, height, 50)
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.5})
        
        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        mesh.name = mesh.uuid
        return mesh
    }

    createBody() {
        const {radiusTop, radiusBottom, height, radialSegments} = this.geometry.parameters

        const cylinder = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments)
        })

        cylinder.position.copy(this.object.position)
        cylinder.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
        cylinder.position.y += height / 2

        return cylinder
    }
}