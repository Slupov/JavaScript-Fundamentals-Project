let FigureFactory = function (){};

FigureFactory.prototype.initializeFigure = function (board){
    let figureNumber = Math.floor((Math.random() * MAX_FIGURES) + 1); // returns a random number between 1 and max
    let figure = null;
    switch(figureNumber){
        case 1: {
            figure = new Line();
            figure.blocks[0].yCoordinate = 0;
            figure.blocks[0].xCoordinate = 3;
            figure.blocks[1].yCoordinate = 0;
            figure.blocks[1].xCoordinate = 4;
            figure.blocks[2].yCoordinate = 0;
            figure.blocks[2].xCoordinate = 5;
            figure.blocks[3].yCoordinate = 0;
            figure.blocks[3].xCoordinate = 6;
            break;
        }
        case 2: {
            figure = new Square();
            figure.blocks[0].yCoordinate = 0;
            figure.blocks[0].xCoordinate = 4;
            figure.blocks[1].yCoordinate = 0;
            figure.blocks[1].xCoordinate = 5;
            figure.blocks[2].yCoordinate = 1;
            figure.blocks[2].xCoordinate = 4;
            figure.blocks[3].yCoordinate = 1;
            figure.blocks[3].xCoordinate = 5;
            break;
        }
        case 3: {
            figure = new Triangle();
            figure.blocks[0].yCoordinate = 0;
            figure.blocks[0].xCoordinate = 5;
            figure.blocks[1].yCoordinate = 1;
            figure.blocks[1].xCoordinate = 4;
            figure.blocks[2].yCoordinate = 1;
            figure.blocks[2].xCoordinate = 5;
            figure.blocks[3].yCoordinate = 1;
            figure.blocks[3].xCoordinate = 6;
            break;
        }
        case 4: {
            figure = new Triangle();
            figure.blocks[0].yCoordinate = 0;
            figure.blocks[0].xCoordinate = 5;
            figure.blocks[1].yCoordinate = 1;
            figure.blocks[1].xCoordinate = 4;
            figure.blocks[2].yCoordinate = 1;
            figure.blocks[2].xCoordinate = 5;
            figure.blocks[3].yCoordinate = 1;
            figure.blocks[3].xCoordinate = 6;
            break;
        }
    }

    board.matrix[figure.blocks[0].yCoordinate][figure.blocks[0].xCoordinate] = figure.blocks[0];
    board.matrix[figure.blocks[1].yCoordinate][figure.blocks[1].xCoordinate] = figure.blocks[1];
    board.matrix[figure.blocks[2].yCoordinate][figure.blocks[2].xCoordinate] = figure.blocks[2];
    board.matrix[figure.blocks[3].yCoordinate][figure.blocks[3].xCoordinate] = figure.blocks[3];

    return figure;
};