import { SantoriniBuilding, SantoriniBuildingExceptDome } from "./types.js";

const steps = {
    "first": 1,
    "second": 2,
    "third": 3,
    "dome": 4
};

export function createBoardGutters() {
    const boardGutters = document.createElementNS("http://www.w3.org/2000/svg", "path");

    boardGutters.setAttribute("d", "M5 0v25M10 0v25M15 0v25M20 0v25M0 5h25M0 10h25M0 15h25M0 20h25");
    boardGutters.setAttribute("stroke", "black");
    boardGutters.setAttribute("stroke-width", "0.05");
    boardGutters.setAttribute("fill", "none");

    boardGutters.classList.add("boardGutters");

    return boardGutters;
}

export function createGroup(className?: string) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    if (className) {
        group.classList.add(className);
    }

    return group;
}

export function createHighlightSquare() {
    const square = document.createElementNS("http://www.w3.org/2000/svg", "path");

    square.setAttribute("d", "M0 0H5V5H0");
    square.classList.add("highlightSquare");

    return square;
}

export function createHighlightDot() {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    dot.setAttribute("cx", "2.5");
    dot.setAttribute("cy", "2.5");
    dot.setAttribute("r", "0.5");
    dot.classList.add("highlightDot");

    return dot;
}

export function createWorker(group: SVGGElement, colorClasses?: string[]) {
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

export function createStackedBuilding(building: SantoriniBuilding) {
    const buildingGroupInner = createGroup("buildingGroupInner");

    for (let build = 0; build < steps[building]; build++) {
        const name = ["first", "second", "third", "dome"][build] as SantoriniBuilding;
        const buildingElement = createBuilding(buildingGroupInner, name);

        buildingGroupInner.appendChild(buildingElement);
    }

    return buildingGroupInner;
}

export function createBuilding(group: SVGGElement, building: SantoriniBuilding) {
    const buildingPath: {
        [K in SantoriniBuildingExceptDome]: string;
    } = {
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
    } else {
        buildingElement.setAttribute("d", buildingPath[building]);
        buildingElement.setAttribute("fill", "black");
        buildingElement.classList.add(`${building}Building`);
    }

    group.appendChild(buildingElement);
    return buildingElement;
}
