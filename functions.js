// RunGame Function JS For Quabuble Game

function runGame() {
  drawUI();
  if (gameState === 'play') {
    // // Logic
    logicGame();
    logicEnemies();
    logicCharacter();
    logicPowerUp();
    moveCharacter();
    moveEnemies();
    moveLasers();

    // // Draw
    drawCharacter();
    drawEnemies();
    drawLasers();
    drawPowerUp();
  }
}

// Miscellaneous Game Logic
function logicGame() {
  // // Upgrades
  plr.ammoMax = 25 * plr.upgradeammo;

  // // Restrict score under maximum
  if (score > hiScore) {
    hiScore = score;
  }
  // // Restrict health under maximum
  if (plr.health > plr.healthMax) {
    plr.health = plr.healthMax;
  } else if (plr.ammo > plr.ammoMax) {
    plr.ammo = plr.ammoMax;
  }
}

// Draw UI
function drawUI() {
  // // Basic UI
  ctx.drawImage(document.getElementById('base'), 0, 0);
  ctx.drawImage(document.getElementById('score'), 0, 0);
  ctx.drawImage(document.getElementById('controls'), 650, 676);
  ctx.fillStyle = 'rgb(57, 0, 38)';
  ctx.fillRect(150, 0, 500, 800);

  // // Text for score and controls
  ctx.font = '25px Consolas';
  ctx.fillStyle = 'rgb(95, 38, 76)';
  ctx.fillText(`Score: ${score}`, 20, 30, 100, 100);
  ctx.fillText(`Best: ${hiScore}`, 20, 63, 100, 100);
  ctx.fillText('Controls:', 663, 725);
  ctx.fillText('W,A,S,D,', 663, 750);
  ctx.fillText('Click', 663, 775);

  // // Start UI
  if (gameState === 'start') {
    // // // Images for: playbutton, earth, logo
    ctx.drawImage(
      document.getElementById('playbutton'),
      playbutton.x,
      playbutton.y,
      playbutton.w,
      playbutton.h
    );
    ctx.drawImage(document.getElementById('logobig'), 150, 0);
    ctx.drawImage(document.getElementById('earthsmall'), 350, 250);

    // // Play UI
  } else if (gameState === 'play') {
    // // // Images for: logo, earth
    ctx.drawImage(document.getElementById('logoingame'), 650, 0);
    ctx.drawImage(document.getElementById('earthbig'), 203, 650);

    // // // Health Bar
    if (plr.health > 30) {
      ctx.fillStyle = 'rgb(45, 235, 112)';
    } else {
      ctx.fillStyle = 'rgb(232, 60, 53)';
    }
    ctx.fillRect(92, 434 - plr.health * 3, 46, plr.health * 3);
    ctx.fillStyle = 'rgb(114, 75, 102)';
    ctx.fillRect(92, 135, 46, 300 - plr.health * 3);
    ctx.drawImage(document.getElementById('healthbar'), 90, 86);

    // // // Ammo bar
    ctx.fillStyle = 'rgb(45, 235, 112)';
    ctx.fillRect(
      92,
      780 - (plr.ammo / plr.ammoMax) * 275,
      46,
      (plr.ammo / plr.ammoMax) * 275
    );
    ctx.fillStyle = 'rgb(114, 75, 102)';
    ctx.fillRect(92, 505, 46, 275 - (plr.ammo / plr.ammoMax) * 275);
    ctx.fillStyle = 'white';
    if (plr.ammo > 7) {
      ctx.fillText(plr.ammo, 100, 807 - (plr.ammo / plr.ammoMax) * 275);
    } else {
      ctx.fillText(plr.ammo, 100, 770);
    }
    ctx.fillText(plr.ammoMax, 100, 532);
    ctx.drawImage(document.getElementById('ammobar'), 90, 450);

    // // // Upgrade UI
    // // // // Upgrade Bar
    ctx.fillStyle = 'rgb(45, 235, 112)';
    if (plr.xp <= 100) {
      ctx.fillRect(675, 174, plr.xp, 12);
    } else {
      ctx.fillRect(675, 174, 100, 12);
    }

    ctx.font = '27px Consolas';
    ctx.fillStyle = 'rgb(114, 75, 102)';
    ctx.fillText('UPGRADES:', 660, 165);
    ctx.drawImage(document.getElementById('upgradebar'), 671, 170);
    if (plr.xp >= 100) {
      ctx.drawImage(
        document.getElementById('upgradeammo'),
        upgradeammo.x,
        upgradeammo.y,
        upgradeammo.w,
        upgradeammo.h
      );
      ctx.drawImage(
        document.getElementById('upgradebiglaser'),
        upgradebiglaser.x,
        upgradebiglaser.y,
        upgradebiglaser.w,
        upgradebiglaser.h
      );
      ctx.drawImage(
        document.getElementById('upgradefastlaser'),
        upgradefastlaser.x,
        upgradefastlaser.y,
        upgradefastlaser.w,
        upgradefastlaser.h
      );
    }

    // // Lose UI
  } else if (gameState === 'lose') {
    // // // Images for: logo, play button, lose text
    ctx.drawImage(document.getElementById('losetext'), 220, 300);
    ctx.drawImage(document.getElementById('logobig'), 150, 0);
    ctx.drawImage(
      document.getElementById('playbutton'),
      playbutton.x,
      playbutton.y,
      playbutton.w,
      playbutton.h
    );
    // // // Text
    ctx.fillStyle = 'rgb(95, 38, 76)';
    ctx.font = '50px Consolas';
    ctx.fillText('RE', 210, 675);
  }
}

