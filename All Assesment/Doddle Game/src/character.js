const image = new Image();
image.src = 'assets/doodler-right.png';

class Character{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#49c';
        this.vy = 0 ; //velocity along y-axis
        this.vx = 0 ; //velocity along x-axis
        this.isGrounded = false;
    }

    draw(ctx){
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(image,this.x, this.y, this.width, this.height);
    }
}