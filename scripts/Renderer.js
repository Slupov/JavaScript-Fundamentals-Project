let Renderer = function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
}

Renderer.prototype.render = function(board) {
    this.renderBackground();
    this.renderBoard(board);
}

Renderer.prototype.renderBackground = function() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(GAME_STARTING_X, GAME_STARTING_Y, GAME_WIDTH, GAME_HEIGHT);
    this.renderGrid();
};

Renderer.prototype.renderGrid = function () {
    this.ctx.strokeStyle = 'white';
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
            if(board.matrix[row][col] != 0) {
                this.ctx.drawImage(
                    board.matrix[row][col].image,
                    GAME_STARTING_X + col * GAME_BLOCK_SIZE,
                    GAME_STARTING_Y + row * GAME_BLOCK_SIZE);
            }
        }
    }
};