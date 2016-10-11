function ChallengeBoard() {
    this.playingAnimation = false;
    this.playingMoveUpAnimation = false;
    this.score = null;
    this.initializeBoard();
}

ChallengeBoard.prototype = Object.create(Board.prototype);

ChallengeBoard.prototype.constructor = ChallengeBoard;

ChallengeBoard.prototype.initializeBoard = function () {
    this.matrix = [];
    for(let row = 0; row < GAME_HEIGHT_BLOCKS; row++) {
        this.matrix[row] = [];
        for(let col = 0; col < GAME_WIDTH_BLOCKS; col++) {
            this.matrix[row][col] = EMPTY_CELL;
        }
    }

    for(let i = this.matrix.length - 1; i > this.matrix.length - 1 - this.challengeRowsNumber(); i--) {
        this.generateChallengeRow(i);
    }
};

ChallengeBoard.prototype.generateChallengeRow = function (row) {
    let numberOfStationaryBlocks = 1;
    if(this.score){
        let currentScore = this.score();
        while(currentScore > 100 && numberOfStationaryBlocks < MAX_NUMBER_OF_CHALLENGE_BLOCKS_PER_ROW){
            numberOfStationaryBlocks++;
            currentScore /= 10;
        }
    }

    let generatedStationaryBlocks = 0;
    while(generatedStationaryBlocks < numberOfStationaryBlocks) {
        let randomIndex = Math.floor(Math.random() * this.matrix[row].length);
        if(this.matrix[row][randomIndex] == EMPTY_CELL){
            this.matrix[row][randomIndex] = new Block(STATIONARY_BLOCK_LOCATION);
            this.matrix[row][randomIndex].stationary = true;
            generatedStationaryBlocks++;
        }
    }
};

ChallengeBoard.prototype.moveEverythingDown = function() {
    let movedAtLeast1Element = false;

    for(let row = this.matrix.length - 1; row > 0; row--) {
        for(let col = 0; col < this.matrix[row].length; col++) {
            if(this.matrix[row][col] == EMPTY_CELL && this.matrix[row - 1][col] != EMPTY_CELL &&
                this.canMoveBlockDown(this.matrix[row - 1][col])) {
                this.elementsChecked = [];
                this.moveBlockDown(this.matrix[row - 1][col], row, col);
                movedAtLeast1Element = true;
            }
        }
    }

    if(movedAtLeast1Element == false) {
        this.playingAnimation = false;

        let numberOfChallengeRowsLeft = this.challengeRows();

        if(numberOfChallengeRowsLeft < this.challengeRowsNumber()){
            this.playingMoveUpAnimation = true;
        }
    }
};

ChallengeBoard.prototype.moveEverythingUp = function (){
    for(let row = 1; row < this.matrix.length; row++) {
        for(let col = 0; col < this.matrix[row].length; col++) {
            if(this.matrix[row][col] != EMPTY_CELL){
                this.moveBlockUp(row, col);
            }
        }
    }

    this.generateChallengeRow(this.matrix.length - 1);
    let numberOfChallengeRowsLeft = this.challengeRows();

    if(numberOfChallengeRowsLeft >= this.challengeRowsNumber()){
        this.playingMoveUpAnimation = false;
    }

};

ChallengeBoard.prototype.moveBlockUp = function(row, col){
    this.matrix[row][col].yCoordinate--;
    this.matrix[row - 1][col] = this.matrix[row][col];
    this.matrix[row][col] = EMPTY_CELL;
};

ChallengeBoard.prototype.challengeRows = function (){
    let numberOfChallengeRowsLeft = 0;
    for(let row = this.matrix.length - 1; row > this.matrix.length - 1 - this.challengeRowsNumber(); row--) {
        for(let col = 0; col < this.matrix[row].length; col++){
            if(this.matrix[row][col] != EMPTY_CELL && this.matrix[row][col].stationary){
                numberOfChallengeRowsLeft++;
                break;
            }
        }
    }

    return numberOfChallengeRowsLeft;
};

ChallengeBoard.prototype.challengeRowsNumber = function (){
    return CHALLENGE_ROWS;
};