function Square() {
    Square.call();
    this.blocks = parent.blocks;
    this.xCoordinate = parent.xCoordinate;
    this.yCoordinate = parent.yCoordinate;
    this.blocks[0] = new Block(YELLOW_BLOCK_LOCATION);
    this.blocks[1] = new Block(YELLOW_BLOCK_LOCATION);
    this.blocks[2] = new Block(YELLOW_BLOCK_LOCATION);
    this.blocks[3] = new Block(YELLOW_BLOCK_LOCATION);
    this.setNeighbours(this.blocks[0], [1,2]);
    this.setNeighbours(this.blocks[1], [0, 3]);
    this.setNeighbours(this.blocks[2], [0, 3]);
    this.setNeighbours(this.blocks[3], [1,2]);
}
Square.prototype = Object.create(Figure.prototype);

Square.prototype.constructor = Square;
