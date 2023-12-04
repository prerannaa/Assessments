const platformImage = new Image();
platformImage.src = 'assets/platform.png';

class Platform {
    constructor(x, y, width, height, number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#176604';
        this.number = number; // Add the platform number
    }

    draw(ctx) {
        ctx.drawImage(platformImage,this.x, this.y, this.width, this.height);
    }
}
