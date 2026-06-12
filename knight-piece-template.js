import verticeNode from "./node-template.js";

export default class KnightPiece extends verticeNode {
    get hipotheticalMoviments() {
        const moviments = [];
        const coords = this.coords;
        moviments.push(...this.#getLMoviments(coords, "front"));
        moviments.push(...this.#getLMoviments(coords, "back"));
        moviments.push(...this.#getLMoviments(coords, "left"));
        moviments.push(...this.#getLMoviments(coords, "right"));

        return moviments;

    }

    #getLMoviments(coordsArr, directionString) {
        if (typeof directionString !== "string") throw new Error("invalid direction mode");

        const moviment = [];
        const mode = directionString.charAt(0).toLowerCase();

        if (mode === "f") {
            const x = coordsArr[0] + 2;
            moviment.push([x, coordsArr[1] - 1], [x, coordsArr[1] + 1]);
        } else if (mode === "l") {
            const y = coordsArr[1] - 2;
            moviment.push([coordsArr[0] + 1, y], [coordsArr[0] - 1, y]);
        } else if (mode === "r") {
            const y = coordsArr[1] + 2;
            moviment.push([coordsArr[0] + 1, y], [coordsArr[0] - 1, y]);
        } else if (mode === "b") {
            const x = coordsArr[0] - 2;
            moviment.push([x, coordsArr[1] - 1], [x, coordsArr[1] + 1]);
        }

        return moviment
    }
}
