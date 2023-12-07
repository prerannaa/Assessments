const wheelImageSrc = 'assets/Tire.png';

class Wheel {
    constructor(position, width,height, terrain){
        // this.position = position;
        this.position = { x: position.x, y: terrain.position.x };
        this.width = width;
        this.height = height;
        this.vx = 0; //velocity of character along x axis
        this.vy = 1; //velocity of character along y axis
        this.tireImage = new Image();
        this.tireImage.src = wheelImageSrc;
        this.rotation = 0; // initial rotation angle
        this.rotationSpeed = 0.1; // adjust the rotation speed as needed
    }
    draw(){
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.tireImage, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
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
        this.rotation += this.vx *  this.rotationSpeed; 
    }
}