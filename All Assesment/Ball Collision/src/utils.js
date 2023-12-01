
/**
 * Return a random number between a range
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function getRandom(min=0, max=1) {
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return min+Math.random()*(max-min);
}

function distance(x1,y1,x2,y2){
    const dx=x2-x1;
    const dy=y2-y1;

    return Math.sqrt(dx*dx+dy*dy);
}