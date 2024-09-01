var register = {};

function keyPressed() {
  register[keyCode] = true;
}

function keyReleased() {
  register[keyCode] = false;
}

function mousePressed() {
  register[mouseButton] = true;
  if(start) {
    start = false;  
  } else if (!playing) {
    setup();
  }
}

function mouseReleased() {
  register[mouseButton] = false;
}


window.addEventListener("keydown", function(e) {
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);