// terrain.js
class Terrain {
    constructor() {
        this.columnWidth = 30; // Width of each terrain column
        this.frequency = 0.1; // Adjust the frequency of the curves
        this.amplitude = 60; // Adjust the amplitude of the curves
        this.offset = 200; // Adjust the starting position of the curves
        this.heights = this.generateHeights();
    }

    generateHeights() {
        const heights = [];
        const numColumns = Math.ceil(canvas.width / this.columnWidth);

        for (let i = 0; i < numColumns; i++) {
            // Generate curved height for each column using a sine function
            const x = i * this.frequency + this.offset;
            const height = canvas.height - this.amplitude * Math.sin(x);
            heights.push(height);
        }

        return heights;
    }
    
    draw() {
        ctx.fillStyle = "#7cfc00"; // Set color for the terrain
        for (let i = 0; i < this.heights.length; i++) {
            ctx.fillRect(i * this.columnWidth, this.heights[i], this.columnWidth, canvas.height - this.heights[i]);
        }
    }
    getHeight(x) {
        // Interpolate the height based on the x position
        const column = Math.floor(x / this.columnWidth);
        const leftHeight = this.heights[column];
        const rightHeight = this.heights[column + 1];
        const t = (x % this.columnWidth) / this.columnWidth;
        return leftHeight + t * (rightHeight - leftHeight);
    }
    
}
