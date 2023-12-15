class Terrain {
    constructor(x,y,width,height) {  
        this.x = x;
        this.y = y;
        this.vx = 3;
        this.terrainHeight = canvas.height-50;
        this.distanceCovered = 0;
        this.lastXPosition = this.x;
        this.sineAmplitude = 30; // Amplitude of the sine wave
        this.sineFrequency = 0.01; // Frequency of the sine wave
        this.segmentWidth = 3; // Width of each line segment
        this.lineSegments = this.generateLineSegments();
        this.terrainWidth = width;
    }

    generateLineSegments() {
        let lineSegments = [];
        for (let i = this.x; i < this.x + 1000; i += this.segmentWidth) {
            let y = this.terrainHeight + Math.sin((i) * this.sineFrequency) * this.sineAmplitude;
            lineSegments.push({ x1: i, y1: y, x2: i + this.segmentWidth, y2: y });
        }
        return lineSegments;
    }

    draw() {
        for (let segment of this.lineSegments) {
            // ctx.fillStyle = "#7cfc00";
            ctx.strokeRect(segment.x1, segment.y1, this.segmentWidth, canvas.height - segment.y1);
        }
    }

    getTerrainWidth() {
        return this.segmentWidth * this.lineSegments.length;
    }

    calculateTerrainHeightAtX() {
        let interpolatedYValues = [];

        for (let segment of this.lineSegments) {
            // Check if the x position is within the current segment
            if (60 >= segment.x1 && 60 <= segment.x2) {
                // Calculate the interpolation factor (t) within the segment
                let t = (60 - segment.x1) / (segment.x2 - segment.x1);
                // Interpolate the y value at the specified x position
                let interpolatedY = segment.y1 + t * (segment.y2 - segment.y1);
                interpolatedYValues.push(interpolatedY);
            }
        }
        // If the x position is outside the terrain
        return this.terrainHeight;
    }
    
    update() {
        if (car.position.x > this.lastXPosition) {
            this.distanceCovered += this.x - this.lastXPosition;
            this.lastXPosition = this.x;
        }
        this.drawDistance();
        this.calculateTerrainHeightAtX();
    }

    drawDistance() {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Distance: " + Math.round(this.distanceCovered), canvas.width - 120, 30);
    }

}
