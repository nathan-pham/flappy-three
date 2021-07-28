import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Plane {
    constructor() {
        this.object = this.createMesh()
        this.cannon = this.createBody()        
    }

    createMesh() {
        this.geometry = new THREE.PlaneGeometry(200, 200)
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff, depthWrite: false})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        mesh.castShadow = true
        return mesh
    }

    createBody() {
        const plane = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
        })
    
        plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
            
        return plane
    }
}