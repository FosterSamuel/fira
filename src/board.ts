import { createBoardGutters, createGroup, createHighlightDot, createHighlightSquare, createStackedBuilding } from "./elements.js";
import { SantoriniBoardElements, SantoriniBuilding, SantoriniBoardState, SantoriniBoardWorker, Coord } from "./types.js";
import { moveToCoords } from "./util.js";

export function createBoard(element: HTMLElement, onTap: (square: SVGPathElement, row: Coord, column: Coord) => void): SantoriniBoardElements {
    const sBoard = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    sBoard.classList.add("fira-board");
    sBoard.setAttribute("viewBox", "0 0 25 25");

    const highlightSquareGroup = createGroup("highlightSquareGroup");
    const buildingGroup = createGroup("buildingGroup");
    const highlightDotGroup = createGroup("highlightDotGroup");
    const boardGutters = createBoardGutters();
    const workerGroup = createGroup("workerGroup");

    const squares = [];
    const dots = [];

    for (let row = 0; row < 5; row++) {
        const squareRow = [];
        const dotRow = [];
        for (let column = 0; column < 5; column++) {
            const square = createHighlightSquare();
            const dot = createHighlightDot();

            moveToCoords(dot, row as Coord, column as Coord);
            moveToCoords(square, row as Coord, column as Coord);

            // Listen for click events on board
            square.addEventListener("click", () => {
                onTap(square, row as Coord, column as Coord);
            })

            // Add to DOM via groups
            highlightSquareGroup.appendChild(square);
            highlightDotGroup.appendChild(dot);

            // Added here for tracking in state
            squareRow.push(square);
            dotRow.push(dot);
        }
        squares.push(squareRow);
        dots.push(dotRow);
    }

    sBoard.appendChild(highlightSquareGroup);
    sBoard.appendChild(buildingGroup);
    sBoard.appendChild(highlightDotGroup);
    sBoard.appendChild(boardGutters);
    sBoard.appendChild(workerGroup);

    element.appendChild(sBoard);
    return { element: sBoard, squares, dots, buildingGroup, workerGroup };
}

export function setBuildingForPosition(buildingGroup: SVGGElement, building: SantoriniBuilding, row: Coord, column: Coord, state: SantoriniBoardState) {
    removeBuilding(row, column, state.buildings);

    // Makes a group of buildings up to the level request. For example, a
    // "third" creates a group with a first level, second level, and 
    // third level building.
    const stackedBuildingsGroup = createStackedBuilding(building);
    moveToCoords(stackedBuildingsGroup, row, column);

    buildingGroup.appendChild(stackedBuildingsGroup);

    state.buildings[row][column] = {
        elementGroup: stackedBuildingsGroup,
        building
    };
}

export function removeBuilding(row: Coord, column: Coord, buildings: SantoriniBoardState["buildings"] | undefined[][]) {
    const buildingsOnPosition = buildings[row][column];

    if (buildingsOnPosition) {
        buildingsOnPosition.elementGroup.remove();
        buildings[row][column] = undefined;
    }
}

export function getWorkerAtPosition(workers: SantoriniBoardWorker[], row: Coord, column: Coord) {
    let workerOnSquare;

    for (const w of workers) {
        if (w.row == row && w.column == column) {
            workerOnSquare = w;
            break;
        }
    }

    return workerOnSquare;
};

export function setHighlightDots(dots: SVGCircleElement[][], rowsAndColumns: [Coord, Coord][]) {
    for (const rowColumnPair of rowsAndColumns) {
        dots[rowColumnPair[0]][rowColumnPair[1]].style.display = "inline";
    }
}

export function removeHighlightDots(dots: SVGCircleElement[][]) {
    dots.forEach(dotRow => {
        dotRow.forEach(dot => {
            dot.style.display = "none";
        });
    });
}