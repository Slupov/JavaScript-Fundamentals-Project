$(document).ready(function () {
    let renderer = new Renderer();
    let board = new Board();
    let figureFactory = new FigureFactory();
    let engine = new Engine(renderer, board, figureFactory);
    engine.main();
});

let Engine = function(renderer, board, figureFactory) {
    this.renderer = renderer;
    this.board = board;
    this.figureFactory = figureFactory;
    this.currentFigure = null;
    this.timeForMove = 1;
    this.currentTime = 0;
    this.lastFrameTime = 0;
    this.animationTime = 0;
    this.timeForAnimation = 0.5;
    this.lineDestroyer = new LineDestroyer();
    this.paused = false;

    window.addEventListener('keydown', this.handleControls.bind(this));
};

Engine.prototype.main = function(time = 0) {
    this.update(time);
    this.renderer.renderGame(this.board);
    if (this.lineDestroyer.abilityPlayingAnimation == true) {
        this.renderer.renderLineDestroyer(this.board, this.lineDestroyer);
    }

    this.renderer.renderAbilities(this.lineDestroyer);
    requestAnimationFrame( this.main.bind(this) );
};

Engine.prototype.update = function(time) {
    if(this.currentFigure == null){
        this.initializeFigure();
    }

    if(this.lastFrameTime != 0) {
        let timeDifference = time - this.lastFrameTime;
        if(this.canMove()) {
            this.currentTime += timeDifference;
            if(this.currentTime / 1000 > this.timeForMove) {
                this.moveDown();
            }

            if(this.lineDestroyer.cooldownLeft > 0){
                this.lineDestroyer.cooldownLeft -= timeDifference / 1000;
            }
            else {
                this.lineDestroyer.cooldownLeft = 0;
            }
        }
        else if (this.board.playingAnimation == true){
            this.animationTime += timeDifference;
            if(this.animationTime / 1000 > this.timeForAnimation) {
                this.animationTime = 0;
                this.board.moveEverythingDown();
            }
        }
        else if (this.lineDestroyer.abilityPlayingAnimation == true){
            this.lineDestroyer.abilityAnimationTime += timeDifference;
            if(this.lineDestroyer.abilityAnimationTime / 1000 > this.lineDestroyer.timeForAbilityAnimation) {
                this.lineDestroyer.abilityAnimationTime = 0;
                this.lineDestroyer.abilityPlayingAnimation = false;
                this.lineDestroyer.cooldownLeft = this.lineDestroyer.cooldownTime;
                this.initializeFigure();
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
        else if (event.code == "Digit1") {
            this.lineDestroyer.useAbility(this.currentFigure, this.board);
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
    this.currentFigure = this.figureFactory.initializeFigure(this.board);
};

Engine.prototype.canMove = function() {
    return this.board.playingAnimation == false && this.lineDestroyer.abilityPlayingAnimation == false && this.paused == false;
};