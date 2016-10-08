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