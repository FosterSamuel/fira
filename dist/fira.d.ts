interface FiraConfig {
    readonly element: HTMLElement;
    readonly onTap: (square: SVGPathElement, row: Coord, column: Coord) => void;
    readonly playable: boolean;
}
declare type SantoriniBuilding = "first" | "second" | "third" | "dome";
interface SantoriniBuildingWithElements {
    readonly elementGroup: SVGGElement;
    readonly building: SantoriniBuilding;
}
interface SantoriniBoardState {
    readonly workers: SantoriniBoardWorker[];
    readonly buildings: SantoriniBuildingWithElements[][] | undefined[][];
    selected: {
        square?: SVGPathElement;
        prevSquare?: SVGPathElement;
        worker?: SantoriniBoardWorker;
    };
    onTap: (square: SVGPathElement, row: Coord, column: Coord) => void;
}
interface SantoriniBoardElements {
    readonly element: SVGSVGElement;
    readonly squares: SVGPathElement[][];
    readonly dots: SVGCircleElement[][];
    readonly buildingGroup: SVGGElement;
    readonly workerGroup: SVGGElement;
}
interface SantoriniBoardType {
    readonly boardElements: SantoriniBoardElements;
    state: SantoriniBoardState;
    readonly setBoardFromNotation: (fen: string) => void;
    readonly setOnTap: (onTap: (square: SVGPathElement, row: Coord, column: Coord) => void) => void;
    readonly addWorkerForPlayer: (player: SantoriniPlayer, row: Coord, column: Coord) => SantoriniBoardWorker;
    readonly getWorkerOnSquare: (row: Coord, column: Coord) => void;
    readonly moveWorkerToSquare: (workerInState: SantoriniBoardWorker, row: Coord, column: Coord) => void;
    readonly setBuilding: (row: Coord, column: Coord, building: SantoriniBuilding) => void;
    readonly setHighlightDots: (rowsAndColumns: [Coord, Coord][]) => void;
    readonly removeWorker: (worker: SantoriniBoardWorker) => void;
    readonly removeBuilding: (row: Coord, column: Coord) => void;
    readonly removeHighlightDots: () => void;
}
declare type Coord = 0 | 1 | 2 | 3 | 4;
interface SantoriniBoardWorker {
    readonly element: SVGPathElement;
    readonly player: SantoriniPlayer;
    row: Coord;
    column: Coord;
}
declare type SantoriniPlayer = 1 | 2;

declare function Fira(config: FiraConfig): SantoriniBoardType;

export { Fira as default };
