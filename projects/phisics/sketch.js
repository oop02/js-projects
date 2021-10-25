let g = 20;
let gSlider;

const borders = {
  top: true,
  bottom: true,
  left: true,
  right: true
};

let balls = [];
//const ballCount = 2;
const maxDiameter = 50;
const minDiameter = 100;

function setup() {
  createCanvas(1000, 1000);
  background(200);
  frameRate(60);
  colorMode(HSB);

  gSlider = createSlider(-200, 200, 0, 1);

  //for (let i = 1; i <= ballCount; i++) {
  //  balls[i] = new Ball(map(i, 1, ballCount, maxDiameter / 2, width - maxDiameter / 2), height / 4, random(10, maxDiameter));
  //}
}

function draw() {
  background(20);

  g = gSlider.value();

  for (let i = 0; i < balls.length; i++) {
    balls[i].calculate();
    balls[i].collisionCheck(i);
    balls[i].show();
  }

  textSize(14);
  fill(255);
  noStroke();
  text("g = " + g, 10, 20);
  text("balls = " + balls.length, 10, 40);
  /*ball1.calculate();
  ball1.show();
  ball2.calculate();
  ball2.show();
  ball3.calculate();
  ball3.show();*/
}

function mouseDragged() {
  balls[balls.length] = new Ball(mouseX, mouseY, random(minDiameter, maxDiameter));
}

class Ball {
  constructor(tempX, tempY, tempD) {
    this.diameter = tempD;
    this.radius = this.diameter / 2;
    this.color = random(0, 360);
    this.bounce = 0.9;
    this.collide = false;
    this.x = tempX;
    this.y = tempY;
    this.dx = 0;
    this.dy = 0;

    this.t = 0;
    this.dt = 0.1;

    this.vx = random(-50, 50);
    this.vy = random(-50, 50);
    this.dvx = 0;
    this.dvy = 0;
    this.ax = 0;
    this.ay = 0;
  }

  calculate() {
    this.ay = g;
    //this.ax = g;

    this.dvx = this.ax * this.dt;
    this.dvy = this.ay * this.dt;
    this.vx += this.dvx;
    this.vy += this.dvy;
    this.dx = this.vx * this.dt;
    this.dy = this.vy * this.dt;
    this.x += this.dx;
    this.y += this.dy;

    if (this.y <= this.diameter / 2 && borders.top) { //top border
      this.vy *= -this.bounce;
      this.y = this.diameter / 2;
    }
    if (this.y >= height - this.diameter / 2 && borders.bottom) { //bottom border
      this.vy *= -this.bounce;
      this.y = height - this.diameter / 2;
    }
    if (this.x <= this.diameter / 2 && borders.left) { //left border
      this.vx *= -this.bounce;
      this.x = this.diameter / 2;
    }
    if (this.x >= width - this.diameter / 2 && borders.right) { //right border
      this.vx *= -this.bounce;
      this.x = width - this.diameter / 2;
    }

    this.t += this.dt;
  }

  collisionCheck(tempIndex) {
    this.index = tempIndex;

    for (let j = 0; j < balls.length; j++) {
      if (j != this.index) {
        if ((this.x - balls[j].x) * (this.x - balls[j].x) + (this.y - balls[j].y) * (this.y - balls[j].y) < (this.radius + balls[j].radius) * (this.radius + balls[j].radius)) {
          this.collide = true;
        }
      }
    }
  }

  show() {
    if (this.collide) {
      stroke(0, 100, 100);
      strokeWeight(5);
      fill(this.color, 50, 100);
      //noStroke();
    } else {
      fill(this.color, 50, 100);
      noStroke();
    }
    ellipse(this.x, this.y, this.diameter);
    this.collide = false;
  }
}
