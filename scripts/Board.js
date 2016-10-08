let Board = function() {
    this.initializeBoard();
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

Board.prototype.canMoveFigureLeft = function(figure) {
    let canMoveLeft = true;
    let leftBlocks = [];
    let smallestX = figure.blocks[0].xCoordinate;
    for(let i = 1; i < figure.blocks.length; i++) {
        if(smallestX > figure.blocks[i].xCoordinate) {
            smallestX = figure.blocks[i].xCoordinate;
        }
    }
    for(let i = 0; i < figure.blocks.length; i++) {
        if(smallestX == figure.blocks[i].xCoordinate) {
            leftBlocks.push(figure.blocks[i]);
        }
    }
    for(let i = 0; i < leftBlocks.length; i++) {
        if(leftBlocks[i].xCoordinate == 0 ||
           this.matrix[leftBlocks[i].yCoordinate][leftBlocks[i].xCoordinate - 1] != 0) {
            canMoveLeft = false;
        }
    }

    return canMoveLeft;
};

Board.prototype.moveFigureLeft = function(figure) {
    let currentBlocks = [];
    for(let i = 0; i < figure.blocks.length; i++) {
        currentBlocks[i] = this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate];
        this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate] = 0;
    }
    for(let i = 0; i < figure.blocks.length; i++) {
        figure.blocks[i].xCoordinate--;
        this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate] = currentBlocks[i];
    }
};

Board.prototype.canMoveFigureRight = function(figure) {
    let canMoveRight = true;
    let rightBlocks = [];
    let biggestX = figure.blocks[0].xCoordinate;
    for(let i = 1; i < figure.blocks.length; i++) {
        if(biggestX < figure.blocks[i].xCoordinate) {
            biggestX = figure.blocks[i].xCoordinate;
        }
    }
    for(let i = 0; i < figure.blocks.length; i++) {
        if(biggestX == figure.blocks[i].xCoordinate) {
            rightBlocks.push(figure.blocks[i]);
        }
    }
    for(let i = 0; i < rightBlocks.length; i++) {
        if(rightBlocks[i].xCoordinate == this.matrix.length - 1 ||
            this.matrix[rightBlocks[i].yCoordinate][rightBlocks[i].xCoordinate + 1] != 0) {
            canMoveRight = false;
        }
    }

    return canMoveRight;
};

Board.prototype.moveFigureRight = function(figure) {
    let currentBlocks = [];
    for(let i = 0; i < figure.blocks.length; i++) {
        currentBlocks[i] = this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate];
        this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate] = 0;
    }
    for(let i = 0; i < figure.blocks.length; i++) {
        figure.blocks[i].xCoordinate++;
        this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate] = currentBlocks[i];
    }
};


Board.prototype.canMoveFigureDown = function(figure) {
    let canMoveDown = true;
    for(let i = 0; i < figure.blocks.length; i++) {
        if(figure.blocks[i].yCoordinate == this.matrix.length - 1 ||
            this.matrix[figure.blocks[i].yCoordinate + 1][figure.blocks[i].xCoordinate] != 0) {
            canMoveDown = false;
        }
    }

    return canMoveDown;
};

Board.prototype.moveFigureDown = function(figure) {
    let currentBlocks = [];
    for(let i = 0; i < figure.blocks.length; i++) {
        currentBlocks[i] = this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate];
        this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate] = 0;
    }
    for(let i = 0; i < figure.blocks.length; i++) {
        figure.blocks[i].yCoordinate++;
        this.matrix[figure.blocks[i].yCoordinate][figure.blocks[i].xCoordinate] = currentBlocks[i];
    }
};