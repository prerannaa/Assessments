const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const terrain = new Terrain()
const car = new Car({ x: 50, y: 0 }, 270, 130, 60, 60, terrain);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    terrain.draw();
    car.update();
    
    if (keys.A || keys.D) {
        car.vx = keys.A ? -SPEED : SPEED;
    } else {
        car.vx = 0
    }
    car.draw();
    requestAnimationFrame(animate);
}

animate()