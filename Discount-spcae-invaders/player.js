
class Player {
  constructor() {
    this.x = 225;
    this.y = 450;
    this.w = 90;
    this.h = 90;

    this.speed = 5;

    this.canShoot = true;
    this.shootTimer = 0;
    this.shootRate = 10;
  }

  draw() {
  stroke(0)
  push()
  translate(player.x +this.w/2, player.y + this.h/2)
  scale(this.w/140,this.h/140)
  beginShape()
  fill(137,137,137)
  vertex(0,-75)
  vertex(-25,0)
  vertex(-50,0)
  vertex(-50, 30)
  vertex(50,30)
  vertex(50,0)
  vertex(25,0)
  endShape()
  fill(120,120,120)
  rect(-70,-20,20,60)
  for(var y = -15; y<35; y++){
    stroke(255, y*3+75, 0)
    line(-64,y,-54,y)
  }
  stroke(0)
  noFill()
  rect(-64,-15,10,50)
  fill(120,120,120)
  triangle(-69,-19,-49,-19,-60,-30)
quad(-70, 40, -49, 40, -42, 50, -77, 50) 
  fill(120,120,120)
  rect(50,-20,20,60)
  for(var y = -15; y<35; y++){
    stroke(255, y*3+75, 0)
    line(55,y,65,y)
  }
  stroke(0)
  noFill()
  rect(55,-15,10,50)

  fill(120,120,120)
  triangle(71,-19, 50, -19, 61, -30)
  quad(71, 40, 50, 40, 42, 50, 80, 50)
  rect(-25, 12, 50, 25)
  fill(255,255,255)
  textSize(20)
  text("Lady Chobani", 0, 15)
  fill(0,220,230)
quad(-18, -5, 18, -5, 5, -50, -5, -50)


  pop()

  }

  move() {
    if(register[68] && this.x < 1590) {
      this.x += this.speed;
    }
    if(register[65] && this.x > -5) {
      this.x -= this.speed;
    }
    if(register[87] && this.y > -5) {
      this.y -= this.speed;
    }
    if(register[83] && this.y < 870) {
      this.y += this.speed;
    }
  }

shoot() {
  if(this.canShoot == true) {
    if(register[LEFT]) {
      let x = this.x+this.w/2;
      let y = this.y - this.h * 0.52;
      projectiles.push(new Projectile(x, y, "player"));
      this.canShoot = false;
    }
  }
  else{
    if(register[LEFT] == false) {
      this.canShoot = true;
      this.shootTimer = 0;
    
    } else if(this.shootTimer == this.shootRate) {
      this.canShoot = true;
      this.shootTimer = 0;
      
    } else {
      this.shootTimer += 1;
      
    }
  }
}
drawColliders() {
  noFill();
  stroke(255);
  for (var hb of this.getHitboxes()) {
    rect(hb.x, hb.y, hb.w, hb.h);
  }
}
getHitboxes() {
  var hitboxes = [{x:this.x+10, y:this.y+this.h/2 ,w:70 ,h:20},{x:this.x+30,y:this.y,w:30,h:60},{x:this.x+75,y:this.y+25,w:15,h:60},{x:this.x,y:this.y+25,w:15,h:60}];
  return hitboxes;
}

  
update() {
  this.draw();
  if (showHitBoxes) {
    this.drawColliders();
  } 
  
  this.move();
  
  this.shoot();
}
}//i dont think you should write beyond here