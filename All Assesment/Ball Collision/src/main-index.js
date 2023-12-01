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