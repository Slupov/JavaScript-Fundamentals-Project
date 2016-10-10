let Renderer = function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.buttons = [];
}

Renderer.prototype.renderGame = function(engine) {
    this.renderBackground();
    this.renderBoard(engine.board);
    this.renderSideMenu(engine.exitGame.bind(engine));
}

function clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
Renderer.prototype.renderBackground = function() {
    clearCanvas.call(this);

    this.ctx.fillStyle = GAME_BACKGROUND_COLOUR;
    this.ctx.fillRect(GAME_STARTING_X - BLOCK_BORDER_WIDTH, GAME_STARTING_Y, GAME_WIDTH + 2 * BLOCK_BORDER_WIDTH, GAME_HEIGHT);
    //this.renderGrid();
};

Renderer.prototype.renderGrid = function () {
    this.ctx.strokeStyle = GAME_GRID_COLOUR;
    this.ctx.lineWidth="1";
    this.ctx.beginPath();
    for (let row = 0; row <= GAME_HEIGHT_BLOCKS; row++) {
        this.ctx.moveTo(GAME_STARTING_X , GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + GAME_WIDTH, GAME_STARTING_Y  + row * GAME_BLOCK_SIZE);
    }
    for (let col = 0; col <= GAME_WIDTH_BLOCKS; col++) {
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + GAME_HEIGHT);
    }

    this.ctx.stroke();
};

Renderer.prototype.renderBoard = function (board) {
    for(let row = 0; row < board.matrix.length; row++) {
        for(let col = 0; col < board.matrix[row].length; col++) {
            if(board.matrix[row][col] != EMPTY_CELL) {
                this.ctx.drawImage(
                    board.matrix[row][col].image,
                    GAME_STARTING_X + col * GAME_BLOCK_SIZE,
                    GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
                this.renderBlockBorders(board.matrix[row][col], row, col);
            }
        }
    }
};

Renderer.prototype.renderBlockBorders = function (block, row, col){
    let hasNeighbourOnTheRight = false;
    let hasNeighbourOnTheLeft = false;
    let hasNeighbourBelow = false;
    let hasNeighbourAbove = false;
    for(let i = 0; i < block.neighbours.length; i++) {
        if(block.neighbours[i].xCoordinate > block.xCoordinate) {
            hasNeighbourOnTheRight = true;
        }
        else if(block.neighbours[i].xCoordinate < block.xCoordinate) {
            hasNeighbourOnTheLeft = true;
        }
        else if(block.neighbours[i].yCoordinate > block.yCoordinate){
            hasNeighbourBelow = true;
        }
        else if(block.neighbours[i].yCoordinate < block.yCoordinate){
            hasNeighbourAbove = true;
        }
    }

    this.ctx.strokeStyle = BLOCK_BORDER_COLOUR;
    this.ctx.lineWidth = BLOCK_BORDER_WIDTH;
    this.ctx.beginPath();
    if(hasNeighbourOnTheLeft == false){
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
    }
    if(hasNeighbourAbove == false){
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
    }
    if(hasNeighbourOnTheRight == false){
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
    }
    if(hasNeighbourBelow == false){
        this.ctx.moveTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
        this.ctx.lineTo(GAME_STARTING_X + col * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE, GAME_STARTING_Y + row * GAME_BLOCK_SIZE + GAME_BLOCK_SIZE);
    }
    this.ctx.stroke();
};

Renderer.prototype.renderLineDestroyer = function (board, lineDestroyer){
    let row = Math.floor((lineDestroyer.abilityAnimationTime / 1000) / LINE_DESTROYER_ANIMATION_TIME_FOR_ROW);
    if(row < board.matrix.length){
        board.removeRow(row);
        for(let col = 0; col < board.matrix[row].length; col++) {
            this.ctx.drawImage(
                lineDestroyer.image,
                GAME_STARTING_X + col * GAME_BLOCK_SIZE,
                GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
        }
    }
};

Renderer.prototype.renderAbilities = function(lineDestroyer) {
    this.renderAbility(lineDestroyer, ABILITY_BACKGROUND_COLOUR, FIRST_ABILITY_X_POSITION, FIRST_ABILITY_Y_POSITION);
};

Renderer.prototype.renderAbility = function(ability, colour, startingX, startingY){
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(startingX, startingY, ABILITY_WIDTH, ABILITY_HEIGHT);

    this.ctx.font = ABILITY_TEXT_FONT;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = ABILITY_TEXT_COLOUR;
    this.ctx.fillText("1", ABILITY_TEXT_X_POSITION, ABILITY_TEXT_Y_POSITION);

    this.ctx.fillStyle = ABILITY_FOREGROUND_COLOUR;
    let coolDownFactor = 1 - (ability.cooldownTime - ability.cooldownLeft) / (ability.cooldownTime);
    this.ctx.fillRect(startingX, startingY, ABILITY_WIDTH, ABILITY_HEIGHT * coolDownFactor);
};

Renderer.prototype.renderMenu = function (startGame) {
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

Renderer.prototype.renderButton = function (text, font, xPosition, yPosition, imageSize, onClickEvent){
    let image = new Image();
    image.src = BUTTON_LOCATION;
    image.width *= imageSize;
    image.height *= imageSize;
    image.addEventListener('click', onClickEvent);
    this.ctx.drawImage(image, xPosition, yPosition, image.width, image.height);

    this.ctx.fillStyle = BUTTON_COLOUR;
    this.ctx.font = font;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text, xPosition + image.width / 2, yPosition + image.height / 2);

    let button = { image: image, onClick: onClickEvent, positionX: xPosition, positionY: yPosition};
    return button;
};

Renderer.prototype.renderSideMenu = function(exitGame) {
    this.buttons = [];
    this.buttons.push(this.renderButton(
        "MENU",
        GAME_BUTTON_TEXT_FONT,
        MENU_BUTTON_STARTING_X_POSITION,
        MENU_BUTTON_STARTING_Y_POSITION,
        MENU_BUTTON_SIZE,
        exitGame));
};