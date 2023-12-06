
const imageSrc = 'assets/car-driver.png';

class Character {
    constructor(position, width,height){
        this.position = position;
        this.width = width;
        this.height = height;
        this.vx = 0; //velocity of character along x axis
        this.vy = 1; //velocity of character along y axis
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.draw();
        this.position.y += this.vy;
        if (this.position.y + this.height + this.vy < canvas.height)
        {
            this.vy += GRAVITY;
        }
        else
        {
            this.vy = 0;
        }
        this.position.x +=this.vx;
    }
}