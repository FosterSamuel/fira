import { Coord } from "./types.js";

export function moveToCoords(el: SVGElement, row: Coord, column: Coord) {
    el.style.transform = `translateY(${20 * row}%) translateX(${20 * column}%)`;
}

export function getEmptyBoard() {
    return [[undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined]];
}

export const SQUARES: [Coord, Coord][] = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]
];