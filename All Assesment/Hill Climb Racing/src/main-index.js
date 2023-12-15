const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const terrainStride = 100;

const initialTerrain = new Terrain(0, 250, 10, 300);
const middleTerrain = new Terrain(10*terrainStride, 200, 10, 300);
// const endTerrain = new Terrain(10*terrainStride, 250, 100, 30);
const terrains = [initialTerrain, middleTerrain];

function createNewTerrain() {
    const lastTerrain = terrains[terrains.length - 1];
    const newTerrainX = lastTerrain.x + lastTerrain.getTerrainWidth(); // Move the new terrain next to the last one
    const newTerrain = new Terrain(newTerrainX);
    terrains.push(newTerrain);
    car.terrain = [newTerrain];                                                                       ;
}

const car = new Car({ x: 50, y: 0 }, 200, 100, 50, 50, terrains);
createNewTerrain();
createNewTerrain();
createNewTerrain();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    terrains.forEach((terrain)=>{
        terrain.update();
    })
    car.update();
    car.updateWheel();

    // if (car.position.x >= canvas.width/2 && keys.D) {
    //     car.position.x = canvas.width/2;
    //     terrains.forEach((terrain) => {
    //         terrain.x -= terrain.vx;
    //         terrain.lineSegments = terrain.generateLineSegments();
    //     });
    //     // createNewTerrain();

    // }
    
    terrains.forEach((terrain) => terrain.draw());

    // if (keys.A || keys.D) {
    //     car.vx = keys.A ? -SPEED : SPEED;
    // } else {
    //     car.vx = 0;
    // }

    requestAnimationFrame(animate);
}

animate();
