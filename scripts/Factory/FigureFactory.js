let FigureFactory = function (){
    this.figureNumber = Math.floor((Math.random() * MAX_FIGURES) + 1);
};

FigureFactory.prototype.initializeFigure = function (board, endGame){
    // returns a random number between 1 and max
    this.figureNumber = Math.floor((Math.random() * MAX_FIGURES) + 1);

    let figure = null;

    switch(this.figureNumber){
        case 1: {
            figure = this.createLine();
            break;
        }
        case 2: {
            figure = this.createSquare();
            break;
        }
        case 3: {
            figure = this.createTriangle();
            break;
        }
        case 4: {
            figure = this.createJBlock();
            break;
        }
        case 5: {
            figure = this.createLBlock();
            break;
        }
        case 6: {
            figure = this.createSBlock();
            break;
        }
        case 7: {
            figure = this.createZBlock();
            break;
        }
    }

    if(board.matrix[figure.blocks[0].yCoordinate][figure.blocks[0].xCoordinate] != EMPTY_CELL ||
        board.matrix[figure.blocks[1].yCoordinate][figure.blocks[1].xCoordinate] != EMPTY_CELL ||
        board.matrix[figure.blocks[2].yCoordinate][figure.blocks[2].xCoordinate] != EMPTY_CELL ||
        board.matrix[figure.blocks[3].yCoordinate][figure.blocks[3].xCoordinate] != EMPTY_CELL) {
        endGame.shouldEndGame = true;
    }
    //spawn the figure
    //     board.matrix[figure.blocks[0].yCoordinate][figure.blocks[0].xCoordinate] = figure.blocks[0];
    //     board.matrix[figure.blocks[1].yCoordinate][figure.blocks[1].xCoordinate] = figure.blocks[1];
    //     board.matrix[figure.blocks[2].yCoordinate][figure.blocks[2].xCoordinate] = figure.blocks[2];
    //     board.matrix[figure.blocks[3].yCoordinate][figure.blocks[3].xCoordinate] = figure.blocks[3];

    return figure;
};

FigureFactory.prototype.createLine = function(){
    let figure = new Line();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 3;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 4;
    figure.blocks[2].yCoordinate = 0;
    figure.blocks[2].xCoordinate = 5;
    figure.blocks[3].yCoordinate = 0;
    figure.blocks[3].xCoordinate = 6;
    return figure;
};

FigureFactory.prototype.createSquare = function(){
    let figure = new Square();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 4;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 5;
    figure.blocks[2].yCoordinate = 1;
    figure.blocks[2].xCoordinate = 4;
    figure.blocks[3].yCoordinate = 1;
    figure.blocks[3].xCoordinate = 5;
    return figure;
};

FigureFactory.prototype.createTriangle = function(){
    let figure = new Triangle();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 5;
    figure.blocks[1].yCoordinate = 1;
    figure.blocks[1].xCoordinate = 4;
    figure.blocks[2].yCoordinate = 1;
    figure.blocks[2].xCoordinate = 5;
    figure.blocks[3].yCoordinate = 1;
    figure.blocks[3].xCoordinate = 6;
    return figure;
};

FigureFactory.prototype.createJBlock = function(){
    let figure = new JBlock();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 4;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 5;
    figure.blocks[2].yCoordinate = 0;
    figure.blocks[2].xCoordinate = 6;
    figure.blocks[3].yCoordinate = 1;
    figure.blocks[3].xCoordinate = 6;
    return figure;
};

FigureFactory.prototype.createLBlock = function(){
    let figure = new LBlock();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 4;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 5;
    figure.blocks[2].yCoordinate = 0;
    figure.blocks[2].xCoordinate = 6;
    figure.blocks[3].yCoordinate = 1;
    figure.blocks[3].xCoordinate = 4;
    return figure;
};

FigureFactory.prototype.createSBlock = function(){
    let figure = new SBlock();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 5;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 6;
    figure.blocks[2].yCoordinate = 1;
    figure.blocks[2].xCoordinate = 4;
    figure.blocks[3].yCoordinate = 1;
    figure.blocks[3].xCoordinate = 5;
    return figure;
};

FigureFactory.prototype.createZBlock = function(){
    let figure = new ZBlock();
    figure.blocks[0].yCoordinate = 0;
    figure.blocks[0].xCoordinate = 4;
    figure.blocks[1].yCoordinate = 0;
    figure.blocks[1].xCoordinate = 5;
    figure.blocks[2].yCoordinate = 1;
    figure.blocks[2].xCoordinate = 5;
    figure.blocks[3].yCoordinate = 1;
    figure.blocks[3].xCoordinate = 6;
    return figure;
};

