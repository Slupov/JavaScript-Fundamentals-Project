let Figure = function() {
    this.blocks = [];
    this.position = 0;
    this.xCoordinate = 0;
    this.yCoordinate = 0;
};

Figure.prototype.rotate = function (board) {};

Figure.prototype.canMoveFigureLeft = function(board) {
    let canMoveLeft = true;
    let leftBlocks = [];
    let smallestX = this.blocks[0].xCoordinate;
    for(let i = 1; i < this.blocks.length; i++) {
        if(smallestX > this.blocks[i].xCoordinate) {
            smallestX = this.blocks[i].xCoordinate;
        }
    }
    for(let i = 0; i < this.blocks.length; i++) {
        if(smallestX == this.blocks[i].xCoordinate) {
            leftBlocks.push(this.blocks[i]);
        }
    }
    for(let i = 0; i < leftBlocks.length; i++) {
        if(leftBlocks[i].xCoordinate == 0 ||
            board.matrix[leftBlocks[i].yCoordinate][leftBlocks[i].xCoordinate - 1] != 0) {
            canMoveLeft = false;
        }
    }

    return canMoveLeft;
};

Figure.prototype.moveFigureLeft = function(board) {
    let currentBlocks = [];
    for(let i = 0; i < this.blocks.length; i++) {
        currentBlocks[i] = board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate];
        board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate] = 0;
    }
    for(let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].xCoordinate--;
        board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate] = currentBlocks[i];
    }
};

Figure.prototype.canMoveFigureRight = function(board) {
    let canMoveRight = true;
    let rightBlocks = [];
    let biggestX = this.blocks[0].xCoordinate;
    for(let i = 1; i < this.blocks.length; i++) {
        if(biggestX < this.blocks[i].xCoordinate) {
            biggestX = this.blocks[i].xCoordinate;
        }
    }
    for(let i = 0; i < this.blocks.length; i++) {
        if(biggestX == this.blocks[i].xCoordinate) {
            rightBlocks.push(this.blocks[i]);
        }
    }
    for(let i = 0; i < rightBlocks.length; i++) {
        if(rightBlocks[i].xCoordinate == board.matrix.length - 1 ||
            board.matrix[rightBlocks[i].yCoordinate][rightBlocks[i].xCoordinate + 1] != 0) {
            canMoveRight = false;
        }
    }

    return canMoveRight;
};

Figure.prototype.moveFigureRight = function(board) {
    let currentBlocks = [];
    for(let i = 0; i < this.blocks.length; i++) {
        currentBlocks[i] = board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate];
        board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate] = 0;
    }
    for(let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].xCoordinate++;
        board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate] = currentBlocks[i];
    }
};


Figure.prototype.canMoveFigureDown = function(board) {
    let canMoveDown = true;
    for(let i = 0; i < this.blocks.length; i++) {
        if(this.blocks[i].yCoordinate == board.matrix.length - 1) {
            canMoveDown = false;
        }
        else if(board.matrix[this.blocks[i].yCoordinate + 1][this.blocks[i].xCoordinate] != 0){
            let isNeighbour = false;
            for(let j = 0; j < this.blocks.length; j++) {
                if(board.matrix[this.blocks[i].yCoordinate + 1][this.blocks[i].xCoordinate] == this.blocks[j]){
                    isNeighbour = true;
                }
            }

            if(!isNeighbour){
                canMoveDown = false;
            }
        }
    }

    return canMoveDown;
};

Figure.prototype.moveFigureDown = function(board) {
    let currentBlocks = [];
    for(let i = 0; i < this.blocks.length; i++) {
        currentBlocks[i] = board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate];
        board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate] = 0;
    }
    for(let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].yCoordinate++;
        board.matrix[this.blocks[i].yCoordinate][this.blocks[i].xCoordinate] = currentBlocks[i];
    }
};