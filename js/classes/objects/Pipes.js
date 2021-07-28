import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

const random = (min, max) => Math.random() * (max - min) + min

export default class Pipes {
    constructor(offset=random(25, 65) * -1) {
        this.object = this.createMesh(offset)
        this.cannon = this.createBody()
    }
    
    update(sketch) {
        this.cannon.position.x -= 1
        this.object.position.copy(this.cannon.position)
        this.object.position.y += this.geometry.parameters.height / 2

        if(this.cannon.position.x < -150) {
            this.dead = true
        }

        if(this.cannon.position.x == 100 && !this.spawned) {
            this.spawned = true
            sketch.add(new Pipes())
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

    createMesh(offset) {
        this.gap = 15
        
        this.geometry = new THREE.CylinderGeometry(4, 4, 75, 50)
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.5})

        const pipe1 = new THREE.Mesh(this.geometry, this.material)
        const pipe2 = new THREE.Mesh(this.geometry, this.material)
        pipe2.position.y += this.geometry.parameters.height + this.gap
        
        // 85
      
        const group = new THREE.Group()
        
        pipe1.name = group.uuid
        pipe2.name = group.uuid
        group.add(pipe1)
        group.add(pipe2)

        group.position.set(175, offset, 0)

        return group
    }

    createBody() {
        const {radiusTop, radiusBottom, height, radialSegments} = this.geometry.parameters
        const cylinder = new CANNON.Body({mass: 0})
        cylinder.addShape(new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments), new CANNON.Vec3(0, 0, height / 2))
        cylinder.addShape(new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments), new CANNON.Vec3(0, 0, height + this.gap + height / 2))
        cylinder.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
        cylinder.position.copy(this.object.position)

        return cylinder
        // return this.object.children.map(child => {
            
        //     const cylinder = new CANNON.Body({
        //         mass: 0,
        //         shape: new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments)
        //     })

        //     cylinder.position.copy(child.position)
        //     
        //     cylinder.position.y += height / 2

        //     return cylinder
        // })
    }
}