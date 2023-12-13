const coinImageSrc = 'assets/Coin.png';

class Coin {
    constructor(x,y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.coinImage = new Image();
        this.coinImage.src = coinImageSrc;
        this.vx = 3;
        this.isVisible = true;
    }
    
    draw() 
    {
        ctx.drawImage(this.coinImage, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
    }
}