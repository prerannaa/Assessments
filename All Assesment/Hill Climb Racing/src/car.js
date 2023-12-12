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
        this.distanceCovered = 0;
        this.lastXPosition = position.x;

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
        ctx.drawImage(this.wheelImage, -this.wheelWidth /2, -this.wheelHeight / 2, this.wheelWidth, this.wheelHeight);
        ctx.restore();
    }

    update() {
        ctx.save();
        this.terrain.checkCollision(this);
        this.position.y += this.vy;
        this.position.x += this.vx

        // if (this.position.x > this.lastXPosition) {
        //     this.distanceCovered += this.position.x - this.lastXPosition;
        //     this.lastXPosition = this.position.x;
        // }
        
        // this.draw();
        ctx.restore();
        //this.drawDistance();


    }
    updateWheel(){
        this.drawWheel()
    }
}