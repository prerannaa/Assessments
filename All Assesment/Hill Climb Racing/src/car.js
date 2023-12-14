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

        // Calculate new X & Y positions of the car based on the terrain
        const terrainLineSegments = this.terrain.getLineSegments();
        const frontWheelX = this.position.x + this.carWidth;
        const rearWheelX = this.position.x;

        const frontWheelTerrainY = this.findTerrainY(frontWheelX, terrainLineSegments);
        const rearWheelTerrainY = this.findTerrainY(rearWheelX, terrainLineSegments);

        // Update the position of the car based on the terrain
        this.position.x += this.vx;
        this.position.y = Math.min(frontWheelTerrainY, rearWheelTerrainY) - this.carHeight;

        this.draw();
    }

    findTerrainY(x, lineSegments) {
        for (const segment of lineSegments) {
            if (x >= segment.x1 && x <= segment.x2) {
                const t = (x - segment.x1) / (segment.x2 - segment.x1);
                return segment.y1 + t * (segment.y2 - segment.y1);
            }
        }
        return canvas.height; // Default to the bottom of the canvas if not found
    }
    checkCollision() {

        const frontWheelX = this.position.x + this.carWidth;
        const frontWheelY = this.position.y + this.carHeight;
        
        const rearWheelX = this.position.x;
        const rearWheelY = this.position.y + this.carHeight;
    
        const terrainLineSegments = this.terrain.getLineSegments();
    
        if (this.circleToLineCollision(frontWheelX, frontWheelY, terrainLineSegments) ||
            this.circleToLineCollision(rearWheelX, rearWheelY, terrainLineSegments)) {
            // Collision detected
            // Handle collision logic here
        }
    }

    circleToLineCollision(x, y, lineSegments) {
        for (const segment of lineSegments) {
            const closestX = Math.max(segment.x1, Math.min(x, segment.x2));
            const closestY = Math.max(segment.y1, Math.min(y, segment.y2));
            const distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);

            if (distance <= this.wheelWidth / 2) {
                // Collision detected
            }
        }
        return false; // No collision
    }
    updateWheel(){
        this.drawWheel()
    }
}
