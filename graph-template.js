import KnightPiece from "./knight-piece-template.js";
import verticeNode from "./node-template.js";

export default class chessBoardGraph {
    #board;
    // this will store the coordinates for already created nodes [x, y]
    #createdSpots;
    constructor(initialLoc) {
        if (initialLoc === undefined) initialLoc = [0, 0];
        if (!(Array.isArray(initialLoc)) || initialLoc.length !== 2) throw new Error("invalid initial position provided");
        this.#board = #this.chessInitialSpot(initialLoc);
        this.#pointer = null;
        this.#createdSpots = new Map();
    }

    #findSquare(coordinatesArr) {
        const [x, y] = coordinatesArr;
        return this.#createdSpots.get(`${x}${y}`);
    }

    #getNeighbors(coordinatesArr) {
        const neighbors3x3 = [];
        for (let x = -1; x !== 2; x++) {
            for (let y = -1; y !== 2; y++) {
                const coordX = coordinatesArr[0] + x;
                const coordY = coordinatesArr[1] + y;
                if (this.#validIndex([coordX, coordY])) neighbors3x3.push([coordX, coordY]);
            }
        }
        const neighborsRef = neighbors3x3.map(val => {
            return this.#findSquare(val);
        });
        return neighborsRef;
    }

    #validIndex(arr) {
        if (arr.length !== 2) throw new Error("invalid input");
        // check if both coordinates are in range (0-7)
        return (arr[0] <= 7 || arr[0] > 0) || (arr[1] <= 7 || arr[1] > 0);
    }

    #generateSquare(coordinatesArr) {
        // check if index is in range
        if (!this.#validIndex(coordinatesArr)) throw new Error("square index out of range");
        // get coordinates in variables for more readability
        const coordinateX = coordinatesArr[0];
        const coordinateY = coordinatesArr[1];
        // check if coordinates are integers
        if (!(Number.isInteger(coordinateX) && Number.isInteger(coordinateY))) throw new Error("coordinates must be integers");
        // check if spot to be generate is already created, if it is it don't create another one it just return the existing reference
        let address;
        if (this.#createdSpots.has(`${coordinateX}${coordinateY}`)) {
            address = this.#findSquare(coordinatesArr);
            return address;
        }
        // create another node
        const newSquare = new verticeNode(coordinatesArr);
        // set the new square and record its address in memory
        this.#createdSpots.set(`${coordinateX}${coordinateY}`, newSquare);
        // get all nearby 3x3 neighbors
        newSquare.neighbors = this.#getNeighbors(coordinatesArr);
        // for each neighbor add this new square in neighbors
        newSquare.neighbors.map(neighbor => neighbor.pushNeighbors(newSquare));
        return newSquare ?? address;
    }

    knightMoves(position, destination) {
        const knight = new KnightPiece(position);
        const actualSquare = this.#generateSquare(position);
    }

    #getKnightShortRoot(knight, destination) {
        const logicMovies = knight.hipotheticalMoviments.filter(this.#validIndex);
    }

    #chessInitialSpot(initialLoc) {
        return this.#generateSquare(initialLoc);
    }
}
