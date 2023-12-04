const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = new Character(50, 50, 70, 70);
const ground = new Platform(0, canvas.height - 20, canvas.width, 20, 0); // Ground with platform number 0
const platforms = [ground];
let timer = 0;
let score = 0; // Initialize score

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

function collisionDetection(player, platform) {
    const isColliding =
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y < platform.y + platform.height &&
        player.y + player.height > platform.y;

    if (isColliding && !player.isGrounded && player.justJumped && player.currentPlatform !== platform.number) {
        score = platform.number;
        player.justJumped = false; // Reset the flag after scoring
        player.currentPlatform = platform.number; // Update current platform
    }

    return isColliding;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    displayScore(ctx);
    platforms.forEach((platform) => platform.draw(ctx));

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
        platform.y += 1;
    });

    timer++;
    if (timer % 150 === 0) {
        generatePlatform();
        timer = 0;
    }

    requestAnimationFrame(animate);
}

animate();
