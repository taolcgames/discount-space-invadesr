//*changes wow*
//Variables
var player;
var projectiles;
var enemies;
var level;
var showHitBoxes = false;
var playing;
var start = true;
var score;
var highscore = 0;

var colorlist = ["black","gray","red","gray","#990d06","#FF0101","#FF3131","#DC143C","black","black","black","gray","black","gray","black","gray",]
//Main Functions
function setup() {
    createCanvas(1675, 1100);//possibly change it to createCanvas(windowWidth, windowHeight);
  
  player = new Player();
  projectiles = [];
  enemies = [];
  level = 0;
  playing = true;
  score = 0
}

function draw() {
  if (start) {
    drawStart();
  } else if(playing) {
    background(0);
    projectileUpdate();
    enemyUpdate();
    player.update();
    checkLevel();
    checkCollision();
    activateHitboxes();
    drawScore();
    if(mouseX > 1500 && mouseY > 920) {
      textSize(100)
      fill(0)
      rect(0,0,1675,940)
      fill(0,0,255)
      text("L A D Y  C H O B A N I", 1200,500)
      console.log("lady chobani")
    }
  } else {
    drawGameOver();
  }
}

function drawScore() {
  fill(0,0,255);
  stroke(0,0,255)
  textSize(48)
  textAlign(LEFT, TOP);
  text(score, 25,50);
  textAlign(RIGHT, TOP)
  text(highscore,1600,50)
  textSize(24)
  text("Highscore",1625,25)
  text("Score",75,25)
  if(score > highscore) {
    highscore = score;
  }
}
//Other Functions
function checkCollision() {
  for (var proj of projectiles) {
    for(var p of proj.getHitboxes()){
      for(var hb of player.getHitboxes()) {
        if(collision(hb, p) && p.type != "player") {
          playing = false;
  
          //idea for later: on death, screen goes black, and suddenly text appears (like a jumpscare or smth hahah) saying a few choices for death msgs
        }
      }
        for(var p2 of projectiles) {
          if(collision(p, p2) && p2.type == "player" && p.type != "player") {
            p2.active = false;
            proj.active = false;
          }
        }        
    }
  }
  for (var e of enemies) {
    //ad a for loop here for ehb of enemies' hitboxes
    for (var ehb of e.getHitboxes()) {
      for (var hb of player.getHitboxes()) {
        if (collision(ehb, hb)) {
          playing = false;
        }
      }
      for (var p of projectiles) {
        if (collision(p, ehb) && p.type == "player") {
          score += 5
          p.active = false;
          e.active = false;
        }
      }
    }
  }
  }

function checkLevel() {
 
  if(enemies.length === 0) {
  
    level += 1;
    for(var i = 0; i < level; i++) {
      var coinFlip = round(random(0, 1));
      if(coinFlip === 0) {
        enemies.push(new Enemy(random(300, 1300), random(-500,-200), "bomber"));        
      } else {
        var coinFlip = round(random(0, 1));
        if(coinFlip === 0) {
          enemies.push(new Enemy(random(2300,1900), random(200, 800), "strafer"));
        } else {
          enemies.push(new Enemy(random(-300,-700), random(200, 800), "strafer"));
        }
          
      }


    }
  }
}
function collision(obj1, obj2) {
  if (obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x && obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y) {
    return true; 
  }else{ 
    return false; 
  } 
}

function activateHitboxes() {
  if(register[72]) {
    showHitBoxes = !showHitBoxes;
    console.log("Togging Hitboxes")
    register[72] = false;
  }
}

function enemyUpdate() {
    enemies = enemies.filter((e) => {
    return e.active;
  })
  for(var p of projectiles) {
    p.update();
  }
  for(var e of enemies) {
    e.update();
  }
}

function projectileUpdate() {
    projectiles = projectiles.filter((p) => {
    return p.y > -p.h && p.x > -p.w && p.x < 1675 && p.y < 940 && p.active; 
  });

  enemies = enemies.filter((e) => {
    return e.active;
  })
  for(var p of projectiles) {
    p.update();
  }
}

function drawGameOver() {
  if (playing == false) {
    var num = floor(random(0,colorlist.length))
    fill(0)
    rect(-200,-200,10000,10000)
    setTimeout(2000)
    fill(colorlist[num]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(30)
    text('You either crashed into an enemy or ran into a projectile.', 830,420)
    text("You must move from the projectiles to avoid death, and avoid crashing into enemies.", 800, 470)
    text("             Score: (" + highscore + ") Click to restart",800,520)
  }
}

function drawStart() {
  background(0)
  var num = floor(random(0,colorlist.length))
  fill(colorlist[num])
  rect(470,240,800,400)
  fill(0)
  rect(490,260,750,360)
  fill(255,0,0)
  textSize(50)
  text("Code War-Ya Alpha 1.0", 600, 400)
  textSize(30)
  text("  Press to initiate game",650,475)
  
}