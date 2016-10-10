/**
 * Created by Maria on 10/10/2016.
 */
function ZBlock() {
    Figure.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(PINK_BLOCK_LOCATION);
    this.blocks[1] = new Block(PINK_BLOCK_LOCATION);
    this.blocks[2] = new Block(PINK_BLOCK_LOCATION);
    this.blocks[3] = new Block(PINK_BLOCK_LOCATION);
    this.setNeighbours(this.blocks[0], [1]);
    this.setNeighbours(this.blocks[1], [0, 2]);
    this.setNeighbours(this.blocks[2], [1, 3]);
    this.setNeighbours(this.blocks[3], [2]);
}
ZBlock.prototype = Object.create(Figure.prototype);

ZBlock.prototype.constructor = ZBlock;

