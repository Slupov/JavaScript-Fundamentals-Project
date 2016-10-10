/**
 * Created by Maria on 10/10/2016.
 */
function JBlock() {
    Figure.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(GREEN_BLOCK_LOCATION);
    this.blocks[1] = new Block(GREEN_BLOCK_LOCATION);
    this.blocks[2] = new Block(GREEN_BLOCK_LOCATION);
    this.blocks[3] = new Block(GREEN_BLOCK_LOCATION);
    this.setNeighbours(this.blocks[0], [1]);
    this.setNeighbours(this.blocks[1], [0, 2]);
    this.setNeighbours(this.blocks[2], [1, 3]);
    this.setNeighbours(this.blocks[3], [2]);
}
JBlock.prototype = Object.create(Figure.prototype);

JBlock.prototype.constructor = JBlock;

JBlock.prototype.rotate = function(board) {
    board.matrix[this.blocks[0].yCoordinate][this.blocks[0].xCoordinate] = 0;
    board.matrix[this.blocks[1].yCoordinate][this.blocks[1].xCoordinate] = 0;
    board.matrix[this.blocks[2].yCoordinate][this.blocks[2].xCoordinate] = 0;
    board.matrix[this.blocks[3].yCoordinate][this.blocks[3].xCoordinate] = 0;
}