import Sketch from "./classes/Sketch.js"

import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import Plane from "./classes/objects/Plane.js"
// import Pipe from "./classes/objects/Pipe.js"
import Cube from "./classes/objects/Cube.js"
import Pipes from "./classes/objects/Pipes.js"
const sketch = new Sketch({container: "#webgl__container", controls: false, debug: true})

sketch.add(
    new DirectionalLight(),
    new AmbientLight(),
    new Plane(),
    new Cube(),

    new Pipes()

    // Pipe.createSet(150)
)
/*
height + gap
*/

sketch.render()