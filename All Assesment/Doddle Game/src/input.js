const keys = {
    A: false,
    D: false,
    W: false,
    S: false,
    SPACE: false,
}

window.onkeydown = e => {
    switch(e.code){
        case 'KeyA':
            keys.A = true;
            break;
        case 'KeyD':
            keys.D = true;
            break;        
        case 'KeyW':
            keys.W = true;
            break;
        case 'KeyS':
            keys.S = true;
            break;
        case 'Space':
            keys.SPACE = true;
            break;
        default:
        console.log(keys);
    }
}

window.onkeyup = e => {
    switch(e.code){
        case 'KeyA':
            keys.A = false;
            break;
        case 'KeyD':
            keys.D = false;
            break;        
        case 'KeyW':
            keys.W = false;
            break;
        case 'KeyS':
            keys.S = false;
            break;
        case 'Space':
            keys.SPACE = false;
            break;
        default:
        console.log(keys);

    }
}