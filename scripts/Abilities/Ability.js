let Ability = function() {
    this.abilityAnimationTime = 0;
    this.timeForAbilityAnimation = 0;
    this.abilityPlayingAnimation = false;
    this.cooldownLeft = 0;
};

Ability.prototype.useAbility = function (currentFigure, board){
    board.matrix[currentFigure.blocks[0].yCoordinate][currentFigure.blocks[0].xCoordinate] = 0;
    board.matrix[currentFigure.blocks[1].yCoordinate][currentFigure.blocks[1].xCoordinate] = 0;
    board.matrix[currentFigure.blocks[2].yCoordinate][currentFigure.blocks[2].xCoordinate] = 0;
    board.matrix[currentFigure.blocks[3].yCoordinate][currentFigure.blocks[3].xCoordinate] = 0;
    currentFigure = null;
};