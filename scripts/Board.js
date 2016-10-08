let Board = function() {
    this.initializeBoard();
};

Board.prototype.initializeBoard = function () {
    this.matrix = [];
    for(let row = 0; row < GAME_HEIGHT_BLOCKS; row++) {
        this.matrix[row] = [];
        for(let col = 0; col < GAME_WIDTH_BLOCKS; col++) {
            this.matrix[row][col] = 0;
        }
    }
};

Board.prototype.initializeFigure = function() {
    let figure = new Line();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 3;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 4;
    figure.blocks[2].yCoordinate = 0;
    figure.blocks[2].xCoordinate = 5;
    figure.blocks[3].yCoordinate = 0;
    figure.blocks[3].xCoordinate = 6;
    this.matrix[figure.blocks[0].yCoordinate][figure.blocks[0].xCoordinate] = figure.blocks[0];
    this.matrix[figure.blocks[1].yCoordinate][figure.blocks[1].xCoordinate] = figure.blocks[1];
    this.matrix[figure.blocks[2].yCoordinate][figure.blocks[2].xCoordinate] = figure.blocks[2];
    this.matrix[figure.blocks[3].yCoordinate][figure.blocks[3].xCoordinate] = figure.blocks[3];

    return figure;
};