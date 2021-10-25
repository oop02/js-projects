class Obstacle {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.stroke = color(255, 50, 50);
    this.fill = color(255, 255, 255, 100);
  }

  show() {
    fill(this.fill);
    stroke(this.stroke);
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, this.radius);
  }
}
