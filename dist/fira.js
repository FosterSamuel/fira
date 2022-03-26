const steps = {
    "first": 1,
    "second": 2,
    "third": 3,
    "dome": 4
};
function createBoardGutters() {
    const boardGutters = document.createElementNS("http://www.w3.org/2000/svg", "path");
    boardGutters.setAttribute("d", "M5 0v25M10 0v25M15 0v25M20 0v25M0 5h25M0 10h25M0 15h25M0 20h25");
    boardGutters.setAttribute("stroke", "black");
    boardGutters.setAttribute("stroke-width", "0.05");
    boardGutters.setAttribute("fill", "none");
    boardGutters.classList.add("boardGutters");
    return boardGutters;
}
function createGroup(className) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (className) {
        group.classList.add(className);
    }
    return group;
}
function createHighlightSquare() {
    const square = document.createElementNS("http://www.w3.org/2000/svg", "path");
    square.setAttribute("d", "M0 0H5V5H0");
    square.classList.add("highlightSquare");
    return square;
}
function createHighlightDot() {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", "2.5");
    dot.setAttribute("cy", "2.5");
    dot.setAttribute("r", "0.5");
    dot.classList.add("highlightDot");
    return dot;
}
function createWorker(group, colorClasses) {
    const workerElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    workerElement.setAttribute("d", "M2.72 1.7375 2.72 3.0125 2.2738 3.0125 2.2738 1.7375A3.1875.6375 0 012.1781 1.5781L2.1781 1.4188A2.55.6375 0 012.2738 1.2275.6375.4781 0 012.72 1.2275 2.55.6375 0 012.8156 1.4188L2.8156 1.5781A3.1875.6375 0 012.72 1.7375M2.2738 3.0125 2.1781 3.1081 1.6362 3.1081 1.5406 3.2037 1.5406 3.7456 1.6362 3.8412 3.3575 3.8412 3.4531 3.7456 3.4531 3.2037 3.3575 3.1081 2.8156 3.1081 2.72 3.0125");
    workerElement.setAttribute("fill", "black");
    workerElement.setAttribute("draggable", "true");
    workerElement.classList.add("worker");
    if (colorClasses) {
        for (const color of colorClasses) {
            workerElement.classList.add(color);
        }
    }
    group.appendChild(workerElement);
    return workerElement;
}
function createStackedBuilding(building) {
    const buildingGroupInner = createGroup("buildingGroupInner");
    for (let build = 0; build < steps[building]; build++) {
        const name = ["first", "second", "third", "dome"][build];
        const buildingElement = createBuilding(buildingGroupInner, name);
        buildingGroupInner.appendChild(buildingElement);
    }
    return buildingGroupInner;
}
function createBuilding(group, building) {
    const buildingPath = {
        first: "M.5.5H4.5V4.5H.5",
        second: "M.75.75H4.25V4.25H.75",
        third: "M1 1H4V4H1"
    };
    const isDome = building == "dome";
    const buildingElement = document.createElementNS("http://www.w3.org/2000/svg", isDome ? "circle" : "path");
    if (isDome) {
        buildingElement.setAttribute("cx", "2.5");
        buildingElement.setAttribute("cy", "2.5");
        buildingElement.setAttribute("r", "1.35");
        buildingElement.classList.add(building);
    }
    else {
        buildingElement.setAttribute("d", buildingPath[building]);
        buildingElement.setAttribute("fill", "black");
        buildingElement.classList.add(`${building}Building`);
    }
    group.appendChild(buildingElement);
    return buildingElement;
}

function moveToCoords(el, row, column) {
    el.style.transform = `translateY(${20 * row}%) translateX(${20 * column}%)`;
}
function getEmptyBoard() {
    return [[undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined]];
}

function createBoard(element, onTap) {
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
            moveToCoords(dot, row, column);
            moveToCoords(square, row, column);
            // Listen for click events on board
            square.addEventListener("click", () => {
                onTap(square, row, column);
            });
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
function setBuildingForPosition(buildingGroup, building, row, column, state) {
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
function removeBuilding(row, column, buildings) {
    const buildingsOnPosition = buildings[row][column];
    if (buildingsOnPosition) {
        buildingsOnPosition.elementGroup.remove();
        buildings[row][column] = undefined;
    }
}
function getWorkerAtPosition(workers, row, column) {
    let workerOnSquare;
    for (const w of workers) {
        if (w.row == row && w.column == column) {
            workerOnSquare = w;
            break;
        }
    }
    return workerOnSquare;
}
function setHighlightDots(dots, rowsAndColumns) {
    for (const rowColumnPair of rowsAndColumns) {
        dots[rowColumnPair[0]][rowColumnPair[1]].style.display = "inline";
    }
}
function removeHighlightDots(dots) {
    dots.forEach(dotRow => {
        dotRow.forEach(dot => {
            dot.style.display = "none";
        });
    });
}

function Fira(config) {
    const state = {
        workers: [],
        buildings: getEmptyBoard(),
        selected: {
            square: undefined,
            prevSquare: undefined,
            worker: undefined
        },
        onTap: config.onTap
    };
    const squareOnTap = (square, row, column) => {
        state.onTap(square, row, column);
    };
    const boardElements = createBoard(config.element, squareOnTap);
    return {
        boardElements,
        state,
        addWorkerForPlayer,
        moveWorker,
        setBuilding: (row, column, building) => {
            setBuildingForPosition(boardElements.buildingGroup, building, row, column, state);
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
    };
    function removeWorker(worker) {
        const index = state.workers.indexOf(worker);
        if (index > -1) {
            // Remove from DOM
            worker.element.remove();
            // Remove from state
            state.workers.splice(index, 1);
        }
    }
    function hasWorkerOnPosition(row, column) {
        for (const worker of state.workers) {
            if (worker.row == row && worker.column == column) {
                return worker;
            }
        }
        return false;
    }
    function addWorkerForPlayer(player, row, column) {
        const existingPlayer = hasWorkerOnPosition(row, column);
        if (existingPlayer) {
            removeWorker(existingPlayer);
        }
        const colorClasses = player == 2 ? ['workerSecond'] : [];
        const worker = {
            element: createWorker(boardElements.workerGroup, colorClasses),
            player,
            row,
            column
        };
        state.workers.push(worker);
        moveToCoords(worker.element, row, column);
        return worker;
    }
    function moveWorker(workerInState, row, column) {
        workerInState.row = row;
        workerInState.column = column;
        moveToCoords(workerInState.element, row, column);
    }
}

export { Fira as default };
