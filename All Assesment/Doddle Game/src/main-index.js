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


function checkGameOver() {
  if (player.y + player.height >= canvas.height && gameStarted === true) {
      // Player has touched the bottom, end the game
      player.y = canvas.height - player.height; // Reset player position
      player.isGrounded = true;

      // Display game-over message
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'grey';
      ctx.font = '30px Arial';
      const gameOverText = 'Game Over';
      const scoreText = `Score: ${score}`;
      const textWidth = ctx.measureText(gameOverText).width;
      const textX = (canvas.width - textWidth) / 2;
      ctx.fillText(gameOverText, textX, canvas.height / 2 - 15);
      ctx.fillText(scoreText, textX, canvas.height / 2 + 15);

      // Restart the game after 3 seconds
      setTimeout(() => {
          player.y = canvas.height - player.height;
          gameStarted = false;
          player.isGrounded = true;
          player.currentPlatform = -1;
          isPlatformMoving = false; // Stop platform movement
          requestAnimationFrame(animate); // Restart the game loop
      }, 3000);

      return; // Stop the game loop
  }
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

    checkGameOver();

    if (!isPlatformMoving && keys.SPACE) {
      isPlatformMoving = true;
      gameStarted = true
    }

    if (isPlatformMoving) {
        platforms.forEach((platform) => {
            if (collisionDetection(player, platform)) {
                player.y = platform.y - player.height;
                player.isGrounded = true;
            }
            platform.y += 1;
        });
    }

  //   platforms.forEach((platform) => {
  //     if (collisionDetection(player, platform)) {
  //         player.y = platform.y - player.height;
  //         player.isGrounded = true;
  //     }
  //     platform.y += 1; // This line increases the y-coordinate of each platform, creating a sense of upward movement.
  // });
    requestAnimationFrame(animate);
}

animate();