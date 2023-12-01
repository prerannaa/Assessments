
class Ball{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.r=BALL_WIDTH/2;
        this.dx=getRandom(-1,1);
        this.dy=getRandom(-1,1);
        this.element=document.createElement('div');
        this.element.classList.add('ball');
    }
    /**
     * 
     * @returns HTMLDiv Element
     */
    getElement(){
        return this.element;
    }

    getX =()=>this.x;
    getY =()=>this.y;

    /**
     * set x position of ball
     * @param {number} x 
     */
    setX=(x)=>{
        this.x=x;
    }
    setY=(y)=>{
        this.y=y;
    }

    draw=()=>{
        this.element.style.left=this.x+'px';
        this.element.style.top=this.y+'px';
        console.log("draw");
    }

    move=()=>{
        this.x+=this.dx*SPEED;
        this.y+=this.dy*SPEED;
    }

    checkWallCollision=(boundaryLeft, boundaryTop, boundaryWidth, boundaryHeight)=>{
        
        
        this.x += this.dx;
        this.y += this.dy;
    
        // Adjust the ball's position if it goes beyond the boundaries
        if (this.x - this.r < boundaryLeft) {
            this.x = boundaryLeft + this.r;
            this.dx = -this.dx;
        } else if (this.x + this.r > boundaryWidth) {
            this.x = boundaryWidth - this.r;
            this.dx = -this.dx;
        }
    
        if (this.y - this.r < boundaryTop) {
            this.y = boundaryTop + this.r;
            this.dy = -this.dy;
        } else if (this.y + this.r > boundaryHeight) {
            this.y = boundaryHeight - this.r;
            this.dy = -this.dy;
        }
    }
    
    checkBallCollision=(ball)=>{
        const dist=distance(this.x,this.y,ball.x,ball.y);
        const sumOfRadii =this.r+ball.r;
        if(dist<=sumOfRadii){
            this.dx=-this.dx;
            this.dy=-this.dy;

            ball.dx=-ball.dx;
            ball.dy=-ball.dy;
        }
        if (checkBallCollision(ball)) {
            this.resolveCollision(ball);
        }
    }

    resolveCollision = (ball) =>{
        const dist=distance(this.x,this.y,ball.x,ball.y);
        const penetration = this.r + ball.r - dist;

        const penetrationX = (dx/dist) * penetration * 0.5;
        const penetrationY = (dy/dist) * penetration * 0.5;
        this.x +=penetrationX;
        this.y +=penetrationY;
        ball.x -=penetrationX;
        ball.y -=penetrationY;
    }

    // if(checkBallCollision(ball))
    // {
    //     resolveCollision(ball);
    // }

}

const ViewPort=document.querySelector('#viewport');
const ballsArray=[];
for(let i=0; i<BALL_COUNT;i++){
    const x=getRandom(0, VIEWPORT_WIDTH - BALL_WIDTH);
    const y=getRandom(0, VIEWPORT_HEIGHT - BALL_HEIGHT);
    const ball=new Ball(x,y);
    ballsArray.push(ball);
}

ballsArray.forEach(ball=>{
    ViewPort.appendChild(ball.getElement());
});
function render(){
    ballsArray.forEach(ball=>{
        ball.draw();
        ball.move();
        ball.checkWallCollision(0,0,VIEWPORT_WIDTH,VIEWPORT_HEIGHT);
        ballsArray.forEach(otherball=>{
            if(ball===otherball) return;
            ball.checkBallCollision(otherball);
        });
    });
    requestAnimationFrame(render);
}
render();