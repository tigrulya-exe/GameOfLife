export default class Field {
    constructor(width, height, cells, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cells = cells;
        this.isAliveMask = [];

        for (let x = 0; x < this.width; ++x) {
            this.isAliveMask.push([]);
            for (let y = 0; y < this.height; ++y) {
                this.isAliveMask[x].push(cells[x][y].isAlive);
            }
        }
    }

    changeCellStatus = (x, y) => {
        if (this.isValidCoords(x, y)) {
            this._changeCellStatus(x, y, !this.cells[x][y].isAlive)
        }
    };

    _changeCellStatus = (x, y, isAlive) => {
        if (this.isValidCoords(x, y)) {
            this.cells[x][y].isAlive = isAlive;
            this.isAliveMask[x][y] = isAlive;
        }
    };

    updateCells = () => {
        this.runForAllCells((x, y) => {
            let neighboursCount = this.getNeighboursCount(x, y);
            if (neighboursCount === 3) {
                this.isAliveMask[x][y] = true;
            } else if (neighboursCount !== 2) {
                this.isAliveMask[x][y] = false;
            }
        });

        this.runForAllCells((x, y) => {
            this.cells[x][y].isAlive = this.isAliveMask[x][y]
        })
    };

    runForAllCells = (func) => {
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                func(x, y);
            }
        }
    };

    flush = () => {
        this.runForAllCells((x, y) => this.cells[x][y].isAlive = false);
        this.runForAllCells((x, y) => this.isAliveMask[x][y] = false);
    };

    getCorrectX = (x) => {
        return (x + this.width) % this.width
    };

    getCorrectY = (y) => {
        return (y + this.height) % this.height
    };

    isValidCoords = (x, y) => {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    getNeighboursCount = (x, y) => {
        let count = 0;
        let neighbourX, neighbourY;
        for (let dx = -1; dx < 2; ++dx) {
            for (let dy = -1; dy < 2; ++dy) {
                if (!dx && !dy) {
                    continue;
                }
                neighbourX = this.getCorrectX(x + dx);
                neighbourY = this.getCorrectY(y + dy);
                if (this.cells[neighbourX][neighbourY].isAlive) {
                    ++count;
                }
            }
        }
        return count;
    };
}