// Move the Character/Player
function moveCharacter() {
  // // Controlled movement
  if (wIsPressed) {
    plr.y -= 4;
  }
  if (sIsPressed) {
    plr.y += 4;
  }
  if (aIsPressed) {
    plr.x -= 4;
  }
  if (dIsPressed) {
    plr.x += 4;
  }

  // // Adjust player for client boundaries
  if (plr.x > 650 - plr.w) {
    plr.x = 650 - plr.w;
    plr.xSpeed = 0;
  } else if (plr.x < 150) {
    plr.x = 150;
    plr.xSpeed = 0;
  }
  if (plr.y > 650 - plr.h) {
    plr.y = 650 - plr.h;
    plr.ySpeed = 0;
  } else if (plr.y < 0 + plr.h) {
    plr.y = 0 + plr.h;
    plr.ySpeed = 0;
  }
}

// Character Logic
function logicCharacter() {
  // // Laser cooldown
  if (mouse.pressed) {
    if (plr.cooldown === 0 && plr.ammo > 0) {
      spawnLaser();
      plr.ammo -= 1;
      if (plr.upgradefastlaser < 10) {
        plr.cooldown += 20 - plr.upgradefastlaser * 2;
      }
    }
  }
  if (plr.cooldown > 0) {
    plr.cooldown--;
  }

  // // Check for collisions and handle player's health
  for (let i = 0; i < enemy1Array.length; i++) {
    if (
      plr.x + plr.w > enemy1Array[i].x &&
      plr.x < enemy1Array[i].x + enemy1Array[i].w &&
      plr.y + plr.h > enemy1Array[i].y &&
      plr.y < enemy1Array[i].y + enemy1Array[i].h &&
      plr.iFrames === 0
    ) {
      plr.health -= 10;
      enemy1Array[i].health = 0;
      plr.iFrames += 60;
    }
  }
  if (plr.iFrames > 0) {
    plr.iFrames -= 1;
  }
  if (plr.health <= 0) {
    gameState = 'lose';
  }
}

// Draw the Character
function drawCharacter() {
  // Images for: player ship, player ship when damaged
  if (plr.health > 30) {
    ctx.drawImage(
      document.getElementById('spaceship'),
      plr.x,
      plr.y,
      plr.w,
      plr.h
    );
  } else {
    ctx.drawImage(
      document.getElementById('spaceshiplow'),
      plr.x,
      plr.y,
      plr.w,
      plr.h
    );
  }
}

// Spawn Laser Function
function spawnLaser() {
  // // Get player's position
  let laser = {
    x: plr.x + plr.w / 2,
    y: plr.y,
    r: 2.5 + plr.upgradebiglaser,
  };
  // // Spawn laser
  laserArray.push(laser);
  // // Pew sound
  pew.src = 'audio/pop.mp3';
  pew.play();
}

// Move Laser (Handles laser movement)
function moveLasers() {
  for (let i = 0; i < laserArray.length; i++) {
    // // Move the laser
    laserArray[i].y -= 10;
    if (laserArray[i].y < -laserArray[i].h) {
      // // Delete laser when off-screen
      laserArray.splice(i, 1);
    }
  }
}

