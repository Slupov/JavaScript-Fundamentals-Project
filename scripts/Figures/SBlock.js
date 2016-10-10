function SBlock() {
    Figure.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(ORANGE_BLOCK_LOCATION);
    this.blocks[1] = new Block(ORANGE_BLOCK_LOCATION);
    this.blocks[2] = new Block(ORANGE_BLOCK_LOCATION);
    this.blocks[3] = new Block(ORANGE_BLOCK_LOCATION);
    this.setNeighbours(this.blocks[0], [1,3]);
    this.setNeighbours(this.blocks[1], [0]);
    this.setNeighbours(this.blocks[2], [3]);
    this.setNeighbours(this.blocks[3], [0,2]);
}
SBlock.prototype = Object.create(Figure.prototype);

SBlock.prototype.constructor = SBlock;