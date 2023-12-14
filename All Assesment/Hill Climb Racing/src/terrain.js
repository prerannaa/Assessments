class Terrain {
    constructor() {
        this.x = 0;
        this.vx = 3;
        this.terrainHeight = canvas.height - 90;
        this.distanceCovered = 0;
        this.lastXPosition = this.x;
        this.sineAmplitude = 70; // Amplitude of the sine wave
        this.sineFrequency = 0.01; // Frequency of the sine wave
        this.segmentWidth = 10; // Width of each line segment
        this.lineSegments = this.generateLineSegments();
    }

    generateLineSegments() {
        const lineSegments = [];
        for (let i = this.x; i < this.x + 1000; i += this.segmentWidth) {
            const y = this.terrainHeight + Math.sin((i + this.distanceCovered) * this.sineFrequency) * this.sineAmplitude;
            lineSegments.push({ x1: i, y1: y, x2: i + this.segmentWidth, y2: y });
        }
        return lineSegments;
    }

    draw() {
        ctx.fillStyle = "#7cfc00";
        for (const segment of this.lineSegments) {
            ctx.fillRect(segment.x1, segment.y1, this.segmentWidth, canvas.height - segment.y1);
        }
    }

    update() {
        if (car.position.x > this.lastXPosition) {
            this.distanceCovered -= this.x - this.lastXPosition;
            this.lastXPosition = this.x;
        }
        this.drawDistance();
    }

    drawDistance() {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Distance: " + Math.round(this.distanceCovered), canvas.width - 120, 30);
    }

    getLineSegments() {
        return this.lineSegments;
    }
}
