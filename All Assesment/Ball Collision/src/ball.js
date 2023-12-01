

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
        if(this.x<boundaryLeft || this.x+BALL_WIDTH>boundaryWidth){
            this.dx=-this.dx;
        }
        if(this.y<boundaryTop || this.y+BALL_HEIGHT>boundaryHeight){
            this.dy=-this.dy;
        }
    }

    // checkBallCollision=(ball)=>{
    //     const dist=distance(this.x,this.y,ball.x,ball.y);
    //     const sumOfRadii =this.r+ball.r;
    //     if(dist<=sumOfRadii){
    //         this.dx=-this.dx;
    //         this.dy=-this.dy;

    //         ball.dx=-ball.dx;
    //         ball.dy=-ball.dy;
    //     }
    // }

    checkBallCollision = (ball, boundaryLeft, boundaryTop, boundaryWidth, boundaryHeight) => {
        const dx = ball.x - this.x;
        const dy = ball.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const sumOfRadii = this.r + ball.r;
    
        if (distance <= sumOfRadii) {
            // Determine the angle of collision
            const angle = Math.atan2(dy, dx);
    
            // Calculate the minimum distance to prevent overlap
            const minDistance = sumOfRadii - distance + 1;
    
            // Calculate the adjustment needed for both balls to prevent overlap
            const adjustmentX = Math.cos(angle) * minDistance;
            const adjustmentY = Math.sin(angle) * minDistance;
    
            // Move the balls apart along the collision angle
            this.x -= adjustmentX / 2;
            this.y -= adjustmentY / 2;
            ball.x += adjustmentX / 2;
            ball.y += adjustmentY / 2;
    
            // Reflect velocities for a simple collision effect
            const tempDx = this.dx;
            const tempDy = this.dy;
            this.dx = ball.dx;
            this.dy = ball.dy;
            ball.dx = tempDx;
            ball.dy = tempDy;
    
            // Check and handle collision with the boundaries
            this.checkWallCollision(boundaryLeft, boundaryTop, boundaryWidth, boundaryHeight);
            ball.checkWallCollision(boundaryLeft, boundaryTop, boundaryWidth, boundaryHeight);
        }
    };
    

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
// function render(){
//     ballsArray.forEach(ball=>{
//         ball.draw();
//         ball.move();
//         ball.checkWallCollision(0,0,VIEWPORT_WIDTH,VIEWPORT_HEIGHT);
//         ballsArray.forEach(otherball=>{
//             if(ball===otherball) return;
//             ball.checkBallCollision(otherball);
//         });
//     });
//     requestAnimationFrame(render);
// }
function render() {
    ballsArray.forEach(ball => {
        ball.draw();
        ball.move();
        ball.checkWallCollision(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        ballsArray.forEach(otherBall => {
            if (ball === otherBall) return;
            ball.checkBallCollision(otherBall, 0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        });
    });
    requestAnimationFrame(render);
}

render();