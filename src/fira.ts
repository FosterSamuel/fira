import { removeHighlightDots as removeHighlightDots, removeBuilding, createBoard, getWorkerAtPosition, setBuildingForPosition as setBuilding, setHighlightDots } from "./board.js";
import { createWorker } from "./elements.js";
import { SantoriniBoardType, FiraConfig, SantoriniPlayer, SantoriniBoardState, SantoriniBoardWorker, Coord } from "./types.js";
import { getEmptyBoard, moveToCoords } from "./util.js";

export function Fira(config: FiraConfig): SantoriniBoardType {
    const state: SantoriniBoardState = {
        workers: [],
        buildings: getEmptyBoard(),
        selected: {
            square: undefined,
            prevSquare: undefined,
            worker: undefined
        },
        onTap: config.onTap
    };

    const squareOnTap = (square: SVGPathElement, row: Coord, column: Coord) => {
        state.onTap(square, row, column);
    };

    const boardElements = createBoard(config.element, squareOnTap);

    return {
        boardElements,

        state,

        addWorkerForPlayer,

        moveWorker,

        setBuilding: (row, column, building) => {
            setBuilding(boardElements.buildingGroup, building, row, column, state);
        },

        setHighlightDots: rowsAndColumns => {
            setHighlightDots(boardElements.dots, rowsAndColumns);
        },

        getWorkerOnSquare: (row, column) => {
            const workerAtPosition = getWorkerAtPosition(state.workers, row, column);
            if (workerAtPosition) {
                state.selected.worker = workerAtPosition;
            }
        },

        removeWorker,

        removeBuilding: (row, column) => {
            removeBuilding(row, column, state.buildings);
        },

        removeHighlightDots: () => {
            removeHighlightDots(boardElements.dots);
        },

        setOnTap: s => {
            state.onTap = s;
        }
    }

    function removeWorker(worker: SantoriniBoardWorker) {
        const index = state.workers.indexOf(worker);

        if (index > -1) {
            // Remove from DOM
            worker.element.remove();

            // Remove from state
            state.workers.splice(index, 1);
        }
    }

    function hasWorkerOnPosition(row: Coord, column: Coord) {
        for (const worker of state.workers) {
            if (worker.row == row && worker.column == column) {
                return worker;
            }
        }
        return false;
    }

    function addWorkerForPlayer(player: SantoriniPlayer, row: Coord, column: Coord) {
        const existingPlayer = hasWorkerOnPosition(row, column);

        if (existingPlayer) {
            removeWorker(existingPlayer);
        }
        const colorClasses = player == 2 ? ['workerSecond'] : []
        const worker: SantoriniBoardWorker = {
            element: createWorker(boardElements.workerGroup, colorClasses),
            player,
            row,
            column
        };

        state.workers.push(worker);
        moveToCoords(worker.element, row, column);

        return worker;
    }

    function moveWorker(workerInState: SantoriniBoardWorker, row: Coord, column: Coord) {
        workerInState.row = row;
        workerInState.column = column;

        moveToCoords(workerInState.element, row, column);
    }
}
