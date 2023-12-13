const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const initialTerrain = new Terrain(0, 250, canvas.width, 100);
const terrains = [initialTerrain];
const car = new Car({ x: 50, y: 0 }, 270, 130, 60, 60, initialTerrain);


function createNewTerrain() {
    const lastTerrain = terrains[terrains.length - 1];
    const newTerrain = new Terrain(
        lastTerrain.x + lastTerrain.width,
        lastTerrain.y,
        canvas.width,
        100
    );
    terrains.push(newTerrain);
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    terrains.forEach((terrain) => terrain.draw());
    car.update();
    initialTerrain.update();

    if (car.position.x >= canvas.width/4  && keys.D) {
        car.position.x=canvas.width/4
        terrains.forEach((terrain) => (terrain.x -= terrain.vx));
        createNewTerrain();
    }

    if (keys.A || keys.D) {
        car.vx = keys.A ? -SPEED : SPEED;
        if (car.position.x >= canvas.width/4 ) {
            car.position.x=canvas.width/4
            terrains.forEach((terrain) => (terrain.x -= terrain.vx));
            createNewTerrain();
        }
    } else {
        car.vx = 0
    }
    car.draw();
    requestAnimationFrame(animate);
}

animate()