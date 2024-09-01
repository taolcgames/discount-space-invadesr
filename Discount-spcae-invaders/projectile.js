class Projectile {
    constructor(x, y, type) {
      this.active = true;
      this.x = x;
      this.y = y;

      this.type = type;
      this.w = 2;
      this.h = 20;

      this.speed = 5;
      var colors = [color(255,0,0), color(0,255,0), color(0, 0, 255), color(149, 0, 255), color(255,255,255)]
      this.color = colors[floor(random(0, colors.length))]
    }

    draw() {
      if(this.type == "strafer") {
      fill(255,0,0);
      stroke(this.color);
      textSize(18);
      rect(this.x - this.w / 2, this.y, this.w, this.h, 0.1)    
      }
      if (this.type == "player"){
        push()
        translate(this.x+this.w/2-7.5,this.y+this.h/2-7.5)
        stroke(255,0,0)
        line(5,5,10,10)
        line(10,10,5,15)
        line(5,15,10,20)
        line(10,20,5,25)
        line(5,25,10,30)
        line(10,30,5,35)
        line(5,35,10,40)
        line(10,40,5,45)
        pop()
      }
    if (this.type == "bomber") {
      push()
      translate(this.x, this.y)
     if (this.speed <= 0) {
       rotate(PI/2)
     } else {
       rotate(-PI/2)
     }
      
      
      
      scale(this.h/50)
      noStroke()
      fill(170,170,170)
      rect(-5,-30,10,50)
      triangle(0,50,-10,20,10,20)
      triangle(0,-10,-10,20,10,20)
      
      triangle(0,-20,-10,-30,10,-30)
      fill(0,255,0)
   
      pop()
    }
      
      stroke(0)
    }

    move() {
      if(this.type == "player") {
        this.y -= this.speed; //maybe
      }
      if(this.type == "strafer") {
        this.y += this.speed;
      }
      if(this.type == "bomber") {
        this.x += this.speed;
      }
    }

getHitboxes() {
  if (this.type == "bomber") {   
    var hitboxes = [{x:this.x-17, y:this.y+this.h/2 - 20,w:37 ,h:20,type:this.type}];
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
      if (showHitBoxes) {
        this.drawColliders();
      }
      this.move();
    }  
}