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
function logicGame() {
  if (score > hiScore) {
    hiScore = score;
  }
}

// Draw UI
function drawUI() {
  // Base
  ctx.drawImage(document.getElementById('base'), 0, 0);
  ctx.drawImage(document.getElementById('score'), 0, 0);

  ctx.font = '30px Consolas';
  ctx.fillStyle = 'rgb(95, 38, 76)';
  ctx.fillText(`Score: ${score}`, 20, 30, 100, 100);
  ctx.fillText(`Best: ${hiScore}`, 20, 63, 100, 100);

  ctx.fillStyle = 'rgb(57, 0, 38)';
  ctx.fillRect(150, 0, 500, 600);
  ctx.drawImage(document.getElementById('earth'), 0, 0);

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
    ctx.font = '40px Castellar';
    ctx.fillText('Game', 660, 70, 125);

    if (plr.health > 30) {
      ctx.fillStyle = 'rgb(45, 235, 112)';
    } else {
      ctx.fillStyle = 'rgb(232, 60, 53)';
    }
    ctx.fillRect(92, 460 - plr.health * 3, 46, plr.health * 3);
    ctx.drawImage(document.getElementById('healthbar'), 0, 0);

    // Lose Screen
  } else if (gameState === 'lose') {
    ctx.fillStyle = 'rgb(88, 215, 204)';
    ctx.fillText('You Lost', 200, 100);
  }
}

// Move Character function
function moveCharacter() {
  // Accelerate
  if (wIsPressed) {
   plr.y -= 3
  }
  if (sIsPressed) {
    plr.y += 3;
  }
  if (aIsPressed) {
    plr.x -= 3;
  }
  if (dIsPressed) {
    plr.x += 3;
  }

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
function drawBackground() {}

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
    if (score < 250) {
      enemyCooldown += 300;
    } else if (score < 500) {
      enemyCooldown += 180;
    } else if (score < 1000) {
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
    if (enemyArray[i1].y > 600) {
      enemyArray[i1].health = 0
      plr.health -= 10
    }
    if (enemyArray[i1].health === 0) {
      enemyArray.splice(i1, 1);
      score += 50;
    }
  }
}

function spawnEnemies() {
  enemy = {
    x: 150 + Math.random() * 460,
    y: 0,
    w: 40,
    h: 40,
    health: 5,
  };

  enemyArray.push(enemy);
}
function moveEnemies() {
  for (let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].y += 2;
    
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
