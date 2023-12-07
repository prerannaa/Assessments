const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const terrain = new Terrain()

// const character = new Character({
//     x: 50,
//     y: 0,
// },
// 230,
// 120);
const leftWheel = new Wheel({
    x: 65,
    y: 150,
},
60,
60);

const rightWheel = new Wheel({
    x: 210,
    y: 150,
},
60,
60);

const character = new Character({
    x: 50,
    y: terrain.getHeight(50), // Set the initial y position based on the terrain
}, 230, 120, terrain,  leftWheel, rightWheel);


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    terrain.draw();
    character.draw();
    character.update();
    leftWheel.draw();
    leftWheel.update();
    rightWheel.draw();
    rightWheel.update();

    if (keys.A || keys.D) {
        character.vx = keys.A ? -SPEED : SPEED;
        leftWheel.vx = keys.A ? -SPEED : SPEED;
        rightWheel.vx = keys.A ? -SPEED : SPEED;

    } else {
        character.vx = 0
        leftWheel.vx = 0
        rightWheel.vx = 0
    }
    requestAnimationFrame(animate);
}

animate()