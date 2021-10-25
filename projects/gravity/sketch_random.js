let mouseBegin;
let mouseEnd;
let size = 5;

function setup() {
  createCanvas(600, 400);

  mouseBegin = createVector(0, 0);
  mouseEnd = createVector(0, 0);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    push();
    stroke(255);
    strokeWeight(2);
    ellipse(mouseBegin.x, mouseBegin.y, size);
    pop();
  }
}

function mousePressed() {
  mouseBegin.set(mouseX, mouseY);
}

function mouseReleased() {
  mouseEnd.set(mouseX, mouseY);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    size -= 3;
  } else {
    size += 3;
  }
}
