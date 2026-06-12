export default class verticeNode {
    #coords;
    #neighbors;
    constructor(coords) {
        this.#coords = coords;
        this.#neighbors = []
    }

    get coords() {
        return this.#coords;
    }

    get neighbors() {
        return this.#neighbors;
    }

    get front() {
        this.#neighbors.find(val => {
            if (Object.is(val, [this.#coords[0], this.#coords[1] + 1])) return true;
        });
    }

    get back() {
    this.#neighbors.find(val => {
        if (Object.is(val, [this.#coords[0], this.#coords[1] - 1])) return true;
    });
}

    get left() {
        this.#neighbors.find(val => {
            if (Object.is(val, [this.#coords[0] - 1, this.#coords[1]])) return true;
        })
    }

    get right() {
        this.#neighbors.find(val => {
            if (Object.is(val, [this.#coords[0] + 1, this.#coords[1]])) return true;
        })
    }


    set neighbors(arrNodes) {
        if (!(arrNodes instanceof verticeNode)) throw new Error("invalid neighbor assignment");
        this.#neighbors = arrNodes;
    }

    pushNeighbors(...neighborArr) {
        if (!(Array.isArray(neighborArr)) || neighborArr.length <= 0) throw new Error("invalid neighbor array argument");
        neighborArr.map(neighbor => {
            if (!(verticeNode instanceof neighbor)) throw new Error("invalid neighbor argument");
            this.#neighbors.push(neighborArr);
        });
    }

}
