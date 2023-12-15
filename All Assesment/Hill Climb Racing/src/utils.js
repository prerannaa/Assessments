// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function circleLineCollision(circleCenter, circleRadius, lineStart, lineEnd) {
    const a = lineStart.y - lineEnd.y;
    const b = lineEnd.x - lineStart.x;
    const c = lineStart.x * lineEnd.y - lineEnd.x * lineStart.y;

    const distanceToLine = (a * circleCenter.x + b * circleCenter.y + c) / Math.sqrt(a * a + b * b);
    const closestPointOnLine = {
        x: (b * (b * circleCenter.x - a * circleCenter.y) - a * c) / (a * a + b * b),
        y: (a * (-b * circleCenter.x + a * circleCenter.y) - b * c) / (a * a + b * b)
    };

    const distanceFromStart = Math.sqrt((closestPointOnLine.x - lineStart.x) ** 2 + (closestPointOnLine.y - lineStart.y) ** 2);
    const distanceFromEnd = Math.sqrt((closestPointOnLine.x - lineEnd.x) ** 2 + (closestPointOnLine.y - lineEnd.y) ** 2);

    if (distanceToLine <= circleRadius && distanceFromStart <= Math.sqrt((lineStart.x - lineEnd.x) ** 2 + (lineStart.y - lineEnd.y) ** 2) && distanceFromEnd <= Math.sqrt((lineStart.x - lineEnd.x) ** 2 + (lineStart.y - lineEnd.y) ** 2)) {
        return true;
    }

    return false;
}
