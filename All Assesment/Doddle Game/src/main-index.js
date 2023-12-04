const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new Character(50, 50, 70, 70);
const ground = new Platform(0, canvas.height - 20, canvas.width, 20, 0); // Ground with platform number 0
const platforms = [ground];
let timer = 0;
let score = 0; // Initialize score
let isPlatformMoving = false;
let gameOverScore = 0;
let gameStarted = false;


function generatePlatform() {
    const platformNumber = platforms.length;
    const platform = new Platform(random(0, canvas.width), 200, 150, 20, platformNumber);
    platforms.push(platform);
}

function displayScore(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 120, 30); // Display score at top right
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (player.y < HALF_CANVAS_HEIGHT) {
        platforms.forEach((platform) => (platform.y += SPEED));
    }

    player.draw(ctx);
    displayScore(ctx);
    platforms.forEach((platform) => platform.draw(ctx));

    // Generate new platform when timer reaches a certain value
    if (timer % 150 === 0) {
        generatePlatform();
    }

    // End the game if player's height is greater than or equal to canvas height
    if (player.y + player.height >= canvas.height) {
        gameOver();
        return;
    }

    // Check if player is above half the canvas height, and end the game if player is below the canvas
    if (player.y < HALF_CANVAS_HEIGHT && player.y + player.height > canvas.height) {
        gameOver();
        return;
    }

    // Check if player is above half the canvas height, and end the game if player is below the canvas
    if (player.y < HALF_CANVAS_HEIGHT && player.y + player.height > canvas.height) {
        gameOver();
        return;
    }

    if (keys.A || keys.D) {
        player.vx = keys.A ? -SPEED : SPEED;
    } else {
        player.vx = 0;
    }

    player.vy += GRAVITY;
    player.y += player.vy;

    if (keys.SPACE && player.isGrounded) {
        player.vy -= JUMP_HEIGHT;
        player.isGrounded = false;
        player.justJumped = true;
    }

    player.x += player.vx;

    if (player.x + player.width < 0) {
        player.x = canvas.width - player.width;
    }

    if (!player.isGrounded) {
        player.y += player.vy;
        player.vy += GRAVITY;
    } else {
        player.isGrounded = false;
        player.vy = 0;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.isGrounded = true;
    }

    platforms.forEach((platform) => {
        if (collisionDetection(player, platform)) {
            player.y = platform.y - player.height;
            player.isGrounded = true;
        }
    });

    timer++;
    requestAnimationFrame(animate);
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(`Game Over! Score: ${score}`, canvas.width / 2 - 150, canvas.height / 2);

    // Restart the game after 3 seconds
    setTimeout(() => {
        player.y = 50;
        platforms.splice(1); // Remove all platforms except the ground
        timer = 0;
        score = 0;
        animate();
    }, 3000);

    // Stop the current animation frame
    cancelAnimationFrame(animate);
}

animate();