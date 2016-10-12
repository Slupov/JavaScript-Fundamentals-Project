let Game = function (renderer, board, figureFactory) {
    this.engine = null;
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
    this.score = 0;
    this.highscore = 0;
    this.playing = false;
    this.saveData = null;
};

Game.prototype.update = function(time) {
    if(this.currentFigure == null){
        this.initializeFigure();
    }

    if(this.lastFrameTime != 0) {
        let timeDifference = time - this.lastFrameTime;
        if(this.canMove()) {
            this.normalUpdate(timeDifference);
        }
        else if (this.board.playingAnimation == true){
            this.blocksFallingDownAnimation(timeDifference);
        }
        else if (this.lineDestroyer.abilityPlayingAnimation == true){
            this.lineDestroyerAnimation(timeDifference);
        }
    }

    this.lastFrameTime = time;
};

Game.prototype.normalUpdate = function(timeDifference) {
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
};

Game.prototype.blocksFallingDownAnimation = function(timeDifference) {
    this.animationTime += timeDifference;
    if(this.animationTime / 1000 > this.timeForAnimation) {
        this.animationTime = 0;
        this.board.moveEverythingDown();
    }
};

Game.prototype.lineDestroyerAnimation = function(timeDifference) {
    this.lineDestroyer.abilityAnimationTime += timeDifference;
    if(this.lineDestroyer.abilityAnimationTime / 1000 > this.lineDestroyer.timeForAbilityAnimation) {
        this.lineDestroyer.abilityAnimationTime = 0;
        this.lineDestroyer.abilityPlayingAnimation = false;
        this.lineDestroyer.cooldownLeft = this.lineDestroyer.cooldownTime;
        this.initializeFigure();
    }
};

Game.prototype.render = function () {
    this.renderer.renderGame(this.engine, this);
    if (this.lineDestroyer.abilityPlayingAnimation == true) {
        this.renderer.renderLineDestroyer(this);
    }

    this.renderer.renderAbilities(this.lineDestroyer);
};

Game.prototype.handleControls = function(event) {
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

Game.prototype.moveDown = function() {
    this.currentTime = 0;
    if(this.currentFigure.canMoveFigureDown(this.board)){
        this.currentFigure.moveFigureDown(this.board);
    }
    else {
        this.board.removeRows(this.updateScore.bind(this));
        if(this.board.playingAnimation == false) {
            this.initializeFigure();
        }
    }
};

Game.prototype.moveLeft = function() {
    if(this.currentFigure.canMoveFigureLeft(this.board)){
        this.currentFigure.moveFigureLeft(this.board);
    }
};

Game.prototype.moveRight = function() {
    if(this.currentFigure.canMoveFigureRight(this.board)){
        this.currentFigure.moveFigureRight(this.board);
    }
};

Game.prototype.rotate = function() {
    this.currentFigure.rotate(this.board);
};

Game.prototype.initializeFigure = function() {
    let endGame = {shouldEndGame : false};
    this.currentFigure = this.figureFactory.initializeFigure(this.board, endGame);

    if(endGame.shouldEndGame) {
        this.endGame();
    }
};

Game.prototype.exitGame = function () {
    this.engine.exitNormalGame();
};

Game.prototype.endGame = function () {
    this.board.initializeBoard();
    this.initializeFigure();
    this.score = 0;
    this.engine.exitNormalGame();
};

Game.prototype.canMove = function() {
    return this.board.playingAnimation == false &&
        this.lineDestroyer.abilityPlayingAnimation == false &&
        this.engine.onMenu == false &&
        this.playing;
};

Game.prototype.checkButtons = function (event) {
    this.renderer.checkButtons(event);
};

Game.prototype.updateScore = function(blocks) {
    let scoreFactor = Math.floor(blocks / 10);
    this.score += blocks * scoreFactor;
    if(this.highscore < this.score){
        this.highscore = this.score;
        this.saveData();
    }
};

Game.prototype.setGameData = function (data) {
    if(data){
        this.highscore = Number(data);
    }
};

Game.prototype.getGameData = function () {
    return this.highscore;
};