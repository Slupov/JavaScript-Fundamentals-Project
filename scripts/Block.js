let Block = function(image) {
    this.image = new Image();
    this.image.src = image;
    this.neighbours = [];
};

Block.prototype.removeNeighbours = function() {
    for(let i = 0; i < this.neighbours.length; i++) {
        this.neighbours[i].neighbours.splice(this.neighbours[i].neighbours.indexOf(this), 1);
    }
};