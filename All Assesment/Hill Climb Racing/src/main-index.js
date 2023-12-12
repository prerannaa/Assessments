const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const terrain = new Terrain()
const car = new Car({ x: 50, y: 0 }, 270, 130, 60, 60, terrain);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    terrain.draw();
    car.update();
    terrain.update();

    if (car.position.x >= canvas.width/4  && keys.D) {
        car.position.x=canvas.width/4
        terrain.x-= terrain.vx;
    }

    if (keys.A || keys.D) {
        car.vx = keys.A ? -SPEED : SPEED;
        if (car.position.x >= canvas.width/4 ) {
            car.position.x=canvas.width/4
            terrain.x-= terrain.vx;
        }
    } else {
        car.vx = 0
    }
    car.draw();
    requestAnimationFrame(animate);
}

animate()