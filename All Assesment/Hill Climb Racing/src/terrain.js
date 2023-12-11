// // terrain.js
// class Terrain {
//     constructor() {
//         this.columnWidth = 30; // Width of each terrain column
//         this.frequency = 0.1; // Adjust the frequency of the curves
//         this.amplitude = 60; // Adjust the amplitude of the curves
//         this.offset = 200; // Adjust the starting position of the curves
//         this.heights = this.generateHeights();
//     }

//     generateHeights() {
//         const heights = [];
//         const numColumns = Math.ceil(canvas.width / this.columnWidth);

//         for (let i = 0; i < numColumns; i++) {
//             // Generate curved height for each column using a sine function
//             const x = i * this.frequency + this.offset;
//             const height = canvas.height - this.amplitude * Math.sin(x);
//             heights.push(height);
//         }

//         return heights;
//     }
    
//     draw() {
//         ctx.fillStyle = "#7cfc00"; // Set color for the terrain
//         for (let i = 0; i < this.heights.length; i++) {
//             ctx.fillRect(i * this.columnWidth, this.heights[i], this.columnWidth, canvas.height - this.heights[i]);
//         }
//     }
    
// }

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
