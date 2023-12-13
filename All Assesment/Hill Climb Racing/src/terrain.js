class Terrain {
    constructor() {
        this.x = 0;
        this.vx = 3;
        this.terrainHeight = canvas.height - 50; // Adjust the height of the straight line
        this.distanceCovered = 0;
        this.lastXPosition = this.x;
    }

    draw() {
        ctx.fillStyle = "#7cfc00"; // Set color for the terrain
        ctx.fillRect(this.x, this.terrainHeight, 1000, canvas.height - this.terrainHeight);
    }

    checkCollision(car) {
        const carBottomY = car.position.y + car.carHeight + car.wheelHeight;
    
        // Check if the car is above the terrain and falling
        if (carBottomY > this.terrainHeight) {
            // Collision with terrain
            car.position.y = this.terrainHeight - car.carHeight;
            car.vy = 0;
            // Adjust car position based on terrain slope (for a straight line, no adjustment needed)
            car.position.x += car.vx;
            car.rotation += car.vx * car.rotationSpeed;
        }
        else {
            // Car is not colliding with terrain, apply gravity and let it fall
            car.vy += GRAVITY;
            car.position.y += car.vy;
            
            // Check if the car has fallen off the canvas
            if (car.position.y + car.carHeight > canvas.height) {
                car.position.x = initialX;
                car.position.y = initialY;
                car.vy = 0;
            }
        }
    }
    

    update(){
         if (car.position.x > this.lastXPosition) {
            this.distanceCovered -= this.x - this.lastXPosition;
            this.lastXPosition = this.x;
        }
        this.drawDistance();
    }

    drawDistance(){
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Distance: " + Math.round(this.distanceCovered), canvas.width - 120, 30);
    }}
