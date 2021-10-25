class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radius = 5;
    this.color = color(100, 255, 100);
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }
}
