const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const terrainStride = 100;

const initialTerrain = new Terrain(0, 250, 500, 300);
const middleTerrain = new Terrain(501, 200, 1000, 300);
// const endTerrain = new Terrain(10*terrainStride, 250, 100, 30);
const terrains = [initialTerrain, middleTerrain];
let currentTerrainIndex = 0;

function createNewTerrain() {
    const lastTerrain = terrains[terrains.length - 1];
    const newTerrainX = lastTerrain.x + lastTerrain.getTerrainWidth(); // Move the new terrain next to the last one
    const newTerrain = new Terrain(newTerrainX);
    terrains.push(newTerrain);
    car.terrain = [newTerrain];;
}

const car = new Car({ x: 5, y: 30 }, 200, 100, 50, 50, terrains, currentTerrainIndex);
createNewTerrain();
createNewTerrain();
createNewTerrain();

let frameRate = 1000 / 60;
let lastFrame = 0;
let startTime;
let time;
let currentFrame;

function animate() {
    //leftwheelsegment
    //rightwheelsegment
    //angle = rightwheelsegment - leftwheelsegment
    //rotate wheel with the same angle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.currentTerrain = terrains[currentTerrainIndex];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    terrains.forEach((terrain) => {
        terrain.update();
    })
    if (keys.A || keys.D) {
        car.vx = keys.A ? -SPEED : SPEED;
    } else {
        car.vx = 0;
    }
    car.update(/*angle*/);
    car.draw();


    if (car.position.x >= canvas.width / 2 && keys.D) {
        car.position.x = canvas.width / 2;
        terrains.forEach((terrain) => {
            terrain.x -= terrain.vx;
            terrain.lineSegments = terrain.generateLineSegments();
        });
        createNewTerrain();

    }

    if (car.position.x >= canvas.width / 2 && keys.D) {
        car.position.x = canvas.width / 2;
        terrains.forEach((terrain) => {
            terrain.x -= terrain.vx;
            terrain.lineSegments = terrain.generateLineSegments();
        });
        // createNewTerrain();

    }

    terrains.forEach((terrain) => terrain.draw());

    let deltaTime = 0;

    if (startTime === undefined) {
        startTime = time;
    }
    else {
        currentFrame = Math.round((time - startTime) / frameRate);
        deltaTime = (currentFrame - lastFrame) * frameRate;
    }
    lastFrame = currentFrame;
    requestAnimationFrame(animate);
}

animate();
