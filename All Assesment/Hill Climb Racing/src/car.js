const carImageSrc = 'assets/Car.png';
const wheelImageSrc = 'assets/Tire.png';

class Car {
    constructor(position, carWidth, carHeight, wheelWidth, wheelHeight, terrain) {
        this.position = position;
        this.carWidth = carWidth;
        this.carHeight = carHeight;
        this.wheelWidth = wheelWidth;
        this.wheelHeight = wheelHeight;
        this.vx = 0; // Velocity along x axis
        this.vy = 1; // Velocity along y axis
        this.carImage = new Image();
        this.carImage.src = carImageSrc;
        this.wheelImage = new Image();
        this.wheelImage.src = wheelImageSrc;
        this.rotation = 0; // Initial rotation angle for wheels
        this.rotationSpeed = 0.2; // Rotation speed for wheels
        this.terrain = terrain;
    }

    draw() {
        // Draw car
        ctx.drawImage(this.carImage, this.position.x, this.position.y, this.carWidth, this.carHeight);

        // Draw wheels
        const wheelY = this.position.y + this.carHeight - (this.wheelHeight/1.5);
        const leftWheelX = this.position.x + this.carWidth * 0.07; // Adjust based on your desired position
        const rightWheelX = this.position.x + this.carWidth * 0.94 - this.wheelWidth; // Adjust based on your desired position
        this.drawWheel(leftWheelX, wheelY);
        this.drawWheel(rightWheelX, wheelY);
    }

    drawWheel(x, y) {
        ctx.save();
        ctx.translate(x + this.wheelWidth / 2, y + this.wheelHeight / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.wheelImage, -this.wheelWidth / 2, -this.wheelHeight / 2, this.wheelWidth, this.wheelHeight);
        ctx.restore();
    }

    checkCollisionWithTerrain()
    {
        const carBottom = this.position.y + this.wheelHeight;
        const columnWidth = terrain.columnWidth;

        const columnStart = Math.floor(this.position.x / columnWidth);
        const columnEnd = Math.min(Math.ceil((this.position.x + this.wheelWidth) / columnWidth), terrain.heights.length);

        for (let i=columnStart; i < columnEnd; i++)
        {
            const terrainHeight = this.terrain.heights[i];
            if (carBottom > terrainHeight)
            {
                // this.position.y = terrainHeight - this.wheelHeight;
                this.vy = 0;
            }
            else{
                 
            }
        }
    }
    update() {
        this.draw();
        this.checkCollisionWithTerrain();
        this.position.y += this.vy;
        if (this.position.y + this.carHeight + this.wheelHeight/3 + this.vy < canvas.height)
        {
            this.vy += GRAVITY
        } 
        else
        {
            this.vy = 0;
            this.rotation += this.vx * this.rotationSpeed

        }
        this.position.x += this.vx

        if (this.position.x > canvas.width/5){
            const translationAmount = this.vx;
            ctx.translate(-translationAmount, 0);
        }

    }

    updateWheel(){
        this.drawWheel()
    }
}