let Board = function() {
    this.initializeBoard();
    this.playingAnimation = false;
};

Board.prototype.initializeBoard = function () {
    this.matrix = [];
    for(let row = 0; row < GAME_HEIGHT_BLOCKS; row++) {
        this.matrix[row] = [];
        for(let col = 0; col < GAME_WIDTH_BLOCKS; col++) {
            this.matrix[row][col] = 0;
        }
    }
};

Board.prototype.initializeFigure = function() {
    let figure = new Line();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 3;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 4;
    figure.blocks[2].yCoordinate = 0;
    figure.blocks[2].xCoordinate = 5;
    figure.blocks[3].yCoordinate = 0;
    figure.blocks[3].xCoordinate = 6;
    this.matrix[figure.blocks[0].yCoordinate][figure.blocks[0].xCoordinate] = figure.blocks[0];
    this.matrix[figure.blocks[1].yCoordinate][figure.blocks[1].xCoordinate] = figure.blocks[1];
    this.matrix[figure.blocks[2].yCoordinate][figure.blocks[2].xCoordinate] = figure.blocks[2];
    this.matrix[figure.blocks[3].yCoordinate][figure.blocks[3].xCoordinate] = figure.blocks[3];

    return figure;
};

Board.prototype.removeRows = function() {
    let rowsToRemove = [];
    for(let row = 0; row < this.matrix.length; row++) {
        if(this.shouldRemoveRow(row)) {
            rowsToRemove.push(row);
        }
    }

    for(let row = 0; row < rowsToRemove.length; row++) {
        for(let col = 0; col < this.matrix[rowsToRemove[row]].length; col++) {
            this.matrix[rowsToRemove[row]][col].removeNeighbours();
            this.matrix[rowsToRemove[row]][col] = 0;
        }
    }

    if(rowsToRemove.length > 0){
        this.playingAnimation = true;
    }
};

Board.prototype.shouldRemoveRow = function(row) {
    for(let col = 0; col < this.matrix[row].length; col++) {
        if(this.matrix[row][col] == 0) {
            return false;
        }
    }

    return true;
};

Board.prototype.moveEverythingDown = function() {
    let movedAtLeast1Element = false;

    for(let row = this.matrix.length - 1; row > 0; row--) {
        for(let col = 0; col < this.matrix[row].length; col++) {
            if(this.matrix[row][col] == 0 && this.matrix[row - 1][col] != 0 &&
               this.canMoveBlockDown(this.matrix[row - 1][col])) {
                this.moveBlockDown(this.matrix[row - 1][col], row, col);
                movedAtLeast1Element = true;
            }
        }
    }

    if(movedAtLeast1Element == false) {
        this.playingAnimation = false;
    }
};

Board.prototype.canMoveBlockDown = function(block, elementsChecked = []) {
    if(block.neighbours.length == 0) {
        return true;
    }

    if(block.yCoordinate == this.matrix.length - 1){
        return false;
    }

    if(this.matrix[block.yCoordinate + 1][block.xCoordinate] != 0){ // there's a block below the current block
        for(let i = 0; i < block.neighbours.length; i++) {
            if(block.neighbours[i] == this.matrix[block.yCoordinate + 1][block.xCoordinate]) { // if that block is a neighbour of the current block
                return true;
            }
        }

        return false;
    }

    let canMoveCurrentBlockDown = true;
    elementsChecked.push(block);

    for(let i = 0; i < block.neighbours.length; i++) {
        if(this.elementCheckedAlready(block.neighbours[i], elementsChecked) == false){
            canMoveCurrentBlockDown = this.canMoveBlockDown(block.neighbours[i], elementsChecked);
        }
    }

    return canMoveCurrentBlockDown;
};

Board.prototype.elementCheckedAlready = function (block, elementsChecked){
    for(let i = 0; i < elementsChecked.length; i++) {
        if (elementsChecked[i] == block) {
            return true;
        }
    }

    return false;
};

Board.prototype.moveBlockDown = function(block, row, col, elementsChecked = []) {
    elementsChecked.push(block);
    this.matrix[row][col] = block;
    block.yCoordinate++;
    this.matrix[row - 1][col] = 0;

    for(let i = 0; i < block.neighbours.length; i++) {
        if(this.elementCheckedAlready(block.neighbours[i], elementsChecked) == false){
            this.moveBlockDown(
                block.neighbours[i],
                block.neighbours[i].yCoordinate + 1,
                block.neighbours[i].xCoordinate,
                elementsChecked);
        }
    }
};