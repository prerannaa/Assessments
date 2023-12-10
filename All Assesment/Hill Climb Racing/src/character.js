// const imageSrc = 'assets/Car.png';

// class Character {
//     constructor(position, width,height){
//         this.position = position;
//         this.width = width;
//         this.height = height;
//         this.radius = 3;
//         this.vx = 0; //velocity of character along x axis
//         this.vy = 1; //velocity of character along y axis
//         this.image = new Image();
//         this.image.src = imageSrc;  


//     }
//     draw(){
//         ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
//     }

//     checkCollisionWithTerrain() {
//         const carBottom = this.position.y + this.height; // Bottom of the car
//         const columnWidth = terrain.columnWidth;
    
//         // Check collision for the columns near the character
//         const columnStart = Math.floor(this.position.x / columnWidth);
//         const columnEnd = Math.min(Math.ceil((this.position.x + this.width) / columnWidth), terrain.heights.length);
    
//         for (let i = columnStart; i < columnEnd; i++) {
//             const terrainHeight = terrain.heights[i];
//             if (carBottom > terrainHeight) {
//                 // Collision detected, adjust character's position and velocity
//                 this.position.y = terrainHeight - this.height;
//                 this.vy = 0;
//             }
//         }
//     }

//     update(){
//         this.draw();
//         this.checkCollisionWithTerrain();
//         this.position.y = (leftWheel.position.y + rightWheel.position.y)/2.8;;
//         if (this.position.y + this.height + this.vy < Math.max(leftWheel.position.y, rightWheel.position.y)) {
//             this.vy += GRAVITY;
//         } else {
//             this.vy = 0;
//         }
//         this.position.x += rightWheel.vx

//         if(this.position.x > canvas.width/5){
//             const translationAmount = rightWheel.vx;
//             ctx.translate(-translationAmount, 0);
//         }

//     }

// }