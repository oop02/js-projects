class Player {
  constructor(x, y) {
    this.width = 40;
    this.height = 100;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  show(img) {
    push();
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(255, 0, 0, 20);
    image(img, -this.width / 2, -this.height);
    //rect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
    pop();
  }

  applyForce(force) {
    //F = m * a
    //a = F / m
    // a = F
    this.acc.add(force);
  }

  move() {
    if (keyIsDown(32) && this.onGround() && this.vel.y == 0) { // 32 = space
      let jump = createVector(0, -20);
      this.applyForce(jump);
    }

    if (keyIsDown(65)) { // 65 = A
      this.vel.x = -7;
    } else if (keyIsDown(68)) { // 68 = D
      this.vel.x = 7;
    } else {
      this.vel.x = 0;
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  onGround() {
    if (this.pos.y >= height) {
      return true;
    }
    for (let p of platforms) {
      if ((this.pos.y >= p.pos.y && this.pos.y < p.pos.y + p.height) && (this.pos.x > p.pos.x - p.width / 2 && this.pos.x < p.pos.x + p.width / 2)) {
        this.y = p.y;
        return true;
      }
    }
    return false;
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = height;
    this.posCenter = createVector(x, y + height / 2);
    this.posTemp = createVector(0, 0);
  }

  show(off) {
    this.posTemp.set(this.posCenter.x, this.posCenter.y);
    this.posTemp.sub(off);
    push();
    stroke(255);
    strokeWeight(2);
    fill(255, 20);
    rect(this.posTemp.x, this.posTemp.y, this.width, this.height);
    pop();
  }
}
