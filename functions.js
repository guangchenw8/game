function runGame() {
  drawUI();
  if (gameState === 'play') {
    // Logic
    logicGame();
    logicEnemies();
    logicCharacter();
    moveCharacter();
    moveEnemies();
    moveLasers();

    // Draw
    drawBackground();
    drawCharacter();

    drawEnemies();
    drawLasers();
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
}

// Game logic
function logicGame() {}

// Draw UI
function drawUI() {
  // Base
  ctx.drawImage(document.getElementById('base'), 0, 0);
  ctx.drawImage(document.getElementById('hiscore'), 0, 0);
  ctx.font = '30px Consolas';
  ctx.fillStyle = 'rgb(95, 38, 76)';
  ctx.fillText(`Hi-Score: ${hiScore}`, 20, 30, 100, 100);

  // Start Screen
  if (gameState === 'start') {
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
    ctx.drawImage(document.getElementById('logo'), 0, 0);

    // Play Screen
  } else if (gameState === 'play') {
    ctx.drawImage(document.getElementById('ingamelogo'), 0, 0);
    ctx.fillStyle = 'rgb(95, 38, 76)';

    // Title
    ctx.font = '30px Consolas';
    ctx.fillText('Game', 650, 90, 75);

    if (plr.health > 30) {
      ctx.fillStyle = 'rgb(45, 235, 112)';
    } else {
      ctx.fillStyle = 'rgb(232, 60, 53)';
    }
    ctx.fillRect(100, 460 - plr.health * 3, 46, plr.health * 3);
    ctx.drawImage(document.getElementById('healthbar'), 0, 0);

    // Lose Screen
  } else if (gameState === 'lose') {
    ctx.fillStyle = 'rgb(88, 215, 204)';
    ctx.fillText('lose', 200, 100);
  }
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
    plr.cooldown--;
  }

  // Check collisions

  for (let i = 0; i < enemyArray.length; i++) {
    if (
      plr.x + plr.w > enemyArray[i].x &&
      plr.x < enemyArray[i].x + enemyArray[i].w &&
      plr.y + plr.h > enemyArray[i].y &&
      plr.y < enemyArray[i].y + enemyArray[i].h &&
      plr.iFrames === 0
    ) {
      plr.health -= 10;
      plr.iFrames += 60;
    }
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
  if (enemyCooldown === 0) {
    spawnEnemies();
    if (hiScore < 500) {
      enemyCooldown += 300;
    } else if (hiScore < 1000) {
      enemyCooldown += 180;
    } else if (hiScore < 1500) {
      enemyCooldown += 60;
    } else {
      enemyCooldown += 30;
    }
  } else if (enemyCooldown > 0) {
    enemyCooldown--;
  }
  for (let i1 = 0; i1 < enemyArray.length; i1++) {
    for (let i2 = 0; i2 < laserArray.length; i2++) {
      if (
        enemyArray[i1].x + enemyArray[i1].w >
          laserArray[i2].x - laserArray[i2].r &&
        enemyArray[i1].x < laserArray[i2].x + laserArray[i2].r &&
        enemyArray[i1].y + enemyArray[i1].h >
          laserArray[i2].y - laserArray[i2].r &&
        enemyArray[i1].y < laserArray[i2].y + laserArray[i2].r
      ) {
        enemyArray[i1].health -= 1;
        laserArray.splice(i2, 1);
      }
    }
    if (enemyArray[i1].health === 0) {
      enemyArray.splice(i1, 1);
      hiScore += 50;
    }
  }
}

function spawnEnemies() {
  enemy = {
    x: 150 + Math.random() * 460,
    y: 0,
    w: 40,
    h: 40,
    health: 3,
  };

  enemyArray.push(enemy);
}
function moveEnemies() {
  for (let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].y += 2;
    if (enemyArray[i].y > 600) {
      enemyArray.splice(i, 1);
    }
  }
}
function drawEnemies() {
  for (let i = 0; i < enemyArray.length; i++) {
    ctx.drawImage(
      document.getElementById('enemyship'),
      enemyArray[i].x,
      enemyArray[i].y,
      enemyArray[i].w,
      enemyArray[i].h
    );
  }
}
