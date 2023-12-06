const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const character = new Character({
    x: 50,
    y: 0,
},
120,
80);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.draw();
    character.update();

    if (keys.A || keys.D) {
        character.vx = keys.A ? -SPEED : SPEED;
    } else {
        character.vx = 0;
    }
    requestAnimationFrame(animate);
}

animate()
           