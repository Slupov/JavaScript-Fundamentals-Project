$(document).ready(function () {
    let gameRenderer = new GameRenderer();
    let board = new Board();
    let challengeBoard = new ChallengeBoard();
    let figureFactory = new FigureFactory();
    let menuRenderer = new MenuRenderer();
    let normalGame = new Game(gameRenderer, board, figureFactory);
    let challengeGame = new ChallengeGame(gameRenderer, challengeBoard, figureFactory);
    let engine = new Engine(normalGame, challengeGame, menuRenderer);
    engine.main();
});

let Engine = function(normalGame, challengeGame, menuRenderer) {
    this.onMenu = true;
    this.challengeGame = challengeGame;
    this.normalGame = normalGame;
    this.normalGame.engine = this;
    this.challengeGame.engine = this;
    this.normalGame.saveData = this.saveData.bind(this);
    this.challengeGame.saveData = this.saveData.bind(this);
    this.normalGame.playingAudio = this.isAudioPlaying.bind(this);
    this.challengeGame.playingAudio = this.isAudioPlaying.bind(this);
    this.normalGame.setPlayingAudio = this.setIsAudioPlaying.bind(this);
    this.challengeGame.setPlayingAudio = this.setIsAudioPlaying.bind(this);
    this.readData();
    this.menuRenderer = menuRenderer;
    this.playingAudio = false;

    window.addEventListener('keydown', this.handleControls.bind(this));
    window.addEventListener('click', this.checkButtons.bind(this));
};

Engine.prototype.main = function(time = 0) {
    this.normalGame.update(time);
    this.challengeGame.update(time);
    if(this.onMenu == false){
        if(this.normalGame.playing) {
            this.normalGame.render();
        }
        else if(this.challengeGame.playing) {
            this.challengeGame.render();
        }
    }
    else {
        this.menuRenderer.renderMenu(this.startNormalGame.bind(this), this.startChallengeGame.bind(this));
    }

    requestAnimationFrame( this.main.bind(this) );
};

Engine.prototype.handleControls = function(event) {
    if(this.normalGame.playing){
        this.normalGame.handleControls(event);
    }
    else if(this.challengeGame.playing){
        this.challengeGame.handleControls(event);
    }
};

Engine.prototype.checkButtons = function (event) {
    if(this.onMenu){
        this.menuRenderer.checkButtons(event);
    }
    else if(this.normalGame.playing){
        this.normalGame.checkButtons(event);
    }
    else if(this.challengeGame.playing){
        this.challengeGame.checkButtons(event);
    }
};

Engine.prototype.startNormalGame = function() {
    this.onMenu = false;
    this.normalGame.playing = true;
    if(this.playingAudio) {
        this.normalGame.playAudio();
    }
};

Engine.prototype.exitNormalGame = function() {
    this.onMenu = true;
    this.normalGame.playing = false;
};

Engine.prototype.startChallengeGame = function() {
    this.onMenu = false;
    this.challengeGame.playing = true;
    if(this.playingAudio) {
        this.challengeGame.playAudio();
    }
};

Engine.prototype.exitChallengeGame = function() {
    this.onMenu = true;
    this.challengeGame.playing = true;
};

Engine.prototype.readData = function () {
    if(document.cookie){
        let data = document.cookie.split(COOKIE_DATA_SPLITTER);
        this.normalGame.setGameData(data[0]);
        this.challengeGame.setGameData(data[1]);
    }
};

Engine.prototype.saveData = function () {
    document.cookie = this.normalGame.getGameData() + COOKIE_DATA_SPLITTER + this.challengeGame.getGameData();
};

Engine.prototype.isAudioPlaying = function (){
    return this.playingAudio;
};

Engine.prototype.setIsAudioPlaying = function (playingAudio){
    this.playingAudio = playingAudio;
};