function collisionDetection(player, platform) {
    return (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y < platform.y + platform.height &&
        player.y + player.height > platform.y
    );
}

function random(min, max) {
    return min + Math.random() * (max - min);
}
