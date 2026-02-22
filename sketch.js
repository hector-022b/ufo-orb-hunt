var playerX = 600;
var playerY = 500;
var speed = 25;
var playerSize = 100;

var spaceObjects = [];


var drawPlayer = function() {

  var centerX = playerX + playerSize / 2;
  var centerY = playerY + playerSize / 2;
  
  //Glow beam
  fill(0, 255, 255, 60); // blue with transparency
  ellipse(centerX, centerY + 25, playerSize * 0.6, playerSize);


  //Bottom base 
  fill("gold");
  ellipse(centerX, centerY + 8, playerSize, playerSize / 3);

  //Middle body 
  fill("purple");
  ellipse(centerX, centerY, playerSize * 0.85, playerSize / 3);

  //Top dome 
  fill(100, 220, 255);
  ellipse(centerX, centerY - 8, playerSize * 0.45, playerSize * 0.35);

  //Small lights under
  fill(255, 255, 120);
  ellipse(centerX - 15, centerY + 10, 6, 6);
  ellipse(centerX, centerY + 12, 6, 6);
  ellipse(centerX + 15, centerY + 10, 6, 6);
};


//Player movement
var movePlayer = function() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= speed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    playerX += speed; 
  }
  
  if (keyIsDown(UP_ARROW)) {
    playerY -= speed;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    playerY += speed;
  }
  
  //Keeps player from leaving the frame, boundries
  //Left side
  if (playerX  < 0 ) {
    playerX = 0;
  }
  
  //Right side
  if (playerX > width - playerSize) {
    playerX = width - playerSize;
  }
  
  //Top side
  if (playerY < 0) {
    playerY = 0;
  }
  
  //Bottom side
  if (playerY > height - playerSize) {
    playerY = height - playerSize;
  }
}


//Falling items Object Type
var SpaceObject = function(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size; 
}


SpaceObject.prototype.move = function() {
  this.y += 4;
  
  if (this.y > height) {
    this.y = 0;
    this.x = random(width);
  }
};

// **** Energy Orb Object ****
var EnergyOrb = function(x, y) {
    SpaceObject.call(this, x, y, 14);
};

EnergyOrb.prototype = Object.create(SpaceObject.prototype);

EnergyOrb.prototype.draw = function() {
  // glowing blue orb
  fill(0, 255, 255, 60);
  ellipse(this.x, this.y, this.size * 2);
  fill(0, 255, 255);
  ellipse(this.x, this.y, this.size);
}


// *** Asteroid Object ****
var Asteroid = function(x, y) {
  SpaceObject.call(this, x, y, 20);
};

Asteroid.prototype = Object.create(SpaceObject.prototype);

Asteroid.prototype.draw = function() {
  // red asteroid
  fill("red");
  ellipse(this.x, this.y, this.size);
  fill(90);
  ellipse(this.x + 3, this.y - 2, this.size / 2);
}


var dropItem = function() {
  for (var i = 0; i < 10; i++) {
    spaceObjects[i] = new EnergyOrb(random(width), random(height));
  }
    
  for (var j = 10; j < 20; j++) {
    spaceObjects[j] = new Asteroid(random(width), random(height));
  }
}



function setup() {
  createCanvas(1200, 1000);
  dropItem();
}


function draw() {
  background(50);
  movePlayer();
  drawPlayer();

  for (var i = 0; i < spaceObjects.length; i++) {
    spaceObjects[i].move();
    spaceObjects[i].draw();
  }
  
  fill("white")
  textSize(20)
  text("- Move Using The Arrow Keys", 20, 30);
  text("- Collect The Blue Orbs!", 20, 60)
  text("- Avoid The Asteroids!!!", 20, 90)
}


