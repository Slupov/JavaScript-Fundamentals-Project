/**
 * Created by Maria on 10/10/2016.
 */
function LBlock() {
    Figure.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(TEAL_BLOCK_LOCATION);
    this.blocks[1] = new Block(TEAL_BLOCK_LOCATION);
    this.blocks[2] = new Block(TEAL_BLOCK_LOCATION);
    this.blocks[3] = new Block(TEAL_BLOCK_LOCATION);
    this.setNeighbours(this.blocks[0], [1]);
    this.setNeighbours(this.blocks[1], [0, 2]);
    this.setNeighbours(this.blocks[2], [1, 3]);
    this.setNeighbours(this.blocks[3], [2]);
}
LBlock.prototype = Object.create(Figure.prototype);

LBlock.prototype.constructor = LBlock;

