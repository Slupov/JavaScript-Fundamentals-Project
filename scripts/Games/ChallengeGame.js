function ChallengeGame(renderer, board, figureFactory){
    this.engine = null;
    this.renderer = renderer;
    this.board = board;
    this.board.score = this.getScore.bind(this);
    this.figureFactory = figureFactory;
    this.currentFigure = null;
    this.timeForMove = 1;
    this.currentTime = 0;
    this.lastFrameTime = 0;
    this.animationTime = 0;
    this.timeForAnimation = 0.5;
    this.moveEverythingAnimationTime = 0;
    this.moveEverythingTimeForAnimation = 0.5;
    this.lineDestroyer = new LineDestroyer();
    this.score = 0;
    this.highscore = 0;
    this.playing = false;
}

ChallengeGame.prototype = Object.create(Game.prototype);

ChallengeGame.prototype.constructor = ChallengeGame;

ChallengeGame.prototype.exitGame = function () {
    this.engine.exitNormalGame();
};

ChallengeGame.prototype.endGame = function () {
    this.board.initializeBoard();
    this.initializeFigure();
    this.score = 0;
    this.engine.exitChallengeGame();
};

ChallengeGame.prototype.update = function(time) {
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
        else if (this.board.playingMoveUpAnimation == true){
            this.moveEverythingUpAnimation(timeDifference);
        }
    }

    this.lastFrameTime = time;
};

ChallengeGame.prototype.moveEverythingUpAnimation = function (timeDifference){
    this.moveEverythingAnimationTime += timeDifference;
    if(this.moveEverythingAnimationTime / 1000 > this.moveEverythingTimeForAnimation) {
        this.animationTime = 0;
        this.board.moveEverythingUp();
    }
};

ChallengeGame.prototype.canMove = function() {
    return this.board.playingAnimation == false &&
            this.board.playingMoveUpAnimation == false &&
            this.lineDestroyer.abilityPlayingAnimation == false &&
            this.engine.onMenu == false &&
            this.playing;
};

ChallengeGame.prototype.getScore = function() {
    return this.score;
};