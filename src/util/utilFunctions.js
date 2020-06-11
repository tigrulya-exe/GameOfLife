import Cell from "../shapes/Cell";

function getCellX(event){
    return Math.floor((event.pageX - event.currentTarget.offsetLeft) / (12))
}

function getCellY(event){
    return Math.floor((event.pageY - event.currentTarget.offsetTop) / (12))
}

function initCells(xCount, yCount, cellSize, offset) {
    const cells = [];
    for (let x = 0; x < xCount; ++x) {
        cells.push([]);
        for (let y = 0; y < yCount; ++y) {
            cells[x].push(new Cell((cellSize + offset) * x, (cellSize + offset) * y));
        }
    }
    cells[3][5].isAlive = true;
    cells[3][6].isAlive = true;
    cells[3][7].isAlive = true;
    cells[2][7].isAlive = true;
    cells[1][6].isAlive = true;

    return cells;
}

export {getCellX, getCellY, initCells}