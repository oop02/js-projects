let shape = {
  points: []
}
let framesPerPoint = 5;
let drawing = false;

function setup() {
  createCanvas(600, 600);
  background(50);
}

function draw() {
  //adding points
  if (drawing && frameCount % framesPerPoint == 0) {
    shape.points.push({x: mouseX, y: mouseY});
  }
  //drawing
  stroke(255);
  noFill();
  beginShape();
  for (let p of shape.points) {
    vertex(p.x, p.y);
  }
  endShape();
}

function mousePressed() {
  drawing = true;
}

function mouseReleased() {
  drawing = false;
  shape.points.push(shape.points[0]);
  console.log(shape);
}
