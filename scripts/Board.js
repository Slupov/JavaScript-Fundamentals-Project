let Board = function() {
    this.initializeBoard();
    this.playingAnimation = false;
};

Board.prototype.initializeBoard = function () {
    this.matrix = [];
    for(let row = 0; row < GAME_HEIGHT_BLOCKS; row++) {
        this.matrix[row] = [];
        for(let col = 0; col < GAME_WIDTH_BLOCKS; col++) {
            this.matrix[row][col] = EMPTY_CELL;
        }
    }
};

Board.prototype.removeRows = function() {
    let rowsToRemove = [];
    for(let row = 0; row < this.matrix.length; row++) {
        if(this.shouldRemoveRow(row)) {
            rowsToRemove.push(row);
        }
    }

    for(let row = 0; row < rowsToRemove.length; row++) {
        this.removeRow(rowsToRemove[row]);
    }

    if(rowsToRemove.length > 0){
        this.playingAnimation = true;
    }
};

Board.prototype.removeRow = function(row) {
    for(let col = 0; col < this.matrix[row].length; col++) {
        if(this.matrix[row][col] != EMPTY_CELL) {
            this.removeBlock(row, col);
        }
    }
};

Board.prototype.removeBlock = function(row, col) {
    this.matrix[row][col].removeNeighbours();
    this.matrix[row][col] = EMPTY_CELL;
}

Board.prototype.shouldRemoveRow = function(row) {
    for(let col = 0; col < this.matrix[row].length; col++) {
        if(this.matrix[row][col] == EMPTY_CELL) {
            return false;
        }
    }

    return true;
};

Board.prototype.moveEverythingDown = function() {
    let movedAtLeast1Element = false;

    for(let row = this.matrix.length - 1; row > 0; row--) {
        for(let col = 0; col < this.matrix[row].length; col++) {
            if(this.matrix[row][col] == EMPTY_CELL && this.matrix[row - 1][col] != EMPTY_CELL &&
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

    if(this.matrix[block.yCoordinate + 1][block.xCoordinate] != EMPTY_CELL){ // there's a block below the current block
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
        if(canMoveCurrentBlockDown == false) {
            return false;
        }

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
    if(this.matrix[row][col] != EMPTY_CELL && this.elementCheckedAlready(this.matrix[row][col], elementsChecked) == false) {
        this.moveBlockDown(
            this.matrix[row][col],
            this.matrix[row][col].yCoordinate + 1,
            this.matrix[row][col].xCoordinate,
            elementsChecked);
    }

    this.matrix[row][col] = block;
    block.yCoordinate++;
    this.matrix[row - 1][col] = EMPTY_CELL;

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