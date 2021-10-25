let angle = 0;
let step = 0.02;
let prevX;
let prevY;
let points = [];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(50);
  translate(width / 2, height / 2);

  // draw axis
  push();
  stroke(150);
  strokeWeight(1);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height/ 2, 0, height / 2);
  pop();

  // add point
  let radius = r(angle);
  let x = radius * cos(angle);
  let y = -radius * sin(angle);
  points.push(createVector(x, y));

  // draw curve
  push();
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape();
  pop();

  if (angle < TWO_PI) {
    angle += step;
    // draw arrow
    push();
    stroke(50, 255, 50);
    strokeWeight(3);
    fill(50, 255, 50);
    drawArrow(0, 0, x, y);
    pop();
  }
}

function drawArrow(x1, y1, x2, y2) {
  let base = createVector(x1, y1);
  let vec  = createVector(x2, y2);


  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
}

function r(a) {
  return 200 + 100 * sin(5*a);
}
