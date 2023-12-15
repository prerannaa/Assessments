const carImageSrc = 'assets/Car.png';
const wheelImageSrc = 'assets/Tire.png';

class Car {
    constructor(position, carWidth, carHeight, wheelWidth, wheelHeight, terrains) {
        this.carImage = new Image();
        this.carImage.src = carImageSrc;
        this.wheelImage = new Image();
        this.wheelImage.src = wheelImageSrc;
        this.position = position;
        this.carWidth = carWidth;
        this.carHeight = carHeight;
        this.wheelWidth = wheelWidth;
        this.wheelHeight = wheelHeight;
        this.wheelRadius = wheelWidth/2;
        this.vx = 0; // Velocity along x axis
        this.vy = 1; // Velocity along y axis
        this.rotation = 0; // Initial rotation angle for wheels
        this.rotationSpeed = 0.2; // Rotation speed for wheels
        this.terrain = terrains;
        this.distanceCovered = 0;
        this.lastXPosition = position.x;
    }


    getLeftWheelCenter() {
        let leftWheelY = this.position.y + this.carHeight - (this.wheelHeight*1.15);
        let leftWheelX = this.position.x + this.carWidth * 0.001 + this.wheelRadius*0.4;
        return { x: leftWheelX , y: leftWheelY + this.wheelRadius };
    }

    getRightWheelCenter() {
        let rightWheelY = this.position.y + this.carHeight - (this.wheelHeight*1.15);
        let rightWheelX = this.position.x + this.carWidth * 0.7 - this.wheelRadius;
        return { x: rightWheelX + this.wheelRadius, y: rightWheelY + this.wheelRadius };
    }

    draw() {
        ctx.drawImage(this.carImage, this.position.x, this.position.y, this.carWidth, this.carHeight);        
        const leftWheelCenter = this.getLeftWheelCenter();
        const rightWheelCenter = this.getRightWheelCenter();

        // Draw lines representing the wheels for visualization
        this.drawWheel(leftWheelCenter.x, leftWheelCenter.y);
        this.drawWheel(rightWheelCenter.x, rightWheelCenter.y);
    }

    drawWheel(x, y) {
        ctx.save();
        ctx.translate(x + this.wheelWidth / 2, y + this.wheelHeight / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.wheelImage, -this.wheelWidth /2, -this.wheelHeight / 2, this.wheelWidth, this.wheelHeight);
        ctx.restore();
    }


    checkCollision(lineSegments, wheelCenter) {
        let collision = this.circleLineCollision({ center: wheelCenter, radius: this.wheelRadius }, lineSegments);

        if (collision.isCollided) {
        //    wheelCenter.x = collision.x - this.wheelRadius;
        //    wheelCenter.y = collision.y - this.wheelRadius;
            this.position =  {x : collision.x, y : collision.y};
            return collision.isCollided;
        } else {
            return false
        }
        
    }

    circleLineCollision(circle, lineSegments) {
        // const distances = []

        for (let i = 0; i < lineSegments.length; i++) {
            const lineSegment  = lineSegments[i];
            for(let j = 0; j < lineSegment.length; j++){
                let line = lineSegment[j];
                let x1 = line.x1;
                let x2 = line.x2;
                let y = line.y1; //y is equal for line
                if(circle.center.x >= line.x1 && circle.center.x <= line.x2 ) {
                // Calculate the vector representing the line segment
                // let dX = x2 - x1;
                // let dY = y; //always 0
                // distances.push({ dx: dX, dy: dY });
                
                if(circle.center.y + this.wheelRadius <  y )
                {
                    continue;
                }
                return {isCollided:true, x: circle.center.x, y: y}

            }

                // Vector representing the line segment
                // const lineVector = { x: dX, y: dY };
                // // Vector representing the circle's center to one endpoint of the line segment
                // const circleToLineStart = { x: circle.center.x - line.x1, y: circle.center.y - line.y1 };  
                // // Dot product of the line vector and the vector to the circle center
                // const dotProduct = (circleToLineStart.x * lineVector.x) + (circleToLineStart.y * lineVector.y);
                // // Calculate the squared length of the line segment
                // const lineLengthSquared = (lineVector.x * lineVector.x) + (lineVector.y * lineVector.y);
                // // Calculate the projection of the circle's center onto the line segment
                // const t = Math.max(0, Math.min(1, dotProduct / lineLengthSquared));
                // const projection = { x: line.x1 + t * lineVector.x, y: line.y1 + t * lineVector.y };
                // // Calculate the distance between the circle's center and the projection point
                // const distance = Math.sqrt((circle.center.x - projection.x) ** 2 + (circle.center.y - projection.y) ** 2);
                // // Check if the distance is less than or equal to the circle's radius
                // if (distance < circle.radius) {
                //      // Collision detected with at least one line segment
                // }
            }
        }
        return false;
    }
    
    update() {
        // this.position.x += this.vx;
        // this.position.y += GRAVITY;    
        car.draw();    
    }


    updateWheel() {
        let isGrounded = false;
        let leftWheelCenter = this.getLeftWheelCenter();
        let rightWheelCenter = this.getRightWheelCenter();

        let allTerrainLineSegments = [];
        this.terrain.forEach((item) => {
            const terrainLineSegments = item.generateLineSegments();
            allTerrainLineSegments.push(terrainLineSegments);
        });

        // Check collision for the left wheel
        
        let leftGrounded = this.checkCollision(allTerrainLineSegments, leftWheelCenter);
        let rightGrounded = this.checkCollision(allTerrainLineSegments, rightWheelCenter);
        
        isGrounded = leftGrounded || rightGrounded;

        if(!isGrounded) {
            this.position.y +=  GRAVITY;
        } 
        if(isGrounded) {
            this.position.x = (leftWheelCenter.x + rightWheelCenter.x)/2;
            this.position.y = (leftWheelCenter.y + rightGrounded.x)/2 - carHeight/2; 
        }
        
        // if (this.position.y + this.carHeight + this.wheelHeight/3 + this.vy < canvas.height)
        // {
        //     this.vy += GRAVITY
        // } 
        // else
        // {
        //     this.vy = 0;
        //     this.rotation += this.vx * this.rotationSpeed
        // }
        // this.position.x += this.vx
    }
}


        // const allTerrainHeightAtX = [];
        // this.terrain.forEach((item) => {
        //     const terrainHeightAtX = item.calculateTerrainHeightAtX();
        //     allTerrainHeightAtX.push(terrainHeightAtX);
        // });