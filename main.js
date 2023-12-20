// JS For Project A

// Set up canvas
let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');
cnv.width = 800;
cnv.height = 600;
cnv.style.backgroundColor = 'white';

// Global Variables

let mouse = {
  x: 0,
  y: 0,
  pressed: false,
};
let plr, enemy, laser, zombie, playbutton;
let enemyCooldown = 0;
let hiScore = 0;
let laserArray = [];
let enemyArray = [];
let gameState = 'start';
let wIsPressed = false;
let sIsPressed = false;
let aIsPressed = false;
let dIsPressed = false;

// Load frame
window.addEventListener('load', frame);
// New frame

setGame();

function frame() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Frame content
  runGame();

  // End of Frame
  requestAnimationFrame(frame);
}

//  Game Controls

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);
document.addEventListener('click', mouseClickHandler);
document.addEventListener('mousemove', mouseMoveHandler);

// Event handlers

// Player Controls
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
function mouseClickHandler() {
  if (
    gameState === 'start' &&
    mouse.x > playbutton.x &&
    mouse.x < playbutton.x + playbutton.w &&
    mouse.y > playbutton.y &&
    mouse.y < playbutton.y + playbutton.h
  ) {
    gameState = 'play';
  }
}
