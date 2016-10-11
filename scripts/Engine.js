$(document).ready(function () {
    let gameRenderer = new GameRenderer();
    let board = new Board();
    let figureFactory = new FigureFactory();
    let menuRenderer = new MenuRenderer();
    let normalGame = new Game(gameRenderer, board, figureFactory);
    let engine = new Engine(normalGame, menuRenderer);
    engine.main();
});

let Engine = function(normalGame, menuRenderer) {
    this.onMenu = true;
    this.normalGame = normalGame;
    this.normalGame.engine = this;
    this.menuRenderer = menuRenderer;

    window.addEventListener('keydown', this.handleControls.bind(this));
    window.addEventListener('click', this.checkButtons.bind(this));
};

Engine.prototype.main = function(time = 0) {
    this.normalGame.update(time);
    if(this.onMenu == false){
        this.normalGame.render();
    }
    else {
        this.menuRenderer.renderMenu(this.startGame.bind(this));
    }

    requestAnimationFrame( this.main.bind(this) );
};

Engine.prototype.handleControls = function(event) {
    this.normalGame.handleControls(event);
};

Engine.prototype.checkButtons = function (event) {
    this.normalGame.checkButtons(event);
    this.menuRenderer.checkButtons(event);
};

Engine.prototype.startGame = function() {
    this.onMenu = false;
};

Engine.prototype.exitGame = function() {
    this.onMenu = true;
};