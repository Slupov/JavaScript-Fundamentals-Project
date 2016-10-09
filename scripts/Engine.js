$(document).ready(function () {
    let renderer = new Renderer();
    let board = new Board();
    let engine = new Engine(renderer, board);
    engine.main();
});

let Engine = function(renderer, board) {
    this.renderer = renderer;
    this.board = board;
    this.currentFigure = null;
    this.timeForMove = 1;
    this.currentTime = 0;
    this.lastFrameTime = 0;
    this.animationTime = 0;
    this.timeForAnimation = 0.5;

    window.addEventListener('keydown', this.handleControls.bind(this));
};

Engine.prototype.main = function(time = 0) {
    this.update(time);
    this.renderer.render(this.board);
    requestAnimationFrame( this.main.bind(this) );
};

Engine.prototype.update = function(time) {
    if(this.currentFigure == null){
        this.initializeFigure();
    }

    if(this.lastFrameTime != 0) {
        let timeDifference = time - this.lastFrameTime;
        if(this.board.playingAnimation == false) {
            this.currentTime += timeDifference;
            if(this.currentTime / 1000 > this.timeForMove) {
                this.moveDown();
            }
        }
        else {
            this.animationTime += timeDifference;
            if(this.animationTime / 1000 > this.timeForAnimation) {
                this.animationTime = 0;
                this.board.moveEverythingDown();
            }
        }
    }
    this.lastFrameTime = time;
};

Engine.prototype.handleControls = function(event) {
    if(this.canMove() == true) {
        if (event.code == "ArrowDown") {
            this.moveDown();
        }
        else if (event.code == "ArrowLeft") {
            this.moveLeft();
        }
        else if (event.code == "ArrowRight") {
            this.moveRight();
        }
        else if (event.code == "ArrowUp") {
            this.rotate();
        }
    }
};

Engine.prototype.moveDown = function() {
    this.currentTime = 0;
    if(this.currentFigure.canMoveFigureDown(this.board)){
        this.currentFigure.moveFigureDown(this.board);
    }
    else {
        this.board.removeRows();
        if(this.board.playingAnimation == false) {
            this.initializeFigure();
        }
    }
};

Engine.prototype.moveLeft = function() {
    if(this.currentFigure.canMoveFigureLeft(this.board)){
        this.currentFigure.moveFigureLeft(this.board);
    }
};

Engine.prototype.moveRight = function() {
    if(this.currentFigure.canMoveFigureRight(this.board)){
        this.currentFigure.moveFigureRight(this.board);
    }
};

Engine.prototype.rotate = function() {
    this.currentFigure.rotate(this.board);
};

Engine.prototype.initializeFigure = function() {
    this.currentFigure = this.board.initializeFigure();
};

Engine.prototype.canMove = function() {
    return this.board.playingAnimation == false;
};