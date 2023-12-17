const carImageSrc = 'assets/Car.png';
const wheelImageSrc = 'assets/Tire.png';

function createImage(path){
    let image = new Image();
    image.src = path;
    return image;
  }
  
  let images = {
    wheels:[
      createImage(wheelImageSrc),
      createImage(wheelImageSrc)
    ],
    car:createImage(carImageSrc)
  }

  let prevLeftY  = 10;
  let prevRightY = 10;

class Car {
    constructor(position, carWidth, carHeight, wheelWidth, wheelHeight, terrains, currentTerrainIndex) {
        this.carImage = images.car;
        this.LWheelImage = images.wheels[0];
        this.RWheelImage = images.wheels[1];
        this.position = position;
        this.carWidth = carWidth;
        this.carHeight = carHeight;
        this.wheelWidth = wheelWidth;
        this.wheelHeight = wheelHeight;
        this.wheelRadius = wheelWidth / 2;
        this.vx = 0; // Velocity along x axis
        this.vy = 1; // Velocity along y axis
        this.rotation = 0; // Initial rotation angle for wheels
        this.rotationSpeed = 0.2; // Rotation speed for wheels
        this.terrain = terrains;
        this.distanceCovered = 0;
        this.lastXPosition = position.x;
        this.loaded = false;
        // let self = this;
        this.leftWheelCenter = { x: 20, y: 100 }
        this.rightWheelCenter = { x: 140, y: 100 }
        this.angle = 0;
        this.leftTerrainIndex = currentTerrainIndex;
        this.rightTerrainIndex = currentTerrainIndex;
        this.leftTerrain = terrains[this.leftTerrainIndex];
        this.rightTerrain = terrains[this.rightTerrainIndex];

    }


    // getLeftWheelCenter() {
    //     let leftWheelX = this.position.x + this.carWidth * 0.001 + this.wheelRadius * 0.4;
    //     let leftWheelY = this.currentTerrain.calculateTerrainHeightAtX(leftWheelX) - this.wheelWidth;

    //     return { x: leftWheelX, y: leftWheelY };
    // }

    // getRightWheelCenter() {
    //     let rightWheelX = this.position.x + 0.75 *this.carWidth ;
    //     let rightWheelY = this.currentTerrain.calculateTerrainHeightAtX(rightWheelX) - this.wheelWidth;
    //     return { x: rightWheelX + this.wheelRadius, y: rightWheelY };
    // }

    draw(/*angle*/) {

        // this.carImage.onload = function() { self.loaded = true;}
        // if (this.loaded) {
        ctx.save(); 
        this.drawLWheel(this.leftWheelCenter.x, this.leftWheelCenter.y);
        this.drawRWheel(this.rightWheelCenter.x, this.rightWheelCenter.y);
        ctx.drawImage(this.carImage, this.position.x, this.position.y, this.carWidth, this.carHeight);

        ctx.restore();
        // }
        // this.leftWheelCenter = this.getLeftWheelCenter();
        // this.rightWheelCenter = this.getRightWheelCenter();

        // rightWheelCenter.x = rightWheelCenter.x - leftWheelCenter.x;
        // rightWheelCenter.y = rightWheelCenter.y - leftWheelCenter.y;

        // rightWheelCenter.x = rightWheelCenter.x * Math.cos(angle) - rightWheelCenter.y * Math.sin(angle);
        // rightWheelCenter.x = leftWheelCenter.x + rightWheelCenter.x;

        // rightWheelCenter.y = rightWheelCenter.y * Math.sin(angle) - rightWheelCenter.y * Math.cos(angle);
        // rightWheelCenter.y = leftWheelCenter.y + rightWheelCenter.y;
        // Draw lines representing the wheels for visualization
        // this.drawLWheel(this.leftWheelCenter.x, this.leftWheelCenter.y);
        // this.drawRWheel(this.rightWheelCenter.x, this.rightWheelCenter.y);

        this.angle = (180 / Math.PI) * Math.atan((this.rightWheelCenter.y - this.leftWheelCenter.y) / car.carWidth);
        if (this.rightWheelCenter.y < this.leftWheelCenter.y) {
            this.angle = -this.angle;
        }
    }

    drawLWheel(x, y) {
        ctx.save();
        ctx.translate(x + this.wheelWidth / 2, y + this.wheelHeight / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.LWheelImage, -this.wheelWidth / 2, -this.wheelHeight / 2, this.wheelWidth, this.wheelHeight);
        ctx.restore();
    }

    drawRWheel(x, y) {
        ctx.save();
        ctx.translate(x + this.wheelWidth / 2, y + this.wheelHeight / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.RWheelImage, -this.wheelWidth / 2, -this.wheelHeight / 2, this.wheelWidth, this.wheelHeight);
        ctx.restore();
    }


    checkCollision(lineSegments, wheelCenter) {
        let collision = this.circleLineCollision({ center: wheelCenter, radius: this.wheelRadius }, lineSegments);

        if (collision.isCollided) {
            //    wheelCenter.x = collision.x - this.wheelRadius;
            //    wheelCenter.y = collision.y - this.wheelRadius;
            this.position = { x: collision.x, y: collision.y };
            return collision.isCollided;
        } else {
            return false
        }

    }

