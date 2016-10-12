function GameRenderer() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.buttons = [];
    this.backgroundImage = document.getElementById('background');
    this.nextFigureImage = document.getElementById('lineImg');
}

GameRenderer.prototype = Object.create(Renderer.prototype);

GameRenderer.prototype.constructor = GameRenderer;

GameRenderer.prototype.renderGame = function (engine, game) {
    this.renderBackground();
    this.renderNextFigure();
    this.renderBoard(game.board);
    this.renderSideMenu(game, game.exitGame.bind(game));
};

function clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
GameRenderer.prototype.renderBackground = function () {
    clearCanvas.call(this);
    this.ctx.drawImage(this.backgroundImage, 0, 0, 800, 600);
    // this.ctx.fillStyle = GAME_BACKGROUND_COLOUR;
    // this.ctx.fillRect(GAME_STARTING_X - BLOCK_BORDER_WIDTH, GAME_STARTING_Y, GAME_WIDTH + 2 * BLOCK_BORDER_WIDTH, GAME_HEIGHT);
    this.renderGrid();
};

GameRenderer.prototype.renderGrid = function () {
    this.ctx.strokeStyle = GAME_GRID_COLOUR;
    this.ctx.lineWidth = "1";
    this.ctx.beginPath();
    for (let row = 0; row <= GAME_HEIGHT_BLOCKS; row++) {
        this.ctx.moveTo(GAME_STARTING_X, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + GAME_WIDTH, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
    }
    for (let col = 0; col <= GAME_WIDTH_BLOCKS; col++) {
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + GAME_HEIGHT);
    }

    this.ctx.stroke();
};

GameRenderer.prototype.renderBoard = function (board) {
    for (let row = 0; row < board.matrix.length; row++) {
        for (let col = 0; col < board.matrix[row].length; col++) {
            if (board.matrix[row][col] != EMPTY_CELL) {
                this.ctx.drawImage(
                    board.matrix[row][col].image,
                    GAME_STARTING_X + col * GAME_BLOCK_SIZE,
                    GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
                this.renderBlockBorders(board.matrix[row][col], row, col);
            }
        }
    }
};

GameRenderer.prototype.renderBlockBorders = function (block, row, col) {
    let hasNeighbourOnTheRight = false;
    let hasNeighbourOnTheLeft = false;
    let hasNeighbourBelow = false;
    let hasNeighbourAbove = false;
    for (let i = 0; i < block.neighbours.length; i++) {
        if (block.neighbours[i].xCoordinate > block.xCoordinate) {
            hasNeighbourOnTheRight = true;
        }
        else if (block.neighbours[i].xCoordinate < block.xCoordinate) {
            hasNeighbourOnTheLeft = true;
        }
        else if (block.neighbours[i].yCoordinate > block.yCoordinate) {
            hasNeighbourBelow = true;
        }
        else if (block.neighbours[i].yCoordinate < block.yCoordinate) {
            hasNeighbourAbove = true;
        }
    }

    this.ctx.strokeStyle = BLOCK_BORDER_COLOUR;
    this.ctx.lineWidth = BLOCK_BORDER_WIDTH;
    this.ctx.beginPath();
    if (hasNeighbourOnTheLeft == false) {
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
    }
    if (hasNeighbourAbove == false) {
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
    }
    if (hasNeighbourOnTheRight == false) {
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
    }
    if (hasNeighbourBelow == false) {
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
    }
    this.ctx.stroke();
};

GameRenderer.prototype.renderLineDestroyer = function (game) {
    let row = Math.floor((game.lineDestroyer.abilityAnimationTime / 1000) / LINE_DESTROYER_ANIMATION_TIME_FOR_ROW);
    if (row < game.board.matrix.length) {
        game.board.removeRow(row, game.updateScore.bind(game));
        for (let col = 0; col < game.board.matrix[row].length; col++) {
            this.ctx.drawImage(
                game.lineDestroyer.image,
                GAME_STARTING_X + col * GAME_BLOCK_SIZE,
                GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        }
    }
};

GameRenderer.prototype.renderAbilities = function (lineDestroyer) {
    this.renderAbility(LINE_DESTROYER_ABILITY_TEXT, lineDestroyer, ABILITY_BACKGROUND_COLOUR, FIRST_ABILITY_X_POSITION, FIRST_ABILITY_Y_POSITION);
};

GameRenderer.prototype.renderAbility = function (abilityText, ability, colour, startingX, startingY) {
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(startingX, startingY, ABILITY_WIDTH, ABILITY_HEIGHT);

    this.ctx.font = ABILITY_TEXT_FONT;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = ABILITY_TEXT_COLOUR;
    this.ctx.fillText(abilityText, ABILITY_TEXT_X_POSITION, ABILITY_TEXT_Y_POSITION);

    this.ctx.fillStyle = ABILITY_FOREGROUND_COLOUR;
    let coolDownFactor = 1 - (ability.cooldownTime - ability.cooldownLeft) / (ability.cooldownTime);
    this.ctx.fillRect(startingX, startingY, ABILITY_WIDTH, ABILITY_HEIGHT * coolDownFactor);
};

GameRenderer.prototype.renderSideMenu = function (game, exitGame) {
    this.buttons = [];
    this.buttons.push(this.renderButton(
        "MENU",
        GAME_BUTTON_TEXT_FONT,
        MENU_BUTTON_STARTING_X_POSITION,
        MENU_BUTTON_STARTING_Y_POSITION,
        MENU_BUTTON_SIZE,
        exitGame));

    this.renderScore(
        SCORE_LABEL_TEXT,
        game.score.toString(),
        SCORE_LABEL_X_POSITION,
        SCORE_LABEL_Y_POSITION,
        SCORE_X_POSITION,
        SCORE_Y_POSITION);
    this.renderScore(
        HIGH_SCORE_LABEL_TEXT,
        game.highscore.toString(),
        HIGH_SCORE_LABEL_X_POSITION,
        HIGH_SCORE_LABEL_Y_POSITION,
        HIGH_SCORE_X_POSITION,
        HIGH_SCORE_Y_POSITION);
};

GameRenderer.prototype.renderScore = function (text, score, xLabelPosition, yLabelPosition, xPosition, yPosition) {
    this.ctx.font = SCORE_LABEL_FONT;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = SCORE_LABEL_COLOUR;
    this.ctx.fillText(text, xLabelPosition, yLabelPosition);

    this.ctx.font = SCORE_FONT;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = SCORE_COLOUR;
    this.ctx.fillText(score, xPosition, yPosition);
};

GameRenderer.prototype.renderNextFigure = function () {

    this.ctx.fillStyle = ABILITY_FOREGROUND_COLOUR;
    this.ctx.fillRect(NEXT_FIGURE_STARTING_X_POSITION, NEXT_FIGURE_STARTING_Y_POSITION, NEXT_FIGURE_WIDTH, NEXT_FIGURE_HEIGHT);

    this.ctx.drawImage(this.nextFigureImage ,NEXT_FIGURE_STARTING_X_POSITION, NEXT_FIGURE_STARTING_Y_POSITION, NEXT_FIGURE_WIDTH, NEXT_FIGURE_HEIGHT);
};