import * as THREE from "https://esm.sh/three"

export default class AmbientLight {
    constructor() {
        this.object = new THREE.AmbientLight(0x707070, 0.5)
    }
}