    circleLineCollision(circle, lineSegments) {
        // const distances = []

        for (let i = 0; i < lineSegments.length; i++) {
            const lineSegment = lineSegments[i];
            for (let j = 0; j < lineSegment.length; j++) {
                let line = lineSegment[j];
                let x1 = line.x1;
                let x2 = line.x2;
                let y = line.y1; //y is equal for line
                if (circle.center.x >= line.x1 && circle.center.x <= line.x2) {
                    // Calculate the vector representing the line segment
                    // let dX = x2 - x1;
                    // let dY = y; //always 0
                    // distances.push({ dx: dX, dy: dY });

                    if (circle.center.y + this.wheelRadius < y) {
                        continue;
                    }
                    return { isCollided: true, x: circle.center.x, y: y }

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
        car.position.x = this.leftWheelCenter.x - 15;
        car.position.y = this.leftWheelCenter.y - 70;
       
        console.log(this.leftWheelCenter.y, this.rightWheelCenter.y);
        if(isNaN(this.leftWheelCenter.y)) 
        {
            this.leftWheelCenter.y = this.leftTerrain.calculateTerrainHeightAtX(prevLeftY);
        }
        if(isNaN(this.rightWheelCenter.y)) 
        {
            this.rightWheelCenter.y = prevRightY;
          
        }

        if (this.leftWheelCenter.x < this.leftTerrain.x) {
            if (this.leftTerrainIndex != 0) {
                this.leftTerrainIndex--;
            }
        }
        else if (this.leftWheelCenter.x > (this.leftTerrain.x + this.leftTerrain.getTerrainWidth())) {
            this.leftTerrainIndex++;
            this.leftWheelCenter.x++;
        }
        this.leftTerrain = null;
        this.leftTerrain = terrains[this.leftTerrainIndex];

        if (this.rightWheelCenter.x < this.rightTerrain.x) {
            if (this.rightTerrainIndex != 0) {
                this.rightTerrainIndex--;

            }
        }
        else if (this.rightWheelCenter.x > (this.rightTerrain.x + this.rightTerrain.getTerrainWidth())) {
            this.rightTerrainIndex++;
            this.rightWheelCenter.x++;
        }
        this.rightTerrain = null;
        this.rightTerrain = terrains[this.rightTerrainIndex];

        this.updateWheel();
        // car.draw();
    }


    updateWheel() {
        if (this.leftWheelCenter.x < 0) {
            this.leftWheelCenter.x = 1;
        }
        if ((this.rightWheelCenter.x - this.carWidth) < 0) {
            this.rightWheelCenter.x = 1 + this.carWidth;
        }
        this.leftWheelCenter.x += this.vx;
        this.rightWheelCenter.x += this.vx;

        if (!(this.leftWheelCenter.y + this.wheelWidth < this.leftTerrain.calculateTerrainHeightAtX(this.leftWheelCenter.x))) {
            if(isNaN(this.leftTerrain.calculateTerrainHeightAtX(this.leftWheelCenter.x))) {
                this.leftWheelCenter.y = prevLeftY;
            }
            else {
            this.leftWheelCenter.y = this.leftTerrain.calculateTerrainHeightAtX(this.leftWheelCenter.x) - car.wheelWidth;
            }
        } else {
            this.leftWheelCenter.y += GRAVITY;
        }
        if (!(this.rightWheelCenter.y + this.wheelWidth <  this.rightTerrain.calculateTerrainHeightAtX(this.rightWheelCenter.x))) {
            if (isNaN(this.rightTerrain.calculateTerrainHeightAtX(this.rightWheelCenter.x))) {
                this.rightWheelCenter.y = prevRightY;    
            } else {
            this.rightWheelCenter.y = this.rightTerrain.calculateTerrainHeightAtX(this.rightWheelCenter.x) - car.wheelWidth;
            }
        } else {
        this.rightWheelCenter.y += GRAVITY;
        }
        console.log(this.leftTerrainIndex,this.rightTerrainIndex);
        prevLeftY = this.leftWheelCenter.y;
        prevRightY = this.rightWheelCenter.y;

        // let isGrounded = false;
        // let leftWheelCenter = this.getLeftWheelCenter();
        // let rightWheelCenter = this.getRightWheelCenter();

        // let allTerrainLineSegments = [];
        // this.terrain.forEach((item) => {
        //     const terrainLineSegments = item.generateLineSegments();
        //     allTerrainLineSegments.push(terrainLineSegments);
        // });

        // // Check collision for the left wheel

        // let leftGrounded = this.checkCollision(allTerrainLineSegments, leftWheelCenter);
        // let rightGrounded = this.checkCollision(allTerrainLineSegments, rightWheelCenter);

        // isGrounded = leftGrounded || rightGrounded;

        // if(!isGrounded) {
        //     this.position.y +=  GRAVITY;
        // } 
        // if(isGrounded) {
        //     this.position.x = (leftWheelCenter.x + rightWheelCenter.x)/2;
        //     this.position.y = (leftWheelCenter.y + rightGrounded.x)/2 - carHeight/2; 
        // }

        // if (this.position.y + this.carHeight + this.wheelHeight/3 + this.vy < canvas.height)
        // {
        //     this.vy += GRAVITY
        // } 
        // else
        // {
        //     this.vy = 0;
        this.rotation += this.vx * this.rotationSpeed
        // }
        // this.position.x += this.vx
    }
}


// const allTerrainHeightAtX = [];
// this.terrain.forEach((item) => {
//     const terrainHeightAtX = item.calculateTerrainHeightAtX();
//     allTerrainHeightAtX.push(terrainHeightAtX);
// });