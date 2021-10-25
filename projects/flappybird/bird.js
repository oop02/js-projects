class Bird {
  constructor(startY) {
    this.diameter = 45;
    this.x = width / 2 - this.diameter / 2;
    this.y = startY - this.diameter / 2;
    this.vel = -10;
    this.acc = g;

    this.hitbox = false;
  }

  move() {
    this.vel += this.acc;
    this.y += this.vel;
  }

  show() {
    push();
    image(birdImg, this.x - 10, this.y - 10, this.diameter + 20, this.diameter + 20);

    if (this.hitbox) {
      stroke(255, 0, 0);
      noFill();
      rect(this.x, this.y, this.diameter, this.diameter);
    }

    pop();
  }

  update() {
    this.move();
    this.show();
  }
}
