class Terrain {
    constructor() {
        this.terrainHeight = canvas.height - 100; // Adjust the height of the straight line
    }

    draw() {
        ctx.fillStyle = "#7cfc00"; // Set color for the terrain
        ctx.fillRect(0, this.terrainHeight, canvas.width, canvas.height - this.terrainHeight);
    }

    checkCollision(car) {
        const carBottomY = car.position.y + car.carHeight;

        if (carBottomY > this.terrainHeight) {
            // Collision with terrain
            car.position.y = this.terrainHeight - car.carHeight;
            car.vy = 0;
            car.rotation += car.vx * car.rotationSpeed;

            // Adjust car position based on terrain slope (for a straight line, no adjustment needed)
            car.position.x += car.vx;
        }
    }
}
