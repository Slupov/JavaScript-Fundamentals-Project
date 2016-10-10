function LineDestroyer() {
    this.abilityAnimationTime = 0;
    this.timeForAbilityAnimation = 0;
    this.abilityPlayingAnimation = false;
    this.cooldownLeft = 0;
    this.cooldownTime = LINE_DESTROYER_COOLDOWN;
    this.image = new Image();
    this.image.src = GRAY_BLOCK_LOCATION;
};

LineDestroyer.prototype = Object.create(Ability.prototype);

LineDestroyer.prototype.constructor = LineDestroyer;

LineDestroyer.prototype.useAbility = function (currentFigure, board){
    if(this.cooldownLeft <=0) {
        Ability.prototype.useAbility.call(this, currentFigure, board);
        for(let row = 0; row < board.matrix.length; row++) {
            if(this.hasBlock(board, row) || row == board.matrix.length - 1){
                this.timeForAbilityAnimation = (row + 2) * LINE_DESTROYER_ANIMATION_TIME_FOR_ROW;
                this.abilityPlayingAnimation = true;
                break;
            }
        }
    }
};

LineDestroyer.prototype.hasBlock = function(board, row) {
    for(let col = 0; col < board.matrix[row].length; col++) {
        if(board.matrix[row][col] != EMPTY_CELL) {
            return true;
        }
    }
};