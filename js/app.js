import Sketch from "./classes/Sketch.js"

import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import Plane from "./classes/objects/Plane.js"
import Pipe from "./classes/objects/Pipe.js"
import Cube from "./classes/objects/Cube.js"

const sketch = new Sketch({container: "#webgl__container", controls: true})

sketch.add(
    new DirectionalLight(),
    new AmbientLight(),
    new Plane(),
    new Pipe(),
    new Cube()
)

sketch.render()