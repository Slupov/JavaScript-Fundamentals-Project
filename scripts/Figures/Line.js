function Line() {
    Figure.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(BLUE_BLOCK_LOCATION);
    this.blocks[1] = new Block(BLUE_BLOCK_LOCATION);
    this.blocks[2] = new Block(BLUE_BLOCK_LOCATION);
    this.blocks[3] = new Block(BLUE_BLOCK_LOCATION);
}
Line.prototype = Object.create(Figure.prototype); // See note below

Line.prototype.constructor = Line;

Line.prototype.rotate = function(board) {
    board.matrix[this.blocks[0].yCoordinate][this.blocks[0].xCoordinate] = 0;
    board.matrix[this.blocks[1].yCoordinate][this.blocks[1].xCoordinate] = 0;
    board.matrix[this.blocks[2].yCoordinate][this.blocks[2].xCoordinate] = 0;
    board.matrix[this.blocks[3].yCoordinate][this.blocks[3].xCoordinate] = 0;
    if(parent.position == 0) {
        this.blocks[0].xCoordinate = this.blocks[0].xCoordinate + 3;
        this.blocks[0].yCoordinate = this.blocks[0].yCoordinate - 3;
        this.blocks[1].xCoordinate = this.blocks[1].xCoordinate + 2;
        this.blocks[1].yCoordinate = this.blocks[1].yCoordinate - 2;
        this.blocks[2].xCoordinate = this.blocks[2].xCoordinate + 1;
        this.blocks[2].yCoordinate = this.blocks[2].yCoordinate - 1;
        let difference = this.blocks[3].yCoordinate - 3;
        if(difference < 0) {
            this.blocks[0].yCoordinate = this.blocks[0].yCoordinate - difference;
            this.blocks[1].yCoordinate = this.blocks[1].yCoordinate - difference;
            this.blocks[2].yCoordinate = this.blocks[2].yCoordinate - difference;
            this.blocks[3].yCoordinate = this.blocks[3].yCoordinate - difference;
        }
        parent.position = 1;
    }
    else if(parent.position == 1){
        this.blocks[0].xCoordinate = this.blocks[0].xCoordinate - 3;
        this.blocks[0].yCoordinate = this.blocks[0].yCoordinate + 3;
        this.blocks[1].xCoordinate = this.blocks[1].xCoordinate - 2;
        this.blocks[1].yCoordinate = this.blocks[1].yCoordinate + 2;
        this.blocks[2].xCoordinate = this.blocks[2].xCoordinate - 1;
        this.blocks[2].yCoordinate = this.blocks[2].yCoordinate + 1;
        let difference = this.blocks[3].xCoordinate - 3;
        if(difference < 0) {
            this.blocks[0].xCoordinate = this.blocks[0].yCoordinate - difference;
            this.blocks[1].xCoordinate = this.blocks[1].yCoordinate - difference;
            this.blocks[2].xCoordinate = this.blocks[2].yCoordinate - difference;
            this.blocks[3].xCoordinate = this.blocks[3].yCoordinate - difference;
        }
        parent.position = 0;
    }

    board.matrix[this.blocks[0].yCoordinate][this.blocks[0].xCoordinate] = this.blocks[0];
    board.matrix[this.blocks[1].yCoordinate][this.blocks[1].xCoordinate] = this.blocks[1];
    board.matrix[this.blocks[2].yCoordinate][this.blocks[2].xCoordinate] = this.blocks[2];
    board.matrix[this.blocks[3].yCoordinate][this.blocks[3].xCoordinate] = this.blocks[3];
};