// Draw the Lasers
function drawLasers() {
  for (let i = 0; i < laserArray.length; i++) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(laserArray[i].x, laserArray[i].y, laserArray[i].r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// Enemy Logic
function logicEnemies() {
  // // Enemy spawning cooldown
  if (enemy1.cooldown === 0) {
    spawnEnemies();
    if (score < 250) {
      enemy1.cooldown += 300;
    } else if (score < 500) {
      enemy1.cooldown += 180;
    } else if (score < 3000) {
      enemy1.cooldown += 60;
    } else {
      enemy1.cooldown += 5;
    }
  } else if (enemy1.cooldown > 0) {
    enemy1.cooldown--;
  }
  // // Check for laser and enemy collisions, and handle enemy health and deaths
  for (let i1 = 0; i1 < enemy1Array.length; i1++) {
    for (let i2 = 0; i2 < laserArray.length; i2++) {
      // // // Laser colliisions
      if (
        enemy1Array[i1].x + enemy1Array[i1].w >
          laserArray[i2].x - laserArray[i2].r &&
        enemy1Array[i1].x < laserArray[i2].x + laserArray[i2].r &&
        enemy1Array[i1].y + enemy1Array[i1].h >
          laserArray[i2].y - laserArray[i2].r &&
        enemy1Array[i1].y < laserArray[i2].y + laserArray[i2].r
      ) {
        enemy1Array[i1].health -= plr.upgradebiglaser;
        laserArray.splice(i2, 1);
      }
    }
    if (enemy1Array[i1].y > 650) {
      // // // Enemy reaches earth
      enemy1Array[i1].health = 0;
      plr.health -= 10;
    }
    if (enemy1Array[i1].health <= 0) {
      // // // Death events, spawning powerups, and adding to score
      let enemyDeathLocationX = enemy1Array[i1].x;
      let enemyDeathLocationY = enemy1Array[i1].y;
      spawnPowerUp(enemyDeathLocationX, enemyDeathLocationY);
      score += 50;
      enemy1Array.splice(i1, 1);
    }
  }
}

// Spawn Enemies Function
function spawnEnemies() {
  // // Define the enemy1 object
  enemy1 = {
    x: 150 + Math.random() * 460,
    y: -100,
    w: 40,
    h: 40,
    health: 5,
    cooldown: 0,
  };
  // // Spawn an enemy
  enemy1Array.push(enemy1);
}

// Move enemies
function moveEnemies() {
  for (let i = 0; i < enemy1Array.length; i++) {
    enemy1Array[i].y += 2;
  }
}

// Draw enemies
function drawEnemies() {
  for (let i = 0; i < enemy1Array.length; i++) {
    if (enemy1Array[i].health > 3) {
      // // Draw healthy enemies
      ctx.drawImage(
        document.getElementById('enemy1'),
        enemy1Array[i].x,
        enemy1Array[i].y,
        enemy1Array[i].w,
        enemy1Array[i].h
      );
    } else {
      // // Draw damaged enemies
      ctx.drawImage(
        document.getElementById('enemy1low'),
        enemy1Array[i].x,
        enemy1Array[i].y,
        enemy1Array[i].w,
        enemy1Array[i].h
      );
    }
  }
}

// Spawn Power Ups Functions
function spawnPowerUp(enemyDeathLocationX, enemyDeathLocationY) {
  // // Define the power up object
  powerUp = {
    x: enemyDeathLocationX,
    y: enemyDeathLocationY,
    w: 40,
    h: 40,
    type: '',
  };
  // // Random power up generation
  let randNum = Math.random();
  if (randNum < 0.2) {
    powerUp.type = 'ammo';
  } else if (randNum < 0.4) {
    powerUp.type = 'health';
  } else {
    powerUp.type = 'xp';
  }
  // // Spawn the power up
  powerUpArray.push(powerUp);
}

// Power Ups Logic
function logicPowerUp() {
  // // Check for player-to-powerup collisions
  for (let i = 0; i < powerUpArray.length; i++) {
    if (
      (plr.x + plr.w > powerUpArray[i].x &&
        plr.x < powerUpArray[i].x + powerUpArray[i].w &&
        plr.y + plr.h > powerUpArray[i].y &&
        plr.y < powerUpArray[i].y + powerUpArray[i].h) ||
      powerUpArray[i].y > 650
    ) {
      if (powerUpArray[i].type === 'ammo') {
        // // // Ammo power up effects
        plr.ammo += plr.ammoMax / 5;
      } else if (powerUpArray[i].type === 'health') {
        // // // Health power up effects
        plr.health += 30;
      } else if (powerUpArray[i].type === 'xp') {
        // // // Experience power up effects
        plr.xp += 20 + Math.random() * 30;
      }
      // // // Delete power up after use
      powerUpArray.splice(i, 1);
    }
  }
}

// Draw Power Ups
function drawPowerUp() {
  for (let i = 0; i < powerUpArray.length; i++) {
    // // Draw ammo power up icon
    if (powerUpArray[i].type === 'ammo') {
      ctx.drawImage(
        document.getElementById('powerupammo'),
        powerUpArray[i].x,
        powerUpArray[i].y,
        powerUpArray[i].w,
        powerUpArray[i].h
      );
      // // Draw health power up icon
    } else if (powerUpArray[i].type === 'health') {
      ctx.drawImage(
        document.getElementById('poweruphealth'),
        powerUpArray[i].x,
        powerUpArray[i].y,
        powerUpArray[i].w,
        powerUpArray[i].h
      );
      // // Draw xp power up icon
    } else if (powerUpArray[i].type === 'xp') {
      ctx.drawImage(
        document.getElementById('powerupxp'),
        powerUpArray[i].x,
        powerUpArray[i].y,
        powerUpArray[i].w,
        powerUpArray[i].h
      );
    }
  }
}
