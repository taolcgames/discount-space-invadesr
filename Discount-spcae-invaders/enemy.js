class Enemy {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;

    this.type = type;

    this.active = true;
    this.w = 50;
    this.h = 50;
    //this.size = 50;
    this.speed = 7;

    this.canMove = true;
    this.shootTimer = floor(random(0,60));
    this.shootRate = 60;
  }

  draw() {
    push()
    translate(this.x, this.y)
    if(this.type == "strafer") {
      stroke(255)
      scale(this.w/90,this.h/90)
      fill(100,100,100)
        rect(8.75,13,-18.75,13)
      quad(8.75,23,-10,23,-16,30,14.75,30)
        rect(-50.5,-9,100,25)
        fill(255,255,255)
      ellipse(0,-10,30,30)
      fill(0,220,230)
      ellipse(0,-10,25,25)
      fill(100,100,100)
      rect(-55,-20,20,45)
      rect(35,-20,20,45)
  fill(0,165,255)
    rect(37,-16,16,39,)
      rect(-53,-16,16,39,)

      fill(100,100,100)
      quad(-55,25,-35,25,-25,35,-65,35)
      quad(55,25,35,25,25,35,65,35)

      quad(-55,-18,-35,-18,-25,-30,-65,-30)
      quad(55,-18,35,-18,25,-30,65,-30)
    }
    if(this.type == "bomber") {
      stroke(233)
      scale(this.w/100, this.h/100)
      fill(150,150,150)
      rect(-80,-10,160,23)
      
      rect(-70,-33,20,63)
      rect(70,-33,-20,63)
      quad(-70, 30,-50,30, -45,40, -75, 40)
      quad(70, 30,50,30, 45,40, 75, 40)      
      
      quad(-80,-10,-90,-15,-90,20,-80,13)
      quad(80,-10,90,-15,90,20,80,13)      
      
      fill(150,150,150)
      ellipse(0,0,35,35)
      fill(0,220,230)
      ellipse(0,0,28,28)
      fill(130,130,130)
      rect(-45,-7,23,18,2,2)
      rect(22,-7,23,18,2,2)      
    }
    

    pop()
  }

  move() {
    if(this.canMove == false) {
      return;
    }
    if(this.type == "bomber") {
          this.y += this.speed;
          if(this.y > 940) {
            this.y = -150;
            this.x = random(0, 1500)
          }
    }
    if(this.type == "strafer") {
      this.x += this.speed;
      if(this.x < -50) {
        this.speed = abs(this.speed);
      }
      if (this.x > 1675) {
        this.speed = -abs(this.speed);
      }
    }  
  }
  shoot() {
    if(this.type == "strafer") {
      let x = this.x + (this.w/2) - 25;
      let y = this.y-40 + this.h;
      projectiles.push(new Projectile(x, y, "strafer"));
    }
    if(this.type == "bomber") {
      let x1 = this.x - 20;
      let y = this.y + (this.h/2) - 23;
      let p = new Projectile(x1, y, "bomber");
      p.speed = abs(p.speed) * -1;
      projectiles.push(p);

      let x2 = this.x + 20;
        projectiles.push(new Projectile(x2, y, "bomber"));
    }
  }
  
  checkShoot() {
    this.shootTimer ++;
    if(this.shootTimer == this.shootRate) {
      this.shootTimer = 0;
      if(this.canMove) {
        this.canMove = false;
        this.shoot();
      } else {
        this.canMove = true;
      }
    }
  }
  getHitboxes() {
  if (this.type == "strafer") {   
    var hitboxes = [{x:this.x-37, y:this.y+this.h/2-25 - 20,w:75,h:40,type:this.type}];
    return hitboxes;
  }
  if (this.type == "bomber") {   
    var hitboxes = [{x:this.x-37, y:this.y+this.h/2-25 - 20,w:75,h:40,type:this.type}];
    return hitboxes;
  }
  return [{x:this.x, y:this.y ,w:this.w ,h:this.h,type:this.type}];
}
drawColliders() {
  noFill();
  stroke(255);
  for (var hb of this.getHitboxes()) {
    rect(hb.x, hb.y, hb.w, hb.h);
  }
}
  update() {
    this.draw();
    this.move();
    this.checkShoot();
     if (showHitBoxes) {
        this.drawColliders();
      }
  }
  
}
