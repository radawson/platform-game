// The attributes of the player.
var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 85,
    width: 80,
    // movement images
    moveJump: 'assets/jump.png',
    moveLeft: 'assets/run_back.png',
    moveRight: 'assets/run.png',
    moveStand: 'assets/stand.png'
};
// Canvas attributes
cWidth = 900;
cHeight = 550;
// Variable for holding current player image
var renderP = 'assets/stand.png';

// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
};
// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;
// The number of platforms
var platCount = 3;
// Array for platforms
var platforms = [];

// Build an image
function newImage(url) {
    let image = document.createElement('img');
    image.src = url;
    image.style.position = 'absolute';
    return image;
}

// Function to render the canvas
function rendercanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, cWidth, cHeight);
}
// Function to render the player
function renderplayer() {
    ctx.fillStyle = "#F08080";
    img = newImage(renderP);
    ctx.drawImage(img, (player.x) - player.width, (player.y) - player.height);
}
// Function to create platforms
function createplat() {
    for (i = 0; i < platCount; i++) {
        platforms.push(
            {
                x: 100 * i,
                y: 200 + (30 * i),
                width: 110,
                height: 15
            }
        );
    }
}

// Function to render platforms
function renderplat() {
    ctx.fillStyle = "#45597E";
    // using platforms.length in case we want to add or remove platforms 
    for (i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}
// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if (e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if (e.keyCode == 38) {
        if (player.jump == false) {
            player.y_v = -10;

        }
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39) {
        keys.right = true;
       
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 38) {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }
}
//Game Loop
function loop() {
    // If the player is not jumping apply the effect of frictiom
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
        renderP = player.moveJump;
    }

    player.jump = true;

    // If an arrow key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -3.5;
        renderP = player.moveLeft;
    }
    if (keys.right) {
        player.x_v = 3.5;
        renderP = player.moveRight;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collisions with the platform
    let i = -1;
    for (let p = 0; p < platCount; p++) {
        if (platforms[p].x < player.x && player.x < platforms[p].x + platforms[p].width &&
            platforms[p].y < player.y && player.y < platforms[p].y + platforms[p].height) {
            i = p;
        }
    }

    if (i > -1) {
        player.jump = false;
        player.y = platforms[i].y;
    }

    // Render stand sprite if player isn't moving (or falling)
    if (player.x_v > -1 && player.x_v < 1) {
        renderP = player.moveStand;
    }

    // Debugging movement
    document.querySelector('#x_v').innerHTML = player.x_v;
    document.querySelector('#y_v').innerHTML = player.y_v;

    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();
}
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = cHeight;
ctx.canvas.width = cWidth;
createplat();
// Adding the event listeners
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
setInterval(loop, 22);