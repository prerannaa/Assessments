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

function random(min, max) {
    return min + Math.random() * (max - min);
}