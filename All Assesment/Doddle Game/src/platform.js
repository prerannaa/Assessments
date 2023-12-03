let platformNumber = 1;
class Platform{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#176604';
        this.number = Platform.platformNumber;
        Platform.platformNumber++;
        console.log(platformNumber);
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function resetPlatformNumber() {
    Platform.platformNumber = 1;
}

