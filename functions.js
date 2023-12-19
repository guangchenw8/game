function runGame() {
  drawBasicUI();
  if (gameState === 'play') {
    // Logic
    logicCharacter();
    moveCharacter();
    logicEnemies();
    moveEnemies();
    moveLasers();
    // Draw
    drawBackground();
    drawCharacter();
    drawGameUI();
    drawEnemies();
    drawLasers();
  } else if (gameState === 'start') {
    drawStart();
  } else if (gameState === 'lose') {
    drawLose();
  }
}

// Set Game
function setGame() {
  plr = {
    x: 400,
    y: 300,
    w: 40,
    h: 40,
    xSpeed: 0,
    ySpeed: 0,
    Accel: 0.2,
    cooldown: 0,
    iFrames: 0,
    health: 100,
  };
  enemy = {
    x: 400,
    y: 100,
    w: 40,
    h: 40,
  };
}

// Draw Basic UI
function drawBasicUI() {
  // Left and right bars
  ctx.fillStyle = 'rgb(2, 161, 226)';
  ctx.fillRect(0, 0, 150, 600);
  ctx.fillRect(650, 0, 150, 600);

  // Images
  ctx.drawImage(document.getElementById('basicUI'), 0, 0, 800, 600);

  // Theme colors and fonts
  ctx.font = '50px Consolas';
  ctx.fillStyle = 'rgb(95, 38, 76)';

  // Title
  ctx.fillText('Epic', 665, 60, 125, 100);
  ctx.font = '30px Consolas';
  ctx.fillText('Game', 705, 90, 75);

  // High Score
  let a = 0;
  ctx.fillText(`Hi-Score: ${a}`, 20, 30, 100, 100);
}

// Draw Start UI
function drawStart() {
  // Middle Blue
  ctx.fillStyle = 'rgb(88, 215, 204)';
  ctx.fillRect(150, 0, 500, 600);

  // Play button
  playbutton = {
    x: 200,
    y: 400,
    w: 400,
    h: 125,
  };
  ctx.drawImage(
    document.getElementById('playbutton'),
    playbutton.x,
    playbutton.y,
    playbutton.w,
    playbutton.h
  );
}

// Draw In-Game UI
function drawGameUI() {
  if (plr.health > 30) {
    ctx.fillStyle = 'rgb(45, 235, 112)';
  } else {
    ctx.fillStyle = 'rgb(232, 60, 53)';
  }
  ctx.fillRect(100, 460 - plr.health * 3, 46, plr.health * 3);
  ctx.drawImage(document.getElementById('gameUI'), 0, 0, 800, 600);
}

// Draw Lose UI
function drawLose() {
  ctx.fillStyle = 'rgb(88, 215, 204)';
  ctx.fillText('lose', 200, 100);
}

// Move Character function
function moveCharacter() {
  // Accelerate
  if (wIsPressed) {
    plr.ySpeed -= plr.Accel;
  }
  if (sIsPressed) {
    plr.ySpeed += plr.Accel;
  }
  if (aIsPressed) {
    plr.xSpeed -= plr.Accel;
  }
  if (dIsPressed) {
    plr.xSpeed += plr.Accel;
  }

  // Slow down
  if (wIsPressed === false && plr.ySpeed < 0) {
    plr.ySpeed += plr.Accel;
    plr.ySpeed = +plr.ySpeed.toFixed(1);
  }
  if (sIsPressed === false && plr.ySpeed > 0) {
    plr.ySpeed -= plr.Accel;
    plr.ySpeed = +plr.ySpeed.toFixed(1);
  }
  if (aIsPressed === false && plr.xSpeed < 0) {
    plr.xSpeed += plr.Accel;
    plr.xSpeed = +plr.xSpeed.toFixed(1);
  }
  if (dIsPressed === false && plr.xSpeed > 0) {
    plr.xSpeed -= plr.Accel;
    plr.xSpeed = +plr.xSpeed.toFixed(1);
  }

  // Max Speed
  if (plr.xSpeed > 5) {
    plr.xSpeed = 5;
  } else if (plr.xSpeed < -5) {
    plr.xSpeed = -5;
  }
  if (plr.ySpeed > 5) {
    plr.ySpeed = 5;
  } else if (plr.ySpeed < -5) {
    plr.ySpeed = -5;
  }

  // Move character
  plr.y += plr.ySpeed;
  plr.x += plr.xSpeed;
  //

  // Adjust Player for client boundaries
  if (plr.x > 650 - plr.w) {
    plr.x = 650 - plr.w;
    plr.xSpeed = 0;
  } else if (plr.x < 150) {
    plr.x = 150;
    plr.xSpeed = 0;
  }
  if (plr.y > 600 - plr.h) {
    plr.y = 600 - plr.h;
    plr.ySpeed = 0;
  } else if (plr.y < 0 + plr.h) {
    plr.y = 0 + plr.h;
    plr.ySpeed = 0;
  }
}

// Character logic
function logicCharacter() {
  // Laser cooldown
  if (mouse.pressed) {
    if (plr.cooldown === 0) {
      spawnLaser();
      plr.cooldown += 10;
    }
  }
  if (plr.cooldown > 0) {
    plr.cooldown -= 1;
  }

  // Check collisions
  if (
    plr.x + plr.w > enemy.x &&
    plr.x < enemy.x + enemy.w &&
    plr.y + plr.h > enemy.y &&
    plr.y < enemy.y + enemy.h &&
    plr.iFrames === 0
  ) {
    plr.health -= 10;
    plr.iFrames += 60;
  }
  if (plr.iFrames > 0) {
    plr.iFrames -= 1;
  }
  if (plr.health <= 0) {
    // Health
    gameState = 'lose';
  }
}

// Draw Character function
function drawCharacter() {
  // character body

  ctx.drawImage(
    document.getElementById('spaceship'),
    plr.x,
    plr.y,
    plr.w,
    plr.h
  );
}

//  Draw Background
function drawBackground() {
  ctx.fillStyle = 'rgb(57, 0, 38)';
  ctx.fillRect(150, 0, 500, 600);
}

function spawnLaser() {
  laser = {
    x: plr.x + plr.w / 2,
    y: plr.y,
    r: 2.5,
  };

  laserArray.push(laser);
}
function moveLasers() {
  for (let i = 0; i < laserArray.length; i++) {
    laserArray[i].y -= 10;
    if (laserArray[i].y < -laserArray[i].h) {
      laserArray.splice(i, 1);
    }
  }
}
function drawLasers() {
  for (let i = 0; i < laserArray.length; i++) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(laserArray[i].x, laserArray[i].y, laserArray[i].r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function logicEnemies() {
  setTimeout(spawnEnemies, 1000);
}
function spawnEnemies() {
  let enemy = enemyArray.push();
}
function moveEnemies() {
  enemy.y += 2;

  if (enemy.y > 600) {
    enemy.y = -enemy.h;
  }
}
function drawEnemies() {
  ctx.drawImage(
    document.getElementById('enemyship'),
    enemy.x,
    enemy.y,
    enemy.w,
    enemy.h
  );
}
