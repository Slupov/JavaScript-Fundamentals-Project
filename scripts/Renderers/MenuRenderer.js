function MenuRenderer() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.buttons = [];
}

MenuRenderer.prototype = Object.create(Renderer.prototype);

MenuRenderer.prototype.constructor = MenuRenderer;

MenuRenderer.prototype.renderMenu = function (startGame) {
    this.ctx.fillStyle = MENU_BACKGROUND_COLOUR;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ctx.fillStyle = LOGO_COLOUR;
    this.ctx.font = LOGO_TEXT_FONT;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("TETRIS", LOGO_X_POSITION, LOGO_Y_POSITION);
    this.buttons = [];
    this.buttons.push(this.renderButton(
        "PLAY",
        MENU_BUTTON_TEXT_FONT,
        PLAY_BUTTON_STARTING_X_POSITION,
        PLAY_BUTTON_STARTING_Y_POSITION,
        PLAY_BUTTON_SIZE,
        startGame));
};