const image = new Image();
image.src = 'assets/doodler-right.png';

class Character{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
        this.isGrounded = true;
        this.justJumped = false;
        this.currentPlatform = -1;
    }

    draw(ctx){
        ctx.drawImage(image,this.x, this.y, this.width, this.height);
    }
}