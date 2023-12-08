const imageSrc = 'assets/Car.png';

class Character {
    constructor(position, width,height){
        this.position = position;
        this.width = width;
        this.height = height;
        this.radius = 3;
        this.vx = 0; //velocity of character along x axis
        this.vy = 1; //velocity of character along y axis
        this.image = new Image();
        this.image.src = imageSrc;  


    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }



    update(){
        this.draw();
        this.position.y = (leftWheel.position.y + rightWheel.position.y)/2.8;;
        if (this.position.y + this.height + this.vy < Math.max(leftWheel.position.y, rightWheel.position.y)) {
            this.vy += GRAVITY;
        } else {
            this.vy = 0;
        }
        this.position.x += rightWheel.vx

        if(this.position.x > canvas.width/5){
            const translationAmount = rightWheel.vx;
            ctx.translate(-translationAmount, 0);
        }

    }

}