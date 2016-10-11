let Figure = function() {
    this.blocks = [];
    this.position = 0;
    this.xCoordinate = 0;
    this.yCoordinate = 0;
};

Figure.prototype.rotate = function (board) {};

Figure.prototype.setNeighbours = function(block, neighbours) {
    for(let i = 0; i < neighbours.length; i++) {
        block.neighbours.push(this.blocks[neighbours[i]]);
    }
};

Figure.prototype.canMoveFigureLeft = function(board) {
    let canMoveLeft = true;
    let leftBlocks = [];
    for(let i = 0; i < this.blocks.length; i++) {
        let hasNeighbourOnTheLeft = false;
        for(let j = 0; j < this.blocks[i].neighbours.length; j++){
            if(this.blocks[i].xCoordinate > this.blocks[i].neighbours[j].xCoordinate){
                hasNeighbourOnTheLeft = true;
            }
        }

        if(hasNeighbourOnTheLeft == false){
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
    for(let i = 0; i < this.blocks.length; i++) {
        let hasNeighbourOnTheRight = false;
        for(let j = 0; j < this.blocks[i].neighbours.length; j++){
            if(this.blocks[i].xCoordinate < this.blocks[i].neighbours[j].xCoordinate){
                hasNeighbourOnTheRight = true;
            }
        }

        if(hasNeighbourOnTheRight == false){
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