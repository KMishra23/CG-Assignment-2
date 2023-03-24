// this one is supposed to store all the primitives on the scene.

export class Scene {
    constructor (width, height) {
        // Creates a primitive list and canvas size
        this.primitives = []
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    add(primitive) {
        if(this.primitives && primitive) {
            this.primitives.push(primitive)
            console.log(primitive.type + " was added to the scene")
        }
    }

    addCamera(camera) {
        this.camera = camera;
    }

    delete(primitive) {
        if(this.primitives && primitive) {
            let i = this.primitives.indexOf(primitive);
            if(i > -1) {
                this.primitives.splice(i, 1);
            }
        }
    }
}