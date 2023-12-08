const wheelImageSrc = 'assets/Tire.png';

class Wheel {
    constructor(position, width,height, terrain){
        // this.position = position;
        this.position = position;
        this.width = width;
        this.height = height;
        this.vx = 0; //velocity of character along x axis
        this.vy = 1; //velocity of character along y axis
        this.tireImage = new Image();
        this.tireImage.src = wheelImageSrc;
        this.rotation = 0; // initial rotation angle
        this.rotationSpeed = 0.2; // adjust the rotation speed as needed
    }
    draw(){
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.tireImage, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    checkCollisionWithTerrain() {
        const wheelsBottom = this.position.y + this.height; // Bottom of the car
        const columnWidth = terrain.columnWidth;
    
        // Check collision for the columns near the character
        const columnStart = Math.floor(this.position.x / columnWidth);
        const columnEnd = Math.min(Math.ceil((this.position.x + this.width) / columnWidth), terrain.heights.length);
    
        for (let i = columnStart; i < columnEnd; i++) {
            const terrainHeight = terrain.heights[i];
            if (wheelsBottom > terrainHeight) {
                // Collision detected, adjust character's position and velocity
                this.position.y = terrainHeight - this.height;
                this.vy = 0;
            }
        }
    }
    update(){
        this.draw();
        this.checkCollisionWithTerrain();
        this.position.y += this.vy;
        // if (this.position.y + this.height + this.vy < canvas.height)
        // {
        //     this.vy += terrain.heights;
        // }
        // else
        // {
        //     this.vy = 0;
        // }
        this.position.x +=this.vx;
        this.rotation += this.vx *  this.rotationSpeed; 
    }
}