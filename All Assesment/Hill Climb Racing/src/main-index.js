const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const initialTerrain = new Terrain(0, 250, 50, 100);
const terrains = [initialTerrain];

function createNewTerrain() {
    const lastTerrain = terrains[terrains.length - 1];
    const newTerrain = new Terrain();
    newTerrain.x = lastTerrain.x - canvas.width; // Move the new terrain to the left of the canvas
    terrains.push(newTerrain);
    car.terrain = newTerrain;
}

const car = new Car({ x: 50, y: 0 }, 200, 100, 50, 50, initialTerrain);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.update();
    initialTerrain.update()
    car.checkCollision();
    
    if (car.position.x >= canvas.width/4 && keys.D) {
        car.position.x = canvas.width/4;
        terrains.forEach((terrain) => {
            terrain.x -= terrain.vx
            console.log(terrain.x, terrain.vx)
            createNewTerrain();
        });
    }
    terrains.forEach((terrain) => terrain.draw());

    if (keys.A || keys.D) {
        car.vx = keys.A ? -SPEED : SPEED;
        if (car.position.x >= canvas.width/4) {
            car.position.x = canvas.width/4;
            terrains.forEach((terrain) => {terrain.x -= terrain.vx});
        }
    } else {
        car.vx = 0;
    }
    car.draw();
    requestAnimationFrame(animate);
}

animate();
