let Renderer = function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.buttons = [];
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

    let button = new Button(image, onClickEvent, xPosition, yPosition)
    return button;
};

Renderer.prototype.checkButtons = function (event) {
    for(let i = 0; i < this.buttons.length; i++) {
        if(this.onButton(event, this.buttons[i])){
            this.buttons[i].onClick();
            break;
        }
    }
};

Renderer.prototype.onButton = function (event, button){
    if(event.clientX == event.layerX || event.clientY == event.layerY){
        return false;
    }
    if(event.layerX >= button.positionX && event.layerX <= button.positionX + button.image.width &&
        event.layerY >= button.positionY && event.layerY <= button.positionY + button.image.height){
        return true;
    }
    return false;
};