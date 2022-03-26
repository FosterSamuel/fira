export interface FiraConfig {
    readonly element: HTMLElement;
    readonly onTap: (square: SVGPathElement, row: Coord, column: Coord) => void;
    readonly playable: boolean;
}

export type SantoriniBuildingExceptDome = "first" | "second" | "third";
export type SantoriniBuilding = "first" | "second" | "third" | "dome";

export interface SantoriniBuildingWithElements {
    readonly elementGroup: SVGGElement;
    readonly building: SantoriniBuilding;
}

export interface SantoriniBoardState {
    readonly workers: SantoriniBoardWorker[];
    readonly buildings: SantoriniBuildingWithElements[][] | undefined[][];
    selected: {
        square?: SVGPathElement;
        prevSquare?: SVGPathElement;
        worker?: SantoriniBoardWorker;
    };
    onTap: (square: SVGPathElement, row: Coord, column: Coord) => void;
}

export interface SantoriniBoardElements {
    readonly element: SVGSVGElement;
    readonly squares: SVGPathElement[][];
    readonly dots: SVGCircleElement[][];
    readonly buildingGroup: SVGGElement;
    readonly workerGroup: SVGGElement;
}

export interface SantoriniBoardType {
    readonly boardElements: SantoriniBoardElements;
    state: SantoriniBoardState;

    readonly setOnTap: (onTap: (square: SVGPathElement, row: Coord, column: Coord) => void) => void;

    readonly addWorkerForPlayer: (player: SantoriniPlayer, row: Coord, column: Coord) => SantoriniBoardWorker;
    readonly getWorkerOnSquare: (row: Coord, column: Coord) => void;
    readonly moveWorker: (workerInState: SantoriniBoardWorker, row: Coord, column: Coord) => void;

    readonly setBuilding: (row: Coord, column: Coord, building: SantoriniBuilding) => void;
    readonly setHighlightDots: (rowsAndColumns: [Coord, Coord][]) => void;

    readonly removeWorker: (worker: SantoriniBoardWorker) => void;
    readonly removeBuilding: (row: Coord, column: Coord) => void;
    readonly removeHighlightDots: () => void;

};

export type Coord = 0 | 1 | 2 | 3 | 4;

export interface SantoriniBoardWorker {
    readonly element: SVGPathElement;
    readonly player: SantoriniPlayer;
    row: Coord;
    column: Coord;
}

export type SantoriniPlayer = 1 | 2;