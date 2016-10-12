function Triangle() {
    Figure.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(RED_BLOCK_LOCATION);
    this.blocks[1] = new Block(RED_BLOCK_LOCATION);
    this.blocks[2] = new Block(RED_BLOCK_LOCATION);
    this.blocks[3] = new Block(RED_BLOCK_LOCATION);
    this.setNeighbours(this.blocks[0], [2]);
    this.setNeighbours(this.blocks[1], [2]);
    this.setNeighbours(this.blocks[2], [0, 1, 3]);
    this.setNeighbours(this.blocks[3], [2]);
}
Triangle.prototype = Object.create(Figure.prototype);

Triangle.prototype.constructor = Triangle;

Triangle.prototype.rotate = function (board) {
    board.matrix[this.blocks[0].yCoordinate][this.blocks[0].xCoordinate] = 0;
    board.matrix[this.blocks[1].yCoordinate][this.blocks[1].xCoordinate] = 0;
    board.matrix[this.blocks[2].yCoordinate][this.blocks[2].xCoordinate] = 0;
    board.matrix[this.blocks[3].yCoordinate][this.blocks[3].xCoordinate] = 0;
    //parent.position == 0 checks if the line element is in lying position
    if (parent.position == 0 && this.canRotate(parent.position, board)) {
        this.blocks[0].xCoordinate = this.blocks[0].xCoordinate + 1;
        this.blocks[0].yCoordinate = this.blocks[0].yCoordinate + 1;
        this.blocks[1].xCoordinate = this.blocks[1].xCoordinate + 1;
        this.blocks[1].yCoordinate = this.blocks[1].yCoordinate - 1;
        this.blocks[3].xCoordinate = this.blocks[3].xCoordinate - 1;
        this.blocks[3].yCoordinate = this.blocks[3].yCoordinate + 1;

        //what is difference
        let difference = this.blocks[3].yCoordinate - 3;
        if (difference < 0) {
            this.blocks[0].yCoordinate = this.blocks[0].yCoordinate - difference;
            this.blocks[1].yCoordinate = this.blocks[1].yCoordinate - difference;
            this.blocks[2].yCoordinate = this.blocks[2].yCoordinate - difference;
            this.blocks[3].yCoordinate = this.blocks[3].yCoordinate - difference;
        }
        parent.position = 1;
    }
    //parent.position == 1 checks if the line element is in standing position
    else if (parent.position == 1 && this.canRotate(parent.position, board)) {
        this.blocks[0].xCoordinate = this.blocks[0].xCoordinate - 1;
        this.blocks[0].yCoordinate = this.blocks[0].yCoordinate + 1;
        this.blocks[1].xCoordinate = this.blocks[1].xCoordinate + 1;
        this.blocks[1].yCoordinate = this.blocks[1].yCoordinate + 1;
        this.blocks[3].xCoordinate = this.blocks[3].xCoordinate - 1;
        this.blocks[3].yCoordinate = this.blocks[3].yCoordinate - 1;
        let difference = this.blocks[3].xCoordinate - 1;
        if (difference < 0) {
            this.blocks[0].xCoordinate = this.blocks[0].xCoordinate - difference;
            this.blocks[1].xCoordinate = this.blocks[1].xCoordinate - difference;
            this.blocks[2].xCoordinate = this.blocks[2].xCoordinate - difference;
            this.blocks[3].xCoordinate = this.blocks[3].xCoordinate - difference;
        }
        parent.position = 2;
    }
    else if (parent.position == 2 && this.canRotate(parent.position, board)) {
        this.blocks[0].xCoordinate = this.blocks[0].xCoordinate - 1;
        this.blocks[0].yCoordinate = this.blocks[0].yCoordinate - 1;
        this.blocks[1].xCoordinate = this.blocks[1].xCoordinate - 1;
        this.blocks[1].yCoordinate = this.blocks[1].yCoordinate + 1;
        this.blocks[3].xCoordinate = this.blocks[3].xCoordinate + 1;
        this.blocks[3].yCoordinate = this.blocks[3].yCoordinate - 1;
        let difference = this.blocks[3].xCoordinate - 2;
        if (difference < 0) {
            this.blocks[0].xCoordinate = this.blocks[0].xCoordinate - difference;
            this.blocks[1].xCoordinate = this.blocks[1].xCoordinate - difference;
            this.blocks[2].xCoordinate = this.blocks[2].xCoordinate - difference;
            this.blocks[3].xCoordinate = this.blocks[3].xCoordinate - difference;
        }
        parent.position = 3;
    }
    else if (parent.position == 3 && this.canRotate(parent.position, board)) {
        this.blocks[0].xCoordinate = this.blocks[0].xCoordinate + 1;
        this.blocks[0].yCoordinate = this.blocks[0].yCoordinate - 1;
        this.blocks[1].xCoordinate = this.blocks[1].xCoordinate - 1;
        this.blocks[1].yCoordinate = this.blocks[1].yCoordinate - 1;
        this.blocks[3].xCoordinate = this.blocks[3].xCoordinate + 1;
        this.blocks[3].yCoordinate = this.blocks[3].yCoordinate + 1;
        let difference = GAME_WIDTH_BLOCKS - 1 - this.blocks[3].xCoordinate;
        if (difference < 0) {
            this.blocks[0].xCoordinate = this.blocks[0].xCoordinate + difference;
            this.blocks[1].xCoordinate = this.blocks[1].xCoordinate + difference;
            this.blocks[2].xCoordinate = this.blocks[2].xCoordinate + difference;
            this.blocks[3].xCoordinate = this.blocks[3].xCoordinate + difference;
        }
        parent.position = 0;
    }

    board.matrix[this.blocks[0].yCoordinate][this.blocks[0].xCoordinate] = this.blocks[0];
    board.matrix[this.blocks[1].yCoordinate][this.blocks[1].xCoordinate] = this.blocks[1];
    board.matrix[this.blocks[2].yCoordinate][this.blocks[2].xCoordinate] = this.blocks[2];
    board.matrix[this.blocks[3].yCoordinate][this.blocks[3].xCoordinate] = this.blocks[3];
};

Triangle.prototype.canRotate = function (position, board) {
    //parent.position == 0 checks if the line element is in lying position
    let canRotateInThisPosition = true;
    let pivotBlockNumber = 2;
    let pivotBlockY = this.blocks[pivotBlockNumber].yCoordinate;
    let pivotBlockX = this.blocks[pivotBlockNumber].xCoordinate;
    if (position == 0) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (i == pivotBlockNumber) {
                continue;
            }

            if (pivotBlockY - pivotBlockNumber + i >= 0 &&
                board.matrix[pivotBlockY - pivotBlockNumber + i][pivotBlockX] != 0) {
                canRotateInThisPosition = false;
                break;
            }
        }
    }
    //parent.position == 1 checks if the line element is in standing position
    else if (position == 1) {
        for (let i = 0; i < this.blocks.length; i++) {
            if (i == pivotBlockNumber) {
                continue;
            }

            if (pivotBlockX - pivotBlockNumber + i >= 0 &&
                board.matrix[pivotBlockY][pivotBlockX - pivotBlockNumber + i] != 0) {
                canRotateInThisPosition = false;
                break;
            }
        }
    }
    //else if (position == 2) {};
    //else if (position == 3) {};

    return canRotateInThisPosition;
};