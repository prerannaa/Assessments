// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// function bezierInterpolation(t, p0, p1, p2, p3) {
//     return Math.pow(1 - t, 3) * p0 +
//         3 * Math.pow(1 - t, 2) * t * p1 +
//         3 * (1 - t) * Math.pow(t, 2) * p2 +
//         Math.pow(t, 3) * p3;
// }


function lineSphereIntersect(lineStart, lineEnd, sphereCenter, sphereRadius) {
    const d = subtractVectors(lineEnd, lineStart);
    const f = subtractVectors(lineStart, sphereCenter);

    const a = dotProduct(d, d);
    const b = 2 * dotProduct(f, d);
    const c = dotProduct(f, f) - sphereRadius * sphereRadius;

    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
        return false;  // No intersection
    }

    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    return t1 >= 0 && t1 <= 1 || t2 >= 0 && t2 <= 1;
}

function subtractVectors(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
