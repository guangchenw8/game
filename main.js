// JS For Quabuble Game

// Set up canvas
let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');
cnv.width = 800;
cnv.height = 800;
cnv.style.backgroundColor = 'white';

// Global Variables
let mouse = {
  x: 0,
  y: 0,
  pressed: false,
};
let playbutton = {
  x: 200,
  y: 600,
  w: 400,
  h: 125,
};
let upgradeammo = {
  x: 662,
  y: 200,
  w: 125,
  h: 125,
};
let upgradebiglaser = {
  x: 662,
  y: 350,
  w: 125,
  h: 125,
};
let upgradefastlaser = {
  x: 662,
  y: 500,
  w: 125,
  h: 125,
};
let plr, enemy1, laser, zombie, powerUp;
let score = 0;
let hiScore = 0;
let laserArray = [];
let enemy1Array = [];
let powerUpArray = [];
let gameState = 'start';
let wIsPressed = false;
let sIsPressed = false;
let aIsPressed = false;
let dIsPressed = false;

// Set the game
setGame();

// Load frame
window.addEventListener('load', frame);

// Frame Function
function frame() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // // Frame content
  runGame();

  // // End of Frame
  requestAnimationFrame(frame);
}

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);
document.addEventListener('click', mouseClickHandler);
document.addEventListener('mousemove', mouseMoveHandler);

// Event handlers

// // Player Controls
function keyDownHandler(e) {
  if (e.key === 'w') {
    wIsPressed = true;
  }
  if (e.key === 's') {
    sIsPressed = true;
  }
  if (e.key === 'a') {
    aIsPressed = true;
  }
  if (e.key === 'd') {
    dIsPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key === 'w') {
    wIsPressed = false;
  }
  if (e.key === 's') {
    sIsPressed = false;
  }
  if (e.key === 'a') {
    aIsPressed = false;
  }
  if (e.key === 'd') {
    dIsPressed = false;
  }
}

function mouseDownHandler() {
  mouse.pressed = true;
}
function mouseUpHandler() {
  mouse.pressed = false;
}
function mouseMoveHandler(e) {
  let cnvRect = document.getElementById('canvas').getBoundingClientRect();
  mouse.x = e.clientX - cnvRect.x;
  mouse.y = e.clientY - cnvRect.y;
}
// // Click events
function mouseClickHandler() {
  // // // Click play button to start
  if (
    (gameState === 'start' || gameState === 'lose') &&
    mouse.x > playbutton.x &&
    mouse.x < playbutton.x + playbutton.w &&
    mouse.y > playbutton.y &&
    mouse.y < playbutton.y + playbutton.h
  ) {
    gameState = 'play';
    setGame();
  }
  // // // Click upgrades
  if (gameState === 'play' && plr.xp >= 100) {
    if (
      // // // // Ammo upgrade
      mouse.x > upgradeammo.x &&
      mouse.x < upgradeammo.x + upgradeammo.w &&
      mouse.y > upgradeammo.y &&
      mouse.y < upgradeammo.y + upgradeammo.h
    ) {
      plr.upgradeammo += 1;
      plr.ammo += 50;
      plr.xp -= 100;
    } else if (
      // // // // Big laser upgrade
      mouse.x > upgradebiglaser.x &&
      mouse.x < upgradebiglaser.x + upgradebiglaser.w &&
      mouse.y > upgradebiglaser.y &&
      mouse.y < upgradebiglaser.y + upgradebiglaser.h
    ) {
      plr.upgradebiglaser += 1;
      plr.xp -= 100;
    } else if (
      // // // // Fast laser upgrade
      mouse.x > upgradefastlaser.x &&
      mouse.x < upgradefastlaser.x + upgradefastlaser.w &&
      mouse.y > upgradefastlaser.y &&
      mouse.y < upgradefastlaser.y + upgradefastlaser.h
    ) {
      plr.upgradefastlaser += 1;
      plr.xp -= 100;
    }
    // // // // Remove xp
  }
}
